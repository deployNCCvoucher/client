import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { Link } from "react-router-dom";

const SlideBar = () => {
    return (
        <Box>
            <nav aria-label="main mailbox folders">
                <List>
                    <Link to='/' className='nav-link'>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                <ListItemText primary="My Profile" />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    <Link to='/request' className='nav-link'>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                <ListItemText primary="Request" />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    <Link to='/history' className='nav-link'>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                <ListItemText primary="History" />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                </List>
            </nav>
        </Box>
    );
}
export default SlideBar;