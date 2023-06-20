import {
  Box,
  Button,
  Grid,
  Paper,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { MultipleSelect } from "../../../components/select/MultipleSelect";
import DetailVoucher from "./detailVoucher/DetailVoucher";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../redux/hook/useTypedSeletor";
import { DetailsMoney } from "./Function/DetailsMoney";
import { Information } from "./Information/Information";
import {
  setMonthFilter,
  setTypeFilter,
  setYearFilter,
} from "../../../redux/invoice/invoiceSlide";
import { FreshPage } from "../../../components/FreshPage/FreshPage";

const Profile = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.currentUser);
  const invoice = useAppSelector((state) => state.invoice.userInvoice);
  const month = useAppSelector((state) => state.invoice.month);
  const year = useAppSelector((state) => state.invoice.year);
  const total = DetailsMoney(invoice);

  const handleChangeMonth = (event: SelectChangeEvent) => {
    dispatch(setMonthFilter(event.target.value));
  };

  const handleChangeYear = (event: SelectChangeEvent) => {
    dispatch(setYearFilter(event.target.value));
  };
  
  const handleTypeVoucher = (data: string) => {
    dispatch(setTypeFilter(data))
  };
  //

  const typeVoucher = useAppSelector((state) => state.invoice.typeVoucher);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3.5}>
          <Information user={user} />
        </Grid>
        <Grid item xs={12} md={8.5}>
          <Box sx={{ width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mb: "25px",
                alignItems: "center",
              }}
            >
              <MultipleSelect
                type="Months"
                handleChange={handleChangeMonth}
                time={month}
              />
              <MultipleSelect
                type="Years"
                handleChange={handleChangeYear}
                time={year}
              />
              <FreshPage />
            </Box>
            <TableContainer
              component={Paper}
              sx={{ boxShadow: "0 5px 15px rgba(0,0,0,.35)", p: "0 15px" }}
            >
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow sx={{ "& .MuiTableCell-root": { p: "11px 0px" } }}>
                    <TableCell align="center">Voucher</TableCell>
                    <TableCell align="center">
                      <Typography sx={{ color: "#ff9800", fontWeight: "700" }}>
                        Request
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography sx={{ color: "#4caf50", fontWeight: "700" }}>
                        Approved
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography sx={{ color: "#f44336", fontWeight: "700" }}>
                        Reject
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography sx={{ color: "#607d8b", fontWeight: "700" }}>
                        Pending
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography sx={{ color: "#3f51b5", fontWeight: "700" }}>
                        Money
                      </Typography>
                    </TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody sx={{ "& .MuiTableCell-root": { p: " 16px" } }}>
                  {total.map((item, index) => {
                    return (
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center">
                          {index == 0
                            ? "Type 30k"
                            : index == 1
                            ? "Type 50k"
                            : index == 2
                            ? "Type 100k"
                            : "Total"}
                        </TableCell>
                        <TableCell align="center">
                          <Typography
                            sx={{ color: "#ff9800", fontWeight: "700" }}
                          >
                            {item.total}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography
                            sx={{ color: "#4caf50", fontWeight: "700" }}
                          >
                            {item.approve}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography
                            sx={{ color: "#f44336", fontWeight: "700" }}
                          >
                            {item.reject}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography
                            sx={{ color: "#607d8b", fontWeight: "700" }}
                          >
                            {item.pending}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography
                            sx={{ color: "#3f51b5", fontWeight: "700" }}
                          >
                            {item.money}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            size="small"
                            onClick={(e) =>
                              handleTypeVoucher(
                                index === 0
                                  ? "30k"
                                  : index == 1
                                  ? "50k"
                                  : index == 2
                                  ? "100k"
                                  : ""
                              )
                            }
                            variant="outlined"
                          >
                            details
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
      </Grid>
      <DetailVoucher type={typeVoucher}/>
    </>
  );
};

export default Profile;
