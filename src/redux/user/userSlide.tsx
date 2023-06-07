import { createSlice } from "@reduxjs/toolkit";
import { getAllUser, login } from "./userAction";

let auth: any = '';
if (window.localStorage.getItem('accessToken') !== null) {
  const result = window.localStorage.getItem('accessToken');
  auth = result
}
const initialUserState = {
  loadingUser: false,
  accessToken: auth,
  currentEmail: "",
  currentUser: {
    id: null,
    role: "user",
    name: "",
    gmail: "",
    totalReduce: 0,
    createAt: "",
    updateAt: null,
    UserImage: ''
  },
  token: false,
} as any;

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    logOut: (state) => {
      state.token = null;
      window.localStorage.removeItem('accessToken');
      state.accessToken = window.localStorage?.getItem('accessToken')
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUser.pending, (state: any, action: any) => {
        state.loadingUser = true;
      })
      .addCase(getAllUser.fulfilled, (state: any, action: any) => {
        state.loadingUser = false;
        state.dataUser = action.payload;
        state.currentUser = {...action.payload}
        console.log('currentUser', state.currentUser)
      })
      .addCase(getAllUser.rejected, (state: any, action: any) => {
        state.loadingUser = false;
      })
      .addCase(login.fulfilled, (state: any, action: any) => {
        console.log('login success', action.payload)
        window.localStorage?.setItem('accessToken', action.payload.accessToken)
        if(action.payload.accessToken){
          state.accessToken = window.localStorage?.getItem('accessToken')
        }        
        console.log('accessToken', state.to)
        window.localStorage.setItem('idUser', action.payload.userId)
        state.currentUser.UserImage = action.payload.userImage
      })
      .addCase(login.rejected, (state: any, action: any) => {
        console.log('login error',action.payload)
      });
  },
});

export const { logOut } = userSlice.actions;
const { reducer: userReducer } = userSlice;
export { userReducer };
