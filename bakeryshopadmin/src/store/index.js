import { configureStore } from "@reduxjs/toolkit";
import SpinnerReducer from "./reducers/SpinnerReducer";
import AuthReducer from "./reducers/AuthReducer";
import UserReducer from "./reducers/UserReducer";
import EmployeeReducer from "./reducers/EmployeeReducer";
import ShipperReducer from "./reducers/ShipperReducer";
import CategoryReducer from "./reducers/CategoryReducer";
import AdditionOptionReducer from "./reducers/AdditionOptionReducer";
import SizeOptionReducer from "./reducers/SizeOptionReducer";
import ProductReducer from "./reducers/ProductReducer";
import OrderReducer from "./reducers/OrderReducer";
import ProductImportReducer from "./reducers/ProductImportReducer";
import ProductReturnReducer from "./reducers/ProductReturnReducer";
import RevenueReducer from "./reducers/RevenueReducer";
import RatingReducer from "./reducers/RatingReducer";
import PromotionReducer from "./reducers/PromotionReducer";
import PromotionDetailReducer from "./reducers/PromotionDetailReducer";
import ProductDetailReducer from "./reducers/ProductDetailReducer";
import PriceHistoryReducer from "./reducers/PriceHistoryReducer";
import InvoiceReducer from "./reducers/InvoiceReducer";
const store = configureStore({
  reducer: {
    revenue: RevenueReducer,
    order: OrderReducer,
    productImport: ProductImportReducer,
    productReturn: ProductReturnReducer,
    spinner: SpinnerReducer,
    auth: AuthReducer,
    user: UserReducer,
    employee: EmployeeReducer,
    shipper: ShipperReducer,
    product: ProductReducer,
    productDetail: ProductDetailReducer,
    category: CategoryReducer,
    additionOption: AdditionOptionReducer,
    sizeOption: SizeOptionReducer,
    rating: RatingReducer,
    promotion: PromotionReducer,
    promotionDetails: PromotionDetailReducer,
    priceHistory: PriceHistoryReducer,
    invoice: InvoiceReducer,
  },
});

export default store;
