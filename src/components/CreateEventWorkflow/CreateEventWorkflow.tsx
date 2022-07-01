import {
  Breadcrumbs,
  Button,
  Divider,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import FormHelperTexts from "@mui/material/FormHelperText";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import "./CreateEventWorkflow.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import { NavButtonStatus } from "../NavButtonStatus/NavButtonStatus";
import {
  EventTitleState,
  EventDescriptionState,
  EventStartTimeState,
  EventEndTimeState,
  EventCategoryState,
} from "../../Recoil/Events/EventAtoms";
import { EventAPI } from "../../API/Events/EventAPI";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { createSecureServer } from "http2";
import { CurrentUserData } from "../../Recoil/Users/UserAtoms";
import CreateEventDetailsComponent from "./CreateEventDetailsComponent";
import CreateEventDescriptionComponent from "./CreateEventDescriptionComponent";
import CreateEventThumbnailComponent from "./CreateEventThumbnailComponent";
import { FileAPI } from "../../API/File/FileAPI";

const fileAPI = new FileAPI();
const eventAPI = new EventAPI();

type CreateEventWorkflowProps = {
  setHomeIconFill: Function;
  setCreateIconFill: Function;
  handleCreateEventModalClose: Function;
};

export default function CreateEventWorkflow({
  setHomeIconFill,
  setCreateIconFill,
  handleCreateEventModalClose,
}: CreateEventWorkflowProps) {
  const [activePage, setActivePage] = useState("details");
  const [eventCategory, setEventCategory] = useRecoilState(EventCategoryState);
  const [eventTitle, setEventTitle] = useRecoilState(EventTitleState);
  const [startTime, setStartTime] = useRecoilState(EventStartTimeState);
  const [endTime, setEndTime] = useRecoilState(EventEndTimeState);
  const [eventDescription, setEventDescription] = useRecoilState(
    EventDescriptionState
  );
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    undefined
  );
  const [imageURL, setImageURL] = useState<string>("");
  const userInfo = useRecoilValue(CurrentUserData);

  const CompleteWorkflow = () => {
    if (image !== null) {
      fileAPI.UploadFile({ fileName: image.name, file: image });
      eventAPI.CreateEvent({
        featured: false,
        name: "asdf",
        user_id: userInfo.user_id as string,
        title: eventTitle,
        description: eventDescription,
        start_timestamp: startTime,
        end_timestamp: endTime,
        category_id: eventCategory,
        image: imageURL,
      });
      handleCreateEventModalClose();
      setEventCategory("");
      setEventTitle("");
      setEventDescription("");
      setStartTime(new Date());
      setEndTime(new Date());
      setCreateIconFill(NavButtonStatus.DISABLED);
    }
  };

  const ActiveComponent = (value) => {
    if (value === "details") {
      return (
        <CreateEventDetailsComponent
          eventCategory={eventCategory}
          setEventCategory={setEventCategory}
          eventTitle={eventTitle}
          setEventTitle={setEventTitle}
          startTime={startTime}
          setStartTime={setStartTime}
          endTime={endTime}
          setEndTime={setEndTime}
          setActivePage={setActivePage}
          onNext={() => {
            setActivePage("description");
          }}
          onCancel={() => {
            setCreateIconFill(NavButtonStatus.DISABLED);
            handleCreateEventModalClose();
            setEventTitle("");
            setEventCategory("");
          }}
        />
      );
    } else if (value === "description") {
      return (
        <CreateEventDescriptionComponent
          eventDescription={eventDescription}
          setEventDescription={setEventDescription}
          setActivePage={setActivePage}
          onNext={() => {
            setActivePage("thumbnail");
          }}
          onBack={() => {
            setActivePage("details");
          }}
        />
      );
    } else if (value === "thumbnail") {
      return (
        <CreateEventThumbnailComponent
          image={image}
          setImage={setImage}
          setImageURL={setImageURL}
          imagePreview={imagePreview}
          setImagePreview={setImagePreview}
          onCreate={() => {
            CompleteWorkflow();
          }}
          onBack={() => {
            setActivePage("description");
          }}
        />
      );
    }
  };

  return (
    <div className="create-event-modal-wrapper">
      <div className="create-event-header-wrapper">
        <div className="create-event-header">
          <Breadcrumbs style={{ color: "#aaaaaa" }} aria-label="breadcrumb">
            <Typography
              style={
                activePage === "details"
                  ? { color: "#A970FF" }
                  : { color: "#aaaaaa" }
              }
            >
              Details
            </Typography>
            <Typography
              style={
                activePage === "description"
                  ? { color: "#A970FF" }
                  : { color: "#aaaaaa" }
              }
            >
              Description
            </Typography>
            <Typography
              style={
                activePage === "thumbnail"
                  ? { color: "#A970FF" }
                  : { color: "#aaaaaa" }
              }
            >
              Thumbnail
            </Typography>
          </Breadcrumbs>
        </div>
        <div className="create-event-close-button">
          <IconButton
            onClick={() => {
              handleCreateEventModalClose();
              setEventTitle("");
              setEventDescription("");
              setStartTime(new Date());
              setEndTime(new Date());
              setCreateIconFill(NavButtonStatus.DISABLED);
            }}
          >
            <CloseRoundedIcon
              sx={{
                width: "20px",
                height: "20px",
                color: "#E3E3E3",
              }}
            ></CloseRoundedIcon>
          </IconButton>
        </div>
      </div>
      <Divider variant="fullWidth" style={{ backgroundColor: "#545454" }} />
      <div className="create-event-active-component">
        {ActiveComponent(activePage)}
      </div>
      <script src="https://unpkg.com/react-image-crop/dist/ReactCrop.min.js"></script>
    </div>
  );
}
