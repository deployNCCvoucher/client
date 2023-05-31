import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SendTimeExtensionIcon from '@mui/icons-material/SendTimeExtension';
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { NavLink } from "react-router-dom";

const SlideBar = () => {
    return (
        <nav aria-label="">
            <List>
                <NavLink to='myprofile' className='nav-link' >
                    <ListItem disablePadding>
                        <ListItemButton>
                            <AccountBoxIcon sx={{ mr: '15px' }} />
                            <ListItemText primary="My Profile" />
                        </ListItemButton>
                    </ListItem>
                </NavLink>
                <NavLink to='myrequest' className='nav-link'>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <SendTimeExtensionIcon sx={{ mr: '15px' }} />
                            <ListItemText primary="Request" />
                        </ListItemButton>
                    </ListItem>
                </NavLink>
            </List>
        </nav>
    );
}
export default SlideBar;