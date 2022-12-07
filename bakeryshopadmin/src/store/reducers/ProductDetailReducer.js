import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productDetails: [],
  totalPages: 1,
};

const ProductDetailSlice = createSlice({
  name: "productDetail",
  initialState,
  reducers: {
    getProductDetails: (state, action) => {
      // state.totalPages = action.payload.totalPages;.content
      state.productDetails = action.payload;
    },
    productDetailAdded: (state, action) => {
      state.productDetails.push(action.payload);
    },
    productDetailUpdate(state, action) {
      const { id, name, title, additionOptions, sizeOptions, categoryId, linkImage } = action.payload;
      const existingProductDetail = state.productDetails.find((productDetail) => productDetail.id === id);
      if (existingProductDetail) {
        existingProductDetail.name = name;
        existingProductDetail.title = title;
        // existingProductDetail.additionOptions = additionOptions;
        existingProductDetail.sizeOptions = sizeOptions;
        existingProductDetail.categoryId = categoryId;
        existingProductDetail.linkImage = linkImage;
      }
    },
    productDetailDelete(state, action) {
      const { id, deletedAt } = action.payload;
      const existingProductDetail = state.productDetails.find((productDetail) => productDetail.id === id);
      if (existingProductDetail) {
        existingProductDetail.deletedAt = deletedAt;
      }
    },
    getSaleOff: (state, action) => {
      state.productDetails = action.payload.content;
      state.totalPages = action.payload.totalPages;
    },
    getPromotionDetail: (state, action) => {
      state.productDetails = action.payload.content;
      state.totalPages = action.payload.totalPages;
    },
    getSaleOffProductDetail: (state, action) => {
      state.productDetails = action.payload.content;
      state.totalPages = action.payload.totalPages;
    },
    getPromotionDetailProductDetail: (state, action) => {
      state.productDetails = action.payload.content;
      state.totalPages = action.payload.totalPages;
    },
    deleteSaleOffProductDetail: (state, action) => {
      state.productDetails = action.payload.content;
      state.totalPages = action.payload.totalPages;
    },
    deletePromotionDetailProductDetail: (state, action) => {
      state.productDetails = action.payload.content;
      state.totalPages = action.payload.totalPages;
    },
  },
});

const { reducer, actions } = ProductDetailSlice;
export const {getPromotionDetail, getProductDetails, productDetailAdded, productDetailUpdate, productDetailDelete, getSaleOff, getSaleOffProductDetail, deleteSaleOffProductDetail, getPromotionDetailProductDetail, deletePromotionDetailProductDetail } = actions;
export default reducer;
