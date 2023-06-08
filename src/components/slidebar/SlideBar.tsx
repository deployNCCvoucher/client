import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SendTimeExtensionIcon from "@mui/icons-material/SendTimeExtension";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../redux/hook/useTypedSeletor";

const SlideBar = () => {

//   const dataStorage = JSON.parse(window.localStorage.getItem("data")!);

  const roleUser = window.localStorage.getItem("userRole");
  return (
    <nav aria-label="">
      <List>
        {roleUser === "admin" ? (
          <NavLink to="/app/admin" className="nav-link">
            <ListItem disablePadding>
              <ListItemButton>
                <AccountBoxIcon sx={{ mr: "15px" }} />
                <ListItemText primary="List Request" />
              </ListItemButton>
            </ListItem>
          </NavLink>
        ) : (
          <Box>
            <NavLink to="/app/myProfile" className="nav-link">
              <ListItem disablePadding>
                <ListItemButton>
                  <AccountBoxIcon sx={{ mr: "15px" }} />
                  <ListItemText primary="My Profile" />
                </ListItemButton>
              </ListItem>
            </NavLink>
            <NavLink to="/app/request" className="nav-link">
              <ListItem disablePadding>
                <ListItemButton>
                  <SendTimeExtensionIcon sx={{ mr: "15px" }} />
                  <ListItemText primary="Request" />
                </ListItemButton>
              </ListItem>
            </NavLink>{" "}
          </Box>
        )}
      </List>
    </nav>
  );
};
export default SlideBar;
