import { useState } from "react";
import "./App.css";
import Shell from "./components/Shell/Shell";
import Router from "./components/Routes/Routes";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

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
