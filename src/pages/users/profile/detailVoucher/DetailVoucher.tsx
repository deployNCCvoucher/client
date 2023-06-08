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
  Chip,
  Button,
  Modal,
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
import { getInvoice } from "../../../../redux/invoice/invoiceAction";
import Image from "../../../../components/imageFirebase/Image";
import Time from "../../../../components/time/Time";
import EditModal from "../../../../components/modal/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface IProps {
  codeVoucher: number;
}

const DetailVoucher = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  const value = useAppSelector((state: any) => state.user);
  const invoice = useAppSelector((state) => state.invoice);
  const { userInvoice } = invoice;
  const { currentUser } = value;
  const dispatch = useAppDispatch();

  useEffect(() => {
    const userId = window.localStorage.getItem("idUser");
    const fetchData = async () => {
      if (userId) await dispatch(getAllUser(userId));
      await dispatch(getInvoice(userId));
    };
    fetchData();
  }, []);
  return (
    <Box sx={{ boxShadow: "0 5px 15px rgba(240, 240, 240, 0.35)", mt: "40px" }}>
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
        Detail
      </Typography>
      <EditModal
        invoice={invoice}
        open={openModal}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />
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
              <TableCell align="center">create At</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userInvoice.map((invoice: any, index: number) => (
              <>
                <TableRow>
                  <TableCell align="center" width="10%">
                    {invoice.code}
                  </TableCell>
                  <TableCell align="center" width="20%">
                    <Image image={invoice.image} width="45px" height="auto" />
                  </TableCell>
                  <TableCell align="center" width="20%">
                    {invoice.reducedType === "30k" ? (
                      <Chip
                        label={invoice.reducedType}
                        style={{ backgroundColor: "blue", color: "white" }}
                      />
                    ) : invoice.reducedType === "50k" ? (
                      <Chip
                        label={invoice.reducedType}
                        style={{ backgroundColor: "lime", color: "white" }}
                      />
                    ) : (
                      <Chip
                        label={invoice.reducedType}
                        style={{ backgroundColor: "purple", color: "white" }}
                      />
                    )}
                  </TableCell>
                  <TableCell align="center" width="20%">
                    <Time time={invoice.createAt} />
                  </TableCell>
                  <TableCell align="center" width="30%">
                    <Button onClick={handleOpen}>Edit</Button>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DetailVoucher;
