import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Login from "../module/Auth/components/Login";
import Register from "../module/Auth/components/Register";
import PrivateRoute from "./PrivateRoute";

const AppRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<PrivateRoute />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppRoute />
    </BrowserRouter>
  );
};

export default App;
