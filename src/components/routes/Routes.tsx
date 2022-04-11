import { Routes, Route } from "react-router";
// import LoginPage from "../LoginPage/LoginPage";
// import CreateAccountPage from "../CreateAccountPage/CreateAccountPage";
import EventScrollPage from "../EventScroll/EventScrollPage";
// import useAuth from "./useAuth";
// import RequireAuth from "./RequireAuth";
export default function Router() {
  //   const auth = useAuth();

  return (
    <Routes>
      <Route path="/" element={<EventScrollPage />} />
      {/* <Route path="login" element={<LoginPage />} />
      <Route path="create_account" element={<CreateAccountPage />} /> */}
    </Routes>
  );
}
