import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../api/axiosClient';

export const getAllUser = createAsyncThunk('/users/getById/', async (params: number, thunkApi) => {
  try {
    const { data } = await axiosClient.get(`/users/getById/${params}`);
    return data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.response.data.error.message);
  }
});

export const login = createAsyncThunk('login', async (param: any) => {
  try {
    const { data } = await axiosClient.post('/auth/google', {access_token: param})
    return data;
  } catch (error: any) {
    console.log(error)
    // return thunkApi.rejectWithValue(error.response.data.error.message);
  }
})