import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listSuccess: {},
    totalPagesSuccess: 1,
    revenue: [],
    getByID: [],
    productReturn: {},
};

const ProductReturnSlice = createSlice({
    name: "productReturn",
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
        //         const existingProductReturn = state.listProcess.find((productReturn) => productReturn.id === action.payload.id);
        //         if(existingProductReturn){
        //             existingProductReturn.status = 2;
        //         }
        //     }
        //     if(action.payload.status === 3){
        //         const productReturn = state.listProcess.find((o) => o.id === action.payload.id);
        //         productReturn.status = action.payload.status;
        //         state.listProcess = state.listProcess.filter((o) => o.id !== action.payload.id);
        //         state.listSuccess.push(productReturn);
        //     }
        //     if(action.payload.status === 4){
        //         const productReturn = state.listProcess.find((o) => o.id === action.payload.id);
        //         productReturn.status = action.payload.status;
        //         state.listProcess = state.listProcess.filter((o) => o.id !== action.payload.id);
        //         state.listFail.push(productReturn);
        //     }
        // },
    },
});

const { reducer, actions } = ProductReturnSlice;
export const { getListProcess, getListSuccess, getListFail, onStatus, getByID } = actions;
export default reducer;