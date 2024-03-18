import "./App.css";
import Layout from "./components/Layout";
import RequireAuth from "./features/RequireAuth";
import Welcome from "./components/Welcome";
import Login from "./features/Login";
import { Route, Routes } from "react-router-dom";
import Public from "./components/Public";
// import UsersList from "./usersApiSlice/usersList";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        {/* protected routes  */}
        <Route element={<RequireAuth />}>
          <Route path="welcome" element={<Welcome />} />
          {/* <Route path="userslist" element={<UsersList />} /> */}
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
