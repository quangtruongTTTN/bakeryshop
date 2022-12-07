import { Button, TextField, Grid, makeStyles, Typography, CssBaseline, Chip, Avatar, MenuItem, Select, FormControl, InputLabel, Dialog, DialogContent } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { InputNumber } from 'antd';
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
import { UserGetAll, UserStatusAction } from "../../../store/actions/UserAction";
// import { OrderStatusUpdate,OrderStatusAndShipperUpdate } from "../../../store/actions/OrderAction";
import { confirmAlert } from "react-confirm-alert";
import Notification from "../../../common/Notification";
import ProductReturnService from "../../../services/ProductReturnService";
import StarIcon from "@material-ui/icons/Star";
import { PDFDownloadLink } from "@react-pdf/renderer";
// import Report from "./report";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import Pagination from "@material-ui/lab/Pagination";
import TableHeader from "../../TableHeader";
import Logo from "../../../assets/img/BakeryShop.gif";
import { DeleteOutline, Replay, Visibility } from "@material-ui/icons";
import {
    USER_ALERT_MESSAGE,
    USER_ALERT_TITLE,
    USER_NOTIFICATION_WARN,
} from "../../../common/Constant";
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

const AddProductReturn = () => {
    const classes = useStyles();
    const location = useLocation();
    // const [productImport] = useState(location?.state?.productImport);
    const [data, setData] = useState(JSON.parse(localStorage.getItem("productReturn") || "[]"));
    // const [productSelect, setProductSelect] = useState(location?.state?.productSelect);
    const [productSelect] = useState(location?.state?.productSelect);
    const [user] = useState(location?.state?.user);
    const [invoiceId] = useState(location?.state?.invoiceId);
    //localStorage.getItem('productImport')invoiceId
    // const [status, setStatus] = useState(productImport.status);location?.state?.productImport
    const auth = useSelector((state) => state.auth);

    const [page, setPage] = useState(1);
    const [valueToOrderBy, setValueToOrderBy] = useState("id");
    const [valueToSortDir, setValueToSortDir] = useState("asc");
    const [keyword, setKeyword] = useState("");
    const [name, setName] = useState("");
    const [pageSize, setPageSize] = useState(3);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    //   const handleOnReplay = (username) => {
    //     dispatch(UserStatusAction({ username, status: "replay" }));
    //     Notification.success(USER_NOTIFICATION_WARN);
    //   };
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
    useEffect(() => {
        dispatch(
            UserGetAll({
                page,
                sortField: valueToOrderBy,
                sortDir: valueToSortDir,
                keyword,
                pageSize,
            })
        );
    }, [dispatch, page, valueToOrderBy, valueToSortDir, keyword, pageSize]);
    const { users, totalPages } = useSelector((state) => state.user);
    const handleClose = () => {
        setOpen(false);
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

    //   const handleOnDelete = (username) => {
    //     dispatch(UserStatusAction({ username, status: "delete" }));
    //     Notification.success(USER_NOTIFICATION_WARN);
    //   };

    const handleDelete = (username) => {
        confirmAlert({
            title: USER_ALERT_TITLE,
            message: USER_ALERT_MESSAGE,
            buttons: [
                {
                    label: "Có",
                    //   onClick: () => handleOnDelete(username),
                },
                {
                    label: "Không",
                },
            ],
        });
    };
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

        const detailReturnRequestList = [];
        for (let i = 0; i < data.length; i++) {
            var obj = {
                name: data[i].name,
                id: data[i].id,
                linkImage: data[i].linkImage,
                sizeName: data[i].name,
                price: data[i].price,
                quantity: data[i].quantity,
                doneQuantity: data[i].doneQuantity,
            }
            detailReturnRequestList.push(obj);
        }
        const dataSend = { invoiceId: invoiceId , employeeId: 1, detailReturnRequestList: detailReturnRequestList };
        try {

            const response = await ProductReturnService.add(dataSend);
            if (response.status === 200) {
                history.push("/productReturn");
                Notification.success("Đã tạo thành công");
                localStorage.removeItem("productReturn")

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
    const handleReplay = (username) => {
        confirmAlert({
            title: USER_ALERT_TITLE,
            message: USER_ALERT_MESSAGE,
            buttons: [
                {
                    label: "Có",
                    //   onClick: () => handleOnReplay(username),
                },
                {
                    label: "Không",
                },
            ],
        });
    };
    const onHandleRedirect = () => {
        history.push("/productReturn/select", { user: user });

    };
    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleRequestSort = (property) => {
        const isAscending =
            Object.is(valueToOrderBy, property) && Object.is(valueToSortDir, "asc");
        setValueToOrderBy(property);
        setValueToSortDir(isAscending ? "desc" : "asc");
    };
    const fields = [
        { label: "Hình Ảnh" },
        { name: "username", label: "Tài Khoản", dir: "asc" },
        { name: "fullName", label: "Họ & Tên", dir: "asc" },
        { name: "phone", label: "Số Điện Thoại", dir: "asc" },
        { name: "email", label: "Email", dir: "asc" },
        { label: "Trạng Thái" },
        { label: "Hành Động" },
    ];
    return (
        <React.Fragment>
            <Button
                size="small"
                variant="outlined"
                color="primary"

                onClick={onHandleRedirect}
            >
                Chọn hóa đơn cần trả hàng
            </Button>
            <CssBaseline />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Lập Phiếu Trả
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
                            <Grid item md={6} xl={6} sm={12}>Khách hàng: {user.fullName}</Grid>
                            <Grid item md={6} xl={6} sm={12}>SĐT: {user.phone}</Grid>
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
                                                <TableCell align="left"><b>Số lượng đã mua</b></TableCell>
                                                <TableCell align="left"><b>Số lượng đã trả</b></TableCell>
                                                <TableCell align="left"><b>Số lượng muốn trả</b></TableCell>
                                                {/* <TableCell align="center"><b>Giá</b></TableCell>
                                                <TableCell align="center"><b>Tổng</b></TableCell> */}
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
                                                            <p>{item.quantityBuy}</p>
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <p>{item.doneQuantity}</p>
                                                        </TableCell>

                                                        <TableCell align="center">
                                                        {/* <InputNumber
                name="quantity"
                size="middle"
                // value={item.quantity}
                min={1}
                max={5}
                onChange={(e) => { onChangeQuantity(item.id, e.target.value) }}
              /> */}
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
                                                                        min: 0,
                                                                        max: 3,
                                                                    })}
                                                                    InputProps={{
                                                                        inputProps: { //
                                                                            max: (item.quantityBuy-item.doneQuantity) , min: 0 
                                                                        }
                                                                    }}
                                                                />
                                                            </>
                                                            {/* {errors.price?.message &&.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
                                                    <FormHelperText style={{ color: 'red' }} id="component-error-text">{errors.price?.message}</FormHelperText>.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }
                                                } */}
                                                        </TableCell>

                                                        {/* <TableCell align="center" translate="no">{item.price}</TableCell>
                                                        <TableCell align="center" translate="no">{(item.price * item.quantity)}</TableCell> */}
                                                    </TableRow>
                                                ) : (<></>)))
                                                : (
                                                    <TableRow>
                                                        <TableCell colSpan={5} align="center"><b style={{ color: 'red' }}>Không có sản phẩm</b></TableCell>
                                                    </TableRow>
                                                )
                                            }


                                            {/* <TableRow>
                                                <TableCell colSpan={2} />
                                                <TableCell colSpan={4} align="right">
                                             
                                                    <b style={{ fontSize: 20, paddingRight: 25 }} translate="no">Tổng tiền: {(getTotalPrice()).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</b>
                                                </TableCell>
                                            </TableRow> */}
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                                <Button
                                    style={{ margin: 10 }}
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    onClick={() => { history.push("/productReturn"); localStorage.removeItem("productReturn") }}
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

        </React.Fragment>
    )
}

export default AddProductReturn