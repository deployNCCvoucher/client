import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import "./App.css";
import PrivateRoute from "./routes/PrivateRoutes";
import PublicRoute from "./routes/PublicRoutes";
import Profile from "./pages/users/userProfile";
import MyRequest from "./pages/users/request";
import Login from "./pages/login";
import { AdminPage } from "./pages/admin/Admin";
import { AdminHistoryPage } from "./pages/admin/historyPage/History";
import { UserPage } from "./pages/admin/userPage/UserPage";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="" element={<Navigate to="/login" replace />} />
        <Route element={<PrivateRoute />}>
          <Route element={<Layout />}>
            <Route path="/app/admin" element={<AdminPage />} />
            <Route path="/app/myProfile" element={<Profile />} />
            <Route path="/app/request" element={<MyRequest />} />
            <Route path="/app/history" element={<AdminHistoryPage />} />
            <Route path="/app/user" element={<UserPage />} />
          </Route>
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
