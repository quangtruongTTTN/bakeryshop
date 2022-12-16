import { Button, TextField, Grid, makeStyles, Typography, CssBaseline, Chip, Avatar, MenuItem, Select, FormControl, InputLabel, Dialog } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useHistory, useLocation } from "react-router";
import BarCode from "react-barcode";
import { useForm } from "react-hook-form";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {ProductGetAll, ProductListGetAll } from "../../../store/actions/ProductAction";
// import { OrderStatusUpdate,OrderStatusAndShipperUpdate } from "../../../store/actions/OrderAction";
import { confirmAlert } from "react-confirm-alert";
import Notification from "../../../common/Notification";
import ProductImportService from "../../../services/ProductImportService";
import {
    CreateOutlined,
    DeleteOutline,
    Replay,
    Visibility,
} from "@material-ui/icons";
import MUIDataTable from "mui-datatables";
import StarIcon from "@material-ui/icons/Star";
import { PDFDownloadLink } from "@react-pdf/renderer";
// import Report from "./report";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
// import { ShipperGetAll, EmployeeStatusAction } from "../../../store/actions/ShipperAction";

const useStyles = makeStyles((theme) => ({
    header: {
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 10,
        borderBottom: '1px solid #ececec'
    },
    root: {
        display: 'flex',
        paddingBottom: 5,
        boxShadow: 'none'
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        paddingTop: 10,
        paddingLeft: 10
    },
    cover: {
        width: 80,
        height: 100
    },
    voucher: {
        paddingRight: 20,
        paddingBottom: 20
    },
    productImportDetail: {
        padding: 0,
    },
    titleOrder: {
        fontSize: 14,
        display: 'flex',
        color: '#3fb4a5',
        paddingLeft: 20,
        paddingTop: 5,
        paddingBottom: 5,
        borderBottom: '1px solid #ececec'
    },
    contentOrder: {
        padding: 20,
    },
    price: {
        paddingLeft: '55%',
        paddingTop: 35,
        [theme.breakpoints.down('sm')]: {
            paddingLeft: '5%',
        },
    },
    total: {
        paddingLeft: '75%',
        [theme.breakpoints.down('sm')]: {
            paddingLeft: '30%',
        },
    },
    barOrder: {
        display: 'flex',
        padding: 20,
        paddingLeft: '65%',
        [theme.breakpoints.down('sm')]: {
            paddingLeft: '20%',
        },
    },
    title: {
        paddingLeft: 20,
    },
    wrapBarCode: {
        "& svg": {
            width: 150,
            height: 70,
        },
    },
    table: {
        borderBottom: 0
    },
    cellWithoutBorder: {
        borderBottom: "none"
    },
    star: {
        color: "#e4e5e9",
        fontSize: 40,
    },
    starSelected: {
        color: "#ffc107",
        fontSize: 40,
    },
}));

