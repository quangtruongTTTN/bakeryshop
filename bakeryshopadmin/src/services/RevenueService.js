import api from "./../common/APIClient";

class RevenueService {
    listRevenue = (query) => {
        return api.get("/revenue", { params: query });
    };
    listRevenueReport = (query) => {
        return api.get("/revenue/report", { params: query });
    };

    listMonthlyProfitReport = (query) => {
        return api.get("/revenue/profitByMonth", { params: query });
    };
    listAnnualProfitReport = (query) => {
        return api.get("/revenue/profitByYear", { params: query });
    };
    listDailyProfitReport = (query) => {
        return api.get("/revenue/profitByDay", { params: query });
    };
    listQuarterProfitReport = (query) => {
        return api.get("/revenue/profitByQuarter", { params: query });
    };
    listYear = () => {
        return api.get("/revenue/years");
    };
    sum = (query) => {
        return api.get("/revenue/sumRevenue", { params: query });
    };
    getRevenueToday = () => {
        return api.get("/revenue/today");
    };
    getLastFiveOrders = () => {
        return api.get("/revenue/lastFiveOrders");
    };
    countAccount = () => {
        return api.get("/revenue/account/count");
    };
    countProduct = () => {
        return api.get("/revenue/product/count");
    }
    countOrder = () => {
        return api.get("/revenue/order/count-order");
    }
    reportAmountYear = () => {
        return api.get("/revenue/order/amount-year");
    }
    countOrderByName = () =>{
        return api.get("/revenue/order/count-order-by-name");
    }

    reportByProduct = (page, size) =>{
        return api.get(`/revenue/order/page-report-product?page=${page}&size=${size}`);
    }
}

export default new RevenueService();