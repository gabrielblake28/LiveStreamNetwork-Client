import {
  Button,
  Dialog,
  Modal,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import FormHelperTexts from "@mui/material/FormHelperText";
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
const WhiteBorderTextField = styled(TextField)`
  & label.Mui-focused {
    color: #101012;
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: #101012;
    }
  }j
`;

type CreateEventComponentProps = {
  Event?: IEvent;
  handleCreateEventModalClose: Function;
  setCreateIconFill: Function;
};

export default function CreateEventComponent({
  Event,
  handleCreateEventModalClose,
  setCreateIconFill,
}: CreateEventComponentProps) {
  const [eventCategory, setEventCategory] = useState<string>("");
  const [eventTitle, setEventTitle] = useState<string>("");
  const [startTime, setStartTime] = useState<Date | undefined>(undefined);
  const [endTime, setEndTime] = useState<Date | undefined>(undefined);
  const [eventDescription, setEventDescription] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    undefined
  );
  const [imageURL, setImageURL] = useState<string>("");
  const userInfo = useRecoilValue(CurrentUserData);
  const [showImagePreview, setShowImagePreview] = useState<string>("none");
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
    if (image !== null) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImageURL(reader.result as string);
      };

      reader.readAsBinaryString(image);
    } else {
      setImageURL("");
    }

    if (image !== null) {
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

  return (
    <div className="create-event-component-container">
      <div className="create-event-component-content">
        <div className="create-event-title">
          <FormHelperTexts>
            <Typography
              style={{
                fontFamily: "Source Sans Pro",
                fontSize: "12px",
                color: "#fff",
                marginBottom: "4px",
              }}
            >
              Title
            </Typography>
          </FormHelperTexts>
          <WhiteBorderTextField
            placeholder="100 Character Limit"
            inputProps={{
              maxLength: 100,
            }}
            autoFocus
            autoComplete="off"
            InputLabelProps={{
              style: { color: "#aaaaaa" },
            }}
            InputProps={{
              sx: {
                height: "40px",
                backgroundColor: "#1f2124",
                color: "#fff",
                ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                  border: "1px solid #aaaaaa",
                },
                "&:hover": {
                  ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                    border: "1px solid #d4d4d4",
                  },
                },
              },
            }}
            hiddenLabel={true}
            size="medium"
            variant="outlined"
            fullWidth
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
          />
        </div>
        <div className="create-event-description">
          <FormHelperTexts>
            <Typography
              style={{
                fontFamily: "Source Sans Pro",
                fontSize: "12px",
                color: "#fff",
                marginBottom: "4px",
              }}
            >
              Describe your Event
            </Typography>
          </FormHelperTexts>
          <WhiteBorderTextField
            placeholder="500 character limit"
            inputProps={{
              maxLength: 500,
            }}
            autoComplete="off"
            InputLabelProps={{
              style: { color: "#aaaaaa" },
            }}
            sx={{
              margin: "5px 0 0 0",
              ".css-x2l1vy-MuiInputBase-root-MuiOutlinedInput-root": {
                color: "white",
              },
            }}
            InputProps={{
              sx: {
                backgroundColor: "#1f2124",
                color: "#fff",
                ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                  border: "1px solid #aaaaaa",
                },
                "&:hover": {
                  ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                    border: "1px solid #d4d4d4",
                  },
                },
              },
            }}
            hiddenLabel={true}
            size="medium"
            variant="outlined"
            fullWidth
            multiline
            maxRows={7}
            minRows={7}
            value={eventDescription}
            onChange={(e) => {
              setEventDescription(e.target.value);
            }}
          />
        </div>
        <div>
          <div className="create-event-image-container">
            <div>
              <Typography
                style={{
                  fontFamily: "Source Sans Pro",
                  fontSize: "12px",
                  color: "#fff",
                }}
              >
                Thumbnail
              </Typography>
              <div className="create-event-image-preview-container">
                <form
                  action="/profile"
                  method="post"
                  encType="multipart/form-data"
                >
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
                      className="create-event-image-preview"
                      onClick={() => {
                        setImage(null);
                      }}
                    >
                      <CloudUploadOutlinedIcon
                        sx={{
                          height: "150px",
                          width: "150px",
                          color: "#02BD82",
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
                    src={imagePreview}
                    onClick={() => {
                      setImage(null);
                      setImagePreview(undefined);
                    }}
                  />
                )}
              </div>
            </div>
            <div className="date-time-input-wrapper">
              <div className="event-start-time-input">
                <FormHelperTexts>
                  <Typography
                    style={{
                      fontFamily: "Source Sans Pro",
                      paddingLeft: "55px",
                      fontSize: "12px",
                      color: "#fff",
                      marginBottom: "3px",
                    }}
                  >
                    Start Time
                  </Typography>
                </FormHelperTexts>
                <DatePicker
                  popperPlacement="right"
                  isClearable
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
                <FormHelperTexts>
                  <Typography
                    style={{
                      fontFamily: "Source Sans Pro",
                      paddingLeft: "55px",
                      fontSize: "12px",
                      color: "#fff",
                      marginBottom: "3px",
                    }}
                  >
                    End Time
                  </Typography>
                </FormHelperTexts>
                <DatePicker
                  popperPlacement="right"
                  isClearable
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
                backgroundColor: "#02BD82",
              }}
              variant="contained"
              onClick={() => {
                // eventAPI.UpdateEvent(Event?.event_id as string, {
                //   eventTitle,
                //   eventDescription,
                //   image,
                //   featured: false,
                //   category_id: "",
                //   user_id: Event?.user_id as string,
                //   startTime,
                //   endTime,
                // });
              }}
            >
              <Typography
                style={{
                  fontFamily: "Source Sans Pro",
                  color: "#fff",
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
            <Button
              style={{
                marginTop: "45px",
                height: "35px",
                width: "80px",
                backgroundColor: "#02BD82",
              }}
              variant="contained"
              onClick={() => {
                onCreate();
              }}
            >
              <Typography
                style={{
                  fontFamily: "Source Sans Pro",
                  color: "#fff",
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
