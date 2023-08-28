import {
  Box,
  Button,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useDebounce } from "../../../../hooks/useDebounce";
import {
  setSearchType,
  setSearchValue,
} from "../../../../redux/user/userSlide";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../redux/hook/useTypedSeletor";
import { MultipleSelect } from "../../../../components/select/MultipleSelect";
import {
  setMonthFilter,
  setPageInvoice,
  setTypeFilter,
  setYearFilter,
} from "../../../../redux/invoice/invoiceSlide";

export const SearchUser = () => {
  const dispatch = useAppDispatch();
  const searchType = useAppSelector((state) => state.user.searchType);
  const [value, setValue] = useState("");
  const debounced = useDebounce(value, 500);
  const month = useAppSelector((state) => state.invoice.month);
  const year = useAppSelector((state) => state.invoice.year);
  const typeVoucher = useAppSelector((state) => state.invoice.typeVoucher);

  useEffect(() => {
    dispatch(setSearchValue(debounced?.trim()));
  }, [debounced]);

  // const handleSearchUser = () => {
  //   dispatch(setSearchType("User"));
  // };

  // const handleSearchAdmin = () => {
  //   dispatch(setSearchType("Admin"));
  // };

  const handleChangeMonth = (event: SelectChangeEvent) => {
    dispatch(setPageInvoice(1));
    dispatch(setMonthFilter(event.target.value));
  };

  const handleChangeYear = (event: SelectChangeEvent) => {
    dispatch(setPageInvoice(1));
    dispatch(setYearFilter(event.target.value));
  };

  const handleTypeVoucher = (event: SelectChangeEvent) => {
    dispatch(setPageInvoice(1));
    dispatch(setTypeFilter(event.target.value));
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* <Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ color: "#3e50af" }}>Search for: </Typography>
          <Button
            color={searchType === "User" ? "error" : "primary"}
            onClick={handleSearchUser}
          >
            User
          </Button>
          <Button
            color={searchType === "Admin" ? "error" : "primary"}
            onClick={handleSearchAdmin}
          >
            Admin
          </Button>
        </Box>
        <TextField
          label={`Search for ${searchType}`}
          size="small"
          variant="outlined"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </Box> */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          flex: 1,
        }}
      >
        <MultipleSelect
          type="Type"
          handleChange={handleTypeVoucher}
          time={typeVoucher}
        />
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
      </Box>
    </Box>
  );
};
