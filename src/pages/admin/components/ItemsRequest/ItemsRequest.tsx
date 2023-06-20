import { Box } from "@mui/material";
import DetailVoucher from "../../../users/profile/detailVoucher/DetailVoucher";
interface ItemsRequestInter {
  adminHistory?: boolean;
}

export const ItemsRequest: React.FC<ItemsRequestInter> = ({ adminHistory }) => {
  return (
    <Box>
      {adminHistory ? (
        <DetailVoucher adminHistory={adminHistory} />
      ) : (
        <DetailVoucher admin={true} adminHistory={false}/>
      )}
    </Box>
  );
};
