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
} from "@mui/material";
import Time from "../../../../components/time/Time";
import Image from "../../../../components/imageFirebase/Image";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../redux/hook/useTypedSeletor";
import EditModal from "../../../../components/modal/Modal";
import { Fragment, useState } from "react";
import { ModalsAdmin } from "../../../admin/components/ModalsAdmin/ModalsAdmin";
import { ActionButton } from "../../../admin/components/ActionButton/ActionButton";
import {
  Invoice,
  setCurrentInvoice,
} from "../../../../redux/invoice/invoiceSlide";
interface TableDetailsInter {
  adminHistory?: boolean;
  admin?: boolean;
  dataMap: Invoice[];
}
interface InvoiceObjectInter {
  id: number;
  status: string;
  checkBy: number;
  checkAt: string;
  userId: number;
  totalAvailable: number;
}

export const TableDetails: React.FC<TableDetailsInter> = ({
  adminHistory,
  admin,
  dataMap,
}) => {
  const invoice = useAppSelector((state) => state.invoice);
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const [idEdit, setIdEdit] = useState<{}>({});

  const dispatch = useAppDispatch();

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
  const [invoiceObject, setInvoiceObject] = useState<
    InvoiceObjectInter | undefined
  >();
  const [openModalAdmin, setOpenModalAdmin] = useState(false);

  const handleCloseModalAdmin = () => {
    setOpenModalAdmin(false);
  };

  const handleModalAdmin = (
    id: number,
    status: string,
    type: string,
    userId: number
  ) => {
    setInvoiceObject({
      id: id,
      status: status,
      checkBy: currentUser.id,
      checkAt: new Date().toISOString(),
      userId: userId,
      totalAvailable: +type.split("k")[0],
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
          <TableRow
            sx={{
              "& .MuiTableCell-root": {
                p: "11px 0px",
                color: "var(--secondary-color)",
              },
            }}
          >
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
          {dataMap?.map((invoice: Invoice, index: number) => (
            <Fragment key={index}>
              <TableRow>
                {adminHistory && (
                  <TableCell align="center" width="10%">
                    {invoice.checkBy?.gmail?.split("@")[0]}
                  </TableCell>
                )}
                <TableCell align="center" width="10%">
                  {invoice.createBy?.gmail?.split("@")[0]}
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
                      style={{
                        backgroundColor: "rgb(22, 146, 196)",
                        color: "white",
                      }}
                    />
                  ) : invoice.status === "approve" ? (
                    <Chip
                      label="Approved"
                      style={{
                        backgroundColor: "rgb(255, 151, 224)",
                        color: "white",
                      }}
                    />
                  ) : (
                    <Chip
                      label="Rejected"
                      style={{
                        backgroundColor: "rgb(211, 67, 62)",
                        color: "white",
                      }}
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
                        sx={{
                          mr: "8px",
                          backgroundColor: "rgb(255, 151, 224)",
                          color: "#fff",
                        }}
                        onClick={() => {
                          handleModalAdmin(
                            invoice.id,
                            "approve",
                            invoice.reducedType,
                            +invoice.createBy.id
                          );
                        }}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "rgb(175, 54, 50)",
                          color: "#fff",
                        }}
                        onClick={() => {
                          handleModalAdmin(
                            invoice.id,
                            "reject",
                            invoice.reducedType,
                            +invoice.createBy.id
                          );
                        }}
                      >
                        Reject
                      </Button>
                    </Box>
                  ) : adminHistory ? (
                    <Box>
                      {invoice.status === "reject" ? (
                        <ActionButton
                          invoice={invoice}
                          handleModalAdmin={handleModalAdmin}
                        />
                      ) : (
                        <Button disabled>Action</Button>
                      )}
                    </Box>
                  ) : invoice.status === "approve" ? (
                    <Button disabled sx={{ cursor: "default" }}>
                      Edit
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        handleSetEdit(invoice.id, invoice.image);
                        handleOpen();
                        dispatch(setCurrentInvoice(invoice));
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
          invoice={invoice}
          open={openModal}
          handleOpen={handleOpen}
          handleClose={handleClose}
        />
        <ModalsAdmin
          admin={admin}
          open={openModalAdmin}
          invoiceObject={invoiceObject}
          handleClose={handleCloseModalAdmin}
        />
      </Table>
    </TableContainer>
  );
};
