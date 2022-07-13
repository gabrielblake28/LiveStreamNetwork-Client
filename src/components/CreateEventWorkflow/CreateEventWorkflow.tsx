import { Breadcrumbs, Divider, IconButton, Typography } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import "./CreateEventWorkflow.css";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { NavButtonStatus } from "../NavButtonStatus/NavButtonStatus";
import { EventAPI } from "../../API/Events/EventAPI";
import { useRecoilValue } from "recoil";
import { CurrentUserData } from "../../Recoil/Users/UserAtoms";
import CreateEventDetailsComponent from "./CreateEventDetailsComponent";
import CreateEventDescriptionComponent from "./CreateEventDescriptionComponent";
import CreateEventThumbnailComponent from "./CreateEventThumbnailComponent";
import { FileAPI } from "../../API/File/FileAPI";

const fileAPI = new FileAPI();
const eventAPI = new EventAPI();

type CreateEventWorkflowProps = {
  setCreateIconFill: Function;
  handleCreateEventModalClose: Function;
};

export default function CreateEventWorkflow({
  setCreateIconFill,
  handleCreateEventModalClose,
}: CreateEventWorkflowProps) {
  const [activePage, setActivePage] = useState("details");
  const [eventCategory, setEventCategory] = useState<string>("");
  const [eventTitle, setEventTitle] = useState<string>("");
  const [startTime, setStartTime] = useState<Date | undefined>(undefined);
  const [endTime, setEndTime] = useState<Date | undefined>(undefined);
  const [eventDescription, setEventDescription] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    undefined
  );
  const [imageURL, setImageURL] = useState<string>("");
  const userInfo = useRecoilValue(CurrentUserData);

  const CompleteWorkflow = () => {
    if (image !== null && startTime !== undefined && endTime !== undefined) {
      eventAPI.CreateEvent({
        event: {
          featured: false,
          name: "asdf",
          user_id: userInfo.user_id as string,
          title: eventTitle,
          description: eventDescription,
          start_timestamp: startTime,
          end_timestamp: endTime,
          category_id: eventCategory,
        },
        image: image,
      });
      handleCreateEventModalClose();
      setEventCategory("");
      setEventTitle("");
      setEventDescription("");
      setStartTime(new Date());
      setEndTime(new Date());
      setCreateIconFill(false);
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
          startTime={startTime as Date}
          setStartTime={setStartTime}
          endTime={endTime as Date}
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
          onCreate={async () => {
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
                  ? {
                      color: "#A970FF",
                      fontFamily: "Source Sans Pro",
                      fontSize: "17px",
                    }
                  : {
                      color: "#aaaaaa",
                      fontFamily: "Source Sans Pro",
                      fontSize: "17px",
                    }
              }
            >
              Details
            </Typography>
            <Typography
              style={
                activePage === "description"
                  ? {
                      color: "#A970FF",
                      fontFamily: "Source Sans Pro",
                      fontSize: "17px",
                    }
                  : {
                      color: "#aaaaaa",
                      fontFamily: "Source Sans Pro",
                      fontSize: "17px",
                    }
              }
            >
              Description
            </Typography>
            <Typography
              style={
                activePage === "thumbnail"
                  ? {
                      color: "#A970FF",
                      fontFamily: "Source Sans Pro",
                      fontSize: "17px",
                    }
                  : {
                      color: "#aaaaaa",
                      fontFamily: "Source Sans Pro",
                      fontSize: "17px",
                    }
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
