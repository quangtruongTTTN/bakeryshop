import PromotionDetailService from "../../services/PromotionDetailService";
import { deletePromotionDetailProduct } from "../reducers/ProductReducer";
import { findAll } from "../reducers/PromotionDetailReducer";

export const PromotionDetailListAction = () => async (dispatch) => {
    try {
        await PromotionDetailService.list()
            .then((response) => dispatch(findAll(response.data)))
            .catch((error) => console.error(error));
    } catch (error) {
        console.error(error);
    }
};

export const PromotionDetailAddAction = (data) => async (dispatch) => {
    try {
        const res = await PromotionDetailService.addList(data).catch((error) => console.error(error));
        return res.data;
    } catch (error) {
        console.error(error);
    }
};
export const PromotionDetailAddListAction = (data) => async (dispatch) => {
    try {
        const config = {
            headers: {'Content-Type': 'application/json'}
        }
        const res = await PromotionDetailService.addList(data,config).catch((error) => console.error(error));
        return res.data;
    } catch (error) {
        console.error(error);
    }
};

// export const PromotionDetailAddAction = (data) => async (dispatch) => {
//     try {
//         await PromotionDetailService.add(data)
//             .catch((error) => console.error(error));
//     } catch (error) {
//         console.error(error);
//     }
// };

export const PromotionDetailDeleteAction = (id) => async (dispatch) => {
    try {
        await PromotionDetailService.delete(id)
            .then((response) => dispatch(deletePromotionDetailProduct(response.data)))
            .catch((error) => console.error(error));
    } catch (error) {
        console.error(error);
    }
};