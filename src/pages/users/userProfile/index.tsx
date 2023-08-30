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
        background: "#ffffff",
        borderTopLeftRadius: " 50px",
        borderTopRightRadius: "50px",
        minHeight: "calc( 100vh - 80px)",
        padding: "32px",
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
      <Box
        sx={{
          display: "flex",
          cursor: "pointer",
          borderRadius: "40px",
          "@media (max-width: 1024px)": {
            flexDirection: "column",
          },
        }}
      >
        <Box
          sx={{
            width: "32%",
            display: "flex",
            justifyContent: "center",
            "@media (max-width: 1024px)": {
              width: "100%",
            },
          }}
        >
          <ProfileCard user={user} />
        </Box>
        <Box
          sx={{
            flex: "1",
          }}
        >
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
