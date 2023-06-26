import {
  Box
} from "@mui/material";
import { useEffect } from "react";
import {
  getAllUser,
} from "../../../redux/user/userAction";
import {
  useAppDispatch,
} from "../../../redux/hook/useTypedSeletor";
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
    <Box sx={{ display: "fex", overflow: 'auto'}}>
      <TableUser />
      <Box sx={{width: 'calc(50% - 28px)'}}>
        <UseMoney />
      </Box>
    </Box>
  );
};
