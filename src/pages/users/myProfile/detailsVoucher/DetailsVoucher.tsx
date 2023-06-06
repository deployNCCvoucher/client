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
  styled,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import React, { useEffect, useState } from "react";
import { getAllUser } from "../../../../redux/user/userAction";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../redux/hook/useTypedSeletor";
import { getAllInvoice } from "../../../../redux/invoice/invoiceAction";
import {
  filterInvoice,
  invoiceReducer,
} from "../../../../redux/invoice/invoiceSlide";
import { setUser } from "../../../../redux/user/userSlide";
import Image from "../../../../components/imageFirebase/Image";

interface IProps {
  codeVoucher: number;
}
const DetailsVoucher: React.FC<IProps> = ({ codeVoucher }) => {
  const value = useAppSelector((state: any) => state.user);
  const invoice = useAppSelector((state) => state.invoice);
  console.log("invoice", invoice);
  const { userInvoice } = invoice;
  const { currentUser } = value;
  const dispatch = useAppDispatch();
  const [openViewImg, setOpenViewImg] = useState<boolean>(false);
  const handleViewIamge = () => {
    setOpenViewImg(!openViewImg);
  };
  const ViewImg = styled("div")({
    position: "fixed",
    zIndex: "8",
    width: "100%",
    height: "100%",
    left: "0",
    top: "0",
    paddingTop: "10%",
    background: "#000",
  });
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllUser());
      await dispatch(getAllInvoice());
      dispatch(setUser());
    };
    fetchData();
  }, []);
  useEffect(() => {
    dispatch(filterInvoice(currentUser.id));
  }, [currentUser, dispatch]);
  return (
    <Box sx={{ boxShadow: "0 5px 15px rgba(0,0,0,.35)", mt: "40px" }}>
      <Typography
        component="h2"
        sx={{
          pb: "30px",
          pt: "20px",
          textAlign: "center",
          borderBottom: "1px solid #e9e9e9",
          fontSize: "28px",
          lineHeight: "32px",
        }}
      >
        Chi tiet voucher
      </Typography>
      <TableContainer component={Paper} sx={{ p: "0 15px" }}>
        <Table
          size="small"
          aria-label="a dense table"
          sx={{ width: { xs: "700px", sm: "100%" } }}
        >
          <TableHead>
            <TableRow sx={{ "& .MuiTableCell-root": { p: "11px 0px" } }}>
              <TableCell align="center">Code</TableCell>
              <TableCell align="center">Image</TableCell>
              <TableCell align="center">Type</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Note</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ "& .MuiTableCell-root": { p: " 16px" } }}>
            {userInvoice.map((invoice: any) => (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" width="10%">
                  {invoice.code}
                </TableCell>
                <TableCell align="center" width="20%">
                  <Box
                    component="span"
                    sx={{ cursor: "pointer" }}
                    onClick={handleViewIamge}
                  >
                    <Box sx={{ width: "40px" }}>
                      <Image image={invoice.image} />
                    </Box>
                    {openViewImg ? (
                      <ViewImg>
                        <Box sx={{ width: "400px" }}>
                          <Image image={invoice.image} />
                        </Box>
                      </ViewImg>
                    ) : (
                      ""
                    )}
                  </Box>
                </TableCell>
                <TableCell align="center" width="20%">
                  {invoice.reducedType}
                </TableCell>
                <TableCell align="center" width="20%">
                  {invoice.status === "pending" ? (
                    <Box sx={{ color: "yellow" }}>
                      <MoreHorizOutlinedIcon />
                    </Box>
                  ) : invoice.status === "approve" ? (
                    <Box sx={{ color: "blue" }}>
                      <CheckIcon />
                    </Box>
                  ) : (
                    <Box sx={{ color: "red" }}>
                      <CloseIcon />
                    </Box>
                  )}
                </TableCell>
                <TableCell align="center" width="30%">
                  note
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default DetailsVoucher;
