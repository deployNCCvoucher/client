import { Dashboard } from "@mui/icons-material"
import { Routes, Route } from "react-router-dom"
import Login from "../pages/login"
import SlideBar from "../components/slidebar/SlideBar"
import MyProfile from "../pages/users/myProfile/MyProfile"
import MyRequest from "../pages/users/request/Request"

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<MyProfile />} />
            <Route path='/request' element={<MyRequest />} />
            <Route path='/history' element={<SlideBar />} />
            {/* <Route path='/customers' element={<Customers />} /> */}
        </Routes>
    )
}
export default AppRoutes;
