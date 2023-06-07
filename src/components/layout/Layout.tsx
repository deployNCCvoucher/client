import { Box } from "@mui/material";
import Header from "../header/Header";
import SlideBar from "../slidebar/SlideBar";
import { useState } from "react";
import { styled } from "@mui/system";
import { Outlet } from "react-router-dom";

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
  return (
    <>
      <Header openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
      <Box
        sx={{
          pt: "64px",
          bgcolor: "rgba(170, 191, 242, 0.368627451)",
        }}
      >
        <Box sx={{ display: "flex" }}>
          {!openSidebar ? (
            <Box
              sx={{
                flexShrink: 0,
                width: "250px",
                display: { lg: "block", sm: "none", xs: "none" },
              }}
            >
              <Box
                sx={{
                  boxShadow: "0px 10px 8px 0px rgba(0,0,0,.35)",
                  position: "sticky",
                  bgcolor: "#fff",
                  height: "calc(100vh - 64px)",
                  top: "64px",
                }}
              >
                <SlideBar />
              </Box>
            </Box>
          ) : (
            <Showsbar>
              <SlideBar />
            </Showsbar>
          )}
          <Box sx={{ width: "100%" }}>
            <Box
              sx={{
                m: "30px",
                p: "16px",
                bgcolor: "#fff",
                boxShadow: "0 5px 15px rgba(0,0,0,.35)",
              }}
            >
              <Outlet />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default Layout;
