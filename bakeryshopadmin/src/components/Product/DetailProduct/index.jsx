import {
  Avatar, Chip, Grid, makeStyles, Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@material-ui/core";
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useHistory, useLocation, Redirect } from "react-router-dom";
import BarCode from "react-barcode";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Report from "./report";
import TableHeader from "../../TableHeader";
import Logo from "../../../assets/img/BakeryShop.gif";
import {
  CreateOutlined,
  DeleteOutline,
  Replay,
  Visibility,
} from "@material-ui/icons";
import {
  ProductDetailGetAll,
  deleteProductDetail,
} from "./../../../store/actions/ProductDetailAction";
// import {
//   ProductGetAll,
//   deleteProduct,
// } from "./../../../store/actions/ProductAction";
import { confirmAlert } from "react-confirm-alert";
const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "hidden",
    paddingLeft: 30,
  },
  displayImg: {
    marginTop: 20,
  },
  content: {
    marginTop: 40,
  },
  navButton: {
    display: "flex",
    marginTop: -115,
    paddingBottom: 20,
    [theme.breakpoints.down("sm")]: {
      marginTop: 10,
    },
  },
}));

const fields = [
  { name: "size", label: "Kích thước", dir: "asc" },
  // { name: "name", label: "Tên Sản Phẩm", dir: "asc" },
  // { name: "title", label: "Chú Thích", dir: "asc" },
  { name: "price", label: "Giá", dir: "asc" },
  { name: "stock", label: "Tồn kho", dir: "asc" },
  // { name: "categoryId", label: "Loại", dir: "asc" },
  { label: "Trạng Thái" },
  { label: "Hành Động" },
];
const DetailProduct = () => {
  const classes = useStyles();
  const location = useLocation();
  const [product] = useState(location?.state?.product);
  const history = useHistory();
  const dispatch = useDispatch();
  const { productDetails } = useSelector((state) => state.productDetail);
  const [productId, setProductId] = useState(product.id);
  useEffect(() => {
    dispatch(
      ProductDetailGetAll({
        productId: product.id
      })
    );
  }, [dispatch], productId);

  const onhandleDelete = (id) => {
    confirmAlert({
      title: "Thông báo",
      message: "Bạn có chắc muốn cập nhật trạng thái?",
      buttons: [
        {
          label: "Có",
          onClick: () => {
            dispatch(deleteProductDetail(id));
            // Notification.success("Đã cập nhập thành công!");
          },
        },
        {
          label: "Không",
        },
      ],
    });
  };
  const onhandleUpdate = (item, size, productDetailId) => {
    history.push("/priceHistory/update", {
      product: product,
      productDetailId: productDetailId,
      priceHistory: item,
      // addition: additionOptions,
      sizeName: size.name
    });
  };
  
  return (
    <div className={classes.root}>
      {Object.is(product, undefined) && <Redirect to="/product" />}
      <Grid container spacing={3}>
        <Grid item md={12} sm={12} xs={12}>
          <Typography variant="h5">THÔNG TIN SẢN PHÂM</Typography>

          <Grid container spacing={3}>
            <Grid item md={5} xs={12}>
              <img
                alt=""
                src={product?.linkImage}
                className={classes.displayImg}
                width={350}
                height={400}
              />
            </Grid>
            <Grid item md={7} xs={12}>
              <div className={classes.content}>
                <Typography variant="h6">Tên sản phẩm:</Typography>
                <Typography variant="subtitle1">{product?.name}</Typography>
                {/* <Typography variant="h6">Giá sản phẩm:</Typography>
                <Typography variant="subtitle1">{product?.price}</Typography> */}
                <Typography variant="h6">Chú thích:</Typography>
                <Typography variant="subtitle1">{product?.title}</Typography>
                <Typography variant="h6">Loại sản phẩm:</Typography>
                <Typography variant="subtitle1">
                  {product?.categoryId?.name}
                </Typography>
                <Typography variant="h6">Kích thước sản phẩm:</Typography>
                {/* {product?.sizeOptions.map((item) => (
                  <Chip key={item.id} label={item.name} color="primary" />
                ))} */}
                {product?.productDetails.map((item) => (
                  <Chip key={item?.sizeOption.id} label={item?.sizeOption.name} color="primary" />
                ))}
                {/* <Typography variant="h6">Topping thêm vào:</Typography>
                {product?.additionOptions.map((item) => (
                  <Chip key={item.id} label={item.name} color="primary" />
                ))} */}
                <Typography variant="h6">Barcode:</Typography>
                <BarCode value={product?.id} />
              </div>
            </Grid>
            <div className={classes.navButton}>
              <PDFDownloadLink
                document={<Report product={product} />}
                fileName="report"
              >
                <Avatar
                  style={{
                    cursor: "pointer",
                    width: 50,
                    height: 50,
                    backgroundColor: "#FC8400",
                  }}
                >
                  <PictureAsPdfIcon style={{ fontSize: 30 }} />
                </Avatar>
              </PDFDownloadLink>
            </div>
          </Grid>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table style={{ minWidth: 650 }} aria-label="simple table">
          <TableHeader
            // valueToOrderBy={valueToOrderBy}
            // valueToSortDir={valueToSortDir}
            // handleRequestSort={handleRequestSort}product.productDetails
            fields={fields}
          />
          <TableBody>
            {productDetails.map((u) => (
              <TableRow key={u.id}>
               
                <TableCell>{u.sizeOption.name}
                </TableCell>
                {/* <TableCell>
                {isLoad  && onHandleSelectProductDetails(u) ? (productDetailsSort[0].price)
                : (120000)
              }
                   
              </TableCell> */}
                <TableCell>{u?.priceHistories[0].price}</TableCell>
                <TableCell>{u.stock}</TableCell>
                {/* <TableCell>{onHandleSelectProductDetails(u)}</TableCell> */}
                {/* <TableCell>{onHandleSelectProductDetails(u)}</TableCell> */}
                <TableCell>
                  {u.deletedAt ? (
                    <Chip
                      label="Ngừng bán"
                      style={{ backgroundColor: "red", color: "white" }}
                    />
                  ) : (
                    <Chip
                      label="Hoạt động"
                      style={{ backgroundColor: "green", color: "white" }}
                    />
                  )}
                </TableCell>
                <TableCell>
                  
                  <CreateOutlined
                    style={{
                      color: "#3f51b5",
                      cursor: "pointer",
                      marginRight: 10,
                    }}
                    onClick={() => onhandleUpdate(u.priceHistories, u.sizeOption, u.id)}
                  />

                  {u.deletedAt ? (
                    <Replay
                      style={{ cursor: "pointer", color: "green" }}
                    onClick={() => onhandleDelete(u.id)}
                    />
                  ) : (
                    <DeleteOutline
                      style={{ color: "red", cursor: "pointer" }}
                    onClick={() => onhandleDelete(u.id)}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DetailProduct;
