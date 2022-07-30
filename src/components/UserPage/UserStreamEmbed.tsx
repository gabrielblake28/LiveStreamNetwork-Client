import {  CardMedia } from "@mui/material";

type twitchStreamEmbedProps = {
  stream_embed_name: string;
};

export default function twitchStreamEmbed({
  stream_embed_name,
}: twitchStreamEmbedProps) {
  return (
    <div className="twitch-stream-embed">
      <CardMedia
        component="iframe"
        src={`https://player.twitch.tv/?channel=${stream_embed_name}&parent=localhost&autoplay=true&muted=true`}
        height="400"
        title="User's Stream"
      />
    </div>
  );
}
