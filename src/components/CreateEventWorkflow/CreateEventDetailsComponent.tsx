import {
  Button,
  createTheme,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import FormHelperTexts from "@mui/material/FormHelperText";
import DatePicker from "react-datepicker";
import "./CreateEventWorkflow.css";
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

const selectTheme = createTheme({
  palette: {
    primary: {
      main: "#9552fa",
    },
    secondary: {
      main: "#aaaaaa",
    },
  },
  components: {
    MuiSelect: {
      styleOverrides: {
        select: {
          "&:focus": {
            backgroundColor: "#aaaaaa",
            borderColor: "#aaaaaa",
          },
          "&:before": {
            borderColor: "#aaaaaa",
          },
          "&:after": {
            borderColor: "#aaaaaa",
          },
        },
      },
    },
  },
});

type CreateEventDetailsComponentProps = {
  eventCategory: string;
  setEventCategory: Function;
  eventTitle: string;
  setEventTitle: Function;
  startTime: Date;
  setStartTime: Function;
  endTime: Date;
  setEndTime: Function;
  setActivePage: Function;
  onNext: Function;
  onCancel: Function;
};

export default function CreateEventDetailsComponent({
  eventTitle,
  setEventTitle,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  onNext,
  onCancel,
}: CreateEventDetailsComponentProps) {
  return (
    <div className="create-event-details-centered">
      <div className="title-and-time-spacing">
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
              isClearable
              showPopperArrow={false}
              selected={startTime}
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
                style={{ marginLeft: "10px", fontFamily: "Source Sans Pro" }}
                color="#ACACAC"
                variant="caption"
              >
                End Time
              </Typography>
            </FormHelperTexts>
            <DatePicker
              isClearable
              showPopperArrow={false}
              selected={endTime}
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
      <div className="create-event-button-wrapper">
        <div className="create-event-left-button">
          {" "}
          <Button
            style={{
              marginTop: "45px",
              color: "#101012",
              height: "35px",
              width: "150px",
              backgroundColor: "#27272c",
            }}
            variant="contained"
            onClick={() => {
              onCancel();
            }}
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
              marginTop: "45px",
              color: "#101012",
              height: "35px",
              width: "150px",
              backgroundColor: "#A970FF",
            }}
            variant="contained"
            onClick={() => {
              onNext();
            }}
          >
            <Typography
              style={{ fontFamily: "Source Sans Pro" }}
              variant="button"
            >
              Next
            </Typography>
          </Button>
        </div>
      </div>
    </div>
  );
}
