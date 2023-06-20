import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Box,
  Button,
  MenuItem,
  Menu,
} from "@mui/material";
import Time from "../../../../components/time/Time";
import { Invoice } from "../../../../redux/invoice/invoiceSlide";
import Image from "../../../../components/imageFirebase/Image";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../redux/hook/useTypedSeletor";
import { updateInvoice } from "../../../../redux/invoice/invoiceAction";
import EditModal from "../../../../components/modal/Modal";
import { Fragment, useState } from "react";
import { ModalsAdmin } from "../../../admin/components/ModalsAdmin/ModalsAdmin";
import { updateMoney } from "../../../../redux/user/userAction";
import { ActionButton } from "../../../admin/components/ActionButton/ActionButton";
interface TableDetailsInter {
  adminHistory?: boolean;
  admin?: boolean;
  dataMap: any;
}

export const TableDetails: React.FC<TableDetailsInter> = ({
  adminHistory,
  dataMap,
  admin,
}) => {
  const invoice = useAppSelector((state) => state.invoice);
  const value = useAppSelector((state: any) => state.user);
  const { currentUser } = value;
  const users = useAppSelector((state) => state.user.users);
  const dispatch = useAppDispatch();
  const [idEdit, setIdEdit] = useState<{}>({});

  // open modal edit for user
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleSetEdit = (id: number, image: string) => {
    setIdEdit({ id: id, image: image });
  };

  const handleClose = () => setOpenModal(false);

  // Approve - reject for admin
  const [invoiceObject, setInvoiceObject] = useState<any>({});
  const [openModalAdmin, setOpenModalAdmin] = useState(false);

  const handleCloseModalAdmin = () => {
    setOpenModalAdmin(false);
  };

  const handleModalAdmin = (
    id: number,
    typeModal: number,
    type: string,
    userId: number
  ) => {
    setInvoiceObject({
      id: id,
      status: typeModal === 1 ? "approve" : "reject",
      checkBy: currentUser.id,
      checkAt: new Date().toISOString(),
      userId: userId,
      totalReduce: +type.split("k")[0],
    });
    setOpenModalAdmin(true);
  };

  return (
    <TableContainer component={Paper} sx={{ p: "0 15px" }}>
      <Table
        size="small"
        aria-label="a dense table"
        sx={{ width: { xs: "700px", sm: "100%" } }}
      >
        <TableHead>
          <TableRow sx={{ "& .MuiTableCell-root": { p: "11px 0px" } }}>
            {adminHistory && <TableCell align="center">Verify By </TableCell>}
            <TableCell align="center">User</TableCell>
            <TableCell align="center">Image</TableCell>
            <TableCell align="center">Type</TableCell>
            <TableCell align="center">Status</TableCell>
            {!admin && <TableCell align="center">Note</TableCell>}
            <TableCell align="center">
              {adminHistory ? "Verify At" : "Upload At"}{" "}
            </TableCell>
            <TableCell align="center">{admin ? "Action" : "Edit"}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataMap.map((invoice: Invoice, index: number) => (
            <Fragment key={index}>
              <TableRow>
                {adminHistory && (
                  <TableCell align="center" width="10%">
                    {
                      (
                        users.filter(
                          (user: { id: number }) =>
                            +user.id === +invoice.checkBy
                        )[0]?.gmail + ""
                      ).split("@")[0]
                    }
                  </TableCell>
                )}
                <TableCell align="center" width="10%">
                  {
                    (
                      users.filter(
                        (user: { id: number }) => +user.id === +invoice.createBy
                      )[0]?.gmail + ""
                    ).split("@")[0]
                  }
                </TableCell>
                <TableCell
                  sx={{ cursor: "pointer" }}
                  align="center"
                  width="20%"
                >
                  <Image image={invoice.image} width="45px" height="auto" />
                </TableCell>
                <TableCell align="center" width="10%">
                  {invoice.reducedType === "30k" ? (
                    <Chip
                      label={invoice.reducedType}
                      style={{ backgroundColor: "#2196f3", color: "white" }}
                    />
                  ) : invoice.reducedType === "50k" ? (
                    <Chip
                      label={invoice.reducedType}
                      style={{ backgroundColor: "#ff9800", color: "white" }}
                    />
                  ) : (
                    <Chip
                      label={invoice.reducedType}
                      style={{ backgroundColor: "#673ab7", color: "white" }}
                    />
                  )}
                </TableCell>
                <TableCell align="center" width="20%">
                  {invoice.status === "pending" ? (
                    <Chip
                      label="Pending..."
                      style={{ backgroundColor: "#607d8b", color: "white" }}
                    />
                  ) : invoice.status === "approve" ? (
                    <Chip
                      label="Approved"
                      style={{ backgroundColor: "#4caf50", color: "white" }}
                    />
                  ) : (
                    <Chip
                      label="Rejected"
                      style={{ backgroundColor: "#f44336", color: "white" }}
                    />
                  )}
                </TableCell>
                {!admin && (
                  <TableCell align="center" width="20%">
                    {invoice.note
                      ? invoice.note
                      : invoice.status === "pending"
                      ? "Pending..."
                      : "Approved"}
                  </TableCell>
                )}
                <TableCell align="center" width="20%">
                  {adminHistory ? (
                    <Time time={invoice.checkAt} />
                  ) : (
                    <Time time={invoice.createAt} />
                  )}
                </TableCell>
                <TableCell align="center" width="30%">
                  {admin ? (
                    <Box sx={{ display: "flex" }}>
                      <Button
                        variant="contained"
                        sx={{ mr: "8px", backgroundColor: "#4caf50" }}
                        color="success"
                        onClick={() => {
                          handleModalAdmin(
                            invoice.id,
                            1,
                            invoice.reducedType,
                            +invoice.createBy
                          );
                        }}
                      >
                        Aprove
                      </Button>
                      <Button
                        variant="contained"
                        sx={{ backgroundColor: "#f44336" }}
                        color="error"
                        onClick={() => {
                          handleModalAdmin(
                            invoice.id,
                            2,
                            invoice.reducedType,
                            +invoice.createBy
                          );
                        }}
                      >
                        Reject
                      </Button>
                    </Box>
                  ) : adminHistory ? (
                    <Box>
                      {/* <ActionButton invoiceStatus={invoice.status} invoiceId={invoice.id}/> */}
                      <Button
                        onClick={() => {
                          handleModalAdmin(
                            invoice.id,
                            invoice.status === "reject" ? 1 : 2,
                            invoice.reducedType,
                            +invoice.createBy
                          );
                        }}
                      >
                        {invoice.status === "reject" ? "Approve" : "Reject"}
                      </Button>
                    </Box>
                  ) : (
                    <Button
                      onClick={() => {
                        handleSetEdit(invoice.id, invoice.image);
                        handleOpen();
                      }}
                    >
                      Edit
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            </Fragment>
          ))}
        </TableBody>
        <EditModal
          idEdit={idEdit}
          invoice={invoice}
          open={openModal}
          handleOpen={handleOpen}
          handleClose={handleClose}
        />
        <ModalsAdmin
          open={openModalAdmin}
          invoiceObject={invoiceObject}
          handleClose={handleCloseModalAdmin}
        />
      </Table>
    </TableContainer>
  );
};
