import { Box, Typography, Divider, Tab, Tabs } from "@mui/material";
import Chart from "../../../../components/Chart/Chart";
import React from "react";
import { DetailsMoney } from "../Function/DetailsMoney";
import { useAppSelector } from "../../../../redux/hook/useTypedSeletor";

export const NoResponse = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <img
        src="../images/chart.png"
        alt="coupon"
        style={{ width: "93%", margin: "auto" }}
      />
      <Typography sx={{ color: "#353657", fontSize: "18px" }}>
        NO RESPONSE DATA ...
      </Typography>
    </Box>
  );
};

const ChartTab = () => {
  const invoice = useAppSelector((state) => state.invoice.userInvoice);
  const value = useAppSelector((state) => state.invoice.overview);
  console.log("value", invoice);
  const total = DetailsMoney(invoice);
  console.log("Total", total);
  const data = {
    labels: ["Approved", "Pending", "Reject"],
    datasets: [
      {
        label: "request",
        data:
          value === 1
            ? [total[3].approve, total[3].pending, total[3].reject]
            : value === 2
            ? [total[0].approve, total[0].pending, total[0].reject]
            : value === 3
            ? [total[1].approve, total[1].pending, total[1].reject]
            : [total[2].approve, total[2].pending, total[2].reject],
        backgroundColor: [
          "rgb(255, 151, 224)",
          "rgb(22, 146, 196)",
          "rgb(211, 67, 62)",
        ],
        borderColor: [
          "rgb(253, 106, 209)",
          "rgb(7, 118, 161)",
          "rgb(175, 54, 50)",
        ],
        borderWidth: 5,
      },
    ],
  };

  return (
    <Box
      sx={{
        height: "100%",
        border: "5px solid #a9a1c4",
        borderRadius: "35px",
        padding: "20px",
      }}
    >
      <Box sx={{ width: "60%", margin: "auto" }}>
        {value === 1 && total[3].total !== 0 && <Chart data={data} />}
        {value === 1 && total[3].total === 0 && <NoResponse />}
        {value === 2 && total[0].total !== 0 && <Chart data={data} />}
        {value === 2 && total[0].total === 0 && <NoResponse />}
        {value === 3 && total[1].total !== 0 && <Chart data={data} />}
        {value === 3 && total[1].total === 0 && <NoResponse />}
        {value === 4 && total[2].total !== 0 && <Chart data={data} />}
        {value === 4 && total[2].total === 0 && <NoResponse />}
      </Box>
    </Box>
  );
};
export default ChartTab;
