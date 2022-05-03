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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { forwardRef, useState } from "react";

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

export default function CreateEventModal(props) {
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const handleChange = (e) => {
    setIsOpen(!isOpen);
    setStartDate(e);
  };
  const handleClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

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
                props.onClose();
              }}
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
        <div className="event-date-input">
          <FormHelperTexts>
            <Typography
              style={{ marginLeft: "10px" }}
              color="#ACACAC"
              variant="caption"
            >
              Date
            </Typography>
          </FormHelperTexts>
          <DatePicker
            placeholderText="Click to select a date"
            todayButton="Today"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="select-event-date"
          />
        </div>
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
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
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
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
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
          maxRows={3}
          minRows={3}
          // value={name}
          // onChange={(e) => {
          //   setName(e.target.value);
          // }}
        />
        {/* <TextareaAutosize
          aria-label="minimum height"
          minRows={4}
          maxRows={4}
          
          style={{
            marginTop: "5px",
            width: "360px",
            background: "#101012",
            color: "#aaaaaa",
            border: "1px solid #101012",
          }}
        /> */}
      </div>
    </div>
  );
}
