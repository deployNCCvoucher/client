import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../api/axiosClient';

export const getAllUser = createAsyncThunk('user/getAll', async (params, thunkApi) => {
  try {
    const { data } = await axiosClient.get('/users/getAll');
    return data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.response.data.error.message);
  }
});
export const createUser = createAsyncThunk('user/create', async (params: any, thunkApi) => {
  try {
    const { data } = await axiosClient.post('/users/createUser', {...params})
    return data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.response.data.error.message);
  }
});

export const login = createAsyncThunk('login', async () => {
  try {
    const { data } = await axiosClient.post('/auth/google', {access_token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjYwODNkZDU5ODE2NzNmNjYxZmRlOWRhZTY0NmI2ZjAzODBhMDE0NWMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiOTgxMTk5MzQ5OC1mbG1yOWV0Z245dnI0MnN0MWxobDJtZjE0b2Y4amx1NC5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImF1ZCI6Ijk4MTE5OTM0OTgtZmxtcjlldGduOXZyNDJzdDFsaGwybWYxNG9mOGpsdTQuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDMzNDM1MDkzMzM2NzIxOTA4MjciLCJoZCI6Im5jYy5hc2lhIiwiZW1haWwiOiJtYW4ubWFpaG9uZ0BuY2MuYXNpYSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoidG5nVUFtbXZZUGFXcXRpYk1HbWdZUSIsIm5hbWUiOiJNYW4gTWFpIEhvbmciLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFjSFR0ZTV6aTQzVXRTeTM4S1hJc0FJaHNmSG9DeEt6RmJKTXBRMVd3Q3A9czk2LWMiLCJnaXZlbl9uYW1lIjoiTWFuIiwiZmFtaWx5X25hbWUiOiJNYWkgSG9uZyAiLCJsb2NhbGUiOiJ2aSIsImlhdCI6MTY4NjA0Mzk1NSwiZXhwIjoxNjg2MDQ3NTU1LCJqdGkiOiI0ODUzYjU1ODBmNmVlZjRkZmM0NGY2ZTI4YmFhNDkwMDMzNGJmNDg3In0.ePYGOtjrMU1U6yjkBwq0HC_hsIsvh38AqzQWdLT83xdYuZ917R3tY4n66PKOkbUA8L5Sm8VEJaOrCnT6rIT4eV68VUPyIKoQJx0LF3u2VIO-EW_9BAm1F4Q5EVJ3lcOV5VyrKjYBorf7D2EcdcyDu0mYUW_rmm2Iqd_Jlrzex5IrHyH_mQH6syALrxtw02Btz0c2UlUH1e41Da0iA4peaiHNbr66lB9K_e3AiL_3IJ6Cw_VoBaRfRRv0JE9dh7A8TFeOHLachUoR09PsNhnElAGK4X4ab-nB5UoVoNwVCVc82kizhHyPDnHCo_ki_RzN-wPHLbAZ1iLrlLtBuWSziw'})
    return data;
  } catch (error: any) {
    console.log(error)
    // return thunkApi.rejectWithValue(error.response.data.error.message);
  }
})