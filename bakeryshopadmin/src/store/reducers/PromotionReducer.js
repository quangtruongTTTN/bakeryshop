import {
    createSlice
} from "@reduxjs/toolkit";

const initialState = {
    promotions: [],
    totalPages: 1
};

const promotionSlice = createSlice({
    name: "promotion",
    initialState,
    reducers: {
        findAll: (state, action) => {
            state.promotions = action.payload;
        },
        promotionPage: (state, action) => {
            state.promotions = action.payload.content;
            state.totalPages = action.payload.totalPages;
        },
        promotionAdded: (state, action) => {
            state.promotions.push(action.payload);
        },
        promotionDelete(state, action) {
            const { id, deletedAt } = action.payload;
            const existingPromotion = state.promotions.find((promotion) => promotion.id === id);
            if (existingPromotion) {
                existingPromotion.deletedAt = deletedAt;
            }
        },
        promotionUpdate(state, action) {
            const { id, name } = action.payload;
            const existingPromotion = state.promotions.find((promotion) => promotion.id === id);
            if (existingPromotion) {
                existingPromotion.name = name;
            }
        },
    },
});

const {
    reducer,
    actions
} = promotionSlice;
export const {
    findAll,
    promotionPage,
    promotionAdded,
    promotionDelete,
    promotionUpdate
} = actions;
export default reducer;