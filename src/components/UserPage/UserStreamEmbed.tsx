import { Box, CardMedia } from "@mui/material";

export default function twitchStreamEmbed() {
  return (
    <div className="twitch-stream-embed">
      <CardMedia
        component="iframe"
        src="https://player.twitch.tv/?channel=mizkif&parent=localhost&autoplay=false"
        height="400"
        title="User's Stream"
        // controls
      />
    </div>
  );
}
