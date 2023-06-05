import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './user/userSlide';
import { invoiceReducer } from './invoice/invoiceSlide'

const store = configureStore({
  reducer: {
    user: userReducer,
    invoice: invoiceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
