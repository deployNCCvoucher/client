import { Box, Typography } from "@mui/material";
import Request, { RequestProps } from "./Request/Request";
import Rule from "./Rule";

const MyRequest = (props: RequestProps) => {
  const { modal } = props;
  return (
    <Box
      sx={{
        background: "#ffffff",
        borderTopLeftRadius: " 50px",
        borderTopRightRadius: "50px",
        padding: "32px",
        minHeight: "calc( 100vh - 80px)",
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
        Create Request
      </Typography>
      {!modal && <Rule />}
      <Request {...props} />
    </Box>
  );
};
export default MyRequest;
