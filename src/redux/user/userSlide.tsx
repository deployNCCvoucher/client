import { createSlice } from "@reduxjs/toolkit";
import {
  getAllUser,
  getAllUserPagin,
  getUser,
  login,
  updateMoney,
  updateTotalUsed,
} from "./userAction";

let auth: string | null = "";
if (window.localStorage.getItem("accessToken") !== null) {
  const result = window.localStorage.getItem("accessToken");
  auth = result;
}

export interface UserInter {
  createAt: string;
  gmail: string;
  id: number;
  name: string;
  role: string;
  totalAvailable: number;
  totalUsed: number;
  updateAt: string;
  userImage?: string;
}

interface initialUserStateInter {
  loadingUser: boolean;
  accessToken: string | null;
  usersPagin: UserInter[];
  users: UserInter[];
  currentEmail: string;
  currentUser: UserInter;
  token: boolean | null;
  searchUserValue: string;
  searchType: string;
  isLoadingLogin: boolean;
  isLoadingTotal: boolean;
}

const initialUserState: initialUserStateInter = {
  loadingUser: false,
  accessToken: auth,
  usersPagin: [],
  users: [],
  currentEmail: "",
  currentUser: {
    id: null,
    role: "user",
    name: "",
    gmail: "",
    totalReduce: 0,
    createAt: "",
    updateAt: null,
    userImage: "",
  },
  token: false,
  searchUserValue: "",
  searchType: "User",
  isLoadingLogin: false,
  isLoadingTotal: false,
} as any;

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    logOut: (state) => {
      state.token = null;
      window.localStorage.removeItem("accessToken");
      state.accessToken = window.localStorage?.getItem("accessToken");
    },
    setSearchValue: (state, action) => {
      state.searchUserValue = action.payload;
    },
    setSearchType: (state, action) => {
      state.searchType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state: any, action: any) => {
        state.loadingUser = true;
      })
      .addCase(getUser.fulfilled, (state: any, action: any) => {
        state.loadingUser = false;
        const userImg = window.localStorage.getItem("userImage");
        window.localStorage.setItem("userRole", action.payload.role);
        state.currentUser = { ...action.payload, userImage: userImg };
      })
      .addCase(getUser.rejected, (state: any, action: any) => {
        state.loadingUser = false;
      })
      //
      .addCase(getAllUser.pending, (state: any, action: any) => {
        state.loadingUser = true;
      })
      .addCase(getAllUser.fulfilled, (state: any, action: any) => {
        state.users = [...action.payload];
        state.loadingUser = false;
      })
      .addCase(getAllUser.rejected, (state: any, action: any) => {
        state.loadingUser = false;
      })
      //
      .addCase(getAllUserPagin.pending, (state: any, action: any) => {
        state.loadingUser = true;
      })
      .addCase(getAllUserPagin.fulfilled, (state: any, action: any) => {
        state.loadingUser = false;
        state.usersPagin = [...action.payload.data];
      })
      .addCase(login.fulfilled, (state: any, action: any) => {
        window.localStorage.setItem("accessToken", action.payload.accessToken);
        window.localStorage.setItem("userImage", action.payload.UserImage);
        window.localStorage.setItem("idUser", action.payload.userId);
        state.test = action.payload;
        if (action.payload.accessToken) {
          state.accessToken = window.localStorage.getItem("accessToken");
        }
        if (action.payload.UserImage) {
          state.userImage = window.localStorage.getItem("userImage");
        }
      })
      .addCase(login.rejected, (state: any, action: any) => {
        console.log("login error", action.payload);
      })
      .addCase(updateMoney.pending, (state: any, action: any) => {
        state.loadingUser = true;
      })
      .addCase(updateMoney.fulfilled, (state: any, action: any) => {
        state.loadingUser = false;
      })
      .addCase(updateMoney.rejected, (state: any, action: any) => {
        state.loadingUser = false;
      })
      .addCase(updateTotalUsed.fulfilled, (state: any, action: any) => {
        const newList = state.usersPagin.map((user: any) => {
          if (user.id === action.payload.id) {
            return { ...action.payload };
          } else {
            return { ...user };
          }
        });
        const newListUser = state.users.map((user: any) => {
          if (user.id === action.payload.id) {
            return { ...action.payload };
          } else {
            return { ...user };
          }
        });
        state.users = [...newListUser];
        state.usersPagin = [...newList];
        state.isLoadingTotal = false;
      })
      .addCase(updateTotalUsed.pending, (state: any, action: any) => {
        state.isLoadingTotal = true;
      })
      .addCase(updateTotalUsed.rejected, (state: any, action: any) => {
        state.isLoadingTotal = false;
      });
  },
});
export const { logOut, setSearchValue, setSearchType } = userSlice.actions;
const { reducer: userReducer } = userSlice;
export { userReducer };
