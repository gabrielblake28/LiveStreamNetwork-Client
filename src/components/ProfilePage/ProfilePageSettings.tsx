import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

const checkboxTheme = createTheme({
  palette: {
    primary: {
      main: "#9552fa",
    },
    secondary: {
      main: "#aaaaaa",
    },
  },
});

export default function ProfilePageSettings() {
  const [showHideDetails, setShowHideDetails] = useState(false);
  return (
    <ThemeProvider theme={checkboxTheme}>
      <div className="profile-page-settings-container">
        <div className="profile-page-settings-content">
          <div className="profile-page-notification-settings">
            <div className="settings-section-header">
              <Typography
                variant="h5"
                style={{ fontFamily: "Source Sans Pro", color: "#fff" }}
              >
                Notification Settings
              </Typography>
            </div>
            <div className="settings-section-body">
              <FormGroup>
                <div className="settings-email">
                  <div>
                    <Typography
                      variant="subtitle1"
                      style={{
                        fontFamily: "Source Sans Pro",
                        color: "#fff",
                      }}
                    >
                      Current Email:
                    </Typography>
                  </div>
                  {showHideDetails == true ? (
                    <div className="profile-page-phone-email">
                      <Typography
                        variant="body1"
                        style={{
                          fontFamily: "Source Sans Pro",
                          color: "#CF5579",
                        }}
                      >
                        gabriel.blake28@gmail.com
                      </Typography>
                    </div>
                  ) : (
                    <div className="profile-page-phone-email">
                      <Typography
                        variant="body1"
                        style={{
                          fontFamily: "Source Sans Pro",
                          color: "#CF5579",
                        }}
                      >
                        *************
                      </Typography>
                    </div>
                  )}
                </div>
                <div className="settings-phone">
                  <div>
                    <Typography
                      variant="body1"
                      style={{
                        fontFamily: "Source Sans Pro",
                        color: "#fff",
                      }}
                    >
                      Current Phone:
                    </Typography>
                  </div>
                  {showHideDetails == true ? (
                    <div className="profile-page-phone-email">
                      <Typography
                        variant="body1"
                        style={{
                          fontFamily: "Source Sans Pro",
                          color: "#CF5579",
                        }}
                      >
                        863-398-5277
                      </Typography>
                    </div>
                  ) : (
                    <div className="profile-page-phone-email">
                      <Typography
                        style={{
                          fontFamily: "Source Sans Pro",
                          color: "#CF5579",
                          fontSize: "18px",
                        }}
                      >
                        *** *** ****
                      </Typography>
                    </div>
                  )}
                </div>
                {showHideDetails == true ? (
                  <div
                    className="profile-page-show-hide"
                    onClick={() => {
                      setShowHideDetails(false);
                    }}
                  >
                    <Typography
                      style={{
                        fontFamily: "Source Sans Pro",
                        color: "#CF5579",
                        fontSize: "13px",
                      }}
                    >
                      Hide Details
                    </Typography>
                  </div>
                ) : (
                  <div
                    className="profile-page-show-hide"
                    onClick={() => {
                      setShowHideDetails(true);
                    }}
                  >
                    <Typography
                      style={{
                        fontFamily: "Source Sans Pro",
                        color: "#CF5579",
                        fontSize: "13px",
                      }}
                    >
                      Show Details
                    </Typography>
                  </div>
                )}

                <FormControlLabel
                  style={{
                    color: "#fff",
                  }}
                  control={
                    <Checkbox
                      disableRipple
                      style={{
                        color: "#fff",
                      }}
                      size="small"
                      defaultChecked
                    />
                  }
                  label="Text Notifications"
                />
                <FormControlLabel
                  style={{
                    color: "#fff",
                  }}
                  control={
                    <Checkbox
                      disableRipple
                      style={{
                        color: "#fff",
                      }}
                      size="small"
                    />
                  }
                  label="Email Notifications"
                />
              </FormGroup>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
