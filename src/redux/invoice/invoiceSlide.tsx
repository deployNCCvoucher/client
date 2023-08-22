import { createSlice } from "@reduxjs/toolkit";
import {
  createInvoice,
  getAllInvoice,
  getInvoice,
  updateInvoice,
  getInvoicesByFilter,
  editInvoice,
} from "./invoiceAction";
import { toast } from "react-toastify";
import { UserInter } from "../user/userSlide";

export interface Invoice {
  checkBy: UserInter;
  code: string;
  createAt: string;
  createBy: UserInter;
  id: number;
  image: string;
  note: string;
  reducedType: string;
  status: string;
  updateAt: string;
  checkAt: string;
}

interface initialValueInter {
  isLoading: boolean;
  listInvoice: Invoice[];
  getInvoicesByFilter: Invoice[];
  userInvoice: Invoice[];
  currentUserId: number;
  year: number;
  month: number;
  typeVoucher?: string | number;
  page: number;
  limit: number;
  totalCount: number;
  currentInvouce: any;
}

const initialValue: initialValueInter = {
  isLoading: false,
  listInvoice: [],
  getInvoicesByFilter: [],
  userInvoice: [],
  currentUserId: 0,
  month: 0,
  year: 0,
  // month: new Date().getMonth()+1,
  // year: new Date().getFullYear(),
  typeVoucher: 0,
  page: 1,
  limit: 10,
  totalCount: 0,
  currentInvouce: {},
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
      state.year = action.payload;
    },
    setMonthFilter: (state, action) => {
      state.month = action.payload;
    },
    setTypeFilter: (state, action) => {
      state.typeVoucher = action.payload;
    },
    setPageInvoice: (state, action) => {
      state.page = action.payload;
    },
    setTotalCountInvoice: (state, action) => {
      state.totalCount = action.payload;
    },
    setCurrentInvoice: (state, action) => {
      state.currentInvouce = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createInvoice.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createInvoice.fulfilled, (state, action) => {
        toast.success("Upload file successful!");
        state.isLoading = false;
      })
      .addCase(createInvoice.rejected, (state, action) => {
        toast.error("request error");
      })
      // getAllInvoice
      .addCase(getAllInvoice.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllInvoice.fulfilled, (state, action) => {
        state.listInvoice = action.payload;
        state.isLoading = false;
      })
      .addCase(getAllInvoice.rejected, (state, action) => {})
      // getInvoicesNotPendingPagin
      .addCase(getInvoicesByFilter.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getInvoicesByFilter.fulfilled, (state, action) => {
        state.getInvoicesByFilter = action.payload.data;
        state.isLoading = false;
      })
      .addCase(getInvoicesByFilter.rejected, (state, action) => {})
      // getInvoice
      .addCase(getInvoice.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getInvoice.fulfilled, (state, action) => {
        console.log("get invoice", action.payload);
        state.userInvoice = [...action.payload];
      })
      .addCase(getInvoice.rejected, (state, action) => {})
      .addCase(updateInvoice.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateInvoice.fulfilled, (state, action) => {
        toast.success(
          `${
            (action.payload.status + "").charAt(0).toUpperCase() +
            (action.payload.status + "").slice(1)
          } invoice successful!`
        );
        state.isLoading = false;
        // state.listInvoice.map((item: Invoice) => {
        //   if (item.id === action.payload.id) {
        //     item.createBy = action.payload.createBy;
        //     item.status = action.payload.status;
        //   }
        //   return item;
        // });
      })
      .addCase(updateInvoice.rejected, (state, action) => {
        toast.error("request error");
      })
      .addCase(editInvoice.fulfilled, (state, action) => {
        toast.success("edit file successful!");
        state.isLoading = false;
        console.log("action edit", action.payload.data);
        let newList: any = state.getInvoicesByFilter.map((invoice: any) => {
          if (invoice.id === action.payload.data.id) {
            return {
              ...action.payload.data,
            };
          } else {
            return {
              ...invoice,
            };
          }
        });
        state.getInvoicesByFilter = newList;
        console.log("newList", newList, state.getInvoicesByFilter);
      })
      .addCase(editInvoice.rejected, (state, action) => {
        toast.error("request error");
      });
  },
});

export const {
  filterInvoice,
  setMonthFilter,
  setYearFilter,
  setTypeFilter,
  setPageInvoice,
  setTotalCountInvoice,
  setCurrentInvoice,
} = invoiceSlice.actions;
const { reducer: invoiceReducer } = invoiceSlice;
export { invoiceReducer };
