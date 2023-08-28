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
import { DetailsMoney } from "../userProfile/Function/DetailsMoney";
import { Information } from "./Information/Information";
import {
  setMonthFilter,
  setPageInvoice,
  setTypeFilter,
  setYearFilter,
} from "../../../redux/invoice/invoiceSlide";

const Profile = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.currentUser);
  const invoice = useAppSelector((state) => state.invoice.userInvoice);
  const month = useAppSelector((state) => state.invoice.month);
  const year = useAppSelector((state) => state.invoice.year);

  const handleChangeMonth = (event: SelectChangeEvent) => {
    dispatch(setPageInvoice(1));
    dispatch(setMonthFilter(event.target.value));
  };

  const handleChangeYear = (event: SelectChangeEvent) => {
    dispatch(setPageInvoice(1));
    dispatch(setYearFilter(event.target.value));
  };

  const handleTypeVoucher = (data: string) => {
    dispatch(setPageInvoice(1));
    dispatch(setTypeFilter(data));
  };
  //

  const typeVoucher = useAppSelector((state) => state.invoice.typeVoucher);
  let checkColor = -1;
  typeVoucher === "30k"
    ? (checkColor = 0)
    : typeVoucher === "50k"
    ? (checkColor = 1)
    : typeVoucher === "100k"
    ? (checkColor = 2)
    : (checkColor = 4);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: "25px",
          alignItems: "center",
        }}
      >
        {/* <Box>
          <Typography
            variant="h5"
            style={{
              fontWeight: "700",
              color: "var(--secondary-color)",
              fontSize: "30px",
            }}
          >
            MY PROFILE
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "60%",
            justifyContent: "flex-end",
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
        </Box> */}
        {/* <Box>
          <Chart />
        </Box> */}
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {/* <Information user={user} /> */}
        </Grid>
        <Grid item xs={12} md={8.5}>
          <Box sx={{ width: "100%" }}>
            {/* <TableContainer
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
                        key={index}
                      >
                        <TableCell align="center">
                          {index === 0
                            ? "Type 30k"
                            : index === 1
                            ? "Type 50k"
                            : index === 2
                            ? "Type 100k"
                            : index === 3
                            ? "Amount used"
                            : "Total"}
                        </TableCell>
                        <TableCell align="center">
                          <Typography
                            sx={{ color: "#ff9800", fontWeight: "700" }}
                          >
                            {index === 3 ? "-" : item.total}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography
                            sx={{ color: "#4caf50", fontWeight: "700" }}
                          >
                            {index === 3 ? "-" : item.approve}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography
                            sx={{ color: "#f44336", fontWeight: "700" }}
                          >
                            {index === 3 ? "-" : item.reject}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography
                            sx={{ color: "#607d8b", fontWeight: "700" }}
                          >
                            {index === 3 ? "-" : item.pending}
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
                          {index !== 3 && (
                            <Button
                              color={checkColor === index ? `error` : "primary"}
                              size="small"
                              onClick={(e) =>
                                handleTypeVoucher(
                                  index === 0
                                    ? "30k"
                                    : index === 1
                                    ? "50k"
                                    : index === 2
                                    ? "100k"
                                    : ""
                                )
                              }
                              variant="outlined"
                            >
                              details
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer> */}
          </Box>
        </Grid>
      </Grid>

      {/* <DetailVoucher type={typeVoucher} /> */}
    </>
  );
};

export default Profile;
