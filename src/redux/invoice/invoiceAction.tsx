import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../api/axiosClient';

export const createInvoice = createAsyncThunk(
  'invoices/createInvoice',
  async (params: any, thunkApi) => {
    try {
      const { data } = await axiosClient.post('/invoices/createInvoice', { ...params });
      return data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response?.data?.error?.message);
    }
  }
);
export const getAllInvoice = createAsyncThunk(
  'invoices/getAllInvoice',
  async (params, thunkApi) => {
    try {
      const { data } = await axiosClient.get('/invoices/getAll');
      return data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response?.data?.error?.message);
    }
  }
);

