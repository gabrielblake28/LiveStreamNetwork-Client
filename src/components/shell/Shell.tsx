import { useState } from "react";
import "./Shell.css";
import TopNav from "../TopNav/TopNav";
// import { ThemeProvider } from "@mui/styles";
// import { createTheme } from "@mui/material";

// createTheme({
//   palette: { primary: { main: "blue" } },
//   components: {
//     MuiMenuItem: {
//       styleOverrides: {
//         root: { "&.Mui-selected": { backgroundColor: "red" } },
//       },
//     },
//   },
// });

export default function Shell({ view }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="twe-shell-container">
        <div className="twe-shell-header">
          <TopNav />
        </div>
        <div className="twe-shell-content-body">{view}</div>
      </div>
    </div>
  );
}
