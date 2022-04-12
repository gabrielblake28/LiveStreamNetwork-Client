import { useState } from "react";
import "./App.css";
import Shell from "./components/Shell/Shell";
import Router from "./components/Routes/Routes";
import { BrowserRouter } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <BrowserRouter>
        <Shell view={<Router />} />
      </BrowserRouter>
    </div>
  );
}

export default App;
