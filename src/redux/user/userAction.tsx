import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../api/axiosClient';
import { toast } from 'react-toastify';

export const getUser = createAsyncThunk('/users/getById/', async (params: any, thunkApi) => {
  try {
    const { data } = await axiosClient.get(`/users/getById/${params}`);
    return data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.response.data.error.message);
  }
});

export const getAllUser = createAsyncThunk('/users/getAll/', async () => {
  try {
    const { data } = await axiosClient.get(`/users/getAll`);
    return data;
  } catch (error: any) {
    return error
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

interface UpdateReaduceInter {
  id: number
  totalReduce: number
}

export const updateMoney = createAsyncThunk('updateMoney', async (dataUpdate : UpdateReaduceInter, thunkApi) => {
  try {
    const { data } = await axiosClient.put(`/users/updateTotalReduce/${dataUpdate.id}`, {totalReduce: dataUpdate.totalReduce})
    toast.success("Update successful!")
    return data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.response.data.error.message);
  }
})

interface UpdateAdminInter {
  id: number
  role: string
}

export const updateAdmin = createAsyncThunk('updateAdmin', async (dataUpdate : UpdateAdminInter, thunkApi) => {
  try {
    const { data } = await axiosClient.put(`/users/updateAdmin/${dataUpdate.id}`, {role: dataUpdate.role})
    toast.success("Create admin successful!")
    return data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.response.data.error.message);
  }
})