import { Box, Button, Tooltip, Typography } from "@mui/material";
import { ItemsRequest } from "../ItemsRequest/ItemsRequest";
import { useState } from "react";
import { ModalsAdmin } from "../ModalsAdmin/ModalsAdmin";
import { SearchUser } from "../SearchUser/SearchUser";
import { useAppDispatch } from "../../../../redux/hook/useTypedSeletor";
import MoreVertIcon from "@mui/icons-material/MoreVert";
interface ListRequestInter {
  history?: boolean;
}
export const ListRequest: React.FC<ListRequestInter> = ({ history }) => {
  const [openNewAdmin, setOpenNewAdmin] = useState<boolean>(false);
  const [modalAdmin, setModalAdmin] = useState<boolean>(false);
  const handleOpenNewAdmin = () => {
    setOpenNewAdmin(true);
  };
  const handleCloseNewAdmin = () => {
    setOpenNewAdmin(false);
  };
  return (
    <Box
      sx={{
        background: "#ffffff",
        borderTopLeftRadius: " 50px",
        borderTopRightRadius: "50px",
        padding: "32px",
        minHeight: "calc( 100vh - 80px )",
        "@media (max-width: 1024px)": {
          padding: "24px",
          borderTopLeftRadius: " 30px",
          borderTopRightRadius: "30px",
        },
        "@media (max-width: 768px)": {
          padding: "16px",
          borderTopLeftRadius: " 0px",
          borderTopRightRadius: "0px",
        },
      }}
    >
      <ModalsAdmin
        admin
        open={openNewAdmin}
        handleClose={handleCloseNewAdmin}
      />
      {!history && (
        <Box
          sx={{
            width: "100%",
            position: "relative",
          }}
        >
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
          <Box sx={{ position: "absolute", right: "0", top: "0" }}>
            <Tooltip title="New admin">
              <MoreVertIcon
                sx={{
                  color: "#353657",
                  fontSize: "30px",
                  cursor: "pointer",
                }}
                onClick={handleOpenNewAdmin}
              />
            </Tooltip>
          </Box>
        </Box>
      )}
      <Box>
        <ItemsRequest adminHistory={history} />
      </Box>
    </Box>
  );
};
