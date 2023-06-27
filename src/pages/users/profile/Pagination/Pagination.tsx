import { Box, Pagination } from "@mui/material";
import { useEffect } from "react";
import { getInvoicesByFilter } from "../../../../redux/invoice/invoiceAction";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../redux/hook/useTypedSeletor";
import {
  setPageInvoice,
  setTotalCountInvoice,
} from "../../../../redux/invoice/invoiceSlide";
import { getAllUserPagin } from "../../../../redux/user/userAction";

interface PaginationComponentInter {
  history?: boolean;
  request?: boolean;
  pageTopRef?: any;
  user?: boolean;
}

export const PaginationComponent: React.FC<PaginationComponentInter> = ({
  history,
  request,
  pageTopRef,
  user,
}) => {
  const dispatch = useAppDispatch();
  const userId = window.localStorage.getItem("idUser")!;
  const page = useAppSelector((state) => state.invoice.page);
  const limit = useAppSelector((state) => state.invoice.limit);
  const totalCount = useAppSelector((state) => state.invoice.totalCount);
  const type = useAppSelector((state) => state.invoice.typeVoucher);
  const month = useAppSelector((state) => state.invoice.month);
  const year = useAppSelector((state) => state.invoice.year);
  const search = useAppSelector((state) => state.user.searchUserValue);

  const getDataInvoicesFilter = async () => {
    if (request) {
      const data = await dispatch(
        getInvoicesByFilter({ page, limit, status: "pending" })
      );
      dispatch(setTotalCountInvoice(data.payload?.totalCount));
    } else if (history) {
      if (search) {
        const data = await dispatch(
          getInvoicesByFilter({ page, limit, type, search, month, year })
        );
        dispatch(setTotalCountInvoice(data.payload?.totalCount));
      } else {
        const data = await dispatch(
          getInvoicesByFilter({ page, limit, type, month, year })
        );
        dispatch(setTotalCountInvoice(data.payload?.totalCount));
      }
    } else if (user) {
      const data = await dispatch(getAllUserPagin({ page, limit }));
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
  }, [page, limit, type, month, year, search]);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    dispatch(setPageInvoice(value));
    pageTopRef?.current.scrollIntoView();
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
