import { getListProcess, getListFail, getListSuccess, onStatus, getByID } from "../reducers/ProductReturnReducer";
import ProductReturnService from "../../services/ProductReturnService";


export const ProductReturnListSuccess = (query) => async (dispatch) => {
    try {
        await ProductReturnService.listSuccess(query)
            .then((res) => dispatch(getListSuccess(res.data)))
            .catch((err) => console.error(err));
    } catch (error) {
        console.error(error);
    }
};



export const ProductReturnStatusUpdate = (data) => async (dispatch) => {
    try {
        await ProductReturnService.updateStatus(data)
            .then((res) => dispatch(onStatus(res.data)))
            .catch((err) => console.error(err));
    } catch (error) {
        console.error(error);
    }
};


// export const ProductReturnGetById = (data) => async (dispatch) => {
//     try {
//         await ProductReturnService.getById(data)
//             .then((res) => dispatch(getByID(res.data)))
//             .catch((err) => console.error(err));
//     } catch (error) {
//         console.error(error);
//     }
// };

// export const ProductReturnGetById = (query) => async (dispatch) => {
//     try {
//         await ProductReturnService.byId(query)
//             .then((res) => dispatch(getByID(res.data)))
//             .catch((err) => console.error(err));
//     } catch (error) {
//         console.error(error);
//     }
// };

export const ProductReturnGetById = (id) => async (dispatch) => {
    try {
       const res =  await ProductReturnService.listbyId(id)
    //    const res =  await ProductReturnService.listbyId("O0882021035829")
       return res;
    } catch (error) {
        console.error(error);
    }
};