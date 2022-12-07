import {getOrderByID, getListProcess, getListFail, getListSuccess, onStatus, getByID } from "./../reducers/OrderReducer";
import OrderService from "./../../services/OrderService";

export const OrderListProcess = (query) => async (dispatch) => {
    try {
        await OrderService.listProcess(query)
            .then((res) => dispatch(getListProcess(res.data)))
            .catch((err) => console.error(err));
    } catch (error) {
        console.error(error);
    }
};

export const OrderListSuccess = (query) => async (dispatch) => {
    try {
        await OrderService.listSuccess(query)
            .then((res) => dispatch(getListSuccess(res.data)))
            .catch((err) => console.error(err));
    } catch (error) {
        console.error(error);
    }
};

export const OrderListFail = (query) => async (dispatch) => {
    try {
        await OrderService.listFail(query)
            .then((res) => dispatch(getListFail(res.data)))
            .catch((err) => console.error(err));
    } catch (error) {
        console.error(error);
    }
};

export const OrderStatusUpdate = (data) => async (dispatch) => {
    try {
        await OrderService.updateStatus(data)
            .then((res) => dispatch(onStatus(res.data)))
            .catch((err) => console.error(err));
    } catch (error) {
        console.error(error);
    }
};

export const OrderStatusAndShipperUpdate = (data) => async (dispatch) => {
    try {
        await OrderService.updateStatusAndShipper(data)
            .then((res) => dispatch(onStatus(res.data)))
            .catch((err) => console.error(err));
    } catch (error) {
        console.error(error);
    }
};
export const OrderGetById = (id) => async (dispatch) => {
    try {
       const res =  await OrderService.listbyId(id)
       return res;
    } catch (error) {
        console.error(error);
    }
};

export const GetOrderById = (id) => async (dispatch) => {
    try {
       await OrderService.getOnebyId(id)
       .then((res) => dispatch(getOrderByID(res.data)))
            .catch((err) => console.error(err));
    } catch (error) {
        console.error(error);
    }
};

// export const OrderGetById = (data) => async (dispatch) => {
//     try {
//         await OrderService.getById(data)
//             .then((res) => dispatch(getByID(res.data)))
//             .catch((err) => console.error(err));
//     } catch (error) {
//         console.error(error);
//     }
// };

// export const OrderGetById = (query) => async (dispatch) => {
//     try {
//         await OrderService.byId(query)
//             .then((res) => dispatch(getByID(res.data)))
//             .catch((err) => console.error(err));
//     } catch (error) {
//         console.error(error);
//     }
// };



