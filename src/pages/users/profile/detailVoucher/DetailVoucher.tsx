import { Box, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { getAllUser, getUser } from "../../../../redux/user/userAction";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../redux/hook/useTypedSeletor";
import {
  getAllInvoice,
  getInvoice,
} from "../../../../redux/invoice/invoiceAction";
import { TableDetails } from "./TableDetails";
import { PaginationComponent } from "../Pagination/Pagination";
import {
  setMonthFilter,
  setPageInvoice,
  setTypeFilter,
  setYearFilter,
} from "../../../../redux/invoice/invoiceSlide";
import { SearchUser } from "../../../admin/components/SearchUser/SearchUser";

interface IProps {
  admin?: boolean;
  adminHistory?: boolean;
  type?: string | number;
}

const DetailVoucher: React.FC<IProps> = ({ admin, adminHistory, type }) => {
  const dispatch = useAppDispatch();
  const pageTopRef = useRef(null);
  const dataMap = useAppSelector((state) => state.invoice.getInvoicesByFilter);
  console.log("data map", dataMap);

  const header = !type ? "Detail" : `Detail Type ${type}`;

  // Call api
  useEffect(() => {
    const userId = window.localStorage.getItem("idUser");
    const fetchData = async () => {
      if (userId) await dispatch(getUser(userId));
      !admin && (await dispatch(getInvoice(userId)));
    };
    fetchData();
  }, []);

  useEffect(() => {
    dispatch(setPageInvoice(1));
    dispatch(setTypeFilter(0));
    dispatch(setMonthFilter(0));
    dispatch(setYearFilter(0));
  }, [admin, adminHistory]);
  return (
    <Box sx={{ mt: "40px", pb: "40px" }} ref={pageTopRef}>
      <Typography
        component="h2"
        sx={{
          pb: "30px",
          textAlign: "center",
          lineHeight: "32px",
          color: "#353657",
          fontSize: "30px",
          fontWeight: "700",
        }}
      >
        {!admin && !adminHistory && header}
        {adminHistory && "History"}
      </Typography>
      {<SearchUser />}
      <Box>
        <TableDetails
          admin={admin}
          adminHistory={adminHistory}
          dataMap={dataMap}
        />
      </Box>
      {!dataMap.length && (
        <Box sx={{ textAlign: "center" }}>
          <Typography sx={{ pt: "36px", pb: "20px" }} variant="h5">
            No Data Response
          </Typography>
        </Box>
      )}
      <Box sx={{ mt: "14px" }}>
        <PaginationComponent
          request={admin}
          history={adminHistory}
          pageTopRef={pageTopRef}
        />
      </Box>
    </Box>
  );
};

export default DetailVoucher;
