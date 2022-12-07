import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  invoices: [],
  totalPages: 1,
};

const InvoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    getInvoice: (state, action) => {
      state.invoices = action.payload.content;
      state.totalPages = action.payload.totalPages;
    },
  },
});

const { reducer, actions } = InvoiceSlice;
export const {getInvoice } = actions;
export default reducer;
