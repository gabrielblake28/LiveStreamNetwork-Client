import {
  Breadcrumbs,
  Button,
  Divider,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import FormHelperTexts from "@mui/material/FormHelperText";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import "./CreateEventWorkflow.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import { NavButtonStatus } from "../NavButtonStatus/NavButtonStatus";
import {
  EventTitleState,
  EventDescriptionState,
  EventStartTimeState,
  EventEndTimeState,
  EventCategoryState,
} from "../../Recoil/Events/EventAtoms";
import { EventAPI } from "../../API/Events/EventAPI";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { createSecureServer } from "http2";
import { CurrentUserData } from "../../Recoil/Users/UserAtoms";
import CreateEventDetailsComponent from "./CreateEventDetailsComponent";
import CreateEventDescriptionComponent from "./CreateEventDescriptionComponent";
import CreateEventThumbnailComponent from "./CreateEventThumbnailComponent";

const eventAPI = new EventAPI();

type CreateEventWorkflowProps = {
  setHomeIconFill: Function;
  setCreateIconFill: Function;
  handleModalClose: Function;
};

export default function CreateEventWorkflow({
  setHomeIconFill,
  setCreateIconFill,
  handleModalClose,
}: CreateEventWorkflowProps) {
  const [activePage, setActivePage] = useState("details");
  const [eventCategory, setEventCategory] = useRecoilState(EventCategoryState);
  const [eventTitle, setEventTitle] = useRecoilState(EventTitleState);
  const [startTime, setStartTime] = useRecoilState(EventStartTimeState);
  const [endTime, setEndTime] = useRecoilState(EventEndTimeState);
  const [eventDescription, setEventDescription] = useRecoilState(
    EventDescriptionState
  );
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    undefined
  );
  const [imageURL, setImageURL] = useState<string>("");
  const userInfo = useRecoilValue(CurrentUserData);

  const CompleteWorkflow = () => {
    eventAPI.CreateEvent({
      user_id: userInfo.user_id as string,
      title: eventTitle,
      description: eventDescription,
      start_timestamp: startTime,
      end_timestamp: endTime,
      image: image as File,
      category_id: eventCategory,
    });
    handleModalClose();
    setEventCategory("");
    setEventTitle("");
    setEventDescription("");
    setStartTime(new Date());
    setEndTime(new Date());
    setCreateIconFill(NavButtonStatus.DISABLED);
  };

  const ActiveComponent = (value) => {
    if (value === "details") {
      return (
        <CreateEventDetailsComponent
          eventCategory={eventCategory}
          setEventCategory={setEventCategory}
          eventTitle={eventTitle}
          setEventTitle={setEventTitle}
          startTime={startTime}
          setStartTime={setStartTime}
          endTime={endTime}
          setEndTime={setEndTime}
          setActivePage={setActivePage}
          onNext={() => {
            setActivePage("description");
          }}
          onCancel={() => {
            setCreateIconFill(NavButtonStatus.DISABLED);
            handleModalClose();
            setEventTitle("");
            setEventCategory("");
          }}
        />
      );
    } else if (value === "description") {
      return (
        <CreateEventDescriptionComponent
          eventDescription={eventDescription}
          setEventDescription={setEventDescription}
          setActivePage={setActivePage}
          onNext={() => {
            setActivePage("thumbnail");
          }}
          onBack={() => {
            setActivePage("details");
          }}
        />
      );
    } else if (value === "thumbnail") {
      return (
        <CreateEventThumbnailComponent
          image={image}
          setImage={setImage}
          setImageURL={setImageURL}
          imagePreview={imagePreview}
          setImagePreview={setImagePreview}
          onCreate={() => {
            CompleteWorkflow();
          }}
          onBack={() => {
            setActivePage("description");
          }}
        />
      );
    }
  };

  return (
    <div className="create-event-modal-wrapper">
      <div className="create-event-header-wrapper">
        <div className="create-event-header">
          <Breadcrumbs style={{ color: "#aaaaaa" }} aria-label="breadcrumb">
            <Typography
              style={
                activePage === "details"
                  ? { color: "#fff" }
                  : { color: "#aaaaaa" }
              }
            >
              Details
            </Typography>
            <Typography
              style={
                activePage === "description"
                  ? { color: "#fff" }
                  : { color: "#aaaaaa" }
              }
            >
              Description
            </Typography>
            <Typography
              style={
                activePage === "thumbnail"
                  ? { color: "#fff" }
                  : { color: "#aaaaaa" }
              }
            >
              Thumbnail
            </Typography>
          </Breadcrumbs>
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
                setCreateIconFill(NavButtonStatus.DISABLED);
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
      <div className="create-event-active-component">
        {ActiveComponent(activePage)}
      </div>
      {/* <div className="create-event-categories">
        <FormHelperTexts>
          <Typography
            style={{ marginLeft: "5px", fontFamily: "Source Sans Pro" }}
            color="#ACACAC"
            variant="caption"
          >
            Categories
          </Typography>
        </FormHelperTexts>
        <WhiteBorderSelect
          autoFocus={false}
          autoComplete="off"
          sx={{
            marginTop: "5px",
            marginRight: 15,
            backgroundColor: "#101012",
            border: "2px solid #101012",
            color: "#aaaaaa",
            "&:hover": {
              border: "2px solid #A970FF",
            },
            "& .MuiSvgIcon-root": {
              color: "#aaaaaa",
            },
            "&:focus": {
              border: "2px solid #101012",
            },
          }}
          size="small"
          variant="outlined"
          fullWidth
          value={eventTitle}
          onChange={(e) => {
            setEventTitle(e.target.value as string);
          }}
        >
          <MenuItem disabled value="">
            Categories
          </MenuItem>
          <MenuItem value="1">Test 1</MenuItem>
          <MenuItem value="2">Test 2</MenuItem>
          <MenuItem value="2">Test 2</MenuItem>
          <MenuItem value="2">Test 2</MenuItem>
          <MenuItem value="2">Test 2</MenuItem>
          <MenuItem value="2">Test 2</MenuItem>
          <MenuItem value="2">Test 2</MenuItem>
          <MenuItem value="2">Test 2</MenuItem>
          <MenuItem value="2">Test 2</MenuItem>
        </WhiteBorderSelect>
      </div>
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
      <div className="create-event-button-wrapper">
        <div className="create-event-left-button">
          {" "}
          <Button
            style={{
              color: "#101012",
              height: "35px",
              width: "150px",
              backgroundColor: "#27272c",
            }}
            variant="contained"
            onClick={() => {}}
          >
            <Typography
              style={{ fontFamily: "Source Sans Pro", color: "#aaaaaa" }}
              variant="button"
            >
              Cancel
            </Typography>
          </Button>
        </div>
        <div className="create-event-right-button">
          <Button
            style={{
              color: "#101012",
              height: "35px",
              width: "150px",
              backgroundColor: "#A970FF",
            }}
            variant="contained"
            onClick={() => {}}
          >
            <Typography
              style={{ fontFamily: "Source Sans Pro" }}
              variant="button"
            >
              Next
            </Typography>
          </Button>
        </div>
      </div> */}

      {/* <div className="create-event-description">
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
      </div> */}
      {/* <Typography
        style={{ marginLeft: "38px", fontFamily: "Source Sans Pro" }}
        color="#aaaaaa"
        variant="caption"
      >
        Thumbnail
      </Typography>
      <div className="create-event-image-preview-container">
        <form action="/profile" method="post" encType="multipart/form-data">
          <input
            id="file-explore-icon-button"
            accept="image/jpeg, image/png"
            type="file"
            onChange={(e) => {
              const files = e?.target?.files;

              if (files) {
                console.log(files[0]);
                setImage(files[0]);
              } else {
                setImage(null);
              }
            }}
          />
        </form>

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
              user_id: userInfo.user_id as string,
              title: eventTitle,
              description: eventDescription,
              start_timestamp: startTime,
              end_timestamp: endTime,
              image: image as File,
              // category_id: category_id;
            });
            console.log(image);
            handleModalClose();
            setEventTitle("");
            setEventDescription("");
            setStartTime(new Date());
            setEndTime(new Date());
            setCreateIconFill(NavButtonStatus.DISABLED);
          }}
        >
          <Typography
            style={{ fontFamily: "Source Sans Pro" }}
            variant="button"
          >
            Create Event
          </Typography>
        </Button>
      </div> */}
      <script src="https://unpkg.com/react-image-crop/dist/ReactCrop.min.js"></script>
    </div>
  );
}
