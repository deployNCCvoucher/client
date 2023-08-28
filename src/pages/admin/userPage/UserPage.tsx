import { Box, Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { getAllUser } from "../../../redux/user/userAction";
import { useAppDispatch } from "../../../redux/hook/useTypedSeletor";
import { TableUser } from "./TableUser/TableUser";
import { UseMoney } from "./UseMoney/UseMoney";

export const UserPage = () => {
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
        marginTop: "10px",
        background: "#ffffff",
        borderTopLeftRadius: " 50px",
        borderTopRightRadius: "50px",
        padding: "32px",
        minHeight: "calc( 100vh - 100px)",
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
        List User
      </Typography>
      <UseMoney />
      <TableUser />
    </Box>
  );
};
