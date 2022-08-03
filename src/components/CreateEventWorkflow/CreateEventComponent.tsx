import {
  Button,
  Dialog,
  FormHelperText,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import DatePicker from "react-datepicker";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import "./CreateEventWorkflow.css";
import { useEffect, useState } from "react";
import { EventAPI } from "../../API/Events/EventAPI";
import { IEvent } from "../../API/Events/IEvent";
import { useRecoilValue } from "recoil";
import { CurrentUserData } from "../../Recoil/Users/UserAtoms";
import DeleteEventModal from "./DeleteEventModal";

const eventAPI = new EventAPI();

type CreateEventComponentProps = {
  Event?: IEvent;
  handleCreateEventModalClose: Function;
  setCreateIconFill: Function;
};

const CustomTitleField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "#34dfeb",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#34dfeb",
    },
    color: "#fff",
  },
});

const CustomDescriptionField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#3A3D45",
    },
    "&:hover fieldset": {
      borderColor: "#34dfeb",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#34dfeb",
    },
    color: "#fff",
  },
});

export default function CreateEventComponent({
  Event,
  handleCreateEventModalClose,
  setCreateIconFill,
}: CreateEventComponentProps) {
  const [eventCategory, setEventCategory] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date>(new Date());
  const [eventDescription, setEventDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    undefined
  );
  const [imageURL, setImageURL] = useState<string>("");
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [thumbnailError, setThumbnailError] = useState(false);
  const [timeError, setTimeError] = useState(false);
  const [noTimeError, setNoTimeError] = useState(false);
  const [showImagePreview, setShowImagePreview] = useState<string>("none");
  const userInfo = useRecoilValue(CurrentUserData);
  const [openDeleteEventModal, setOpenDeleteEventModal] = useState(false);
  const handleOpenDeleteEventModal = () => setOpenDeleteEventModal(true);
  const handleCloseDeleteEventModal = () => setOpenDeleteEventModal(false);

  useEffect(() => {
    if (Event) {
      setEventTitle(Event.title);
      setStartTime(new Date(Event.start_timestamp));
      setEndTime(new Date(Event.end_timestamp));
      setEventDescription(Event.description);
      setImagePreview(Event.image);
    }
  }, [Event]);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImageURL(reader.result as string);
      };

      reader.readAsBinaryString(image);
    } else {
      setImageURL("");
    }

    if (image) {
      const reader = new FileReader();

      reader.onloadend = () => {
        console.log(reader.result);
        setImagePreview(reader.result as string);
      };

      reader.readAsDataURL(image);
    } else {
      setImagePreview(undefined);
    }
  }, [image]);

  const onCreate = () => {
    if (image !== null && startTime !== undefined && endTime !== undefined) {
      eventAPI.CreateEvent({
        event: {
          featured: false,
          display_name: "asdf",
          user_id: userInfo.user_id as string,
          title: eventTitle,
          description: eventDescription,
          start_timestamp: startTime,
          end_timestamp: endTime,
          category_id: "1",
        },
        image: image,
      });
      handleCreateEventModalClose();
      setEventCategory("");
      setEventTitle("");
      setEventDescription("");
      setStartTime(new Date());
      setEndTime(new Date());
      setCreateIconFill(false);
    }
  };

  function dateComparison(a, b) {
    const date1: any = new Date(a);
    const date2: any = new Date(b);

    return date1 - date2;
  }

  return (
    <div className="create-event-form-container">
      <div
        style={{
          margin: "10px",
        }}
      >
        <div className="create-event-form-title">
          <div className="helper-text-container">
            <FormHelperText
              id="create-event-form-helper-text"
              style={{
                fontSize: "12px",
                color: "#fff",
                margin: "0 0 0 5px",
              }}
            >
              Title
            </FormHelperText>
            <FormHelperText
              id="create-event-form-helper-text"
              style={{
                fontSize: "10px",
                color: "#aaaaaa",
                margin: "0 0 0 15px",
              }}
            >
              Required * (100 Character Limit)
            </FormHelperText>
            {titleError ? (
              <FormHelperText
                id="create-event-form-helper-text"
                style={{
                  fontSize: "10px",
                  color: "#eb4034",
                  margin: "0 0 0 15px",
                }}
              >
                Invalid Input
              </FormHelperText>
            ) : (
              <div></div>
            )}
          </div>
          <CustomTitleField
            sx={{
              backgroundColor: "#3A3D45",
              color: "#fff",
              width: "536px",
              height: "56px",
              borderRadius: "4px",
            }}
            inputProps={{
              maxLength: 100,
              minLength: 1,
              type: "text",
            }}
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
          />
        </div>
        <div className="create-event-form-description">
          <div className="helper-text-container">
            <FormHelperText
              id="create-event-form-helper-text"
              style={{
                fontSize: "12px",
                color: "#fff",
                margin: "0 0 0 5px",
              }}
            >
              Description
            </FormHelperText>
            <FormHelperText
              id="create-event-form-helper-text"
              style={{
                fontSize: "10px",
                color: "#aaaaaa",
                margin: "0 0 0 15px",
              }}
            >
              (500 Character Limit)
            </FormHelperText>
            {descriptionError ? (
              <FormHelperText
                id="create-event-form-helper-text"
                style={{
                  fontSize: "10px",
                  color: "#eb4034",
                  margin: "0 0 0 15px",
                }}
              >
                Invalid Input
              </FormHelperText>
            ) : (
              <div></div>
            )}
          </div>
          <CustomDescriptionField
            value={eventDescription}
            onChange={(e) => {
              setEventDescription(e.target.value);
            }}
            multiline
            maxRows={7}
            minRows={7}
            sx={{
              backgroundColor: "#3A3D45",
              color: "#fff",
              width: "536px",
              borderRadius: "4px",
            }}
            inputProps={{
              maxLength: 500,
              type: "text",
            }}
          />
        </div>
        <div className="image-time-date-wrapper">
          <div className="create-event-form-image">
            <div className="helper-text-container">
              <FormHelperText
                id="create-event-form-helper-text"
                style={{
                  fontSize: "12px",
                  color: "#fff",
                  margin: "0 0 0 5px",
                }}
              >
                Thumbnail
              </FormHelperText>
              <FormHelperText
                id="create-event-form-helper-text"
                style={{
                  fontSize: "10px",
                  color: "#aaaaaa",
                  margin: "0 0 0 15px",
                }}
              >
                Required *
              </FormHelperText>
              {thumbnailError ? (
                <FormHelperText
                  id="create-event-form-helper-text"
                  style={{
                    fontSize: "10px",
                    color: "#eb4034",
                    margin: "0 0 0 15px",
                  }}
                >
                  Invalid File
                </FormHelperText>
              ) : (
                <div></div>
              )}
            </div>
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
            {!imagePreview ? (
              <label htmlFor="file-explore-icon-button">
                <div
                  className="create-event-form-image-preview"
                  onClick={() => {
                    setImage(null);
                  }}
                >
                  <CloudUploadOutlinedIcon
                    sx={{
                      height: "150px",
                      width: "150px",
                      color: "#34dfeb",
                    }}
                  />
                </div>
              </label>
            ) : (
              <img
                style={{
                  marginTop: "5px",
                  height: "185px",
                  width: "322px",
                  objectFit: "cover",
                  borderRadius: "4px",
                }}
                src={Event ? Event.image : imagePreview}
                onClick={() => {
                  setImage(null);
                  setImagePreview(undefined);
                }}
              />
            )}
          </div>
          <div className="date-time-input-wrapper">
            <div className="event-start-time-input">
              <div className="helper-text-container">
                <FormHelperText>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      color: "#fff",
                      margin: "0 0 3px 5px",
                      paddingLeft: "50px",
                    }}
                  >
                    Start Time
                  </Typography>
                </FormHelperText>
                <FormHelperText
                  id="create-event-form-helper-text"
                  style={{
                    fontSize: "10px",
                    color: "#aaaaaa",
                    margin: "0 0 0 15px",
                  }}
                >
                  Required *
                </FormHelperText>
              </div>
              <DatePicker
                popperPlacement="right"
                isClearable
                minDate={new Date()}
                showPopperArrow={false}
                selected={startTime || new Date()}
                onChange={(startTime) => setStartTime(startTime)}
                showTimeSelect
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="MMM d, h:mm a"
                className="select-event-start-time"
                dayClassName={(date) =>
                  31 == 31 ? "calendar-day-color" : undefined
                }
              />
            </div>
            <div className="event-end-time-input">
              <div className="helper-text-container">
                <FormHelperText>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      color: "#fff",
                      margin: "0 0 3px 5px",
                      paddingLeft: "50px",
                    }}
                  >
                    End Time
                  </Typography>
                </FormHelperText>
                <FormHelperText
                  id="create-event-form-helper-text"
                  style={{
                    fontSize: "10px",
                    color: "#aaaaaa",
                    margin: "0 0 0 15px",
                  }}
                >
                  Required *
                </FormHelperText>
              </div>
              <DatePicker
                popperPlacement="right"
                isClearable
                minDate={new Date()}
                // minTime={
                //   new Date(
                //     new Date().setHours(
                //       new Date().getHours(),
                //       new Date().getMinutes()
                //     )
                //   )
                // }
                // maxTime={new Date(new Date().setHours(23, 59))}
                showPopperArrow={false}
                selected={endTime || new Date()}
                onChange={(date) => setEndTime(date)}
                showTimeSelect
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="MMM d, h:mm a"
                className="select-event-end-time"
                dayClassName={(date) =>
                  31 == 31 ? "calendar-day-color" : undefined
                }
              />
            </div>
          </div>
        </div>
      </div>
      {Event?.user_id == userInfo.user_id ? (
        <div className="create-event-button-wrapper">
          <div className="create-event-left-button">
            <Button
              style={{
                marginTop: "45px",
                height: "35px",
                width: "80px",
                backgroundColor: "rgb(173, 7, 7)",
              }}
              variant="contained"
              onClick={handleOpenDeleteEventModal}
            >
              <Typography
                style={{
                  fontFamily: "Source Sans Pro",
                  color: "#fff",
                  fontSize: "15px",
                }}
              >
                Delete
              </Typography>
            </Button>
          </div>
          <div className="create-event-right-button">
            <Button
              style={{
                marginTop: "45px",
                height: "35px",
                width: "80px",
                backgroundColor: "#34dfeb",
              }}
              variant="contained"
              onClick={() => {
                eventAPI.UpdateEvent(Event?.event_id as string, {
                  event: {
                    title: eventTitle,
                    description: eventDescription,
                    featured: false,
                    category_id: "",
                    user_id: Event?.user_id as string,
                    start_timestamp: startTime!,
                    end_timestamp: endTime!,
                  },
                  image: image as File,
                });
              }}
            >
              <Typography
                style={{
                  fontFamily: "Source Sans Pro",
                  color: "black",
                  fontSize: "15px",
                }}
              >
                Confirm
              </Typography>
            </Button>
          </div>
        </div>
      ) : (
        <div className="create-event-button-wrapper">
          <div className="create-event-right-button">
            {noTimeError ? (
              <div className="time-error-container">
                <FormHelperText
                  id="create-event-form-helper-text"
                  style={{
                    fontSize: "10px",
                    color: "#eb4034",
                    margin: "0 0 0 15px",
                  }}
                >
                  A Valid Time Must Be Selected
                </FormHelperText>
              </div>
            ) : (
              <div></div>
            )}
            {timeError ? (
              <div className="time-error-container">
                <FormHelperText
                  id="create-event-form-helper-text"
                  style={{
                    fontSize: "10px",
                    color: "#eb4034",
                    margin: "0 0 0 15px",
                  }}
                >
                  Start Time Must Come Before End Time
                </FormHelperText>
              </div>
            ) : (
              <div></div>
            )}

            <Button
              style={{
                marginTop: "45px",
                height: "35px",
                width: "80px",
                backgroundColor: "#34dfeb",
              }}
              variant="contained"
              onClick={() => {
                if (eventTitle == "" || eventTitle.length < 1) {
                  setTitleError(true);
                } else {
                  setTitleError(false);
                }
                if (eventDescription == "" || eventDescription.length < 1) {
                  setDescriptionError(true);
                } else {
                  setDescriptionError(false);
                }
                const timeArray = [startTime, endTime];
                timeArray.sort(dateComparison);
                if (timeArray[0] != startTime) {
                  setTimeError(true);
                } else {
                  setTimeError(false);
                }

                if (!startTime || !endTime) {
                  setNoTimeError(true);
                } else {
                  setNoTimeError(false);
                }

                if (!image) {
                  setThumbnailError(true);
                } else {
                  setThumbnailError(false);
                }
                // onCreate();
              }}
            >
              <Typography
                style={{
                  fontFamily: "Source Sans Pro",
                  color: "black",
                  fontSize: "15px",
                }}
              >
                Create
              </Typography>
            </Button>
          </div>
        </div>
      )}
      <Dialog open={openDeleteEventModal}>
        <DeleteEventModal
          handleCloseDeleteEventModal={handleCloseDeleteEventModal}
          eventId={Event?.event_id as string}
        />
      </Dialog>
    </div>
  );
}
