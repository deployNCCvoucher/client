import { Route, Routes } from "react-router-dom";
import Layout from "../components/layout/Layout";


export const PrivateRoutes = () => {
    return (
        <Routes>
            <Route path='app/*' element={<Layout />} />
        </Routes>
    )

}
