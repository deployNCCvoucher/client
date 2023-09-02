import { Box, Button, Grid } from "@mui/material";
import Header from "../header/Header";
import SlideBar from "../slidebar/SlideBar";
import { useState } from "react";
import { styled } from "@mui/system";
import { Outlet } from "react-router-dom";
import Navigation from "../Navigation";

const Layout = (): JSX.Element => {
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  const Showsbar = styled("div")({
    flexShrink: 0,
    width: "250px",
    position: "fixed",
    animation: "left 0.5s ",
    zIndex: 7,
    top: "64px",
    boxShadow: "0px 10px 8px 0px rgba(0,0,0,.35)",
    background: "#fff",
    height: "calc(100vh - 64px)",
    "@keyframes left": {
      from: {
        transform: "translateX(-100%)",
      },
      to: {
        transform: "translateX(0)",
      },
    },
  });
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://be-mocha-ten.vercel.app/api/users/getAll"
      );
      const data = await response.json();
      console.log("data", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <>
      <Box className="box-container">
        <Grid
          sx={{
            maxWidth: "1440px",
            paddingLeft: "88px",
            paddingRight: "88px",
            margin: "auto",
            "@media (max-width: 1024px)": {
              paddingLeft: "48px",
              paddingRight: "48px",
            },
            "@media (max-width: 768px)": {
              paddingLeft: "0px",
              paddingRight: "0px",
            },
          }}
        >
          <Navigation />
          <Button onClick={() => fetchData()}>Click</Button>
          <Outlet />
        </Grid>
      </Box>
    </>
  );
};
export default Layout;
