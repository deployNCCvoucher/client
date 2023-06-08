import { Box, Button } from "@mui/material";
import DetailsVoucher from "../../../users/myProfile/detailsVoucher/DetailsVoucher";

export const ItemsRequest = () => {
  return (
    <Box>
      <DetailsVoucher admin={true} codeVoucher={0} />
    </Box>
  );
};
