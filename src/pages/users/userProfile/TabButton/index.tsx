import { Box, Typography } from "@mui/material";
import { useState } from "react";
import KeyboardDoubleArrowRightTwoToneIcon from "@mui/icons-material/KeyboardDoubleArrowRightTwoTone";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../redux/hook/useTypedSeletor";
import { setOverview } from "../../../../redux/invoice/invoiceSlide";

const TabButton = () => {
  const value = useAppSelector((state) => state.invoice.overview);
  const dispatch = useAppDispatch();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        flexDirection: "column",
      }}
    >
      <Typography
        sx={{
          color: value === 1 ? "#fff" : "#9597b6",
          fontSize: value === 1 ? "16px" : "14px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "12px",
          backgroundColor: value === 1 ? "#a9a1c4" : "",
        }}
        onClick={() => dispatch(setOverview(1))}
      >
        {value === 1 && <KeyboardDoubleArrowRightTwoToneIcon />}
        OverView
      </Typography>
      <Typography
        sx={{
          color: value === 2 ? "#fff" : "#9597b6",
          fontSize: value === 2 ? "16px" : "14px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "12px",
          backgroundColor: value === 2 ? "#a9a1c4" : "",
        }}
        onClick={() => dispatch(setOverview(2))}
      >
        {value === 2 && <KeyboardDoubleArrowRightTwoToneIcon />}
        Type 30
      </Typography>
      <Typography
        sx={{
          color: value === 3 ? "#fff" : "#9597b6",
          fontSize: value === 3 ? "16px" : "14px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "12px",
          backgroundColor: value === 3 ? "#a9a1c4" : "",
        }}
        onClick={() => dispatch(setOverview(3))}
      >
        {value === 3 && <KeyboardDoubleArrowRightTwoToneIcon />}
        Type 50
      </Typography>
      <Typography
        sx={{
          color: value === 4 ? "#fff" : "#9597b6",
          fontSize: value === 4 ? "16px" : "14px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: value === 4 ? "#a9a1c4" : "",
          padding: "12px",
        }}
        onClick={() => dispatch(setOverview(4))}
      >
        {value === 4 && <KeyboardDoubleArrowRightTwoToneIcon />}
        Type 100
      </Typography>
    </Box>
  );
};
export default TabButton;
