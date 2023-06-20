import { Box, Button, Typography } from "@mui/material";
import { ItemsRequest } from "../ItemsRequest/ItemsRequest";
import { useEffect, useState } from "react";
import { ModalsAdmin } from "../ModalsAdmin/ModalsAdmin";
import { SearchUser } from "../SearchUser/SearchUser";
import { useAppDispatch } from "../../../../redux/hook/useTypedSeletor";
import { getInvoicesByFilter } from "../../../../redux/invoice/invoiceAction";
import { FreshPage } from "../../../../components/FreshPage/FreshPage";
interface ListRequestInter {
  history?: boolean;
}

export const ListRequest: React.FC<ListRequestInter> = ({ history }) => {
  const dispatch = useAppDispatch();

  const [openNewAdmin, setOpenNewAdmin] = useState<boolean>(false);
  const handleOpenNewAdmin = () => {
    setOpenNewAdmin(true);
  };
  const handleCloseNewAdmin = () => {
    setOpenNewAdmin(false);
  };

  return (
    <Box>
      <ModalsAdmin
        admin
        open={openNewAdmin}
        handleClose={handleCloseNewAdmin}
      />
      <Typography
        variant="h5"
        style={{
          fontWeight: "700",
          color: "var(--secondary-color)",
          fontSize: "30px",
        }}
      >
        {history ? "HISTORY" : "ADMIN"}
      </Typography>
      {!history && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: "24px",
          }}
        >
          <Typography variant="h5">Lists requested</Typography>
          <Box sx={{display: 'flex'}}>
            <Button
              size="large"
              variant="contained"
              sx={{ backgroundColor: "#f44336", mr: '8px' }}
              onClick={handleOpenNewAdmin}
            >
              New admin
            </Button>
            <FreshPage />
          </Box>
        </Box>
      )}
      {history && <SearchUser />}
      <Box>
        <ItemsRequest adminHistory={history} />
      </Box>
    </Box>
  );
};
