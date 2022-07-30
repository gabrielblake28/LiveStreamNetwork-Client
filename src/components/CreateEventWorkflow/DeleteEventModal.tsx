import { Button, Typography } from "@mui/material";
import { EventAPI } from "../../API/Events/EventAPI";
import "./CreateEventWorkflow.css";

const eventAPI = new EventAPI();

type DeleteEventProps = {
  handleCloseDeleteEventModal: Function;
  eventId: string;
};

export default function DeleteEventModal({
  handleCloseDeleteEventModal,
  eventId,
}: DeleteEventProps) {
  return (
    <div className="delete-event-modal-container">
      <div className="delete-event-modal-header">
        <Typography
          sx={{
            fontFamily: "Source Sans Pro",
            fontSize: "23px",
            color: "#fff",
          }}
        >
          Delete Event
        </Typography>
      </div>

      <div className="delete-event-modal-content">
        <Typography
          sx={{
            fontFamily: "Source Sans Pro",
            fontSize: "15px",
            color: "#fff",
          }}
        >
          Are you sure you want to delete this event?
        </Typography>
      </div>
      <div className="delete-event-modal-buttons">
        <Button
          variant="contained"
          size="small"
          sx={{
            backgroundColor: "#8126E2",
            marginRight: "10px",
          }}
          onClick={() => {
            handleCloseDeleteEventModal();
          }}
        >
          Cancel
        </Button>
        <Button
          sx={{ backgroundColor: "rgb(173, 7, 7)" }}
          variant="contained"
          size="small"
          onClick={() => {
            handleCloseDeleteEventModal();
            eventAPI.DeleteEvent(eventId);
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
