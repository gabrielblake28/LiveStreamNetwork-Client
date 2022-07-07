import { Avatar, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { IUser } from "../../../API/Users/IUser";
import { ShowSearchDropDown } from "../../../Recoil/Search/SearchAtoms";
import "./SearchCards.css";

type UsersSearchCardProps = {
  SearchResult: Partial<IUser>;
};

export default function UsersSearchCard({
  SearchResult,
}: UsersSearchCardProps) {
  const setShowSearchDropDown = useSetRecoilState(ShowSearchDropDown);
  return (
    <Link
      onClick={() => {
        setShowSearchDropDown("none");
      }}
      to="/user"
      style={{
        textDecoration: "none",
        color: "#aaaaaa",
      }}
    >
      <div className="user-search-card-container">
        <div className="user-search-avatar">
          <IconButton style={{ color: "#A970FF" }}>
            <Avatar
              src={SearchResult.profile_image_url}
              sx={{
                width: "35px",
                height: "35px",
              }}
            />
          </IconButton>
        </div>
        <div className="user-search-display-name">
          <Typography
            sx={{
              fontFamily: "Source Sans Pro",
              color: "#aaaaaaa",
              fontSize: "15px",
            }}
          >
            {SearchResult.display_name}
          </Typography>
        </div>
      </div>
    </Link>
  );
}
