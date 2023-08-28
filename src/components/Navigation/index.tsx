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

const Navigation = () => {
  const dispatch = useAppDispatch();
  const roleUser = window.localStorage.getItem("userRole");
  const pages =
    roleUser === "user"
      ? [{ title: "New Request", link: "/app/request" }]
      : [
          { title: "New Request", link: "/app/request" },
          { title: "List Request", link: "/app/admin" },
          { title: "History", link: "/app/history" },
          { title: "user", link: "/app/user" },
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
        height: "100px",
        justifyContent: "space-between",
        alignItems: "center",
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
            <img
              className="logo"
              src="../images/logo.png"
              alt="logo"
              style={{ width: "32px", height: "32px" }}
            />
            <Typography color={"#fff"} fontSize={"28px"} fontWeight={650}>
              NCC VOUCHER
            </Typography>
          </Box>
        </NavLink>
      </Box>
      <Box sx={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <Box sx={{ flexGrow: 1, display: "flex", gap: "20px" }}>
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
        <Button
          sx={{
            position: "relative",
            display: "flex",
            flexGrow: 0,
            gap: "10px",
          }}
        >
          <Box onClick={handleOpenUserMenu}>
            <AccountCircleOutlinedIcon sx={{ color: "white" }} />
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
            <MenuItem onClick={handleCloseUserMenu}>
              <DiaLogNavbar />
            </MenuItem>
          </Menu>
        </Button>
      </Box>
    </Box>
  );
};

export default Navigation;
