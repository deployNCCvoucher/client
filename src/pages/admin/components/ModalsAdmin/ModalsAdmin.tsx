import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { Box, TextField, Typography } from "@mui/material";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../redux/hook/useTypedSeletor";
import {
  getInvoicesByFilter,
  updateInvoice,
} from "../../../../redux/invoice/invoiceAction";
import {
  getAllUser,
  updateAdmin,
  updateMoney,
} from "../../../../redux/user/userAction";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
interface ModalRejectInter {
  open: boolean;
  invoiceObject?: any;
  handleClose: () => void;
  admin?: boolean;
}

export const ModalsAdmin: React.FC<ModalRejectInter> = ({
  open,
  invoiceObject,
  handleClose,
  admin,
}) => {
  const users = useAppSelector((state) => state.user.users);
  const page = useAppSelector((state) => state.invoice.page);
  const limit = useAppSelector((state) => state.invoice.limit);
  const month = useAppSelector((state) => state.invoice.month);
  const year = useAppSelector((state) => state.invoice.year);
  const type = useAppSelector((state) => state.invoice.typeVoucher);
  const [reason, setReason] = React.useState<string>("");
  const dispatch = useAppDispatch();

  const handleSumitReject = async () => {
    if (reason) {
      await dispatch(
        updateInvoice({
          id: invoiceObject.id,
          checkBy: invoiceObject.checkBy,
          status: "reject",
          note: reason,
          checkAt: new Date().toISOString(),
        })
      );
      if (admin) {
        await dispatch(getInvoicesByFilter({ page, limit, status: "pending" }));
      } else {
        await dispatch(getInvoicesByFilter({ page, limit, type, month, year }));
      }
      setReason("");
      handleClose();
    }
  };

  console.log('admin', admin)

  const handleApprove = async () => {
    const dataApprove = {
      id: invoiceObject.id,
      status: "approve",
      note: null,
      checkBy: invoiceObject.checkBy,
      checkAt: new Date().toISOString(),
    };
    await dispatch(
      updateMoney({
        id: invoiceObject.userId,
        totalReduce: +invoiceObject.totalReduce,
      })
    );
    await dispatch(updateInvoice(dataApprove));
    if (admin) {
      await dispatch(getInvoicesByFilter({ page, limit, status: "pending" }));
    } else {
      await dispatch(getInvoicesByFilter({ page, limit, type, month, year }));
    }
    handleClose();
  };

  const handleSumitAdmin = async () => {
    if (reason) {
      if (reason.includes("@")) {
        const acount = reason.split("@")[0];
        const acountCheck = users.filter(
          (item) => item.gmail.split("@")[0] === acount
        );
        if (acountCheck.length) {
          await dispatch(updateAdmin({ id: acountCheck[0].id, role: "admin" }));
        } else {
          toast.error("Account not found!");
        }
      } else {
        const acountCheck = users.filter(
          (item) => item.gmail.split("@")[0] === reason
        );
        if (acountCheck.length) {
          await dispatch(updateAdmin({ id: acountCheck[0].id, role: "admin" }));
        } else {
          toast.error("Account not found!");
        }
      }
      setReason("");
      handleClose();
    }
  };
  useEffect(() => {
    dispatch(getAllUser());
  }, []);
  return (
    <Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box sx={{ width: "500px", p: "36px" }}>
          {invoiceObject?.status !== "approve" ? (
            <Box>
              <Typography sx={{ mb: "24px" }} variant="h5">
                {admin
                  ? "Enter account name:"
                  : "Reason for invoice rejection:"}
              </Typography>
              <TextField
                value={reason}
                error={!reason}
                onChange={(e) => setReason(e.target.value)}
                sx={{ width: 1 }}
                id="standard-basic"
                variant="standard"
                helperText={!reason && "required *"}
              />
            </Box>
          ) : (
            <Box>
              <Typography variant="h5">
                Confirm Approve this invoice?
              </Typography>
            </Box>
          )}

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: "24px" }}>
            <Button
              variant="contained"
              color="error"
              onClick={
                admin && !invoiceObject
                  ? handleSumitAdmin
                  : invoiceObject?.status === "reject"
                  ? handleSumitReject
                  : handleApprove
              }
            >
              {invoiceObject?.status === "reject" ? "Send" : "Confirm"}
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
};
