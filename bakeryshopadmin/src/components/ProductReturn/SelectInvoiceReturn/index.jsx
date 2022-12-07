import {
  Button,
  FormControl,
  Paper,
  Select,
  Grid,
  makeStyles,
  Table,
  TableCell,
  TextField,
  Typography,
  TableContainer,
  TableBody,
  TableRow,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
// import { SaleOffListAction } from "../../../store/actions/SaleOffAction";
import { ShowInvoice } from "../../../store/actions/InvoiceAction";
import Logo from "./../../../assets/img/BakeryShop.gif";
import Pagination from "@material-ui/lab/Pagination";
import { useHistory, useLocation } from "react-router-dom";
import TableHeader from "../../TableHeader";
import { confirmAlert } from "react-confirm-alert";
import Notification from "../../../common/Notification";
const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "hidden",
  },
  formControl: {
    minWidth: 120,
    marginTop: 20,
  },
  btn: {
    width: 90.18,
    height: 36,
  },
  searchField: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  btnSearch: {
    background: "#020202",
    width: 120,
    height: 36,
    marginTop: 16,
    marginRight: 30,

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginBottom: 16,
      marginRight: 0,
    },
  },
  wrapForm: {
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column-reverse",
    },
  },
  select: {
    marginLeft: 30,
    [theme.breakpoints.down("sm")]: {
      marginLeft: 200,
    },
  },
}));

