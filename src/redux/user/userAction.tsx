import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";
import { toast } from "react-toastify";

export const getUser = createAsyncThunk(
  "/users/getById/",
  async (params: any, thunkApi) => {
    try {
      const { data } = await axiosClient.get(`/users/getById/${params}`);
      return data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.error.message);
    }
  }
);

export const getAllUser = createAsyncThunk("/users/getAll/", async () => {
  try {
    const { data } = await axiosClient.get(`/users/getAll`);
    return data;
  } catch (error: any) {
    return error;
  }
});

interface ParamsInter {
  limit: number;
  page: number;
}

export const getAllUserPagin = createAsyncThunk(
  "/users/getAllPagin/",
  async (params: ParamsInter) => {
    try {
      const { data } = await axiosClient.get(
        `/users/getAllPagin?page=${params.page}&limit=${params.limit}`
      );
      return data;
    } catch (error: any) {
      return error;
    }
  }
);

export const login = createAsyncThunk("login", async (param: any) => {
  try {
    const { data } = await axiosClient.post("/auth/google", {
      access_token: param,
    });
    console.log("data", data);
    return data;
  } catch (error: any) {
    console.log(error);
    // return thunkApi.rejectWithValue(error.response.data.error.message);
  }
});

interface UpdateAvailableInter {
  id: number;
  totalAvailable: number;
}
interface UpdateUsed {
  id: number;
  totalUsed: number;
}
export const updateMoney = createAsyncThunk(
  "updateMoney",
  async (dataUpdate: UpdateAvailableInter, thunkApi) => {
    try {
      const { data } = await axiosClient.put(
        `/users/updateTotalAvailable/${dataUpdate.id}`,
        { totalAvailable: dataUpdate.totalAvailable }
      );
      return data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.error.message);
    }
  }
);
export const updateUsed = createAsyncThunk(
  "updateUsed",
  async (dataUpdate: UpdateUsed, thunkApi) => {
    try {
      const { data } = await axiosClient.put(
        `/users/updateTotalUsed/${dataUpdate.id}`,
        {
          totalUsed: dataUpdate.totalUsed,
        }
      );
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.error.message);
    }
  }
);
interface UpdateAdminInter {
  id: number;
  role: string;
}

export const updateAdmin = createAsyncThunk(
  "updateAdmin",
  async (dataUpdate: UpdateAdminInter, thunkApi) => {
    try {
      const { data } = await axiosClient.put(
        `/users/updateAdmin/${dataUpdate.id}`,
        { role: dataUpdate.role }
      );
      toast.success("Create admin successful!");
      return data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.error.message);
    }
  }
);
