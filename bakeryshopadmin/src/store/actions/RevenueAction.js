import {getListProfit, getListRevenue, getYears, getSumRevenues, getRevenueToday, getListLastFiveOrders } from "../reducers/RevenueReducer";
import RevenueService from "../../services/RevenueService";

export const RevenueList = (query) => async (dispatch) => {
    try {
        await RevenueService.listRevenue(query)
            .then((res) => dispatch(getListRevenue(res.data)))
            .catch((err) => console.error(err));
    } catch (error) {
        console.error(error);
    }
};

export const RevenueListReport = (query) => async (dispatch) => {
    try {
        await RevenueService.listRevenueReport(query)
            .then((res) => dispatch(getListRevenue(res.data)))
            .catch((err) => console.error(err));
    } catch (error) {
        console.error(error);
    }
};
export const MonthlyProfitReport = (query) => async (dispatch) => {
    try {
        await RevenueService.listMonthlyProfitReport(query)
            .then((res) => dispatch(getListProfit(res.data)))
            .catch((err) => console.error(err));
    } catch (error) {
        console.error(error);
    }
};
export const AnnualProfitReport = (query) => async (dispatch) => {
    try {
        await RevenueService.listAnnualProfitReport(query)
            .then((res) => dispatch(getListProfit(res.data)))
            .catch((err) => console.error(err));
    } catch (error) {
        console.error(error);
    }
};
export const DailyProfitReport = (query) => async (dispatch) => {
    try {
        await RevenueService.listDailyProfitReport(query)
            .then((res) => dispatch(getListProfit(res.data)))
            .catch((err) => console.error(err));
    } catch (error) {
        console.error(error);
    }
};
export const QuarterProfitReport = (query) => async (dispatch) => {
    try {
        await RevenueService.listQuarterProfitReport(query)
            .then((res) => dispatch(getListProfit(res.data)))
            .catch((err) => console.error(err));
    } catch (error) {
        console.error(error);
    }
};

export const YearList = () => async (dispatch) => {
    try {
        await RevenueService.listYear()
            .then((res) => dispatch(getYears(res.data)))
            .catch((err) => console.error(err));
    } catch (error) {
        console.error(error);
    }
};

export const SumRevenue = (query) => async (dispatch) => {
    try {
        await RevenueService.sum(query)
            .then((res) => dispatch(getSumRevenues(res.data)))
            .catch((err) => console.error(err));
    } catch (error) {
        console.error(error);
    }
};

export const RevenueToday = () => async (dispatch) => {
    try {
        await RevenueService.getRevenueToday()
            .then((res) => dispatch(getRevenueToday(res.data)))
            .catch((err) => console.error(err));
    } catch (error) {
        console.error(error);
    }
};

export const LastFiveOrders = () => async (dispatch) => {
    try {
        await RevenueService.getLastFiveOrders()
            .then((res) => dispatch(getListLastFiveOrders(res.data)))
            .catch((err) => console.error(err));
    } catch (error) {
        console.error(error);
    }
};