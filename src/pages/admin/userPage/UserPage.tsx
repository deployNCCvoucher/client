import { Box, Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { getAllUser } from "../../../redux/user/userAction";
import { useAppDispatch } from "../../../redux/hook/useTypedSeletor";
import { TableUser } from "./TableUser/TableUser";
import { UseMoney } from "./UseMoney/UseMoney";
import { SearchUser } from "./SearchUser/SearchUser";

export const UserPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllUser());
    };
    fetchData();
  }, []);
  return (
    <Box>
      <Typography
        variant="h5"
        style={{
          fontWeight: "700",
          color: "var(--secondary-color)",
          fontSize: "30px",
          marginBottom: "16px",
        }}
      >
        Manage Account
      </Typography>
      <Box>
        <UseMoney />
        <SearchUser />
        <TableUser />
        {/* <Box sx={{ width: "calc(50% - 28px)" }}>
          <SearchUser />
          <UseMoney />
          <UseMoney />
        </Box> */}
      </Box>
    </Box>
  );
};
