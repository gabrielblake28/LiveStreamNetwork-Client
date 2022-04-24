import { Divider } from "@mui/material";
import EventCard from "../EventCard/EventCard";
import "./EventScrollPage.css";

// const queryString = window.location.search;

// const urlParams = new URLSearchParams(queryString);

// const code = urlParams.get("code");
// console.log(code);

// scopes:    channel:edit:commercial
console.log(document.location.hash);
export default function EventScrollPage() {
  return (
    <div>
      <div style={{ color: "white" }}>
        {" "}
        <a href="https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=cyg0w4xnvmd6qc81l3q6i31zsppy40&redirect_uri=http://localhost:3500/auth/twitch/callback&scope=user:read:email&claims=%7B%22id_token%22%3A%7B%22email%22%3Anull%2C%22email_verified%22%3Anull%7D%2C%22userinfo%22%3A%7B%22picture%22%3Anull%7D%7D">
          Connect with Twitch
        </a>
      </div>
      <div className="center-event-card">
        <EventCard />
      </div>
      <Divider
        className="event-card-divider"
        // style={{ marginTop: "20px" }}
        color="primary"
        variant="middle"
      />
      <div className="center-event-card">
        <EventCard />
      </div>
    </div>
  );
}
