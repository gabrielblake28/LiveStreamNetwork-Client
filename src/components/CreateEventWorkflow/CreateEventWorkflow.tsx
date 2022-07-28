import { createTheme, IconButton, Typography } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import "./CreateEventWorkflow.css";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { NavButtonStatus } from "../NavButtonStatus/NavButtonStatus";
import { useRecoilValue } from "recoil";
import { CurrentUserData } from "../../Recoil/Users/UserAtoms";
import CreateEventComponent from "./CreateEventComponent";
import { IEvent } from "../../API/Events/IEvent";

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
  return (
    <div className="create-event-modal-wrapper">
      <div className="create-event-header-wrapper">
        <div className="create-event-header">
          <Typography
            sx={{
              // fontFamily: "Source Sans Pro",
              fontSize: "20px",
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
              setCreateIconFill(NavButtonStatus.DISABLED);
            }}
          >
            <CloseRoundedIcon
              sx={{
                width: "22px",
                height: "22px",
                color: "#7a7a7a",
              }}
            ></CloseRoundedIcon>
          </IconButton>
        </div>
      </div>
      <div>
        {Event ? (
          <CreateEventComponent
            Event={Event}
            handleCreateEventModalClose={handleCreateEventModalClose}
            setCreateIconFill={setCreateIconFill}
          />
        ) : (
          <CreateEventComponent
            handleCreateEventModalClose={handleCreateEventModalClose}
            setCreateIconFill={setCreateIconFill}
          />
        )}
      </div>
      <script src="https://unpkg.com/react-image-crop/dist/ReactCrop.min.js"></script>
    </div>
  );
}
