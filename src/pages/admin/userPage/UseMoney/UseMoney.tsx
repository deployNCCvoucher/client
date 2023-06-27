import {
  Autocomplete,
  Box,
  Button,
  FormControl,
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
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

interface OptionInter {
  label: string;
  id: number;
}

const schema = yup
  .object({
    account: yup.object().shape({
      label: yup.string().required('required'),
      id: yup.number().required('required'),
    }),
    money: yup.string().required("Required"),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

export const UseMoney = () => {
  const {
    reset,
    control,
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormData>({ mode: "all", resolver: yupResolver(schema) });
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

  const handleSubmitMoney = handleSubmit((value) => {
    console.log("value", value);
  });

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
      component="form"
      onSubmit={handleSubmitMoney}
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

          <FormControl sx={{ width: 1 }}>
            <Controller
              control={control}
              name="account"
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  options={options}
                  isOptionEqualToValue={isOptionEqualToValue}
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Account"
                      error={!!errors.account}
                      helperText={errors.account?.message}
                    />
                  )}
                  onChange={(_, data) => {
                    field.onChange(data);
                    return data
                  }}
                  value={field.value}
                />
              )}
            />
          </FormControl>
        </Box>

        <Box sx={{ ml: "24px" }}>
          <Box sx={{ mb: "12px" }}>
            <Typography>Money Reduced</Typography>
          </Box>
          <FormControl sx={{ width: 1 }}>
            <TextField sx={{ width: 1 }} {...register("money")} />
          </FormControl>
        </Box>
      </Box>
      <Button
        sx={{ mt: "24px", display: "flex", justifyContent: "flex-end" }}
        color="error"
        variant="contained"
        size="large"
        type="submit"
      >
        Apply
      </Button>
    </Box>
  );
};
