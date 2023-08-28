import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SendTimeExtensionIcon from "@mui/icons-material/SendTimeExtension";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../redux/hook/useTypedSeletor";
import { Fragment } from "react";

const SlideBar = () => {
  //   const dataStorage = JSON.parse(window.localStorage.getItem("data")!);
  const user = useAppSelector((state) => state.user.currentUser);
  const roleUser = window.localStorage.getItem("userRole");
  return (
    <nav aria-label="">
      <Box sx={{ mr: "15px", mt: "15px" }}>
        <Avatar
          alt="Remy Sharp"
          src={user.userImage}
          sx={{ width: 150, height: 150, bgcolor: "red", mx: "auto" }}
        />
      </Box>
    </nav>
  );
};
export default SlideBar;
