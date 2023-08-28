import { Avatar, Box, Divider, Typography, Button } from "@mui/material";
import {
  useAppDispatch,
  useAppSelector,
} from "../../redux/hook/useTypedSeletor";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import { logOut } from "../../redux/user/userSlide";
import { NavLink } from "react-router-dom";

const DiaLogNavbar = () => {
  const user = useAppSelector((state) => state.user.currentUser);
  const dispatch = useAppDispatch();
  const onSuccess = () => {
    dispatch(logOut());
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        borderRadius: "5px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <NavLink to={"/app/myProfile"}>
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            padding: "14px 14px 16px 14px",
            alignItems: "center",
            justyfyContent: "flex-start",
          }}
        >
          <Avatar alt="Remy Sharp" src={user.userImage} />
          <Typography
            sx={{ color: "#353657", fontSize: "14px", fontWeight: "500" }}
          >
            {user.name}
          </Typography>
        </Box>
      </NavLink>

      <Divider />
      <Button
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "16px 14px 14px 14px",
          justifyContent: "flex-start",
        }}
        onClick={onSuccess}
      >
        <Typography
          sx={{ color: "#353657", fontSize: "14px", fontWeight: "500" }}
        >
          Logout
        </Typography>
        <ExitToAppOutlinedIcon sx={{ color: "#353657" }} />
      </Button>
    </Box>
  );
};
export default DiaLogNavbar;
