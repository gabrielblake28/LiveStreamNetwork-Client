import {
  Button,
  Divider,
  IconButton,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";

import { styled } from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import FormHelperTexts from "@mui/material/FormHelperText";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import "./CreateEventModal.css";
import { ClassNames } from "@emotion/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { forwardRef, useEffect, useState } from "react";
import { NavButtonStatus } from "../NavButtonStatus/NavButtonStatus";
import { Label } from "@mui/icons-material";

type CreateEventModalProps = {
  setHomeIconFill: Function;
  setCreateIconFill: Function;
  handleModalClose: Function;
};

const WhiteBorderTextField = styled(TextField)`
  & label.Mui-focused {
    color: #101012;
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: #101012;
    }
  }
`;

export default function CreateEventModal({
  setHomeIconFill,
  setCreateIconFill,
  handleModalClose,
}: CreateEventModalProps) {
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [isImage, setIsImage] = useState(false);
  const Input = styled("input")({
    display: "none",
  });

  return (
    <div className="create-event-modal-wrapper">
      <div className="create-event-header-wrapper">
        <div className="create-event-header">
          <Typography color="#aaaaaa" variant="h5">
            Create an Event
          </Typography>
        </div>
        <div className="create-event-close-button">
          <IconButton>
            <CloseRoundedIcon
              onClick={() => {
                handleModalClose();
                setCreateIconFill(NavButtonStatus.INACTIVE);
              }}
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
      <div className="create-event-title">
        <FormHelperTexts>
          <Typography
            style={{ marginLeft: "5px" }}
            color="#ACACAC"
            variant="caption"
          >
            Title
          </Typography>
        </FormHelperTexts>
        <WhiteBorderTextField
          autoFocus
          autoComplete="off"
          InputLabelProps={{
            style: { color: "#aaaaaa" },
          }}
          sx={{
            marginTop: "5px",
            ".css-x2l1vy-MuiInputBase-root-MuiOutlinedInput-root": {
              color: "white",
            },
          }}
          InputProps={{
            sx: {
              height: "40px",
              backgroundColor: "#101012",
              color: "#aaaaaa",
              ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                border: "2px solid #101012",
              },
              "&:hover": {
                ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                  border: "2px solid #101012",
                },
              },
            },
          }}
          hiddenLabel={true}
          size="medium"
          variant="outlined"
          fullWidth
          // value={name}
          // onChange={(e) => {
          //   setName(e.target.value);
          // }}
        />
      </div>
      <div className="date-time-input-wrapper">
        <div className="event-start-time-input">
          <FormHelperTexts>
            <Typography
              style={{ marginLeft: "10px" }}
              color="#ACACAC"
              variant="caption"
            >
              Start time
            </Typography>
          </FormHelperTexts>
          <DatePicker
            selected={startTime}
            onChange={(startTime) => setStartTime(startTime)}
            showTimeSelect
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="MMMM d, yyyy h:mm aa"
            className="select-event-start-time"
          />
        </div>
        <div className="event-end-time-input">
          <FormHelperTexts>
            <Typography
              style={{ marginLeft: "10px" }}
              color="#ACACAC"
              variant="caption"
            >
              End Time
            </Typography>
          </FormHelperTexts>
          <DatePicker
            selected={endTime}
            onChange={(date) => setEndTime(date)}
            showTimeSelect
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="MMMM d, yyyy h:mm aa"
            className="select-event-end-time"
          />
        </div>
      </div>

      <div className="create-event-description">
        <FormHelperTexts>
          <Typography
            style={{ marginLeft: "5px" }}
            color="#aaaaaa"
            variant="caption"
          >
            Description
          </Typography>
        </FormHelperTexts>
        <WhiteBorderTextField
          inputProps={{
            maxLength: 160,
          }}
          autoFocus
          autoComplete="off"
          InputLabelProps={{
            style: { color: "#aaaaaa" },
          }}
          sx={{
            marginTop: "5px",
            ".css-x2l1vy-MuiInputBase-root-MuiOutlinedInput-root": {
              color: "white",
            },
          }}
          InputProps={{
            sx: {
              backgroundColor: "#101012",
              color: "#aaaaaa",
              ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                border: "2px solid #101012",
              },
              "&:hover": {
                ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                  border: "2px solid #101012",
                },
              },
            },
          }}
          hiddenLabel={true}
          size="medium"
          variant="outlined"
          fullWidth
          multiline
          maxRows={2}
          minRows={2}
          // value={name}
          // onChange={(e) => {
          //   setName(e.target.value);
          // }}
        />
      </div>
      <div className="create-event-image-preview-container">
        <input
          id="file-explore-icon-button"
          accept="image/jpeg, image/png"
          type="file"
        />
        <label htmlFor="file-explore-icon-button">
          <IconButton disableRipple component="span">
            <CloudUploadOutlinedIcon sx={{ height: "150px", width: "150px" }} />
          </IconButton>
        </label>

        <label htmlFor="contained-button-file">
          <Input
            accept="image/*"
            id="contained-button-file"
            multiple
            type="file"
          />
          <Button
            style={{ color: "#aaaaaa", backgroundColor: "transparent" }}
            variant="contained"
            component="span"
          >
            Upload an Image
          </Button>
        </label>
      </div>
    </div>
  );
}
