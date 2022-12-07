import {
    createSlice
} from "@reduxjs/toolkit";

const initialState = {
    promotionDetails: [],
    totalPages: 1
};

const promotionDetailSlice = createSlice({
    name: "promotionDetail",
    initialState,
    reducers: {
        findAll: (state, action) => {
            state.promotionDetails = action.payload.content;
            state.totalPages = action.payload.totalPages;
        },
    },
});

const {
    reducer,
    actions
} = promotionDetailSlice;
export const {
    findAll
} = actions;
export default reducer;