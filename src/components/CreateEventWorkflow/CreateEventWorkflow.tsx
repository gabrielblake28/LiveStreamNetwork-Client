import { Breadcrumbs, Divider, IconButton, Typography } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import "./CreateEventWorkflow.css";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { NavButtonStatus } from "../NavButtonStatus/NavButtonStatus";
import { EventAPI } from "../../API/Events/EventAPI";
import { useRecoilValue } from "recoil";
import { CurrentUserData } from "../../Recoil/Users/UserAtoms";
import { FileAPI } from "../../API/File/FileAPI";
import CreateEventComponent from "./CreateEventComponent";
import { IEvent } from "../../API/Events/IEvent";

const fileAPI = new FileAPI();
const eventAPI = new EventAPI();

type CreateEventWorkflowProps = {
  setCreateIconFill: Function;
  handleCreateEventModalClose: Function;
  Event: IEvent | null;
};

export default function CreateEventWorkflow({
  setCreateIconFill,
  handleCreateEventModalClose,
  Event,
}: CreateEventWorkflowProps) {
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

  return (
    <div className="create-event-modal-wrapper">
      <div className="create-event-header-wrapper">
        <div className="create-event-header">
          <Typography
            sx={{
              fontFamily: "Source Sans Pro",
              fontSize: "22px",
              color: "#fff",
            }}
          >
            Create Event
          </Typography>
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
                width: "22px",
                height: "22px",
                color: "#fff",
              }}
            ></CloseRoundedIcon>
          </IconButton>
        </div>
      </div>
      <div>
        <CreateEventComponent
          Event={Event}
          handleCreateEventModalClose={handleCreateEventModalClose}
          setCreateIconFill={setCreateIconFill}
        />
      </div>
      <script src="https://unpkg.com/react-image-crop/dist/ReactCrop.min.js"></script>
    </div>
  );
}
