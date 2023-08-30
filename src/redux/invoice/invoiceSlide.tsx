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
import axiosClient from "../../api/axiosClient";
import axios from "axios";

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
  overview: number;
  isCreate: boolean;
}

const initialValue: initialValueInter = {
  isLoading: false,
  listInvoice: [],
  getInvoicesByFilter: [],
  userInvoice: [],
  currentUserId: 0,
  month: 0,
  year: 0,
  typeVoucher: 0,
  page: 1,
  limit: 10,
  totalCount: 0,
  currentInvouce: {},
  overview: 1,
  isCreate: false,
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
    setOverview: (state, action) => {
      state.overview = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createInvoice.pending, (state, action) => {
        state.isCreate = true;
      })
      .addCase(createInvoice.fulfilled, (state, action?: any) => {
        console.log("action", action.payload);
        state.isCreate = false;
        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        axiosClient.post("/users/sendEmail", {
          to: "nga.nguyenthithanh@ncc.asia",
          subject: `[NCC VOUCHER] - ${action.payload.data.createBy.name} -  new request - ${day}/${month}/${year}`,
          content: `<h2>New request from ${action.payload.data.createBy.name}</h2> </br> <p>type: ${action.payload.data.reducedType}</p> </br> <p>Status: ${action.payload.data.status}</p>`,
        });
        toast.success("Upload file successful!");
      })
      .addCase(createInvoice.rejected, (state, action) => {
        state.isCreate = false;
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
        const dateObject = new Date(action.payload.createAt);
        const day = dateObject.getUTCDate();
        const month = dateObject.getUTCMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0 (0 - 11)
        const year = dateObject.getUTCFullYear();
        axiosClient.post("/users/sendEmail", {
          to: action.payload.createBy.gmail,
          subject: `[NCC VOUCHER] - ${action.payload.status} voucher `,
          content: `<h2>New update request</h2> </br> <p>type: ${action.payload.reducedType}</p> </br> <p>Create at: ${day}/${month}/${year} </p> </br> <p>Status: ${action.payload.status}</p> </br> <p>Note: ${action.payload.note} </p>`,
        });
        toast.success(
          `${
            (action.payload.status + "").charAt(0).toUpperCase() +
            (action.payload.status + "").slice(1)
          } invoice successful!`
        );
        state.isLoading = false;
        console.log("update statussss", action.payload);
      })
      .addCase(updateInvoice.rejected, (state, action) => {
        toast.error("request error");
      })
      .addCase(editInvoice.rejected, (state, action) => {
        state.isCreate = false;
        toast.error("request error");
      })
      .addCase(editInvoice.pending, (state, action) => {
        state.isCreate = true;
      })
      .addCase(editInvoice.fulfilled, (state, action) => {
        state.isCreate = false;
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
  setOverview,
} = invoiceSlice.actions;
const { reducer: invoiceReducer } = invoiceSlice;
export { invoiceReducer };
