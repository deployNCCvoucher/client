import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routes/Routes";
import PrivateRoutes from "./routes/PrivateRoutes";
import Layout from "./components/layout/Layout";
import "./App.css";
import PrivateRoute from "./routes/PrivateRoutes";
import PublicRoute from "./routes/PublicRoutes";
import MyProfile from "./pages/users/myProfile/MyProfile";
import MyRequest from "./pages/users/request/Request";
import Login from "./pages/login";
function App() {
  return (
    <div className="App">
        <Routes>
            <Route path="" element={<Navigate to="/login" replace />} />
            <Route element={<PrivateRoute />}>
                <Route element={<Layout />}>
                    <Route path="/app/myProfile" element={<MyProfile />} />
                    <Route path="/request" element={<MyRequest />} />
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
