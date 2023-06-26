import {
  Box,
  Button,
  Dialog,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Invoice } from "../../../../redux/invoice/invoiceSlide";
import {
  getInvoicesByFilter,
  updateInvoice,
} from "../../../../redux/invoice/invoiceAction";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../redux/hook/useTypedSeletor";

interface ActionButton {
  invoice: Invoice;
  handleModalAdmin: (
    id: number,
    status: string,
    type: string,
    userId: number,
    note: string
  ) => void;
}

export const ActionButton: React.FC<ActionButton> = ({
  invoice,
  handleModalAdmin,
}) => {
  const dispatch = useAppDispatch();
  const page = useAppSelector((state) => state.invoice.page);
  const limit = useAppSelector((state) => state.invoice.limit);
  const month = useAppSelector((state) => state.invoice.month);
  const year = useAppSelector((state) => state.invoice.year);
  const type = useAppSelector((state) => state.invoice.typeVoucher);
  const [valueEdit, setValueEdit] = useState(invoice.note);
  const [openEdit, setOpenEdit] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickOpenEdit = () => {
    setOpenEdit(true);
    handleClose();
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleSubmitEdit = async () => {
    if (valueEdit) {
      await dispatch(updateInvoice({ id: invoice.id, note: valueEdit }));
      await dispatch(getInvoicesByFilter({ page, limit, type, month, year }));
      setOpenEdit(false);
    }
  };

  return (
    <Box>
      <Button onClick={handleClick}>Action</Button>

      <Dialog
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box sx={{ width: "500px", p: "36px" }}>
          <Typography sx={{ mb: "24px" }} variant="h5">
            Edit note:
          </Typography>
          <TextField
            defaultValue={invoice.note}
            sx={{ width: 1 }}
            id="standard-basic"
            variant="standard"
            onChange={(e) => setValueEdit(e.target.value)}
            error={!valueEdit}
            helperText={!valueEdit && "required *"}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: '24px' }}>
            <Button
              variant="contained"
              color="error"
              onClick={handleSubmitEdit}
            >
              Send
            </Button>
          </Box>
        </Box>
      </Dialog>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClickOpenEdit}>Edit Note</MenuItem>

        <MenuItem
          onClick={() => {
            handleModalAdmin(
              invoice.id,
              "approve",
              invoice.reducedType,
              +invoice.createBy.id,
              invoice.note
            );
            handleClose();
          }}
        >
          Approve
        </MenuItem>
      </Menu>
    </Box>
  );
};
