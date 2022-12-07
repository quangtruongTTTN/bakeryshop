import {
  Button,
  FormControl,
  Grid,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  makeStyles,
  MenuItem, Checkbox,
  Avatar, Box, withStyles, Chip, Dialog, DialogContent, Typography
} from "@material-ui/core";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@material-ui/lab/Pagination";
import TableHeader from "./../../TableHeader";

import { useHistory, useLocation } from "react-router-dom";
import {
  PromotionDetailListAction,
  PromotionDetailDeleteAction,
} from "../../../store/actions/PromotionDetailAction";
import {
  ProductGetAll,
  deleteProduct,
  ShowProductPromotionDetail,
} from "../../../store/actions/ProductAction";
import { ProductPromotionDetail } from "../../../store/actions/ProductAction";
import Logo from "./../../../assets/img/BakeryShop.gif";
import { confirmAlert } from "react-confirm-alert";
import Moment from "react-moment";
import Notification from "../../../common/Notification";
import { DataGrid } from '@mui/x-data-grid';
import {
  CreateOutlined,
  DeleteOutline,
  Replay,
  Visibility,
} from "@material-ui/icons";
import MUIDataTable from "mui-datatables";
import createCache from "@emotion/cache";
const useStyles = makeStyles((theme) => ({
  btn: {
    width: 918,
    height: 36,
  },
  searchField: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  btnSearch: {
    background: "#000000",
    width: 100,
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
const muiCache = createCache({
  key: "mui-datatables",
  prepend: true

});
const PromotionDetail = () => {
  const classes = useStyles();
  const history = useHistory();
  const [checked, setChecked] = useState([]);
  const [dataSave, setDataSave] = useState([]);
  // const [checked, setChecked] = useState(JSON.parse(localStorage.getItem("checked") || "[]"));
  // const compFileList = useRef(new Array(5));
  const dispatch = useDispatch();
  const { promotionproducts, promotiontotalPages } = useSelector((state) => state.product);
  const { products, totalPages, promotiontotalElements } = useSelector((state) => state.product);

  // const [checked, setChecked] = useState(new Array(geted.length));
  const [page, setPage] = useState(1);
  const [valueToOrderBy, setValueToOrderBy] = useState("id");
  const [valueToSortDir, setValueToSortDir] = useState("asc");
  const [keyword, setKeyword] = useState("");
  const [discount, setDiscount] = useState(0);
  const [pageSize, setPageSize] = useState(3);
  const [temp, setTemp] = useState(0);
  const [name, setName] = useState("");
  const location = useLocation();
  const [promotion] = useState(location?.state?.promotion);
  const [open, setOpen] = useState(false);

  const [responsive, setResponsive] = useState("vertical");
  const [tableBodyHeight, setTableBodyHeight] = useState("400px");
  const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");
  const [searchBtn, setSearchBtn] = useState(true);
  const [downloadBtn, setDownloadBtn] = useState(true);
  const [printBtn, setPrintBtn] = useState(true);
  const [viewColumnBtn, setViewColumnBtn] = useState(true);
  const [filterBtn, setFilterBtn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [idSend, setIdSend] = useState(1);
  const columns = [
    { id:"image" , name: "image", label: "Hình Ảnh" ,
    // width: 60,
    options: {
      customBodyRender: (value) => {
        return (
          <Avatar variant="rounded" src={value} >
          </Avatar>
        )
      },
      filter: false,
    },
    
    },
    { id:"name", name: "name", options: { filter: false } },
    { id:"title" ,name: "title", label: "Chú Thích", dir: "asc" ,options: { filter: false }},
    { id:"categoryId" ,name: "categoryId", label: "Loại", dir: "asc" ,options: { filterOptions: { fullWidth: true } }},
    
    // { id:"createdAt" ,name: "createdAt", label: "Loại", dir: "asc" },
    // { id:"updatedAt" ,name: "updatedAt", label: "Loại", dir: "asc" },
    // { id:"deletedAt" ,name: "deletedAt", label: "Loại", dir: "asc" }
    // "Title",
    // "Location"
  ];
  const options = {
    search: searchBtn,
    download: downloadBtn,
    print: printBtn,
    viewColumns: viewColumnBtn,
    filter: filterBtn,
    filterType: "dropdown",
    responsive,
    tableBodyHeight,
    tableBodyMaxHeight,
    textLabels: {
      pagination: {
        next: "Trang sau",
        previous: "Previous Page",
        rowsPerPage: "Hàng trên mỗi trang:",
        displayRows: "của" // 1-10 of 30
      },
      toolbar: {
        search: "Search",
        downloadCsv: "Download CSV",
        print: "Print",
        viewColumns: "View Columns",
        filterTable: "Filter Table"
      },
      filter: {
        title: "FILTERS",
        reset: "reset",          
      },
      viewColumns: {
        title: "Show Columns"
      },
      selectedRows: {
        text: "rows(s) deleted",
        delete: "Delete"
      }
  },
    onRowSelectionChange(currentRowsSelected, allRowsSelected, rowsSelected) {
      const result = allRowsSelected.map((item) => {return products.at(item.dataIndex) });
      // Notification.success(JSON.stringify(result));
      // return;
      const selectedIds = result.map(item => {
            return item;
      });
      
      localStorage.setItem("productImport", JSON.stringify(selectedIds));
    },
    // onSelectionModelChange: (ids) => {
    //   Notification.success(JSON.parse(ids));

    // },
    
    onTableChange: (action, state) => {
      console.log(action);
      console.dir(state);
      
    }
    
  };
  const data = [
    {
        "categoryId": 1,
        "name": "Home Page",
        "title": "This little bit of info is being loaded from a Rails "

  }];

  const loadDataOnlyOnce = () => {
    dispatch(PromotionDetailListAction());  
    
    // dispatch(PromotionDetailListAction());  
  }

  useEffect(() => {
    dispatch(PromotionDetailListAction());  
  }, [dispatch]);
  useEffect(() => {
    loadDataOnlyOnce();
  }, []);
  

  useEffect(() => {
    dispatch(
      ProductPromotionDetail({
        page,
        sortField: valueToOrderBy,
        sortDir: valueToSortDir,
        keyword,
        pageSize,
        discount,
        promotionId: promotion.id,
      })
      
    );
    setLoading(true);
    dispatch(
      ShowProductPromotionDetail({
        page,
        sortField: valueToOrderBy,
        sortDir: valueToSortDir,
        keyword,
        pageSize,
        promotionId: promotion.id,
      })
    );
    // products.map((u) => (changeCheckboxStatus(u.id)));
  }, [
    dispatch,
    page,
    valueToOrderBy,
    valueToSortDir,
    keyword,
    pageSize,
    discount,
    idSend,
  ]);
  const handleClose = () => {
    setOpen(false);
  };

  const handleOK = () => {
    // localStorage.setItem("promotionDetail", JSON.stringify(dataSave));
    
    history.push("/promotiondetail/add", { promotionDetail: dataSave , promotion: promotion });
  };


  const handleRequestSort = (property) => {
    const isAscending =
      Object.is(valueToOrderBy, property) && Object.is(valueToSortDir, "asc");
    setValueToOrderBy(property);
    setValueToSortDir(isAscending ? "desc" : "asc");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setKeyword(discount);
  };

  const handlePage = (event, value) => {
    setPage(value);
  };
  const onhandleUpdate = (item) => {

  };
  const handlePageSize = (e) => {
    setPageSize(e.target.value);
    setPage(1);
  };

  const onHandleRedirect = () => {
    setOpen(true);
  };

  const handleChangeDiscount = (event) => {
    setDiscount(event.target.value);
    setPage(1);
  };

  const onhandleDelete = (id) => {
    confirmAlert({
      title: "Thông báo",
      message: "Bạn có chắc muốn ngưng giảm giá sản phẩm?",
      buttons: [
        {
          label: "Có",
          onClick: () => {
            
            setIdSend(id)
            
            dispatch(PromotionDetailDeleteAction(id));
            loadDataOnlyOnce();
            // window.location.reload();
            Notification.success("Đã ngưng giảm giá sản phẩm thành công!");
          },
        },
        {
          label: "Không",
        },
      ],
    });
  };

  const fields = [
    { label: "Hình Ảnh" },
    { name: "name", label: "Tên Sản Phẩm", dir: "asc" },
    { label: "Giảm Giá" },
    // { name: "price", label: "Đã Giảm Còn", dir: "asc" },
    { name: "categoryId", label: "Loại", dir: "asc" },
    // { name: "createdAt", label: "Ngày tạo" },
    // { name: "endDate", label: "Ngày hết" },
    { label: "Hành Động" },
  ];
  const fieldsP = [
    { id:"image" , name: "image", label: "Hình Ảnh" },
    { id:"name" ,name: "name", label: "Tên Sản Phẩm", dir: "asc" },
    { id:"title" ,name: "", label: "Chú Thích", dir: "asc" },
    //   { name: "price", label: "Giá", dir: "asc" },
    { id:"categoryId" ,name: "categoryId", label: "Loại", dir: "asc" },
    // { label: "Trạng Thái" },
    // { label: "Hành Động" },
  ];
  
  const discounts = [
    {
      value: 0,
      label: "Discount",
    },
    {
      value: 10,
      label: "10%",
    },
    {
      value: 20,
      label: "20%",
    },
    {
      value: 30,
      label: "30%",
    },
    {
      value: 40,
      label: "40%",
    },
    {
      value: 50,
      label: "50%",
    },
    {
      value: 60,
      label: "60%",
    },
    {
      value: 70,
      label: "70%",
    },
    {
      value: 80,
      label: "80%",
    },
    {
      value: 90,
      label: "90%",
    },

  ];

  return (
    <div>
      <Grid
        container
        style={{
          display: "flex",
        }}
        className={classes.wrapForm}
      >
        <Grid
          item
          md={7}
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
          >
            <TextField
              id="outlined-select-currency"
              select
              label="Discount"
              value={discount}
              onChange={handleChangeDiscount}
              helperText="Chọn discount để lọc sản phẩm"
            >
              {discounts.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </form>
        </Grid>

        <Grid
          item
          md={5}
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
              marginLeft: 10,
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <Button
              size="small"
              variant="outlined"
              color="primary"
              onClick={onHandleRedirect}
            >
              Thêm sản phẩm giảm giá
            </Button>

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
            {promotionproducts.map((u, index) => (
              u.promotionDetails.map((v, index) => (

                (v?.promotion?.id === promotion?.id) ? (
                  <>
                    <TableRow key={v.id}>
                      <TableCell component="th" scope="row">
                        <img
                          alt=""
                          width={60}
                          height={60}
                          src={u.linkImage ?? Logo}
                        />
                      </TableCell>
                      <TableCell>{u.name}</TableCell>
                      <TableCell>{v.discount}%</TableCell>
                      {/* <TableCell>
                        {(u.price * (1 - v?.discount / 100))
                          .toLocaleString("it-IT", {
                            style: "currency",
                            currency: "VND",
                          })
                          .toString()}
                      </TableCell> */}
                      <TableCell>{u.categoryId?.name}</TableCell>

                      <TableCell>
                        <DeleteOutline
                          style={{ color: "red", cursor: "pointer" }}
                          // onClick={() => onhandleDelete(u.promotionDetail.id)}
                          onClick={() => onhandleDelete(v.id)}
                        />
                      </TableCell>
                    </TableRow>
                  </>
                ) : (<></>)
                // <TableRow key={u.id}>

              ))
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        style={{ marginTop: 50 }}
        color="primary"
        shape="rounded"
        count={promotiontotalPages}
        page={page}
        onChange={handlePage}
        showFirstButton
        showLastButton
      />
      <Dialog
        open={open}
        keepMounted
        maxWidth="md"
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        {/* onSubmit={handleSubmit(onSubmit)} */}
        <form >
        {
        loading && (<MUIDataTable
          title={"Chọn sản phẩm giảm giá"}
          data={products.map((p) => ({
            "image" : p.linkImage,
            "name" : p.name,
            "title" : p.title,
            "categoryId" : p.categoryId.name
          }))}
          // data = {data}
          columns={columns}
          options={options}
          
          // labelRowsPerPage={"323"}
        />)
      }
        </form>
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="inherit"
            
            onClick={handleOK}
            className={classes.submit}
          >
            OK
          </Button>
      </Dialog>
      
      
    </div>
    
  );
};

export default PromotionDetail;
