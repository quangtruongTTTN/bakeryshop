import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shippers: [],
  totalPages: 1,
  shipper: {},
  wishlist: null,
  error: {},
  listProcess: [],
  totalPagesProcess: 1,
  listSuccess: [],
  totalPagesSuccess: 1,
  listFail: [],
  totalPagesFail: 1,
  revenue: [],
  getByID: [],
  order: {},
};

const ShipperSlice = createSlice({
  name: "shipper",
  initialState,
  reducers: {
    shipperbyusername: (state, action) => {
      state.shipper = action.payload.user;
      // state.shipper = action.payload.user;
      state.wishlist = action.payload.wishlistResponse;
    },
    profileUpdate: (state, action) => {
      state.shipper = action.payload;
    },
    getShippersN: (state, action) => {
      // state.totalPages = action.payload.totalPages;
      state.shippers = action.payload;
      // const { shipper, numberOrder } = action.payload;
    },
    getShippers: (state, action) => {
      state.totalPages = action.payload.totalPages;
      state.shippers = action.payload.content;
    },
    getShipperAndNumberOrder: (state, action) => {
      state.shippers = action.payload
    },
    onStatus: (state, action) => {
      const index = state.shippers.findIndex((u) =>
        Object.is(u.username, action.payload.username)
      );
      state.shippers[index].deletedAt = action.payload.deletedAt;
    },
    shipperAdded: (state, action) => {
      state.shippers.push(action.payload);
    },
    getListProcess: (state, action) => {
      state.totalPagesProcess = action.payload.totalPages;
      state.listProcess = action.payload.content;
    },
    getListSuccess: (state, action) => {
      state.totalPagesSuccess = action.payload.totalPages;
      state.listSuccess = action.payload.content;
    },
    getListFail: (state, action) => {
      state.totalPagesFail = action.payload.totalPages;
      state.listFail = action.payload.content;
    },
    getByID: (state, action) => {
      // state.totalPagesFail = action.payload.totalPages;
      state.getByID = action.payload.content;
    },
    onStatus: (state, action) => {
      if (action.payload.status === 2) {
        const existingOrder = state.listProcess.find((order) => order.id === action.payload.id);
        if (existingOrder) {
          existingOrder.status = 2;
        }
      }
      if (action.payload.status === 3) {
        const order = state.listProcess.find((o) => o.id === action.payload.id);
        order.status = action.payload.status;
        state.listProcess = state.listProcess.filter((o) => o.id !== action.payload.id);
        state.listSuccess.push(order);
      }
      if (action.payload.status === 4) {
        const order = state.listProcess.find((o) => o.id === action.payload.id);
        order.status = action.payload.status;
        state.listProcess = state.listProcess.filter((o) => o.id !== action.payload.id);
        state.listFail.push(order);
      }
    },
  },
});

const { reducer, actions } = ShipperSlice;
export const { getListProcess, getListSuccess, getListFail, getByID, getShipperAndNumberOrder, shipperbyusername, getShippers, onStatus, shipperAdded, shipperUpdate, shipperDelete, profileUpdate } = actions;
export default reducer;
