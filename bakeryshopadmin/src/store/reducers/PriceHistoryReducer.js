import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  priceHistorys: [],
  totalPages: 1,
};

const PriceHistorySlice = createSlice({
  name: "priceHistory",
  initialState,
  reducers: {
    getPriceHistorys: (state, action) => {
      state.totalPages = action.payload.totalPages;
      state.priceHistorys = action.payload.content;
    },
    priceHistoryAdded: (state, action) => {
      state.priceHistorys.push(action.payload);
    },
    priceHistoryUpdate(state, action) {
      const { id, name, title, additionOptions, sizeOptions, categoryId, linkImage } = action.payload;
      const existingPriceHistory = state.priceHistorys.find((priceHistory) => priceHistory.id === id);
      if (existingPriceHistory) {
        existingPriceHistory.name = name;
        existingPriceHistory.title = title;
        // existingPriceHistory.additionOptions = additionOptions;
        existingPriceHistory.sizeOptions = sizeOptions;
        existingPriceHistory.categoryId = categoryId;
        existingPriceHistory.linkImage = linkImage;
      }
    },
    priceHistoryDelete(state, action) {
      const { id, deletedAt } = action.payload;
      const existingPriceHistory = state.priceHistorys.find((priceHistory) => priceHistory.id === id);
      if (existingPriceHistory) {
        existingPriceHistory.deletedAt = deletedAt;
      }
    },
    getSaleOff: (state, action) => {
      state.priceHistorys = action.payload.content;
      state.totalPages = action.payload.totalPages;
    },
    getPromotionDetail: (state, action) => {
      state.priceHistorys = action.payload.content;
      state.totalPages = action.payload.totalPages;
    },
    getSaleOffPriceHistory: (state, action) => {
      state.priceHistorys = action.payload.content;
      state.totalPages = action.payload.totalPages;
    },
    getPromotionDetailPriceHistory: (state, action) => {
      state.priceHistorys = action.payload.content;
      state.totalPages = action.payload.totalPages;
    },
    deleteSaleOffPriceHistory: (state, action) => {
      state.priceHistorys = action.payload.content;
      state.totalPages = action.payload.totalPages;
    },
    deletePromotionDetailPriceHistory: (state, action) => {
      state.priceHistorys = action.payload.content;
      state.totalPages = action.payload.totalPages;
    },
  },
});

const { reducer, actions } = PriceHistorySlice;
export const {getPromotionDetail, getPriceHistorys, priceHistoryAdded, priceHistoryUpdate, priceHistoryDelete, getSaleOff, getSaleOffPriceHistory, deleteSaleOffPriceHistory, getPromotionDetailPriceHistory, deletePromotionDetailPriceHistory } = actions;
export default reducer;
