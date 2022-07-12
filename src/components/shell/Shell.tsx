import React, { useEffect, useRef, useState } from "react";
import "./Shell.css";
import TopNav from "../TopNav/TopNav";

export default function Shell({ view }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [clonedView, setClonedView] = useState(
    React.cloneElement(view, { ParentRef: ref?.current })
  );

  useEffect(() => {
    setClonedView(React.cloneElement(view, { ParentRef: ref?.current }));
  }, [view]);

  return (
    <div>
      <div className="twe-shell-container">
        <div className="twe-shell-header">
          <TopNav setOpen={setOpen} />
        </div>
        <div ref={ref} className="twe-shell-content-body">
          {clonedView}
        </div>
      </div>
    </div>
  );
}
