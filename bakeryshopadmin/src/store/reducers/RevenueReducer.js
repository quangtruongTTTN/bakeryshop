import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listRevenue: [],
    listProfit: [],
    listYears: [],
    sumRevenue: 0,
    revenueToday: 0,
    listLastFiveOrders: [],
};

const RevenueSlice = createSlice({
    name: "revenue",
    initialState,
    reducers: {

        
        getListProfit: (state, action) => {
            state.listProfit = action.payload;
        },
        getListRevenue: (state, action) => {
            state.listRevenue = action.payload;
        },
        getYears: (state, action) => {
            state.listYears = action.payload;
        },
        getSumRevenues: (state, action) => {
            state.sumRevenue = action.payload;
        },
        getRevenueToday: (state, action) => {
            state.revenueToday = action.payload;
        },
        getListLastFiveOrders: (state, action) => {
            state.listLastFiveOrders = action.payload;
        },
    },
});

const { reducer, actions } = RevenueSlice;
export const { getListProfit, getListRevenue, getYears, getSumRevenues, getRevenueToday, getListLastFiveOrders } = actions;
export default reducer;