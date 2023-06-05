import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SendTimeExtensionIcon from "@mui/icons-material/SendTimeExtension";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { NavLink } from "react-router-dom";

const SlideBar = () => {
  return (
    <nav aria-label="">
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <NavLink to="/app/myprofile" className="nav-link">
              <AccountBoxIcon sx={{ mr: "15px" }} />
              <ListItemText primary="My Profile" />
            </NavLink>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <NavLink to="/app/request" className="nav-link">
              <SendTimeExtensionIcon sx={{ mr: "15px" }} />
              <ListItemText primary="Request" />
            </NavLink>
          </ListItemButton>
        </ListItem>
      </List>
    </nav>
  );
};
export default SlideBar;
