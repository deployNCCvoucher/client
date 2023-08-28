import * as React from "react";
import Modal from "@mui/material/Modal";
import "react-toastify/dist/ReactToastify.css";
import Box from "@mui/material/Box";
import MyRequest from "../../pages/users/request";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  height: "80vh",
  overflowY: "scroll",
  borderRadius: "10px",
  "@media (max-width: 679px)": {
    width: "90%",
    p: 2,
  },
  "@media (max-width: 376px)": {
    width: "100%",
  },
  "&::-webkit-scrollbar": {
    width: "12px",
  },
  "&::webkit-scrollbar-track": {
    background: "transparent",
    marginLeft: "10px",
  },
  "&::-webkit-scrollbar-thumb": {
    borderRadius: "25px",
    background: "#ccc",
  },
};

interface ModalEditProp {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  invoice: any;
}

export default function EditModal({
  open,
  handleOpen,
  handleClose,
  invoice,
}: ModalEditProp) {
  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Box>
            <MyRequest
              modal={true}
              invoice={invoice}
              isEdit
              handleClose={handleClose}
            />
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
