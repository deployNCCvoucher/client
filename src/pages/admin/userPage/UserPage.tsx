import { Box, Button, Typography, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllUser } from "../../../redux/user/userAction";
import { useAppDispatch } from "../../../redux/hook/useTypedSeletor";
import { TableUser } from "./TableUser/TableUser";
import { UseMoney } from "./UseMoney/UseMoney";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export const UserPage = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllUser());
    };
    fetchData();
  }, []);
  return (
    <Box
      sx={{
        background: "#ffffff",
        borderTopLeftRadius: " 50px",
        borderTopRightRadius: "50px",
        padding: "32px",
        minHeight: "calc( 100vh - 80px)",
        "@media (max-width: 1024px)": {
          padding: "24px",
          borderTopLeftRadius: " 30px",
          borderTopRightRadius: "30px",
        },
        "@media (max-width: 768px)": {
          padding: "16px",
          borderTopLeftRadius: " 0px",
          borderTopRightRadius: "0px",
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          position: "relative",
        }}
      >
        <Typography
          component="h2"
          sx={{
            pb: "30px",
            textAlign: "center",
            lineHeight: "32px",
            color: "#353657",
            fontSize: "30px",
            fontWeight: "700",
            m: "8px 0px",
          }}
        >
          List user
        </Typography>
        <Box sx={{ position: "absolute", right: "0", top: "0" }}>
          <Tooltip title="useVoucher">
            <MoreVertIcon
              sx={{
                color: "#353657",
                fontSize: "30px",
                cursor: "pointer",
              }}
              onClick={handleOpen}
            />
          </Tooltip>
        </Box>
      </Box>
      <UseMoney open={open} handleOpen={handleOpen} handleClose={handleClose} />
      <TableUser />
    </Box>
  );
};