const AddProductImport = () => {
    const classes = useStyles();
    const location = useLocation();
    // const [productImport] = useState(location?.state?.productImport);
    const [data, setData] = useState(JSON.parse(localStorage.getItem("productImport") || "[]"));
    // const [productSelect, setProductSelect] = useState(location?.state?.productSelect);
    const [productSelect] = useState(location?.state?.productSelect);
    const [open, setOpen] = useState(false);
    const { products, totalPages, promotiontotalElements } = useSelector((state) => state.product);
    //localStorage.getItem('productImport')
    // const [status, setStatus] = useState(productImport.status);location?.state?.productImport
    const auth = useSelector((state) => state.auth);
    const [dataSave, setDataSave] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(
          ProductListGetAll()
        );
        setLoading(true);
      }, [dispatch]);
      useEffect(() => {
        setData(JSON.parse(localStorage.getItem("productImport") || "[]"));
      }, [open]);
    const history = useHistory();
    const handleClose = () => {
        setOpen(false);
      };
    const onhandleDelete = (e) => {
        var array = [...data]; // make a separate copy of the array
        var index = array.indexOf(e)
        if (index !== -1) {
            array.splice(index, 1);
            setData(array);
        }
    }

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
            // setDataSave(selectedIds);
          //return products[products.findIndex(obj => obj.id === item.id)]
          localStorage.setItem("productImportSave", JSON.stringify(selectedIds));
        },
        // onSelectionModelChange: (ids) => {
        //   Notification.success(JSON.parse(ids));
    
        // },
        
        onTableChange: (action, state) => {
          console.log(action);
          console.dir(state);
          
        }
        
      };
      const handleOK = () => {

        const items = JSON.parse(localStorage.getItem("productImportSave") || "[]")
        const productImportItems = JSON.parse(localStorage.getItem("productImport") || "[]")
        // Notification.success(JSON.stringify(items));
        // return
        var arrT = [];
        for(let j = 0; j < items.length; j++){
            
            for (let i = 0; i < items[j].productDetails.length; i++) {
                var obj = {
                  name: items[j].name,
                  id: items[j].productDetails[i].id,
                  linkImage: items[j].linkImage,
                  sizeName: items[j].productDetails[i]?.sizeOption.name,
                  price: items[j].productDetails[i].priceHistories[0].price,
                  quantity: 0,
                }
                const isFound = productImportItems.some(element => {
                  if (element.id === obj.id) {
                    return true;
                  }
                  return false;
                });
                if (isFound === false) {
                  arrT.push(obj);
                }
              }
        }
   
    if (arrT !== null) {
        productImportItems.push(...arrT);
    }
    localStorage.setItem("productImport", JSON.stringify(productImportItems));
    setOpen(false);
    history.push("/productImport/add");
    Notification.success("Handle OK done");
    
        // Notification.success(JSON.parse(dataSave));
        // localStorage.setItem("promotionDetail", JSON.stringify(dataSave));
        
        // history.push("/promotiondetail/add", { promotionDetail: dataSave , promotion: promotion });
      };
    useEffect(() => {
        // const productImport = JSON.parse(localStorage.getItem('productImport'));

        if (productSelect !== null) {
            // const productImportT = JSON.parse(localStorage.getItem("productImport") || "[]");
            // const productImportT = JSON.parse(localStorage.getItem('productImport'));
            // var newArray = productImport.slice();    
            // newArray.push(productSelect);   
            // //  this.setState()
            // productImportT.forEach(function(product, index) {
            //     // productImport.push(JSON.stringify(productImport[index]))
            //     // productImport.push(productImportT[index])
            //     // Notification.success(product);
            // });
            // const arrr = [...productImportT]
            // Notification.success(JSON.stringify(arrr));
            // setProductImport({arr: [...productImportT,productSelect]});
            // setProductImport(productImport)
            // setProductImport(productImportT)
            // setData(productImportT.map(obj=>obj));
            // setData(arrr);
            // setProductImport({arr: productImport.concat(productSelect)})
            // localStorage.setItem("users", JSON.stringify(productImport));

            // Notification.success(JSON.stringify(data));
            // Notification.success();
            // const newItems = [...productImportT];
            // productImportT.push(productSelect);
            // localStorage.setItem("productImport", JSON.stringify(productImportT));
            // localStorage.setItem("productImport", JSON.stringify(productImportT));
            // localStorage.setItem('productImport', [...test,productSelect]);
            // setProductImport({arr: productImport.concat(productSelect)})
            // setProductSelect(null)
        }
        else if (productSelect === null || productSelect.length === 0) {
            // localStorage.clear();
            // localStorage.removeItem("productImport")
            Notification.success("productImport");
        }
        else {
            Notification.success("Null");
        }

        // if(productSelect !== null){
        //     productImport.push(productSelect)

        // }else{
        //    
        // }, [productSelect]

    }, []);
    const onChangeQuantity = (id, quantity) => {
        const newData = data.map((item, i) => {
            if (item.id === id) {
                return { ...item, quantity: quantity };
            } else {
                return item;
            }
        });
        setData(newData);
        localStorage.setItem("productImport", JSON.stringify(data));
    };
    const getTotalPrice = () => {
        return data.reduce((total, item) => {
            return total = total + (item.price * item.quantity);
        }, 0)

    };
    const onHandleSave = async () => {

        const detailImportRequestList = [];
        for (let i = 0; i < data.length; i++) {
            var obj = {
                name: data[i].name,
                id: data[i].id,
                linkImage: data[i].linkImage,
                sizeName: data[i].name,
                price: data[i].price,
                quantity: data[i].quantity,
            }
            detailImportRequestList.push(obj);
        }
        const dataSend = { employeeId: 1, detailImportRequestList: detailImportRequestList };
        try {

            const response = await ProductImportService.add(dataSend);
            if (response.status === 200) {
                history.push("/productImport");
                Notification.success("Đã tạo thành công");
                localStorage.removeItem("productImport")

            } else {
                Notification.error("Tạo thất bại ");
            }
        } catch (error) {

            if (error.response) {
                Notification.error("Thêm sản phẩm thất bại. Thử lại");

            } else {
                Notification.error("Thêm sản phẩm thất bại. Thử lại");
            }
        }

    };

    //   setProductImport([...productImport,productSelect]), [ productSelect], [ productSelect]
    
    // const [shipper, setShipper] = useState(productImport.shipperId);
    const handleSelected = (event, value) => {
        // setShipper(value);
    };



    const handleOnDelete = (id) => {
        // dispatch(OrderStatusUpdate({ id, status: 4 }));
        // setStatus(4);

        Notification.success("Đã hủy thành công");
    };

    const handleDelete = (id) => {
        confirmAlert({
            title: "HỦY CHI TIẾT PHIẾU NHẬP",
            message: "Bạn có chắc muốn hủy phiếu nhập này không?",
            buttons: [
                {
                    label: "Có",
                    onClick: () => handleOnDelete(id),
                },
                {
                    label: "Không",
                }
            ],
        });
    };
    const handleComfirmedStatus = (id) => {
        // dispatch(OrderStatusAndShipperUpdate({ id, status: 5 , shipperId: 7, employeeId: auth.user.id}));
        // dispatch(OrderStatusAndShipperUpdate({ id: id, status: 5 ,shipperId: shipperId, employeeId: auth.user.id}));
        // setStatus(5);
        //history.push("/productImport/")
        Notification.success("Đã cập nhật thành công");
    };

    const handleShippingStatus = (id) => {
        // dispatch(OrderStatusUpdate({ id, status: 2 }));
        // setStatus(2);
        //history.push("/productImport/")
        Notification.success("Đã cập nhật thành công");
    };

    const handleCompleteStatus = (id) => {
        // dispatch(OrderStatusUpdate({ id, status: 3 }));
        // setStatus(3);
        //history.push("/productImport/")
        Notification.success("Đã cập nhật thành công");
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const handleUpdate = (id, status, shipper) => {
        if (shipper === null) {
            confirmAlert({
                title: "CHỌN SHIPPER CHO CHI TIẾT PHIẾU NHẬP",
                message: "Chọn Shipper để chuyển sang trạng thái CHỜ LẤY HÀNG?",
                buttons: [
                    // {
                    //     label: "Có",
                    //     onClick: () => handleComfirmedStatus(id),
                    // },
                    {
                        label: "OK",
                    }
                ],
            });
            return
        }
        if (status === 1) {
            confirmAlert({
                title: "CẬP NHẬT TRẠNG THÁI",
                message: "Bạn muốn chuyển sang trạng thái CHỜ LẤY HÀNG?",
                buttons: [
                    {
                        label: "Có",
                        onClick: () => handleComfirmedStatus(id, shipper.id),
                    },
                    {
                        label: "Không",
                    }
                ],
            });
        }
        if (status === 2) {
            confirmAlert({
                title: "CẬP NHẬT TRẠNG THÁI",
                message: "Bạn muốn chuyển sang trạng thái HOÀN THÀNH?",
                buttons: [
                    {
                        label: "Có",
                        onClick: () => handleCompleteStatus(id),
                    },
                    {
                        label: "Không",
                    }
                ],
            });
        }
        if (status === 5) {
            confirmAlert({
                title: "CẬP NHẬT TRẠNG THÁI",
                message: "Bạn muốn chuyển sang trạng thái GIAO HÀNG?",
                buttons: [
                    {
                        label: "Có",
                        onClick: () => handleShippingStatus(id),
                    },
                    {
                        label: "Không",
                    }
                ],
            });
        }
    };
    const onHandleRedirect = () => {
        setOpen(true);
        // Notification.success(JSON.stringify(products));
        // history.push("/productImport/select");
    };
    return (
        <React.Fragment>
            <Button
                size="small"
                variant="outlined"
                color="primary"
                
                onClick={onHandleRedirect}
                // onClick={onHandleRedirect}
            >
                Chọn sản phẩm nhập hàng
            </Button>
            <CssBaseline />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Lập Phiếu Nhập
                    </Typography>
                    {/* <PDFDownloadLink
                        document={<Report productImport={productImport} />}
                        fileName="report"
                    >
                        <Avatar style={{ cursor: "pointer", backgroundColor: "#FC8400", marginBottom: 10, marginLeft: 20 }}>
                            <PictureAsPdfIcon />
                        </Avatar>
                    </PDFDownloadLink> */}
                    <Typography variant="h6" className={classes.title}>
                        <Grid container spacing={3}>
                            <Grid item md={6} xl={6} sm={12}>Nhân Viên tạo: {auth.user.fullName}</Grid>
                            {/* <Grid item md={12} xl={12} sm={12} className={classes.wrapBarCode}>Mã phiếu nhập: <BarCode value={productImport.id} /></Grid> */}
                            <Grid item md={6} xl={6} sm={12}>Ngày lập: {moment(new Date()).format("YYYY-MM-DD")}</Grid>


                            {/* <Grid item md={6} xl={6} sm={12}>Mã Nhân Viên tạo: {auth.user.id}</Grid> */}


                        </Grid>

                    </Typography>



                    <React.Fragment>
                        <Grid container spacing={3} style={{ marginTop: 10 }}>
                            <Grid item xs={12} md={12}>
                                <TableContainer component={Paper}>
                                    <Table className={classes.table} aria-label="spanning table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center"><b>Hình ảnh</b></TableCell>
                                                <TableCell align="center"><b>Mã sản phẩm</b></TableCell>
                                                <TableCell align="center"><b>Sản phẩm</b></TableCell>
                                                <TableCell align="left"><b>Số lượng</b></TableCell>
                                                <TableCell align="center"><b>Giá</b></TableCell>
                                                <TableCell align="center"><b>Tổng</b></TableCell>
                                                <TableCell align="center"></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {/* productImport.length > 0 ? productImport.map((item) */}
                                            {data.length > 0 ? data.map((item) => (
                                                (item !== null) ? (
                                                    <TableRow key={item.id}>
                                                        <TableCell align="center">
                                                            <img alt={item.name} src={item.linkImage} width={100} />
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <p>{item.id}</p>
                                                        </TableCell>
                                                        <TableCell>
                                                            <p>{item.name}</p>
                                                            {/* <p>12122121</p> */}
                                                            <span style={{ fontSize: 12, color: 'brown' }}>{item?.sizeName} </span>

                                                        </TableCell>
                                                        {/* <TableCell align="center">
                                                        <div style={{ display: 'flex', marginTop: -10, marginLeft: -20 }}>
                                                            <p style={{ marginLeft: 20, marginRight: 20, fontSize: 16 }}>{item.quantity}</p>
                                                        </div>
                                                    </TableCell> */}
                                                        <TableCell align="center">
                                                            <>
                                                                <TextField
                                                                    label="Nhập số lượng"
                                                                    // style={{ marginTop: 10 }}
                                                                    defaultValue={item.quantity}
                                                                    fullWidth
                                                                    // onChange={item.quantity}e.target.value
                                                                    onChange={(e) => { onChangeQuantity(item.id, e.target.value) }}
                                                                    type="number"
                                                                    name={"stock"}
                                                                    inputRef={register({
                                                                        required: "Nhập giá sản phẩm", pattern: { value: /^[0-9]+$/i, message: "Giá không hợp lệ" }, validate: (value) => {
                                                                            if (value > 10000 || value < 1) {
                                                                                return "Số lượng phải > 1";
                                                                            }
                                                                        },
                                                                        min: 1,
                                                                    })}
                                                                />
                                                            </>
                                                            {/* {errors.price?.message &&.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
                                                    <FormHelperText style={{ color: 'red' }} id="component-error-text">{errors.price?.message}</FormHelperText>.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }
                                                } */}
                                                        </TableCell>

                                                        <TableCell align="center" translate="no">{item.price}</TableCell>
                                                        <TableCell align="center" translate="no">{(item.price * item.quantity)}</TableCell>
                                                        <TableCell>
                                                            <DeleteOutline
                                                                style={{ color: "red", cursor: "pointer" }}
                                                                onClick={() => onhandleDelete(item)}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                ) : (<></>)))
                                                : (
                                                    <TableRow>
                                                        <TableCell colSpan={5} align="center"><b style={{ color: 'red' }}>Không có sản phẩm trong giỏ hàng</b></TableCell>
                                                    </TableRow>
                                                )
                                            }


                                            <TableRow>
                                                <TableCell colSpan={2} />

                                                {/* <TableCell colSpan={4} align="right">
                                                    <b style={{ fontSize: 20 }} translate="no">Tổng tiền: {(getTotalPrice()).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</b>
                                                </TableCell> */}
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                                <Button
                                    style={{ margin: 10 }}
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    onClick={() => { history.push("/productImport"); localStorage.removeItem("productImport") }}
                                >
                                    Quay lại
                                </Button>
                                <Button
                                    style={{ margin: 10 }}
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    onClick={() => onHandleSave()}
                                >
                                    Lưu
                                </Button>
                            </Grid>
                        </Grid>
                    </React.Fragment>
                </Paper>
            </main>
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
          title={"Chọn sản phẩm nhập"}
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
        </React.Fragment>
    )
}

export default AddProductImport