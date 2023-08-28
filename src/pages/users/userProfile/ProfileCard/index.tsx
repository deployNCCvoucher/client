import { Box, Typography, Button, Chip } from "@mui/material";
import { useState } from "react";
import TabButton from "../TabButton";
import { NavLink } from "react-router-dom";

const ProfileCard = ({ user }: any) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: " column",
        gap: "26px",
        width: "100%",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: " column",
          gap: "4px",
          width: "100%",
          alignItems: "center",
        }}
      >
        <img
          src={user.userImage}
          alt="user avatar"
          style={{
            width: "25%",
            borderRadius: "50%",
          }}
        />
        <Typography
          sx={{ color: "#353657", fontSize: "30px", fontWeight: "700" }}
        >
          {user.name}
        </Typography>
        <Box sx={{ display: "flex", gap: "4px" }}>
          <Typography
            sx={{
              fontSize: "10px",
              fontWeight: "500",
              backgroundColor: "#a9a1c4",
              color: "#fff",
              borderRadius: "10px",
              padding: "4px",
            }}
          >
            {user.gmail}
          </Typography>
          <Typography
            sx={{
              fontSize: "10px",
              fontWeight: "500",
              backgroundColor: "#a9a1c4",
              color: "#fff",
              borderRadius: "10px",
              padding: "4px",
            }}
          >
            {user.role}
          </Typography>
        </Box>
        <Button
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "8px",
            backgroundColor: "#a9a1c4",
            borderRadius: "30px",
            marginTop: "8px",
            width: "85%",
          }}
        >
          <NavLink to={"/app/request"}>
            {" "}
            <Typography
              sx={{ color: "#fff", fontSize: "18px", fontWeight: "700" }}
            >
              Create new request
            </Typography>
          </NavLink>
        </Button>
      </Box>
      <Box sx={{ width: "100%" }}>
        <TabButton />
      </Box>
    </Box>
  );
};
export default ProfileCard;
