import PromotionService from "../../services/PromotionService";
import {
    findAll,
    promotionPage,
    promotionAdded,
    promotionDelete,
    promotionUpdate,
} from "../reducers/PromotionReducer";

export const PromotionListAction = () => async (dispatch) => {
    try {
        await PromotionService.list()
            .then((response) => dispatch(findAll(response.data)))
            .catch((error) => console.error(error));
    } catch (error) {
        console.error(error);
    }
};

export const PromotionPageAction = (query) => async (dispatch) => {
    try {
        await PromotionService.page(query)
            .then((response) => dispatch(promotionPage(response.data)))
            .catch((error) => console.error(error));
    } catch (error) {
        console.error(error);
    }
};

export const PromotionAddAction = (data) => async (dispatch) => {
    try {
        await PromotionService.add(data)
            .then((response) => dispatch(promotionAdded(response.data)))
            .catch((error) => console.error(error));
    } catch (error) {
        console.error(error);
    }
};

export const PromotionDeleteAction = (data) => async (dispatch) => {
    try {
      const res = await PromotionService.delete(data);
      dispatch(promotionDelete(res.data));
    } catch (e) {
      return console.error(e);
    }
  };

  export const PromotionUpdateAction = (data) => async (dispatch) => {
    try {
      await PromotionService.update(data)
        .then((response) => dispatch(promotionUpdate(response.data)))
        .catch((error) => console.error(error));
  
    } catch (e) {
      return console.error(e);
    }
  };