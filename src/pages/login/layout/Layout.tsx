import { Box, Grid } from "@mui/material";
import SlideBar from "../../../components/slidebar/SlideBar";

const Layout = () => {
    return (
        <Box sx={{}}>
            <Box sx={{ position: 'fixed', width: '300px', height: '100vh', }}>
                <SlideBar />
            </Box>
            <Box sx={{ pl: "330px" }}>
                <Box sx={{ p: "30px" }}>
                    Main
                </Box>
            </Box>
        </Box>
    );
}
export default Layout;