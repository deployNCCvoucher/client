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
