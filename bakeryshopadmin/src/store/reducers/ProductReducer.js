import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  promotionproducts: [],
  totalPages: 1,
  promotiontotalPages: 1,
  promotiontotalElements: 1,
  
};

const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProducts: (state, action) => {
      state.totalPages = action.payload.totalPages;
      state.products = action.payload.content;
      
    },
    getListProducts: (state, action) => {
      state.products = action.payload;
    },
    productAdded: (state, action) => {
      state.products.push(action.payload);
    },
    productUpdate(state, action) {
      const { id, name, title, additionOptions, sizeOptions, categoryId, linkImage } = action.payload;
      const existingProduct = state.products.find((product) => product.id === id);
      if (existingProduct) {
        existingProduct.name = name;
        existingProduct.title = title;
        // existingProduct.additionOptions = additionOptions;
        existingProduct.sizeOptions = sizeOptions;
        existingProduct.categoryId = categoryId;
        existingProduct.linkImage = linkImage;
      }
    },
    productDelete(state, action) {
      const { id, deletedAt } = action.payload;
      const existingProduct = state.products.find((product) => product.id === id);
      if (existingProduct) {
        existingProduct.deletedAt = deletedAt;
      }
    },
    getSaleOff: (state, action) => {
      state.products = action.payload.content;
      state.totalPages = action.payload.totalPages;
    },
    getPromotionDetail: (state, action) => {
      state.promotionproducts = action.payload.content;
      state.promotiontotalPages = action.payload.totalPages;
      state.promotiontotalElements = action.payload.totalElements;
    },
    getSaleOffProduct: (state, action) => {
      state.products = action.payload.content;
      state.totalPages = action.payload.totalPages;
    },
    getProductFilterByPromotionDetail: (state, action) => {
      // state.products = action.payload.content;
      // state.totalPages = action.payload.totalPages;
      state.products = action.payload;
      
      
      // state.promotiontotalElements = action.payload.totalElements;
    },
    deleteSaleOffProduct: (state, action) => {
      state.products = action.payload.content;
      state.totalPages = action.payload.totalPages;
    },
    deletePromotionDetailProduct: (state, action) => {
      state.products = action.payload.content;
      state.totalPages = action.payload.totalPages;
    },
  },
});

const { reducer, actions } = ProductSlice;
export const {getListProducts, getPromotionDetail, getProducts, productAdded, productUpdate, productDelete, getSaleOff, getSaleOffProduct, deleteSaleOffProduct, getProductFilterByPromotionDetail, deletePromotionDetailProduct } = actions;
export default reducer;
