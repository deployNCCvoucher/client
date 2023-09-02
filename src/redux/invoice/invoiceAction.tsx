import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";
const api = "https://be-mocha-ten.vercel.app/api";

export const getAllInvoice = createAsyncThunk(
  "invoices/getAllInvoice",
  async (params, thunkApi) => {
    try {
      const response = await fetch(`${api}/invoices/getAll`);
      const data = await response.json();
      return data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response?.data?.error?.message);
    }
  }
);

interface ParamsInvoicesPaginationInter {
  page: number;
  limit: number;
  type?: string | number;
  status?: string;
  month?: number;
  year?: number;
  userId?: number;
  search?: string;
}

export const getInvoicesByFilter = createAsyncThunk(
  "invoices/getInvoicesByFilter",
  async (params: ParamsInvoicesPaginationInter, thunkApi) => {
    console.log("param", params);
    let url = "";
    if (params.userId) {
      url += `&userId=${params.userId}`;
    }
    if (params.month) {
      url += `&month=${params.month}`;
    }
    if (params.year) {
      url += `&year=${params.year}`;
    }
    if (params.type) {
      url += `&type=${params.type}`;
    }
    if (params.status) {
      url += `&status=${params.status}`;
    }
    if (params.search) {
      url += `&search=${params.search}`;
    }
    console.log("url", url);
    try {
      const response = await fetch(
        `${api}/invoices/getInvoicesByFilter?page=${params.page}&limit=${params.limit}${url}`
      );
      const data = await response.json();
      return data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response?.data?.error?.message);
    }
  }
);
export const createInvoice = createAsyncThunk(
  "invoices/createInvoice",
  async (params: FormData, thunkApi) => {
    try {
      const data = await axiosClient.post("/invoices/createInvoice", params, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response?.data?.error?.message);
    }
  }
);

export const editInvoice = createAsyncThunk(
  "invoices/updateDataInvoice",
  async (params: any, thunkApi) => {
    try {
      const data = await axiosClient.put(
        `/invoices/updateInvoice/${params.id}`,
        params.data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response?.data?.error?.message);
    }
  }
);

export const getInvoice = createAsyncThunk(
  "invoices/getInvoice",
  async (params: any, thunkApi) => {
    try {
      const { data } = await axiosClient.get(`/invoices/getByUserId/${params}`);
      return data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response?.data?.error?.message);
    }
  }
);

export const updateInvoice = createAsyncThunk(
  "invoices/updateInvoice",
  async (dataUpdate: any, thunkApi) => {
    try {
      const { data } = await axiosClient.put(
        `/invoices/updateStatus/${dataUpdate.id}`,
        dataUpdate
      );
      return data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response?.data?.error?.message);
    }
  }
);
