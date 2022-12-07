import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import PrivateRoute from "./components/PrivateRoute";
import { CircularProgress } from "@material-ui/core";
import "./App.css";
import "antd/dist/antd.css";
import Themes from "./themes";
import "./assets/JsonData/status-card-data.json";

// import CreatePromotionDetail from "./components/Promotion/CreatePromotionDetail";

const Spinner = React.lazy(() => import("./components/Spinner"));
const Login = React.lazy(() => import("./components/Login"));
const Form = React.lazy(() => import("./components/Something/Form"));
const Dashboard = React.lazy(() => import("./components/Dashboard"));
const SpanningTable = React.lazy(() => import("./components/Something/Table"));
const Page404 = React.lazy(() => import("./components/Page404"));
const User = React.lazy(() => import("./components/User"));

const Product = React.lazy(() => import("./components/Product"));
const PriceHistory = React.lazy(() => import("./components/PriceHistory"));
const AddProduct = React.lazy(() => import("./components/Product/AddProduct"));
const EditProduct = React.lazy(() => import("./components/Product/EditProduct"));
const DetailProduct = React.lazy(() => import("./components/Product/DetailProduct"));

const UpdatePrice = React.lazy(() => import("./components/PriceHistory/UpdatePrice"));

const AddPriceHistory = React.lazy(() => import("./components/PriceHistory/AddPriceHistory"));
const EditPriceHistory = React.lazy(() => import("./components/PriceHistory/EditPriceHistory"));
const DetailPriceHistory = React.lazy(() => import("./components/PriceHistory/DetailPriceHistory"));


const Category = React.lazy(() => import("./components/Category"));
const AddCategory = React.lazy(() => import("./components/Category/AddCategory"));
const EditCategory = React.lazy(() => import("./components/Category/EditCategory"));
const DetailCategory = React.lazy(() => import("./components/Category/DetailCategory"));

const Promotion = React.lazy(() => import("./components/Promotion"));
const AddPromotion = React.lazy(() => import("./components/Promotion/AddPromotion"));
const EditPromotion = React.lazy(() => import("./components/Promotion/EditPromotion"));
const PromotionDetail = React.lazy(() => import("./components/Promotion/PromotionDetail"));
// const AdditionOption = React.lazy(() => import("./components/AdditionOption"));
// const CreateAdditionOption = React.lazy(() => import("./components/AdditionOption/CreateAdditionOption"));
// const EditAdditionOption = React.lazy(() => import("./components/AdditionOption/EditAdditionOption"));

const SizeOption = React.lazy(() => import("./components/SizeOption"));
const AddSizeOption = React.lazy(() => import("./components/SizeOption/AddSizeOption"));
const EditSizeOption = React.lazy(() => import("./components/SizeOption/EditSizeOption"));

const SaleOff = React.lazy(() => import("./components/SaleOff"));
const AddSaleOff = React.lazy(() => import("./components/SaleOff/AddSaleOff"));
const CreateSaleOff = React.lazy(() => import("./components/SaleOff/CreateSaleOff"));

const AddPromotionDetail = React.lazy(() => import("./components/Promotion/AddPromotionDetail"));
const CreatePromotionDetail = React.lazy(() => import("./components/Promotion/CreatePromotionDetail"));
// const CreateSaleOff = React.lazy(() => import("./components/SaleOff/CreateSaleOff"));

const DetailUser = React.lazy(() => import("./components/User/DetailUser"));

const Employee = React.lazy(() => import("./components/Employee")); 
const AddEmployee = React.lazy(() => import("./components/Employee/AddEmployee"));
const DetailEmployee = React.lazy(() => import("./components/Employee/DetailEmployee"));

const Shipper = React.lazy(() => import("./components/Shipper")); 
const AddShipper = React.lazy(() => import("./components/Shipper/AddShipper"));
const DetailShipper = React.lazy(() => import("./components/Shipper/DetailShipper"));

const OrderOfShipper = React.lazy(() => import("./components/OrderOfShipper"));

const Order = React.lazy(() => import("./components/Order"));
const DetailOrder = React.lazy(() => import("./components/Order/DetailOrder"));
const Invoice = React.lazy(() => import("./components/Order/Invoice"));

