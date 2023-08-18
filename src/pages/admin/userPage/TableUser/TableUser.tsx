import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useRef } from "react";
import { getAllUser } from "../../../../redux/user/userAction";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../redux/hook/useTypedSeletor";
import { PaginationComponent } from "../../../users/profile/Pagination/Pagination";

export const TableUser = () => {
  const usersPagin2 = useAppSelector((state) => state.user.usersPagin);
  const usersPagin = [
    ...usersPagin2,
    ...usersPagin2,
    ...usersPagin2,
    ...usersPagin2,
    ...usersPagin2,
  ];
  const pageTopRef = useRef(null);
  return (
    <Box
      sx={{
        width: "100%",
        boxShadow: "0 2px 10px rgba(0,0,0,.35)",
      }}
      ref={pageTopRef}
    >
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow sx={{ "& .MuiTableCell-root": { p: "10px 0px" } }}>
              <TableCell align="center">
                <Typography sx={{ color: "#f44336", fontWeight: "700" }}>
                  Account
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography sx={{ color: "#607d8b", fontWeight: "700" }}>
                  Full Name
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography sx={{ color: "#f44336", fontWeight: "700" }}>
                  Money Used
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography sx={{ color: "#4caf50", fontWeight: "700" }}>
                  Money Available
                </Typography>
              </TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ "& .MuiTableCell-root": { p: "13px 16px" } }}>
            {usersPagin.map((user, index) => (
              <TableRow
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell align="center">{user.gmail.split("@")[0]}</TableCell>
                <TableCell align="center">{user.name}</TableCell>
                <TableCell align="center">
                  <Typography sx={{ color: "#f44336", fontWeight: "700" }}>
                    {user.totalUsed}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography sx={{ color: "#4caf50", fontWeight: "700" }}>
                    {user.totalAvailable}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ p: "10px 10px", display: "flex" }}>
        <PaginationComponent user pageTopRef={pageTopRef} />
      </Box>
    </Box>
  );
};
