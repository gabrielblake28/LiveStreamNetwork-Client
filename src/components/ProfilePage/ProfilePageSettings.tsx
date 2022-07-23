import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { CurrentUserData } from "../../Recoil/Users/UserAtoms";

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
  const [showDetails, setShowDetails] = useState(false);
  const userInfo = useRecoilValue(CurrentUserData);
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
                  {showDetails == true ? (
                    <div className="profile-page-phone-email">
                      <Typography
                        variant="body1"
                        style={{
                          fontFamily: "Source Sans Pro",
                          color: "#EB4034",
                        }}
                      >
                        {userInfo.email}
                      </Typography>
                    </div>
                  ) : (
                    <div className="profile-page-phone-email">
                      <Typography
                        variant="body1"
                        style={{
                          fontFamily: "Source Sans Pro",
                          color: "#EB4034",
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
                  {showDetails == true ? (
                    <div className="profile-page-phone-email">
                      <Typography
                        variant="body1"
                        style={{
                          fontFamily: "Source Sans Pro",
                          color: "#EB4034",
                        }}
                      >
                        {userInfo.phone ? (
                          userInfo.phone
                        ) : (
                          <Typography
                            onClick={() => {}}
                            style={{
                              fontFamily: "Source Sans Pro",
                              color: "#EB4034",
                              fontSize: "14px",
                              cursor: "pointer",
                            }}
                          >
                            Add Phone
                          </Typography>
                        )}
                      </Typography>
                    </div>
                  ) : (
                    <div className="profile-page-phone-email">
                      <Typography
                        style={{
                          fontFamily: "Source Sans Pro",
                          color: "#EB4034",
                          fontSize: "18px",
                        }}
                      >
                        {userInfo.phone ? (
                          "*** *** ****"
                        ) : (
                          <Typography
                            onClick={() => {}}
                            style={{
                              fontFamily: "Source Sans Pro",
                              color: "#EB4034",
                              fontSize: "14px",
                              cursor: "pointer",
                            }}
                          >
                            Add Phone
                          </Typography>
                        )}
                      </Typography>
                    </div>
                  )}
                </div>
                {showDetails == true ? (
                  <div
                    className="profile-page-show-hide"
                    onClick={() => {
                      setShowDetails(false);
                    }}
                  >
                    <Typography
                      style={{
                        fontFamily: "Source Sans Pro",
                        color: "#EB4034",
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
                      setShowDetails(true);
                    }}
                  >
                    <Typography
                      style={{
                        fontFamily: "Source Sans Pro",
                        color: "#EB4034",
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
