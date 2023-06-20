import { Box, Button, Pagination, PaginationItem } from "@mui/material";
import { useState, useEffect, SetStateAction } from "react";
import { getInvoicesByFilter } from "../../../../redux/invoice/invoiceAction";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../redux/hook/useTypedSeletor";
import { setPageInvoice, setTotalCountInvoice } from "../../../../redux/invoice/invoiceSlide";

interface PaginationComponentInter {
  history?: boolean;
  request?: boolean;
}

export const PaginationComponent: React.FC<PaginationComponentInter> = ({
  history,
  request
}) => {
  const dispatch = useAppDispatch();
  const userId = window.localStorage.getItem("idUser")!;
  const page = useAppSelector((state) => state.invoice.page);
  const limit = useAppSelector((state) => state.invoice.limit);
  const totalCount = useAppSelector((state) => state.invoice.totalCount);
  const type = useAppSelector((state) => state.invoice.typeVoucher);
  const month = useAppSelector((state) => state.invoice.month);
  const year = useAppSelector((state) => state.invoice.year);

  const getDataInvoicesFilter = async () => {
    if (request) {
      const data = await dispatch(
        getInvoicesByFilter({ page, limit, status: "pending" })
      );
      dispatch(setTotalCountInvoice(data.payload?.totalCount));
    } else if (history) {
      const data = await dispatch(
        getInvoicesByFilter({ page, limit, type, month, year })
      );
      dispatch(setTotalCountInvoice(data.payload?.totalCount));
    } else {
      const data = await dispatch(
        getInvoicesByFilter({ page, userId: +userId, limit, type, month, year })
      );
      dispatch(setTotalCountInvoice(data.payload?.totalCount));
    }
  };

  useEffect(() => {
    getDataInvoicesFilter();
  }, [page, limit, type, month, year]);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    dispatch(setPageInvoice(value));
  };
  return (
    <Box>
      <Pagination
        page={page}
        count={Math.ceil(totalCount / limit)}
        onChange={handleChangePage}
      />
    </Box>
  );
};
