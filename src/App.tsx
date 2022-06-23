import { useState } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Shell from "./components/Shell/Shell";
import Router from "./components/Routes/Routes";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <BrowserRouter>
        <RecoilRoot>
          <Shell view={<Router />} />
        </RecoilRoot>
      </BrowserRouter>
    </div>
  );
}

export default App;
