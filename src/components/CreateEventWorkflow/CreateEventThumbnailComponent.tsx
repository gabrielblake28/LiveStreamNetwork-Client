import { Button, Typography } from "@mui/material";
import { useEffect } from "react";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";

type CreateEventThumbnailComponentProps = {
  image: File | null;
  setImage: Function;
  setImageURL: Function;
  imagePreview: string | undefined;
  setImagePreview: Function;
  onCreate: Function;
  onBack: Function;
};

export default function CreateEventThumbnailComponent({
  image,
  setImage,
  setImageURL,
  imagePreview,
  setImagePreview,
  onCreate,
  onBack,
}: CreateEventThumbnailComponentProps) {
  useEffect(() => {
    if (image !== null) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImageURL(reader.result as string);
      };

      reader.readAsBinaryString(image);
    } else {
      setImageURL("");
    }

    if (image !== null) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };

      reader.readAsDataURL(image);
    } else {
      setImagePreview(undefined);
    }
  }, [image]);

  return (
    <div>
      <div className="create-event-image-container">
        <Typography
          style={{
            marginLeft: "5px",
            fontFamily: "Source Sans Pro",
          }}
          color="#aaaaaa"
          variant="caption"
        >
          Thumbnail
        </Typography>
        <div className="create-event-image-preview-container">
          <form action="/profile" method="post" encType="multipart/form-data">
            <input
              id="file-explore-icon-button"
              accept="image/jpeg, image/png"
              type="file"
              onChange={(e) => {
                const files = e?.target?.files;

                if (files) {
                  console.log(files[0]);
                  setImage(files[0]);
                } else {
                  setImage(null);
                }
              }}
            />
          </form>

          {imagePreview === undefined ? (
            <label htmlFor="file-explore-icon-button">
              <div className="create-event-image-preview">
                <CloudUploadOutlinedIcon
                  sx={{ height: "150px", width: "150px" }}
                />
              </div>
            </label>
          ) : (
            <img
              style={{
                marginTop: "10px",
                height: "185px",
                width: "322px",
                objectFit: "cover",
                borderRadius: "4px",
              }}
              src={imagePreview}
              onClick={() => {
                setImage(null);
              }}
            />
          )}
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
              onCreate();
            }}
          >
            <Typography
              style={{ fontFamily: "Source Sans Pro" }}
              variant="button"
            >
              Create
            </Typography>
          </Button>
        </div>
      </div>
    </div>
  );
}