const Statistic = React.lazy(() => import("./components/Statistic"));

const ProductImport = React.lazy(() => import("./components/ProductImport"));
const DetailProductImport = React.lazy(() => import("./components/ProductImport/DetailProductImport"));
const AddProductImport = React.lazy(() => import("./components/ProductImport/AddProductImport"));
const SelectProductImport = React.lazy(() => import("./components/ProductImport/SelectProductImport"));

const ProductReturn = React.lazy(() => import("./components/ProductReturn"));
const AddProductReturn = React.lazy(() => import("./components/ProductReturn/AddProductReturn"));
const DetailProductReturn = React.lazy(() => import("./components/ProductReturn/DetailProductReturn"));
const SelectInvoiceReturn = React.lazy(() => import("./components/ProductReturn/SelectInvoiceReturn"));

const Rating = React.lazy(() => import("./components/Rating"));
const RevenueReport = React.lazy(() => import("./components/RevenueReport"));
const DetailRevenueReport = React.lazy(() => import("./components/RevenueReport/DetailRevenueReport"));
const DetailProfitReport = React.lazy(() => import("./components/RevenueReport/DetailProfitReport"));


const Profile = React.lazy(() => import("./components/Profile"));
const ChangePassword = React.lazy(() => import("./components/ChangePassword"));
const App = () => {
  return (
    <>
      <ToastContainer />
      <Router>
        <Suspense
          fallback={
            <CircularProgress
              disableShrink
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
              }}
            />
          }
        >
          <Switch>
            <Route exact path={["/", "/login"]}>
              <Login />
            </Route>
            <PrivateRoute path={"/dashboard"}>
              <Dashboard />
            </PrivateRoute>

            <PrivateRoute exact path={"/user"}>
              <User />
            </PrivateRoute>
            <PrivateRoute path={"/user/detail"}>
              <DetailUser />
            </PrivateRoute>

            <PrivateRoute exact path={"/employee"}>
              <Employee />
            </PrivateRoute>
            <PrivateRoute path={"/employee/detail"}>
              <DetailEmployee />
            </PrivateRoute>
            <PrivateRoute path={"/employee/add"}>
              <AddEmployee />
            </PrivateRoute>
            <PrivateRoute exact path={"/shipper"}>
            <Shipper />
            </PrivateRoute>
            <PrivateRoute path={"/shipper/detail"}>
            <DetailShipper />
            </PrivateRoute>
            <PrivateRoute path={"/shipper/add"}>
            <AddShipper />
            </PrivateRoute>
            <PrivateRoute exact path={"/product"}>
              <Product />
            </PrivateRoute>
            <PrivateRoute path={"/product/add"}>
              <AddProduct />
            </PrivateRoute>
            <PrivateRoute path={"/product/edit"}>
              <EditProduct />
            </PrivateRoute>
            <PrivateRoute path={"/product/detail"}>
              <DetailProduct />
            </PrivateRoute>

            <PrivateRoute exact path={"/pricehistory"}>
              <PriceHistory />
            </PrivateRoute>
            <PrivateRoute path={"/priceHistory/add"}>
              <AddPriceHistory />
            </PrivateRoute> 
            <PrivateRoute path={"/priceHistory/edit"}>
              <EditPriceHistory />
            </PrivateRoute>
            <PrivateRoute path={"/priceHistory/detail"}>
              <DetailPriceHistory />
            </PrivateRoute>
            <PrivateRoute path={"/priceHistory/update"}>
              <UpdatePrice />
            </PrivateRoute>
            
            <PrivateRoute exact path={"/category"}>
              <Category />
            </PrivateRoute>
            <PrivateRoute path={"/category/add"}>
              <AddCategory />
            </PrivateRoute>
            <PrivateRoute path={"/category/edit"}>
              <EditCategory />
            </PrivateRoute>
            <PrivateRoute path={"/category/detail"}>
              <DetailCategory />
            </PrivateRoute>

            <PrivateRoute exact path={"/promotion"}>
              <Promotion />
            </PrivateRoute>
            <PrivateRoute path={"/promotion/add"}>
              <AddPromotion />
            </PrivateRoute>
            <PrivateRoute path={"/promotion/edit"}>
              <EditPromotion />
            </PrivateRoute>
            <PrivateRoute path={"/promotion/detail"}>
              <PromotionDetail />
            </PrivateRoute>


            <PrivateRoute exact path={"/accountInfo"}>
              <Profile />
              </PrivateRoute>
              <PrivateRoute exact path={"/account/changepassword"}>
              <ChangePassword />
              </PrivateRoute>
            {/* <PrivateRoute exact path={"/addition"}>
              <AdditionOption />
            </PrivateRoute>
            <PrivateRoute exact path={"/addition/add"}>
              <CreateAdditionOption />
            </PrivateRoute>
            <PrivateRoute exact path={"/addition/edit"}>
              <EditAdditionOption />
            </PrivateRoute> */}

            
            <PrivateRoute exact path={"/sizeoption"}>
              <SizeOption />
            </PrivateRoute>
            <PrivateRoute exact path={"/sizeoption/add"}>
              <AddSizeOption />
            </PrivateRoute>
            <PrivateRoute exact path={"/sizeoption/edit"}>
              <EditSizeOption />
            </PrivateRoute>

            <PrivateRoute exact path={"/saleoff"}>
              <SaleOff />
            </PrivateRoute>
            <PrivateRoute path={"/promotiondetail/add"}>
              <AddPromotionDetail />
            </PrivateRoute>
            <PrivateRoute path={"/saleoff/add"}>
              <AddSaleOff />
            </PrivateRoute>

            <PrivateRoute path={"/saleoff/create"}>
              <CreateSaleOff />
            </PrivateRoute>

            <PrivateRoute path={"/promotiondetail/create"}>
              <CreatePromotionDetail />
            </PrivateRoute>
            
            <PrivateRoute exact path={"/rating"}>
              <Rating />
            </PrivateRoute>

            <PrivateRoute exact path={"/statistic"}>
              <Statistic />
            </PrivateRoute>

            <PrivateRoute exact path={"/revenueReport"}>
              <RevenueReport />
            </PrivateRoute>
            <PrivateRoute exact path={"/revenueReport/detail"}>
              <DetailRevenueReport />
            </PrivateRoute>
            <PrivateRoute exact path={"/profitReport/detail"}>
              <DetailProfitReport />
            </PrivateRoute>



            <PrivateRoute exact path={"/orderOfShipper"}>
              <OrderOfShipper />
            </PrivateRoute>

            <PrivateRoute exact path={"/order"}>
              <Order />
            </PrivateRoute>
            <PrivateRoute exact path={"/order/detail"}>
              <DetailOrder/>
            </PrivateRoute>
            <PrivateRoute exact path={"/order/invoice"}>
              <Invoice/>
            </PrivateRoute>
            <PrivateRoute exact path={"/productImport"}>
              <ProductImport />
            </PrivateRoute>
            <PrivateRoute exact path={"/productImport/detail"}>
              <DetailProductImport/>
            </PrivateRoute>
            <PrivateRoute exact path={"/productImport/add"}>
              <AddProductImport/>
            </PrivateRoute>
            <PrivateRoute exact path={"/productImport/select"}>
              <SelectProductImport/>
            </PrivateRoute>

            <PrivateRoute exact path={"/productReturn"}>
              <ProductReturn />
            </PrivateRoute>
            <PrivateRoute exact path={"/productReturn/add"}>
              <AddProductReturn/>
            </PrivateRoute>
            <PrivateRoute exact path={"/productReturn/detail"}>
              <DetailProductReturn/>
            </PrivateRoute>
            <PrivateRoute exact path={"/productReturn/select"}>
              <SelectInvoiceReturn/>
            </PrivateRoute>

            <PrivateRoute path={"/spinner"}>
              <Spinner />
            </PrivateRoute>
            <PrivateRoute path={"/form"}>
              <Form />
            </PrivateRoute>
            <PrivateRoute path={"/table"}>
              <SpanningTable />
            </PrivateRoute>

            <PrivateRoute path="/*">
              <Page404 />
            </PrivateRoute>
          </Switch>
        </Suspense>
      </Router>
    </>
  );
};

export default App;
