import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import "./App.css";
import PrivateRoute from "./routes/PrivateRoutes";
import PublicRoute from "./routes/PublicRoutes";
import Profile from "./pages/users/profile/Profile";
import MyRequest from "./pages/users/request/Request";
import Login from "./pages/login";
function App() {
  return (
    <div className="App">
        <Routes>
            <Route path="" element={<Navigate to="/login" replace />} />
            <Route element={<PrivateRoute />}>
                <Route element={<Layout />}>
                    <Route path="/app/myProfile" element={<Profile />} />
                    <Route path="/app/request" element={<MyRequest />} />
                </Route>
            </Route>
            <Route element={<PublicRoute />}>
                <Route path="/login" element={<Login />} />
            </Route>
        </Routes>
    </div>
)
}

export default App;
