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
    const response = await fetch(
      "https://be-mocha-ten.vercel.app/api/auth/google",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Đặt header Content-Type là application/json
        },
        body: JSON.stringify({ access_token: param }),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("data", data);
    return data;
  } catch (error) {
    console.log(error);
    // return thunkApi.rejectWithValue(error.message);
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
export const updateTotalUsed = createAsyncThunk(
  "updateTotalUsed",
  async (dataUpdate: any) => {
    try {
      const { data } = await axiosClient.put(
        `/users/updateTotalUsed/${dataUpdate.id}`,
        {
          ...dataUpdate.data,
        }
      );
      toast.success("request use voucher successful!");
      return data;
    } catch (error: any) {
      toast.success("request use voucher error!");
    }
  }
);
