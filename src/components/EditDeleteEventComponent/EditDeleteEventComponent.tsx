import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton } from "@mui/material";
import "./EditDeleteEventComponent.css";


export default function EditDeleteEventComponent() {
  return (
    <>
      <IconButton size="small" >
        <MoreVertIcon
          sx={{
            width: "30px",
            height: "30px",
            color: "#aaaaaa",
          }}
        />
      </IconButton>
    </>
  );
}
