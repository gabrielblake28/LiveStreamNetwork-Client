import {
  Button,
  MenuItem,
  Select,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import FormHelperTexts from "@mui/material/FormHelperText";
import DatePicker from "react-datepicker";
import "./CreateEventWorkflow.css";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import DoNotDisturbOutlinedIcon from "@mui/icons-material/DoNotDisturbOutlined";
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

const WhiteBorderSelect = styled(Select)`
  & label.Mui-focused {
    color: #101012;
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: #101012;
    }
  }
`;

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
  eventCategory,
  setEventCategory,
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
    <div>
      <div className="create-event-categories">
        <FormHelperTexts>
          <Typography
            style={{
              marginLeft: "5px",
              fontFamily: "Source Sans Pro",
            }}
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
            marginTop: "4px",
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
          value={eventCategory}
          onChange={(e) => {
            setEventCategory(e.target.value as string);
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="1">Just Chatting</MenuItem>
          <MenuItem value="2">League of Legends</MenuItem>
          <MenuItem value="3">Valorant</MenuItem>
          <MenuItem value="4">World of Warcraft</MenuItem>
          <MenuItem value="5">Rocket League</MenuItem>
          <MenuItem value="6">Among Us</MenuItem>
          <MenuItem value="7">Minecraft</MenuItem>
          <MenuItem value="8">Apex Legends</MenuItem>
          <MenuItem value="9">Fortnite</MenuItem>
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
