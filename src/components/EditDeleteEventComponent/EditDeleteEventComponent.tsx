import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton, Modal } from "@mui/material";
import { useState } from "react";
import { IEvent } from "../../API/Events/IEvent";
import CreateEventWorkflow from "../CreateEventWorkflow/CreateEventWorkflow";
import "./EditDeleteEventComponent.css";

type EditDeleteEventComponentProps = {
  Event: IEvent;
};

export default function EditDeleteEventComponent({
  Event,
}: EditDeleteEventComponentProps) {
  const handleCreateEventModalOpen = () => setCreateEventModalOpen(true);
  const handleCreateEventModalClose = () => setCreateEventModalOpen(false);
  const [creatEventModalOpen, setCreateEventModalOpen] = useState(false);
  const [createIconFill, setCreateIconFill] = useState(false);
  return (
    <>
      <IconButton size="small" onClick={handleCreateEventModalOpen}>
        <MoreVertIcon
          sx={{
            width: "30px",
            height: "30px",
            color: "#aaaaaa",
          }}
        />
      </IconButton>
      <Modal open={creatEventModalOpen}>
        <CreateEventWorkflow
          Event={Event}
          setCreateIconFill={setCreateIconFill}
          handleCreateEventModalClose={handleCreateEventModalClose}
        />
      </Modal>
    </>
  );
}
