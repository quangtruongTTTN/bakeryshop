import { Button, Grid, makeStyles, Typography, CssBaseline, Chip, Avatar, MenuItem, Select,FormControl,InputLabel } from "@material-ui/core"
import React, {useEffect, useState } from "react"
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useHistory, useLocation } from "react-router";
import BarCode from "react-barcode";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
// import { OrderStatusUpdate,OrderStatusAndShipperUpdate } from "../../../store/actions/OrderAction";
import { confirmAlert } from "react-confirm-alert";
import Notification from "../../../common/Notification";
import StarIcon from "@material-ui/icons/Star";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Report from "./report";
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

const DetailProductImport = () => {
    const classes = useStyles();
    const location = useLocation();
    const [productImport] = useState(location?.state?.productImport);
    // const [status, setStatus] = useState(productImport.status);
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const history = useHistory();

    // const [shipper, setShipper] = useState(productImport.shipperId);
    const handleSelected = (event, value) => {
        // setShipper(value);
    };
      

    
    const handleOnDelete = (id) => {
        // dispatch(OrderStatusUpdate({ id, status: 4 }));
        // setStatus(4);
        //history.push("/productImport/");
        Notification.success("Đã hủy thành công");
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

    

    return (
        <React.Fragment>
            <CssBaseline />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Chi Tiết Phiếu Nhập
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
                            <Grid item md={12} xl={12} sm={12} className={classes.wrapBarCode}>Mã phiếu nhập: <BarCode value={productImport.id} /></Grid>
                            <Grid item md={6} xl={6} sm={12}>Ngày lập: {moment(productImport.createdAt).format("YYYY-MM-DD")}</Grid>
                            {/* <Grid item md={6} xl={6} sm={12}>Lưu ý thêm: {productImport.noteOrder ? productImport.noteOrder : "Không có lưu ý"}</Grid> */}
                            {/* <Grid item md={6} xl={6} sm={12}>Phương thức thanh toán:
                                {productImport.payment === 1 && (
                                    <span
                                        style={{ color: "black", fontWeight: 600 }}
                                    >
                                        Tiền mặt
                                    </span>
                                )}
                                {productImport.payment === 2 && (
                                    <span
                                        style={{ color: "green", fontWeight: 600 }}
                                    >
                                        Trực tuyến
                                    </span>
                                )}
                            </Grid> */}
                            {/* <Grid item md={6} xl={6} sm={12}>
                                Tình trạng:
                                {status === 1 &&
                                    (
                                        <Chip
                                            label="Đang xử lý"
                                            style={{ backgroundColor: "pearl", color: "white" }}
                                        />
                                    )}
                                {status === 2 &&
                                    (
                                        <Chip
                                            label="Đang giao hàng"
                                            style={{ backgroundColor: "lightblue", color: "white" }}
                                        />
                                    )}
                                {status === 3 &&
                                    (
                                        <Chip
                                            label="Hoàn thành"
                                            style={{ backgroundColor: "green", color: "white" }}
                                        />
                                    )}
                                {status === 4 && (
                                    <Chip
                                        label="Đã hủy"
                                        style={{ backgroundColor: "red", color: "white" }}
                                    />
                                )}
                                {status === 5 && (
                                    <Chip
                                        label="Chờ lấy hàng"
                                        style={{ backgroundColor: "lightskyblue", color: "white" }}
                                    />
                                )}
                            </Grid> */}
                            <Grid item md={6} xl={6} sm={12}>Nhân viên tạo: {productImport.employeeName}</Grid>
                            <Grid item md={6} xl={6} sm={12}>Mã Nhân viên tạo: {productImport.employeeId}</Grid>
                            {/* <Grid item md={12} xl={12} sm={12}>
                                Địa chỉ: {productImport.employeeName}
                            </Grid>
                            <Grid item md={6} xl={6} sm={12}>Nhân viên duyệt: {productImport?.employeeName}</Grid> */}
                            {/* <Grid item md={6} xl={6} sm={12}>Nhân viên giao: 
                            <FormControl>
      <Select
        // value={shipper?.fullName}
        className={classes.select}
        onChange={handleSelected}
        inputProps={{
          name: "agent",
          id: "age-simple"
        }}
      >
        {shippers.map((value, index) => {
          return <MenuItem value={value?.fullName}>{value?.fullName}</MenuItem>;
        })}
      </Select>
    </FormControl>
                            <Select 
                native
                value={shippers.size}
                
                className={classes.select}
         >
          {shippers.map((value, index) => {
          return <MenuItem value={value.fullName}>{value.fullName}</MenuItem>;
        })}

        </Select>
        </Grid> */}
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
                                            {productImport?.productImportDetails?.length > 0 ? productImport?.productImportDetails?.map((item) => (
                                                <TableRow key={item.id}>
                                                    <TableCell align="center">
                                                        <img alt={item.productDetail.product.name} src={item.productDetail.product.linkImage} width={100} />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <p>{item.productDetail.product.id}</p>
                                                    </TableCell>
                                                    <TableCell>
                                                        <p>{item.productDetail.product.name}</p>
                                                        <span style={{ fontSize: 12, color: 'red' }}>{item.productDetail.sizeOption.name} </span>

                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <div style={{ display: 'flex', marginTop: -10, marginLeft: -20 }}>
                                                            <p style={{ marginLeft: 20, marginRight: 20, fontSize: 16 }}>{item.quantity}</p>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell align="center" translate="no">{(item.price).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</TableCell>
                                                    <TableCell align="center" translate="no">{(item.price * item.quantity).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</TableCell>
                                                </TableRow>
                                            )) : (
                                                <TableRow>
                                                    <TableCell colSpan={5} align="center"><b style={{ color: 'red' }}>Không có sản phẩm trong giỏ hàng</b></TableCell>
                                                </TableRow>
                                            )
                                            }
                                            
                                            {/* <TableRow>
                                                <TableCell colSpan={3} className={classes.cellWithoutBorder} />
                                                <TableCell className={classes.cellWithoutBorder} >
                                                    <b style={{ paddingLeft: 130 }}>Tạm tính:</b>
                                                </TableCell>
                                                <TableCell align="right" className={classes.cellWithoutBorder}>
                                                    <b style={{ paddingRight: 45 }} translate="no">{((productImport.totalPrice - productImport.shipping + productImport.memberVip) / 1.05).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</b>
                                                </TableCell>
                                            </TableRow> */}
                                            {/* <TableRow>
                                                <TableCell colSpan={3} className={classes.cellWithoutBorder} />
                                                <TableCell className={classes.cellWithoutBorder}>
                                                    <b style={{ paddingLeft: 130 }}>Thuế (5%):</b>
                                                </TableCell>
                                                <TableCell align="right" className={classes.cellWithoutBorder}>
                                                    <b style={{ paddingRight: 45 }} translate="no">{((productImport.totalPrice - productImport.shipping + productImport.memberVip) / 1.05 * 0.05).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</b>
                                                </TableCell>
                                            </TableRow> */}
                                            {/* <TableRow>
                                                <TableCell colSpan={3} className={classes.cellWithoutBorder} />
                                                <TableCell className={classes.cellWithoutBorder}>
                                                    <b style={{ paddingLeft: 130 }}>Phí vận chuyển:</b>
                                                </TableCell>
                                                <TableCell align="right" className={classes.cellWithoutBorder}>
                                                    <b style={{ paddingRight: 45 }} translate="no">{(productImport.shipping).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</b>
                                                </TableCell>
                                            </TableRow> */}
                                            {/* <TableRow>
                                                <TableCell colSpan={3} />
                                                <TableCell>
                                                    <b style={{ paddingLeft: 130 }}>Giảm giá:</b>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <b style={{ paddingRight: 45 }} translate="no">{(productImport.memberVip).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</b>
                                                </TableCell>
                                            </TableRow> */}
                                            <TableRow>
                                                <TableCell colSpan={3} />
                                                {/* <TableCell>
                                                    <b style={{ fontSize: 20, paddingLeft: 130 }}>Tổng tiền :</b>
                                                </TableCell> */}
                                                <TableCell align="right">
                                                    <b style={{ fontSize: 20 }} translate="no">Tổng tiền : {(productImport.totalPrice).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</b>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                {/* {(status === 1 || status === 2 || status === 5) && (<Button
                                    style={{ margin: 10 }}
                                    variant="contained"
                                    className={classes.button}
                                    onClick={() => handleUpdate(productImport.id, status, shipper)}
                                >
                                    CẬP NHẬT TRẠNG THÁI
                                </Button>)}
                                {status === 1 && (<Button
                                    style={{ margin: 10 }}
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                    onClick={() => handleDelete(productImport.id)}
                                >
                                    Hủy phiếu nhập
                                </Button>)} */}
                                <Button
                                    style={{ margin: 10 }}
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    onClick={() => history.push("/productImport")}
                                >
                                    Quay lại
                                </Button>
                            </Grid>
                        </Grid>
                    </React.Fragment>
                </Paper>
            </main>
        </React.Fragment>
    )
}

export default DetailProductImport