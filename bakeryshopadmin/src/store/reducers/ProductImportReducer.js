import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listSuccess: {},
    totalPagesSuccess: 1,
    revenue: [],
    getByID: [],
    productImport: {},
};

const ProductImportSlice = createSlice({
    name: "productImport",
    initialState,
    reducers: {
        getListSuccess: (state, action) => {
            state.totalPagesSuccess = action.payload.totalPages;
            state.listSuccess = action.payload.content;
        },
        // getListSuccess: (state, action) => {
        //     state.totalPagesSuccess = 10;
        //     state.listSuccess = action.payload;
        // },
        getByID: (state, action) => {
            // state.totalPagesFail = action.payload.totalPages;.content;
            state.getByID = action.payload.content;
        },
        // onStatus: (state, action) => {
        //     if(action.payload.status === 2){
        //         const existingProductImport = state.listProcess.find((productImport) => productImport.id === action.payload.id);
        //         if(existingProductImport){
        //             existingProductImport.status = 2;
        //         }
        //     }
        //     if(action.payload.status === 3){
        //         const productImport = state.listProcess.find((o) => o.id === action.payload.id);
        //         productImport.status = action.payload.status;
        //         state.listProcess = state.listProcess.filter((o) => o.id !== action.payload.id);
        //         state.listSuccess.push(productImport);
        //     }
        //     if(action.payload.status === 4){
        //         const productImport = state.listProcess.find((o) => o.id === action.payload.id);
        //         productImport.status = action.payload.status;
        //         state.listProcess = state.listProcess.filter((o) => o.id !== action.payload.id);
        //         state.listFail.push(productImport);
        //     }
        // },
    },
});

const { reducer, actions } = ProductImportSlice;
export const { getListProcess, getListSuccess, getListFail, onStatus, getByID } = actions;
export default reducer;