const SelectInvoiceReturn = () => {
  const classes = useStyles();

  const history = useHistory();

  const dispatch = useDispatch();
  const location = useLocation();
  // const { products, totalPages } = useSelector((state) => state.product);
  const { invoices, totalPages } = useSelector((state) => state.invoice);
  // const { products, totalPages } = useSelector((state) => state.product);
  // const { invoices, totalPages } = useSelector((state) => state.invoices);
  const [page, setPage] = useState(1);
  const [valueToOrderBy, setValueToOrderBy] = useState("id");
  const [valueToSortDir, setValueToSortDir] = useState("asc");
  const [keyword, setKeyword] = useState("");
  const [name, setName] = useState("");
  const [pageSize, setPageSize] = useState(3);
  const [user] = useState(location?.state?.user);
  useEffect(() => {
    dispatch(
      ShowInvoice({
        id: user.id,
        page,
        sortField: valueToOrderBy,
        sortDir: valueToSortDir,
        keyword,
        pageSize,
      })
    );
  }, [dispatch, page, valueToOrderBy, valueToSortDir, keyword, pageSize]);

  const handleRequestSort = (property) => {
    const isAscending =
      Object.is(valueToOrderBy, property) && Object.is(valueToSortDir, "asc");
    setValueToOrderBy(property);
    setValueToSortDir(isAscending ? "desc" : "asc");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setKeyword(name);
    setPage(1);
  };

  const handlePage = (event, value) => {
    setPage(value);
  };

  const handlePageSize = (e) => {
    setPageSize(e.target.value);
    setPage(1);
  };

  const fields = [
    // { label: "Hình Ảnh" },
    { name: "invoiceId", label: "Mã HĐ", dir: "asc" },
    { name: "username", label: "Mã KH", dir: "asc" },
    { name: "name", label: "Tên KH", dir: "asc" },
    { name: "sdt", label: "SĐT", dir: "asc" },
    { name: "email", label: "Email", dir: "asc" },
    { name: "createdAt", label: "Ngày tạo", dir: "asc" },
    { label: "Hành Động" },
  ];


  const handleSelectInvoiceReturn = (item, invoiceId) => {
    
    // history.push("/productImport/add", { product: item });
    // history.push("/productImport/add", { productSelect: item });
    const items = JSON.parse(localStorage.getItem("productReturn") || "[]");

      var arrT = [];
      // const isFound = items.some(element => {
      //   if (element.id === item.id) {
      //     return true;
      //   }
    
      //   return false;
      // });Notification.success(123);
      
      
      // Notification.success(item.length);
      // return
      for(let i=0 ; i< item.length;i++){
        var obj =  {
          
          name: item[i]?.productDetail?.product.name,
          id : item[i]?.productDetail?.id,
          linkImage: item[i]?.productDetail?.product.linkImage,
          sizeName: item[i]?.productDetail?.sizeOption.name,
          quantityBuy: item[i]?.quantity,
          doneQuantity: item[i]?.doneQuantity,
          // price: item.productDetails[i].priceHistories[0].price,
          quantity: 0,
        }
        const isFound = items.some(element => {
          if (element.id === obj.id) {
            return true;
          }
      
          return false;
        });
        if(isFound === false){
          arrT.push(obj);
        }
        
      }
      if( arrT !== null){
        items.push(...arrT);

      }
      Notification.success(invoiceId);
      // return;
    // localStorage.setItem("productImport",newItems);  
    localStorage.setItem("productReturn", JSON.stringify(items));
    history.push("/productReturn/add" , {user: user, invoiceId: invoiceId});
      
    
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item md={12} sm={12} xs={12}>
          <Typography variant="h4">Chọn hóa đơn trả hàng</Typography>

          <Grid
            container
            style={{
              display: "flex",
            }}
            className={classes.wrapForm}
          >
            <Grid
              item
              md={9}
              xl={12}
              sm={12}
              style={{
                marginTop: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              className={classes.wrapForm}
            >
              <form
                onSubmit={handleSearch}
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  flexDirection: "row-reverse",
                  alignItems: "center",
                }}
                className={classes.form}
              >
                <TextField
                  label="Tìm kiếm"
                  margin="normal"
                  onChange={(e) => setName(e.target.value)}
                  className={classes.searchField}
                />
                <Button
                  className={classes.btnSearch}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Tìm Kiếm
                </Button>
              </form>
            </Grid>

            <Grid
              item
              md={3}
              xl={12}
              sm={12}
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                paddingTop: 16,
              }}
            >
              <FormControl
                style={{
                  marginTop: 16,
                  marginLeft: 10,
                  display: "flex",
                  width: "100%",
                  justifyContent: "flex-end",
                  flexDirection: "row",
                }}
              >
                <Select
                  native
                  value={pageSize}
                  onChange={handlePageSize}
                  className={classes.select}
                >
                  <option value={3}>3</option>
                  <option value={5}>5</option>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <TableContainer component={Paper}>
            <Table style={{ minWidth: 650 }} aria-label="simple table">
              <TableHeader
                valueToOrderBy={valueToOrderBy}
                valueToSortDir={valueToSortDir}
                handleRequestSort={handleRequestSort}
                fields={fields}
              />
              <TableBody>
                {invoices.map((u) => (
                  <TableRow key={u.id}>
                    {/* <TableCell component="th" scope="row">
                      <img
                        alt=""
                        width={60}
                        height={60}
                        src={u.linkImage ?? Logo}
                      />
                    </TableCell> */}
                    <TableCell>{u.id}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.fullName}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{u.createdAt}</TableCell>
                    {/* <TableCell>
                      {u.price.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </TableCell> */}
                    {/* <TableCell>{u.categoryId.name}</TableCell> */}
                    <TableCell>
                      <Button
                        className={classes.btnSearch}
                        variant="contained"
                        color="secondary"
                        onClick={() => handleSelectInvoiceReturn(u.order.orderDetails, u.id)}
                      >
                        Trả Hàng
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {invoices.length === 0 && (
                            <h1 style={{ paddingLeft: 15, color: "red" }}>Không có hóa đơn hợp lệ</h1>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination
            style={{ marginTop: 50 }}
            color="primary"
            shape="rounded"
            count={totalPages}
            page={page}
            onChange={handlePage}
            showFirstButton
            showLastButton
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default SelectInvoiceReturn;
