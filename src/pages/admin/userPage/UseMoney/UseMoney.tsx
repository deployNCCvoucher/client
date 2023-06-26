import {
  Autocomplete,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getAllUser } from "../../../../redux/user/userAction";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../redux/hook/useTypedSeletor";

interface OptionInter {
  label: string;
  id: number;
}
export const UseMoney = () => {
  const users = useAppSelector((state) => state.user.users);
  const [selectedValue, setSelectedValue] = useState<OptionInter | null>(null);
  const options = users.map((user) => {
    return { label: user.gmail.split("@")[0], id: user.id };
  });
  const handleAutocompleteChange = (
    event: React.ChangeEvent<{}>,
    newValue: OptionInter | null
  ) => {
    setSelectedValue(newValue);
  };

  const isOptionEqualToValue = (
    option: OptionInter,
    value: OptionInter | null
  ): boolean => {
    if (value === null) {
      return option === value;
    }
    return option.id === value.id;
  };
  console.log("selectedValue", selectedValue);

  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllUser());
    };
    fetchData();
  }, []);
  return (
    <Box
      sx={{
        width: 1,
        m: "8px 6px",
        p: "8px 24px 24px",
        boxShadow: "0 2px 10px rgba(0,0,0,.35)",
      }}
      component={Paper}
    >
      <Typography variant="h6" sx={{ color: "#3f51b5" }}>
        Use Money Voucher
      </Typography>
      <Box
        sx={{
          mt: "24px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Box sx={{ mb: "12px" }}>
            <Typography>Account</Typography>
          </Box>
          <Box sx={{ width: 1 }}>
            <Autocomplete
              options={options}
              //   getOptionDisabled={(option) =>
              //     option === options[0] || option === timeSlots[2]
              //   }
              isOptionEqualToValue={isOptionEqualToValue}
              value={selectedValue}
              onChange={handleAutocompleteChange}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Account" />
              )}
            />
          </Box>
        </Box>
        <Box sx={{ ml: "24px" }}>
          <Box sx={{ mb: "12px" }}>
            <Typography>Money Reduced</Typography>
          </Box>
          <Box sx={{ width: 1 }}>
            <TextField sx={{ width: 1 }} />
          </Box>
        </Box>
      </Box>
      <Box sx={{ mt: "24px", display: "flex", justifyContent: "flex-end" }}>
        <Button color="error" variant="contained" size="large">
          Apply
        </Button>
      </Box>
    </Box>
  );
};
