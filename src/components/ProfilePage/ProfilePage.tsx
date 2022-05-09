import { Avatar, Divider, Typography } from "@mui/material";
import "./ProfilePage.css";

export default function ProfilePage() {
  return (
    <div className="profile-page-container">
      <div className="profile-page-header-container">
        <div className="profile-page-profile-pic">
          <Avatar
            sx={{
              height: "150px",
              width: "150px",
              backgroundColor: "#00C8AF",
              color: "black",
            }}
          ></Avatar>
        </div>
        <div className="profile-page-user-data-container">
          <div className="profile-page-username">
            <Typography
              variant="h4"
              sx={{
                color: "white",
                fontFamily: "Source Sans Pro",
              }}
            >
              Daunttx
            </Typography>
          </div>
          <div className="profile-page-user-data">
            <div className="profile-page-active-events">
              <Typography
                variant="caption"
                sx={{
                  color: "white",
                  fontFamily: "Source Sans Pro",
                }}
              >
                Upcoming Events
              </Typography>
              <div className="active-events-num">
                <Typography
                  variant="h4"
                  sx={{
                    color: "white",
                    fontFamily: "Source Sans Pro",
                  }}
                >
                  2
                </Typography>
                <div className="underline-on-hover">
                  <Divider
                    variant="fullWidth"
                    sx={{ backgroundColor: "white" }}
                  />
                </div>
              </div>
            </div>
            <div className="profile-page-active-subscriptions">
              <Typography
                variant="caption"
                sx={{
                  color: "white",
                  fontFamily: "Source Sans Pro",
                }}
              >
                Active Subscriptions
              </Typography>
              <div className="active-subs-num">
                <Typography
                  variant="h4"
                  sx={{
                    color: "white",
                    fontFamily: "Source Sans Pro",
                  }}
                >
                  14
                </Typography>
                <div className="underline-on-hover">
                  <Divider
                    variant="fullWidth"
                    sx={{ backgroundColor: "white" }}
                  />
                </div>
              </div>
            </div>
            <div className="profile-page-all-events">
              <Typography
                variant="caption"
                sx={{
                  color: "white",
                  fontFamily: "Source Sans Pro",
                }}
              >
                Archived Events
              </Typography>
              <div className="total-events-num">
                <Typography
                  variant="h4"
                  sx={{
                    color: "white",
                    fontFamily: "Source Sans Pro",
                  }}
                >
                  173
                </Typography>
                <div className="underline-on-hover">
                  <Divider
                    variant="fullWidth"
                    sx={{ backgroundColor: "white" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-page-content-container"></div>
    </div>
  );
}
