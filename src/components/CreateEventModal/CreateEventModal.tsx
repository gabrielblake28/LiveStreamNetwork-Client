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
                  border: "2px solid #A970FF",
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
            dateFormat="MMMM d, h:mm aa"
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
            dateFormat="MMMM d, h:mm aa"
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
          // value={name}
          // onChange={(e) => {
          //   setName(e.target.value);
          // }}
        />
      </div>
      <Typography
        style={{ marginLeft: "40px" }}
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
        >
          Create Event
        </Button>
      </div>
      <script src="https://unpkg.com/react-image-crop/dist/ReactCrop.min.js"></script>
    </div>
  );
}
