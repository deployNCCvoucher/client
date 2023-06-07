import { createSlice } from '@reduxjs/toolkit';
import { createInvoice, getAllInvoice, getInvoice } from './invoiceAction'
import { toast } from "react-toastify";

const initialValue = {
  listInvoice: [],
  userInvoice: [],
  currentUserId: 0
}
const invoiceSlice = createSlice({
  name: 'invoice',
  initialState: initialValue,
  reducers: {
    filterInvoice: (state, action) => {
      console.log('action.payload test139024', action.payload);
      const newList = state.listInvoice.filter(
        (invoice: any) => invoice.createBy === action.payload
      )
      state.userInvoice = [...newList]
      console.log('new list', newList)
      console.log('state.userInvoice', state.userInvoice)
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(createInvoice.fulfilled, (state: any, action: any) => {
      toast.success("request success");
      console.log('action.payload', action)
    })
    .addCase(createInvoice.rejected, (state: any, action: any) => {
      console.log('action.payload', action)
      toast.error('request error')
    })
    .addCase(getAllInvoice.fulfilled, (state: any, action: any) => {
      console.log('action.payload', action)
      state.listInvoice = action.payload;
    })
    .addCase(getAllInvoice.rejected, (state: any, action: any) => {
      console.log('action.payload', action)
    })
    .addCase(getInvoice.fulfilled, (state: any, action: any) => {
      console.log('action.payload', action)
      state.userInvoice = [action.payload];
    })
    .addCase(getInvoice.rejected, (state: any, action: any) => {
      console.log('action.payload', action)
    })
  }
});

export const { filterInvoice } = invoiceSlice.actions;
const { reducer: invoiceReducer } = invoiceSlice;
export { invoiceReducer };
