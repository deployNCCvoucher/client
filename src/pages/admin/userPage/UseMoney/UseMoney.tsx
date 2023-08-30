import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getAllUser, updateTotalUsed } from "../../../../redux/user/userAction";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../redux/hook/useTypedSeletor";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import Loading from "../../../../components/Loading";

export interface OptionInter {
  label: string;
  id: number;
  totalAvailable?: any;
}

export const UseMoney = ({ handleOpen, handleClose, open }: any) => {
  const [max, setMax] = useState<any>(null);
  const schema = yup
    .object({
      account: yup.object().shape({
        label: yup.string().required("required"),
        id: yup.number().required("required"),
        totalAvailable: yup.number(),
      }),
      money: yup.number().integer().min(0).max(max).required("required"),
    })
    .required();
  type FormData = yup.InferType<typeof schema>;
  const {
    reset,
    control,
    register,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<FormData>({ mode: "all", resolver: yupResolver(schema) });

  const [selectedValue, setSelectedValue] = useState<OptionInter | any>(null);
  const users = useAppSelector((state) => state.user.users);
  const isLoading = useAppSelector((state) => state.user.isLoadingTotal);
  console.log("user pagegina", users);
  const UserList = users.filter((u) => u.totalAvailable > 0);
  const options = UserList.map((user) => {
    return {
      label: user.gmail.split("@")[0],
      id: user.id,
      totalAvailable: user.totalAvailable,
    };
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

  const handleSubmitMoney = handleSubmit(async (value) => {
    await dispatch(
      updateTotalUsed({
        id: value.account.id,
        data: { totalUsed: value.money },
      })
    );
    await handleClickClose();
  });

  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllUser());
    };
    fetchData();
  }, []);
  const [state, setState] = useState(false);
  const handleClickClose = () => {
    handleClose();
    setMax(null);
    setState(false);
    reset();
  };

  return (
    <Box>
      <div>
        <Dialog open={open} onClose={handleClickClose}>
          <Box
            component="form"
            onSubmit={handleSubmitMoney}
            sx={{
              display: "flex",
              flexDirection: "column",
              p: "24px",
              width: "600px",
            }}
          >
            <Typography variant="h6" sx={{ color: "#3f51b5" }}>
              Use Money Voucher
            </Typography>
            <Box>
              {!state && !isLoading ? (
                <Box>
                  <Box sx={{ mb: "12px", mt: "12px" }}>
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
                            return data;
                          }}
                          value={field.value}
                        />
                      )}
                    />
                  </FormControl>
                </Box>
              ) : !isLoading ? (
                <Box>
                  <Typography sx={{ mb: "12px", mt: "12px" }}>
                    money must be less than or equal to {max}
                  </Typography>
                  <FormControl sx={{ width: 1 }}>
                    <TextField
                      sx={{ width: 1 }}
                      error={!!errors.money}
                      helperText={errors.money?.message}
                      {...register("money")}
                    />
                  </FormControl>
                </Box>
              ) : (
                <></>
              )}
            </Box>
            {state && !isLoading && (
              // <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                sx={{ mt: "24px" }}
                color="error"
                variant="contained"
                size="large"
                type="submit"
              >
                Apply
              </Button>
            )}
          </Box>
          {!state && !isLoading && (
            // </Box>
            <Button
              sx={{ mt: "24px" }}
              color="error"
              variant="contained"
              size="large"
              onClick={async () => {
                const result = await trigger("account");
                if (result) {
                  const singleValue = getValues("account");
                  if (singleValue) {
                    setMax(singleValue?.totalAvailable);
                  }
                  setState(true);
                }
              }}
            >
              next
            </Button>
          )}
          {isLoading && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "32px",
              }}
            >
              <Loading />
            </Box>
          )}
        </Dialog>
      </div>
    </Box>
  );
};
