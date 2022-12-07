import { getListProcess, getListFail, getListSuccess, onStatus, getByID } from "../reducers/ProductImportReducer";
import ProductImportService from "../../services/ProductImportService";


export const ProductImportListSuccess = (query) => async (dispatch) => {
    try {
        await ProductImportService.listSuccess(query)
            .then((res) => dispatch(getListSuccess(res.data)))
            .catch((err) => console.error(err));
    } catch (error) {
        console.error(error);
    }
};



export const ProductImportStatusUpdate = (data) => async (dispatch) => {
    try {
        await ProductImportService.updateStatus(data)
            .then((res) => dispatch(onStatus(res.data)))
            .catch((err) => console.error(err));
    } catch (error) {
        console.error(error);
    }
};


// export const ProductImportGetById = (data) => async (dispatch) => {
//     try {
//         await ProductImportService.getById(data)
//             .then((res) => dispatch(getByID(res.data)))
//             .catch((err) => console.error(err));
//     } catch (error) {
//         console.error(error);
//     }
// };

// export const ProductImportGetById = (query) => async (dispatch) => {
//     try {
//         await ProductImportService.byId(query)
//             .then((res) => dispatch(getByID(res.data)))
//             .catch((err) => console.error(err));
//     } catch (error) {
//         console.error(error);
//     }
// };

export const ProductImportGetById = (id) => async (dispatch) => {
    try {
       const res =  await ProductImportService.listbyId(id)
    //    const res =  await ProductImportService.listbyId("O0882021035829")
       return res;
    } catch (error) {
        console.error(error);
    }
};