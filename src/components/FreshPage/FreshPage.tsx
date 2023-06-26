import { Box, Button } from "@mui/material";

export const FreshPage = () => {
  const refreshPage = () => {
    window.location.reload();
  };
  return (
    <Box>
      <Button sx={{ height: "45px" }} variant='outlined' color="error" onClick={refreshPage}>
        Refresh Page
      </Button>
    </Box>
  );
};
