import {
  Button,
  FormHelperText,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import "./FeedbackModal.css";
import { FeedbackAPI } from "../../API/Feedback/impl/FeedbackAPI";
import { useRecoilValue } from "recoil";
import { CurrentUserData } from "../../Recoil/Users/UserAtoms";

const feedbackAPI = new FeedbackAPI();

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

type FeedbackModalProps = {
  handleFeedbackModalClose: Function;
};

export default function FeedbackModal({
  handleFeedbackModalClose,
}: FeedbackModalProps) {
  const [feedbackValue, setFeedbackValue] = useState("");
  const [feedbackError, setFeedbackError] = useState(false);
  const userInfo = useRecoilValue(CurrentUserData);
  return (
    <div className="feedback-modal-container">
      <div className="feedback-modal-header">
        <Typography
          sx={{
            color: "#fff",
            fontSize: "20px",
            margin: "0 0 0 15px",
          }}
        >
          Give Feedback
        </Typography>
      </div>
      <div className="feedback-modal-subheader">
        <Typography
          sx={{
            color: "#aaaaaa",
            fontFamily: "Source Sans Pro",
            fontSize: "18px",
            margin: "0 0 0 15px",
          }}
        >
          Your Opinion Matters Here
        </Typography>
        <div className="sub-header-row">
          <Typography
            sx={{
              color: "#aaaaaa",
              fontFamily: "Source Sans Pro",
              fontSize: "10px",
              margin: "0 0 0 15px",
            }}
          >
            Help us improve our product?
          </Typography>
          <Typography
            sx={{
              color: "#cacaca",
              fontFamily: "Source Sans Pro",
              fontSize: "11px",
              margin: "0 0 0 15px",
            }}
          >
            Give Feedback Here
          </Typography>
        </div>
      </div>

      <div className="feedback-modal-content">
        <div className="feedback-description">
          <div className="feedback-description-header">
            <FormHelperText
              id="create-event-form-helper-text"
              style={{
                fontSize: "12px",
                color: "#fff",
                margin: "0 0 0 5px",
              }}
            >
              Feedback
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
            {feedbackError ? (
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
            value={feedbackValue}
            onChange={(e) => {
              setFeedbackValue(e.target.value);
            }}
            multiline
            maxRows={7}
            minRows={7}
            sx={{
              backgroundColor: "#3A3D45",
              color: "#fff",
              width: "400px",
              borderRadius: "4px",
            }}
            inputProps={{
              maxLength: 500,
              type: "text",
            }}
          />
        </div>
      </div>
      <div className="feedback-modal-button">
        <Button
          style={{
            marginTop: "45px",
            height: "35px",
            width: "80px",
            backgroundColor: "#3A3D45",
            marginRight: "10px",
          }}
          onClick={() => {
            handleFeedbackModalClose();
          }}
          variant="contained"
        >
          <Typography
            style={{
              fontFamily: "Source Sans Pro",
              color: "black",
              fontSize: "15px",
            }}
          >
            Close
          </Typography>
        </Button>
        <Button
          style={{
            marginTop: "45px",
            height: "35px",
            width: "80px",
            backgroundColor: "#34dfeb",
          }}
          variant="contained"
          onClick={() => {
            if (feedbackValue && feedbackValue.length > 0) {
              feedbackAPI.CreateFeedback({
                user_id: userInfo.user_id as string,
                feedback: feedbackValue,
              });
              setFeedbackError(false);
              handleFeedbackModalClose();
            } else {
              setFeedbackError(true);
            }
          }}
        >
          <Typography
            style={{
              fontFamily: "Source Sans Pro",
              color: "black",
              fontSize: "15px",
            }}
          >
            Submit
          </Typography>
        </Button>
      </div>
    </div>
  );
}
