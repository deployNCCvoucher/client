import { createSlice } from '@reduxjs/toolkit';
import { createInvoice, getAllInvoice } from './invoiceAction'

const initialValue = {
  listInvoice: [],
  userInvoice: []
}

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState: initialValue,
  reducers: {
    filterInvoice: (state: any, action: any) => {
      console.log('action', action);
      const newList = state.listInvoice.filter(
        (invoice: any) => invoice.createBy === action.payload.createBy
      )
      state.userInvoice = [...newList]
      console.log('new list', newList)
      console.log('state.userInvoice', state.userInvoice)
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(createInvoice.fulfilled, (state: any, action: any) => {
      console.log('action.payload', action)
    })
    .addCase(createInvoice.rejected, (state: any, action: any) => {
      console.log('action.payload', action)
    })
    .addCase(getAllInvoice.fulfilled, (state: any, action: any) => {
      console.log('action.payload', action)
      state.listInvoice = action.payload;
      console.log('state.listInvoice', state.listInvoice)
    })
    .addCase(getAllInvoice.rejected, (state: any, action: any) => {
      console.log('action.payload', action)
    })
  }
});

export const { filterInvoice } = invoiceSlice.actions;
const { reducer: invoiceReducer } = invoiceSlice;
export { invoiceReducer };
