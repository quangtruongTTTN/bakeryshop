import {  getInvoice } from "../reducers/InvoiceReducer";
import InvoiceService from "../../services/InvoiceService";



export const ShowInvoice = (query) => async (dispatch) => {
  try {
    await InvoiceService.showInvoiceByUserId(query)
      .then((res) => dispatch(getInvoice(res.data)))
      .catch((err) => console.error(err));
  } catch (error) {
    console.error(error);
  }
};
