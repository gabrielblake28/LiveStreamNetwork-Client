import {
  Divider,
  IconButton,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";

import { styled } from "@mui/material";
import FormHelperTexts from "@mui/material/FormHelperText";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import "./CreateEventModal.css";
import { ClassNames } from "@emotion/react";

const WhiteBorderTextField = styled(TextField)`
  & label.Mui-focused {
    color: white;
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: white;
    }
  }
`;

export default function CreateEventModal() {
  return (
    <div className="create-event-modal-wrapper">
      <div className="create-event-header-wrapper">
        <div className="create-event-header">
          <Typography color="#E3E3E3" variant="h5">
            Create an Event
          </Typography>
        </div>
        <div className="create-event-close-button">
          <IconButton>
            <CloseRoundedIcon
              sx={{
                width: "20px",
                height: "20px",
                color: "#E3E3E3",
                minHeight: 0,
                minWidth: 0,
                padding: 0,
              }}
            ></CloseRoundedIcon>
          </IconButton>
        </div>
      </div>
      <Divider variant="fullWidth" style={{ backgroundColor: "#545454" }} />
      <div className="create-event-title">
        <FormHelperTexts>
          <Typography
            style={{ marginLeft: "5px" }}
            color="#ACACAC"
            variant="caption"
          >
            Event Title
          </Typography>
        </FormHelperTexts>
        <TextField
          size="small"
          focused
          inputProps={{
            style: { color: "#aaaaaa", backgroundColor: "#101012" },
          }}
          fullWidth
          id="demo-helper-text-aligned"
          hiddenLabel
        />
      </div>
      <div className="date-time-input-wrapper">
        <div className="event-date-input">
          <FormHelperTexts>
            <Typography
              style={{ marginLeft: "5px" }}
              color="#ACACAC"
              variant="caption"
            >
              Date
            </Typography>
          </FormHelperTexts>
          <TextField
            size="small"
            focused
            inputProps={{
              style: { color: "#aaaaaa", backgroundColor: "#101012" },
            }}
            fullWidth
            id="demo-helper-text-aligned"
            hiddenLabel
          />
        </div>
        <div className="event-start-time-input">
          <FormHelperTexts>
            <Typography
              style={{ marginLeft: "5px" }}
              color="#ACACAC"
              variant="caption"
            >
              Start time
            </Typography>
          </FormHelperTexts>
          <TextField
            size="small"
            focused
            inputProps={{
              style: { color: "#aaaaaa", backgroundColor: "#101012" },
            }}
            fullWidth
            id="demo-helper-text-aligned"
            hiddenLabel
          />
        </div>
        <div className="event-end-time-input">
          <FormHelperTexts>
            <Typography
              style={{ marginLeft: "5px" }}
              color="#ACACAC"
              variant="caption"
            >
              End Time
            </Typography>
          </FormHelperTexts>
          <TextField
            size="small"
            focused
            inputProps={{
              style: { color: "#aaaaaa", backgroundColor: "#101012" },
            }}
            fullWidth
            id="demo-helper-text-aligned"
            hiddenLabel
          />
        </div>
      </div>

      {/* 
        
        Create Event Description
        
        <div className="create-event-description">
          <TextareaAutosize
            aria-label="minimum height"
            minRows={3}
            // placeholder="Description"
            style={{
              width: 450,
              background: "transparent",
              color: "#c2c2c2",
              marginTop: "20px",
            }}
          />
          <FormHelperTexts>
            <Typography color="#aaaaaa" variant="caption">
              Description
            </Typography>
          </FormHelperTexts>
        </div> */}
    </div>
  );
}
