import { createSlice } from "@reduxjs/toolkit";
import { getAllUser, createUser, login } from "./userAction";

const initialUserState = {
  loadingUser: false,
  dataUser: [],
  currentEmail: "",
  currentUser: {
    id: null,
    role: "user",
    name: "",
    gmail: "",
    totalReduce: 0,
    createAt: "",
    updateAt: null,
  },
  token: false,
} as any;

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setUser: (state) => {
      const userEmail = window.localStorage.getItem('currentUser');
      const newState = state.dataUser.filter(
        (user: any) => user.gmail === userEmail
      );
      state.currentUser = {...newState[0]}
    },
    logOut: (state) => {
      state.token = null;
      window.localStorage.removeItem('accessToken');
      window.localStorage.removeItem('currentUser');
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
        const userEmail = window.localStorage.getItem('currentUser');
        const newState = state.dataUser.find((user: any) => user.gmail === userEmail
        );
        state.currentUser = {...newState}
      })
      .addCase(getAllUser.rejected, (state: any, action: any) => {
        state.loadingUser = false;
      })
      .addCase(createUser.fulfilled, (state: any, action: any) => {
        console.log(123);
      })
      .addCase(createUser.rejected, (state: any, action: any) => {
        state.loadingUser = false;
      })
      .addCase(login.fulfilled, (state: any, action: any) => {
        console.log('login success', action.payload)
        window.localStorage?.setItem('accessToken', action.payload.accessToken)
        if(action.payload.accessToken){
          state.token = true
        }        
        console.log('accessToken', state.to)
      })
      .addCase(login.rejected, (state: any, action: any) => {
        console.log('login error',action.payload)
      });
  },
});

export const { setUser, logOut } = userSlice.actions;
const { reducer: userReducer } = userSlice;
export { userReducer };
