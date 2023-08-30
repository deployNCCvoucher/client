import { Box, Typography } from "@mui/material";
import { useState } from "react";
import KeyboardDoubleArrowRightTwoToneIcon from "@mui/icons-material/KeyboardDoubleArrowRightTwoTone";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../redux/hook/useTypedSeletor";
import { setOverview } from "../../../../redux/invoice/invoiceSlide";

export const Icon = () => {
  return (
    <KeyboardDoubleArrowRightTwoToneIcon
      sx={{
        fontSize: "18px",
        "@media (max-width: 768px)": { fontSize: "14px" },
      }}
    />
  );
};

const TabButton = () => {
  const value = useAppSelector((state) => state.invoice.overview);
  const dispatch = useAppDispatch();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        flexDirection: "column",
        "@media (max-width: 1024px)": {
          flexDirection: "row",
        },
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
          borderTopLeftRadius: "20px",
          borderBottomLeftRadius: "20px",
          gap: "4px",
          "@media (max-width: 1024px)": {
            flex: 1,
            borderTopLeftRadius: "20px",
            borderBottomLeftRadius: "0px",
            fontSize: value === 1 ? "12px" : "10px",
            padding: "6px",
          },
        }}
        onClick={() => dispatch(setOverview(1))}
      >
        {value === 1 && <Icon />}
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
          borderTopLeftRadius: "20px",
          borderBottomLeftRadius: "20px",
          backgroundColor: value === 2 ? "#a9a1c4" : "",
          "@media (max-width: 1024px)": {
            flex: 1,
            borderTopLeftRadius: "0px",
            borderBottomLeftRadius: "0px",
            fontSize: value === 2 ? "12px" : "10px",
            padding: "6px",
          },
        }}
        onClick={() => dispatch(setOverview(2))}
      >
        {value === 2 && <Icon />}
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
          borderTopLeftRadius: "20px",
          borderBottomLeftRadius: "20px",
          backgroundColor: value === 3 ? "#a9a1c4" : "",
          "@media (max-width: 1024px)": {
            flex: 1,
            borderTopLeftRadius: "0px",
            borderBottomLeftRadius: "0px",
            fontSize: value === 3 ? "12px" : "10px",
            padding: "6px",
          },
        }}
        onClick={() => dispatch(setOverview(3))}
      >
        {value === 3 && <Icon />}
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
          borderTopLeftRadius: "20px",
          borderBottomLeftRadius: "20px",
          "@media (max-width: 1024px)": {
            flex: 1,
            borderTopLeftRadius: "0px",
            borderBottomLeftRadius: "0px",
            borderTopRightRadius: "20px",
            fontSize: value === 4 ? "12px" : "10px",
            padding: "6px",
          },
        }}
        onClick={() => dispatch(setOverview(4))}
      >
        {value === 4 && <Icon />}
        Type 100
      </Typography>
    </Box>
  );
};
export default TabButton;
