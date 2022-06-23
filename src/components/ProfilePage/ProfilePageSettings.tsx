import {
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const checkboxTheme = createTheme({
  palette: {
    primary: {
      main: "#9552fa",
    },
    secondary: {
      main: "#aaaaaa",
    },
  },
  // components: {
  //   MuiTab: {
  //     styleOverrides: {
  //       root: {
  //         color: "#aaaaaa",
  //       },
  //     },
  //   },
  // },
});

export default function ProfilePageSettings() {
  return (
    <ThemeProvider theme={checkboxTheme}>
      <div className="profile-page-settings-container">
        <div className="profile-page-settings-content">
          <div className="profile-page-notification-settings">
            <div className="settings-section-header">
              <Typography
                variant="h5"
                style={{ fontFamily: "Source Sans Pro", color: "#aaaaaa" }}
              >
                Notification Settings
              </Typography>
            </div>
            <div className="settings-section-body">
              <FormGroup>
                <div className="settings-email">
                  <Typography
                    variant="subtitle1"
                    style={{ fontFamily: "Source Sans Pro", color: "#aaaaaa" }}
                  >
                    Current Email:
                  </Typography>
                </div>
                <div className="settings-phone">
                  <Typography
                    variant="body1"
                    style={{ fontFamily: "Source Sans Pro", color: "#aaaaaa" }}
                  >
                    Current Phone:{" "}
                  </Typography>
                </div>
                <FormControlLabel
                  style={{
                    color: "#aaaaaa",
                  }}
                  control={
                    <Checkbox
                      disableRipple
                      style={{
                        color: "#9552fa",
                      }}
                      size="small"
                      defaultChecked
                    />
                  }
                  label="Text Notifications"
                />
                <FormControlLabel
                  style={{
                    color: "#aaaaaa",
                  }}
                  control={
                    <Checkbox
                      disableRipple
                      style={{
                        color: "#9552fa",
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
