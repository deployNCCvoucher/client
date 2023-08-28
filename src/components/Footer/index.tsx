import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography sx={{ fontSize: "12px", color: "#fff" }}>
        2023 Copyright
      </Typography>
    </Box>
  );
};
export default Footer;
