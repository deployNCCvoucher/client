import { Box } from "@mui/material";
import { useAppSelector } from "../../../redux/hook/useTypedSeletor";
import ProfileCard from "./ProfileCard";
import DetailVoucher from "../profile/detailVoucher/DetailVoucher";
import ChartTab from "./ChartTab";

const Profile = () => {
  const user = useAppSelector((state) => state.user.currentUser);

  return (
    <Box
      sx={{
        marginTop: "10px",
        background: "#ffffff",
        borderTopLeftRadius: " 50px",
        borderTopRightRadius: "50px",
        minHeight: "calc( 100vh - 100px)",
        padding: "32px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          cursor: "pointer",
          borderRadius: "40px",
        }}
      >
        <Box
          sx={{
            width: "32%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ProfileCard user={user} />
        </Box>
        <Box sx={{ flex: "1" }}>
          <Box sx={{ height: "100%" }}>
            <ChartTab />
          </Box>
        </Box>
      </Box>
      <DetailVoucher />
    </Box>
  );
};
export default Profile;
