import { Button, styled, TextField, Typography } from "@mui/material";
import FormHelperTexts from "@mui/material/FormHelperText";
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

type CreateEventDescriptionComponentProps = {
  eventDescription: string;
  setEventDescription: Function;
  setActivePage: Function;
  onNext: Function;
  onBack: Function;
};

export default function CreateEventDescriptionComponent({
  eventDescription,
  setEventDescription,
  onNext,
  onBack,
}: CreateEventDescriptionComponentProps) {
  return (
    <div>
      <div className="create-event-description">
        <FormHelperTexts>
          <Typography
            style={{ marginLeft: "5px", fontFamily: "Source Sans Pro" }}
            color="#aaaaaa"
            variant="caption"
          >
            Describe your Event
          </Typography>
        </FormHelperTexts>
        <WhiteBorderTextField
          placeholder="500 character limit"
          inputProps={{
            maxLength: 500,
          }}
          autoFocus
          autoComplete="off"
          InputLabelProps={{
            style: { color: "#aaaaaa" },
          }}
          sx={{
            margin: "5px 15px 0 0",
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
          maxRows={7}
          minRows={7}
          value={eventDescription}
          onChange={(e) => {
            setEventDescription(e.target.value);
          }}
        />
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
              onBack();
            }}
          >
            <Typography
              style={{ fontFamily: "Source Sans Pro", color: "#aaaaaa" }}
              variant="button"
            >
              Back
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
