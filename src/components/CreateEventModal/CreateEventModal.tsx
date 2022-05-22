import {
  Button,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import FormHelperTexts from "@mui/material/FormHelperText";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import "./CreateEventModal.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import { NavButtonStatus } from "../NavButtonStatus/NavButtonStatus";
import {
  EventTitleState,
  EventDescriptionState,
  EventStartTimeState,
  EventEndTimeState,
} from "../../Recoil/Events/Atoms";
import { EventAPI } from "../../API/Events/EventAPI";
import { useRecoilState, useSetRecoilState } from "recoil";
import { createSecureServer } from "http2";

const eventAPI = new EventAPI();

type CreateEventModalProps = {
  setHomeIconFill: Function;
  setCreateIconFill: Function;
  handleModalClose: Function;
};

// const months = {
//   Jan: "01",
//   Feb: "02",
//   Mar: "03",
//   Apr: "04",
//   May: "05",
//   Jun: "06",
//   Jul: "07",
//   Aug: "08",
//   Sep: "09",
//   Oct: "10",
//   Nov: "11",
//   Dec: "12",
// };

// function FormatTimeStamp(timeStamp) {
//   let dayOfWeek = timeStamp.toString().substring(0, 3);
//   let month = timeStamp.toString().substring(4, 7);
//   let day = timeStamp.toString().substring(8, 10);
//   let year = timeStamp.toString().substring(11, 15);
//   let time = timeStamp.toString().substring(16, 24);

//   if (month in months) month = months[month];

//   let newTimeStamp = `${year}-${month}-${day} ${time}`;

//   return newTimeStamp;
// }

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
  const [eventTitle, setEventTitle] = useRecoilState(EventTitleState);
  const [startTime, setStartTime] = useRecoilState(EventStartTimeState);
  const [endTime, setEndTime] = useRecoilState(EventEndTimeState);
  const [eventDescription, setEventDescription] = useRecoilState(
    EventDescriptionState
  );
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    undefined
  );
  const Input = styled("input")({
    display: "none",
  });

  useEffect(() => {
    if (image !== null) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(image);
    } else {
      setImagePreview(undefined);
    }
  }, [image]);

  return (
    <div className="create-event-modal-wrapper">
      <div className="create-event-header-wrapper">
        <div className="create-event-header">
          <Typography
            style={{ fontFamily: "Source Sans Pro" }}
            color="#aaaaaa"
            variant="h5"
          >
            Create Event
          </Typography>
        </div>
        <div className="create-event-close-button">
          <IconButton>
            <CloseRoundedIcon
              onClick={() => {
                handleModalClose();
                setEventTitle("");
                setEventDescription("");
                setStartTime(new Date());
                setEndTime(new Date());
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
            style={{ marginLeft: "5px", fontFamily: "Source Sans Pro" }}
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
                  border: "2px solid #A970FF",
                },
              },
            },
          }}
          hiddenLabel={true}
          size="medium"
          variant="outlined"
          fullWidth
          value={eventTitle}
          onChange={(e) => {
            setEventTitle(e.target.value);
          }}
        />
      </div>
      <div className="date-time-input-wrapper">
        <div className="event-start-time-input">
          <FormHelperTexts>
            <Typography
              style={{ marginLeft: "10px", fontFamily: "Source Sans Pro" }}
              color="#ACACAC"
              variant="caption"
            >
              Start Time
            </Typography>
          </FormHelperTexts>
          <DatePicker
            selected={startTime}
            onChange={(startTime) => setStartTime(startTime)}
            showTimeSelect
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="MMMM d, h:mm aa"
            className="select-event-start-time"
          />
        </div>
        <div className="event-end-time-input">
          <FormHelperTexts>
            <Typography
              style={{ marginLeft: "10px", fontFamily: "Source Sans Pro" }}
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
            dateFormat="MMMM d, h:mm aa"
            className="select-event-end-time"
          />
        </div>
      </div>

      <div className="create-event-description">
        <FormHelperTexts>
          <Typography
            style={{ marginLeft: "5px", fontFamily: "Source Sans Pro" }}
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
                  border: "2px solid #A970FF",
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
          value={eventDescription}
          onChange={(e) => {
            setEventDescription(e.target.value);
          }}
        />
      </div>
      <Typography
        style={{ marginLeft: "38px", fontFamily: "Source Sans Pro" }}
        color="#aaaaaa"
        variant="caption"
      >
        Thumbnail
      </Typography>
      <div className="create-event-image-preview-container">
        <input
          id="file-explore-icon-button"
          accept="image/jpeg, image/png"
          type="file"
          onChange={(e) => {
            const files = e?.target?.files;

            if (files) {
              setImage(files[0]);
            } else {
              setImage(null);
            }
          }}
        />

        {imagePreview === undefined ? (
          <label htmlFor="file-explore-icon-button">
            <div className="create-event-image-preview">
              <CloudUploadOutlinedIcon
                sx={{ height: "150px", width: "150px" }}
              />
            </div>
          </label>
        ) : (
          <img
            style={{
              height: "185px",
              width: "322px",
              objectFit: "cover",
              borderRadius: "4px",
            }}
            src={imagePreview}
            onClick={() => {
              setImage(null);
            }}
          />
        )}
      </div>
      <div className="confirm-create-event-button">
        <Button
          style={{
            color: "#101012",
            height: "35px",
            width: "150px",
            backgroundColor: "#A970FF",
          }}
          variant="contained"
          onClick={() => {
            eventAPI.CreateEvent({
              title: eventTitle,
              start_timestamp: startTime,
              end_timestamp: endTime,
              description: eventDescription,
              user_id: "1",
            });
            handleModalClose();
            setEventTitle("");
            setEventDescription("");
            setStartTime(new Date());
            setEndTime(new Date());
          }}
        >
          <Typography
            style={{ fontFamily: "Source Sans Pro" }}
            variant="button"
          >
            Create Event
          </Typography>
        </Button>
      </div>
      <script src="https://unpkg.com/react-image-crop/dist/ReactCrop.min.js"></script>
    </div>
  );
}
