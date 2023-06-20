import { createSlice } from "@reduxjs/toolkit";
import { createInvoice, getAllInvoice, getInvoice, updateInvoice, getInvoicesByFilter } from "./invoiceAction";
import { toast } from "react-toastify";

export interface Invoice {
  checkBy: number;
  code: string;
  createAt: string;
  createBy: string;
  id: number;
  image: string;
  note: string;
  reducedType: string;
  status: string;
  updateAt: string;
  checkAt: string;
}

interface initialValueInter {
  listInvoice: Invoice[]
  getInvoicesByFilter: Invoice[]
  userInvoice: Invoice[]
  currentUserId: number
  year: number
  month: number
  typeVoucher?: string | number
  page: number
  limit: number
  totalCount: number
}

const initialValue: initialValueInter = {
  listInvoice: [],
  getInvoicesByFilter: [],
  userInvoice: [],
  currentUserId: 0,
  month: new Date().getMonth()+1,
  year: new Date().getFullYear(),
  typeVoucher: 0,
  page: 1,
  limit: 10,
  totalCount: 0
};
const invoiceSlice = createSlice({
  name: "invoice",
  initialState: initialValue,
  reducers: {
    filterInvoice: (state, action) => {
      const newList = state.listInvoice.filter(
        (invoice: any) => invoice.createBy === action.payload
      );
      state.userInvoice = [...newList];
    },
    setYearFilter: (state, action) => {
      state.year = action.payload
    },
    setMonthFilter: (state, action) => {
      state.month = action.payload
    },
    setTypeFilter: (state, action) => {
      state.typeVoucher = action.payload
    },
    setPageInvoice: (state, action) => {
      state.page = action.payload
    },
    setTotalCountInvoice: (state, action) => {
      state.totalCount = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createInvoice.fulfilled, (state, action) => {
        toast.success("Upload file successful!");
        // state.listInvoice.push(...action.payload.)
        console.log(action.payload)
      })
      .addCase(createInvoice.rejected, (state, action) => {
        toast.error("request error");
      })
      // getAllInvoice
      .addCase(getAllInvoice.fulfilled, (state, action) => {
        state.listInvoice = action.payload;
      })
      .addCase(getAllInvoice.rejected, (state, action) => {
      })
      // getInvoicesNotPendingPagin
      .addCase(getInvoicesByFilter.fulfilled, (state, action) => {
        state.getInvoicesByFilter = action.payload.data;
      })
      .addCase(getInvoicesByFilter.rejected, (state, action) => {
      })
      // getInvoice
      .addCase(getInvoice.fulfilled, (state, action) => {
        state.userInvoice = [...action.payload];
      })
      .addCase(getInvoice.rejected, (state, action) => {
        
      })
      .addCase(updateInvoice.fulfilled, (state, action) => {
        state.listInvoice.map((item: Invoice) => {
          if (item.id === action.payload.id) {
            item.createBy = action.payload.createBy
            item.status = action.payload.status
          }
          return item
        })
      })
      .addCase(updateInvoice.pending, (state, action) => {
        
      })
      .addCase(updateInvoice.rejected, (state, action) => {
        
      })
  },
});

export const { filterInvoice, setMonthFilter, setYearFilter, setTypeFilter, setPageInvoice, setTotalCountInvoice } = invoiceSlice.actions;
const { reducer: invoiceReducer } = invoiceSlice;
export { invoiceReducer };
