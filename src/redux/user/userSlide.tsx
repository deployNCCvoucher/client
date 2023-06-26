import { createSlice } from "@reduxjs/toolkit";
import { getAllUser, getUser, login, updateMoney } from "./userAction";

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
  totalReduce: number;
  updateAt: string;
  userImage?: string;
}

interface initialUserStateInter {
  loadingUser: boolean
  accessToken: string | null
  users: UserInter[]
  currentEmail: string
  currentUser: UserInter
  token: boolean | null
  searchUserValue: string
  searchType: string
}

const initialUserState: initialUserStateInter = {
  loadingUser: false,
  accessToken: auth,
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
  searchUserValue: '',
  searchType: 'User'
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
      state.searchUserValue = action.payload
    },
    setSearchType: (state, action) => {
      state.searchType = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state: any, action: any) => {
        state.loadingUser = true;
      })
      .addCase(getUser.fulfilled, (state: any, action: any) => {
        state.loadingUser = false;
        const userImg = window.localStorage.getItem("userImage");
        state.currentUser = { ...action.payload, userImage: userImg };
      })
      .addCase(getUser.rejected, (state: any, action: any) => {
        state.loadingUser = false;
      })
      .addCase(getAllUser.pending, (state: any, action: any) => {
        state.loadingUser = true;
      })
      .addCase(getAllUser.fulfilled, (state: any, action: any) => {
        state.loadingUser = false;
        state.users = [...action.payload];
      })
      .addCase(getAllUser.rejected, (state: any, action: any) => {
        state.loadingUser = false;
      })
      .addCase(login.fulfilled, (state: any, action: any) => {
        window.localStorage.setItem("accessToken", action.payload.accessToken);
        window.localStorage.setItem("userImage", action.payload.UserImage);
        window.localStorage.setItem("idUser", action.payload.userId);
        window.localStorage.setItem("userRole", action.payload.userRole);
        // const dataUser = {accessToken: action.payload.accessToken, userImage: action.payload.UserImage, idUser: action.payload.userId}
        // window.localStorage.setItem('data', JSON.stringify(dataUser))
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
      });
  },
});
export const { logOut, setSearchValue, setSearchType } = userSlice.actions;
const { reducer: userReducer } = userSlice;
export { userReducer };
