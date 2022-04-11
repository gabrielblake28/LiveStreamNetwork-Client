import { useState } from "react";
import "./shell.css";

export default function Shell({ view }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="mfl-shell-container">
        <div className="mfl-shell-content-body">{view}</div>
      </div>
    </div>
  );
}
