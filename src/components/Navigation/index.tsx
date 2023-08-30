import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  useAppSelector,
  useAppDispatch,
} from "../../redux/hook/useTypedSeletor";
import { getUser } from "../../redux/user/userAction";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import DiaLogNavbar from "../Dialog";
import { NavLink } from "react-router-dom";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const Navigation = () => {
  const dispatch = useAppDispatch();
  const roleUser = window.localStorage.getItem("userRole");
  const pages =
    roleUser === "user"
      ? [{ title: "NEW REQUEST", link: "/app/request" }]
      : [
          { title: "NEW REQUEST", link: "/app/request" },
          { title: "LIST REQUEST", link: "/app/admin" },
          { title: "HISTORY", link: "/app/history" },
          { title: "USER", link: "/app/user" },
        ];
  const user = useAppSelector((state) => state.user.currentUser);
  console.log("user", user);
  // Call api
  useEffect(() => {
    const userId = window.localStorage.getItem("idUser");
    const fetchData = async () => {
      if (userId) await dispatch(getUser(userId));
    };
    fetchData();
  }, []);
  // set Anchor
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "80px",
        justifyContent: "space-between",
        alignItems: "center",
        "@media (max-width: 768px)": {
          padding: "16px",
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <NavLink to={"/app/myProfile"}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              gap: "10px",
            }}
          >
            <Box
              sx={{
                width: "32px",
                height: "32px",
                "@media (max-width: 1024px)": {
                  width: "24px",
                  height: "24px",
                },
              }}
            >
              <img
                className="logo"
                src="../images/logo.png"
                alt="logo"
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </Box>

            <Typography
              sx={{
                color: "#fff",
                fontSize: "28px",
                "@media (max-width: 1024px)": {
                  fontSize: "20px",
                },
                fontWeight: 650,
              }}
            >
              NCC VOUCHER
            </Typography>
          </Box>
        </NavLink>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            gap: "20px",
            "@media (max-width: 1024px)": {
              display: "none",
            },
          }}
        >
          {pages.map((page) => (
            <NavLink to={page.link} className="nav-link" key={page.link}>
              <Typography
                style={{ color: "white", fontSize: "16px", fontWeight: "400" }}
              >
                {page.title}
              </Typography>
            </NavLink>
          ))}
        </Box>
        <Box
          sx={{
            position: "relative",
            display: "flex",
            flexGrow: 0,
            gap: "10px",
            cursor: "pointer",
          }}
        >
          <Box
            onClick={handleOpenUserMenu}
            sx={{
              "@media (max-width: 1024px)": {
                display: "none",
              },
            }}
          >
            <AccountCircleOutlinedIcon sx={{ color: "white" }} />
          </Box>
          <Box
            onClick={handleOpenUserMenu}
            sx={{
              display: "none",
              "@media (max-width: 1024px)": {
                display: "block",
              },
            }}
          >
            {!anchorElUser ? (
              <MenuOutlinedIcon sx={{ color: "#fff" }} />
            ) : (
              <CloseOutlinedIcon sx={{ color: "#fff" }} />
            )}
          </Box>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <Box
              onClick={handleCloseUserMenu}
              sx={{ backgroundColor: "#fff", padding: "0" }}
            >
              <DiaLogNavbar />
            </Box>
          </Menu>
        </Box>
      </Box>
    </Box>
  );
};

export default Navigation;
