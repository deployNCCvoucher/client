import { Box, Button, Typography } from "@mui/material";
import { ItemsRequest } from "../ItemsRequest/ItemsRequest";
import { useState } from "react";
import { ModalsAdmin } from "../ModalsAdmin/ModalsAdmin";
import { SearchUser } from "../SearchUser/SearchUser";
import { useAppDispatch } from "../../../../redux/hook/useTypedSeletor";
interface ListRequestInter {
  history?: boolean;
}
export const ListRequest: React.FC<ListRequestInter> = ({ history }) => {
  const [openNewAdmin, setOpenNewAdmin] = useState<boolean>(false);
  const handleOpenNewAdmin = () => {
    setOpenNewAdmin(true);
  };
  const handleCloseNewAdmin = () => {
    setOpenNewAdmin(false);
  };
  return (
    <Box
      sx={{
        marginTop: "10px",
        background: "#ffffff",
        borderTopLeftRadius: " 50px",
        borderTopRightRadius: "50px",
        padding: "32px",
        minHeight: "calc( 100vh - 100px )",
      }}
    >
      <ModalsAdmin
        admin
        open={openNewAdmin}
        handleClose={handleCloseNewAdmin}
      />
      {!history && (
        <Box>
          <Typography
            component="h2"
            sx={{
              pb: "30px",
              textAlign: "center",
              lineHeight: "32px",
              color: "#353657",
              fontSize: "30px",
              fontWeight: "700",
              m: "8px 0px",
            }}
          >
            List Request
          </Typography>
          <Button
            size="large"
            sx={{
              backgroundColor: "var(--secondary-color)",
              mr: "8px",
              color: "#fff",
            }}
            onClick={handleOpenNewAdmin}
          >
            New admin
          </Button>
        </Box>
      )}
      <Box>
        <ItemsRequest adminHistory={history} />
      </Box>
    </Box>
  );
};
