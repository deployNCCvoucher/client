import { Box, Button, Menu, MenuItem } from "@mui/material";
import React from "react";

interface ActionButton {
  invoiceId?: number;
  invoiceStatus?: string;
}

export const ActionButton: React.FC<ActionButton> = ({
  invoiceId,
  invoiceStatus,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box>
      <Button onClick={handleClick}>Action</Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>
          {invoiceStatus === "reject" ? "Approve" : "Reject"}
        </MenuItem>
        <MenuItem onClick={handleClose}>Delete</MenuItem>
      </Menu>
    </Box>
  );
};
