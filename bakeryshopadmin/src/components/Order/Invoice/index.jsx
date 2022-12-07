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
import { OrderStatusUpdate,OrderStatusAndShipperUpdate } from "../../../store/actions/OrderAction";
import { confirmAlert } from "react-confirm-alert";
import Notification from "../../../common/Notification";
import StarIcon from "@material-ui/icons/Star";
import { PDFDownloadLink } from "@react-pdf/renderer";
// import Report from "./report";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import { ShipperGetAll, EmployeeStatusAction } from "../../../store/actions/ShipperAction";

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
    orderDetail: {
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

const Invoice = () => {
    const classes = useStyles();
    const location = useLocation();
    // const [order] = useState(location?.state?.order);
    const [invoice] = useState(location?.state?.invoice);
    const [order] = useState(invoice.order);
    // const [status, setStatus] = useState(order.status);
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const history = useHistory();
    const { ratings } = useSelector((state) => state.rating);
    

      
    return (
        <React.Fragment>
            <CssBaseline />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Hóa Đơn
                    </Typography>
                    {/* <PDFDownloadLink
                        document={<Report order={order} />}
                        fileName="report"
                    >
                        <Avatar style={{ cursor: "pointer", backgroundColor: "#FC8400", marginBottom: 10, marginLeft: 20 }}>
                            <PictureAsPdfIcon />
                        </Avatar>
                    </PDFDownloadLink> */}
                    <Typography variant="h6" className={classes.title}>
                        <Grid container spacing={3}>
                            <Grid item md={12} xl={12} sm={12} className={classes.wrapBarCode}>Mã hóa đơn: <BarCode value={invoice.id} /></Grid>
                            <Grid item md={12} xl={12} sm={12}>Nhân viên xuất hóa đơn : {invoice?.userId?.fullName}</Grid>
                            <Grid item md={12} xl={12} sm={12}>Ngày tạo: {moment(invoice.createdAt).format("YYYY-MM-DD HH:mm:ss")}</Grid>
                            
                            
                            <Grid item md={4} xl={4} sm={12}>Mã Khách hàng: {order?.userId?.username}</Grid>
                            <Grid item md={4} xl={4} sm={12}>Tên Khách hàng: {order?.userId?.fullName}</Grid>
                            
                            <Grid item md={4} xl={4} sm={12}>Người nhận: {order.userId.fullName}</Grid>
                            <Grid item md={6} xl={6} sm={12}>Số điện thoại: {order.userId.phone}</Grid>
                            <Grid item md={12} xl={12} sm={12}>
                                Địa chỉ: {order.userId.address}
                            </Grid>
                            {/* <Grid item md={6} xl={6} sm={12}>Nhân viên duyệt: {order?.employeeId?.fullName}</Grid>
                            <Grid item md={6} xl={6} sm={12}>Nhân viên giao: </Grid> */}
                        </Grid>
                    </Typography>

                    {
                        ratings.find((r) => Object.is(r.orderId, location?.state?.order.id)) && (
                            <React.Fragment >
                                <div style={{ marginTop: 10, marginLeft: 20 }}>
                                    <Typography variant="h6" >Đánh giá</Typography>
                                    {[...Array(ratings.find((r) => Object.is(r.orderId, location?.state?.order.id)).rate)].map((item, index) => (
                                        <StarIcon key={index} className={classes.starSelected} />
                                    ))}
                                    {[...Array(5 - ratings.find((r) => Object.is(r.orderId, location?.state?.order.id)).rate)].map((item, index) => (
                                        <StarIcon key={index} className={classes.star} />
                                    ))}
                                    <Typography variant="body1"><b>Nội dung đánh giá: </b></Typography>
                                    <div style={{ height: 80, overflow: "scroll", width: 500 }}>
                                        <p >{ratings.find((r) => Object.is(r.orderId, location?.state?.order.id)).content}</p>
                                    </div>
                                </div>
                            </React.Fragment>
                        )
                    }

                    <React.Fragment>
                        <Grid container spacing={3} style={{ marginTop: 10 }}>
                            <Grid item xs={12} md={12}>
                                <TableContainer component={Paper}>
                                    <Table className={classes.table} aria-label="spanning table">
                                        <TableHead>
                                            <TableRow>
                                                
                                                <TableCell align="center"><b>STT</b></TableCell>
                                                <TableCell><b>Sản phẩm</b></TableCell>
                                                <TableCell align="center"><b>Size</b></TableCell>
                                                <TableCell align="center"><b>Số lượng</b></TableCell>
                                                <TableCell align="center"><b>Giá</b></TableCell>
                                                <TableCell align="center"><b>Tổng</b></TableCell>
                                                <TableCell align="center"></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {order?.orderDetails?.length > 0 ? order?.orderDetails?.map((item,index) => (
                                                <TableRow key={item.id}>
                                                    <TableCell align="center">
                                                    <p>{index+1}</p>
                                                    </TableCell>
                                                    <TableCell>
                                                        <p>{item.productDetail.product.name}</p>
                                                        
                                                    </TableCell>
                                                    <TableCell>
                                                        <p>{item.sizeOptionId}</p>

                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {/* <div style={{ display: 'flex', marginTop: -10, marginLeft: -20 }}>
                                                            <p style={{ marginLeft: 20, marginRight: 20, fontSize: 16 }}>{item.quantity}</p>
                                                        </div> */}
                                                        {/* <p style={{ marginLeft: 5, marginRight: 5, fontSize: 16 }}>{item.quantity}</p> */}
                                                        <p >{item.quantity}</p>
                                                    </TableCell>
                                                    <TableCell align="center" translate="no">{(item.productDetail.product.price).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</TableCell>
                                                    <TableCell align="center" translate="no">{(item.productDetail.product.price * item.quantity).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</TableCell>
                                                </TableRow>
                                            )) : (
                                                <TableRow>
                                                    <TableCell colSpan={5} align="center"><b style={{ color: 'red' }}>Không có sản phẩm trong giỏ hàng</b></TableCell>
                                                </TableRow>
                                            )
                                            }
                                            {order?.groupMembers?.length > 0 &&
                                                order?.groupMembers?.map((item) => (
                                                    item?.groupOrderDetails.map((detail) => (
                                                        <TableRow key={detail.id}>
                                                            <TableCell align="center">
                                                                <img alt={detail.product.name} src={detail.product.linkImage} width={100} />
                                                            </TableCell>
                                                            <TableCell>
                                                                <p>{detail.product.name}</p>
                                                                <span style={{ fontSize: 12, color: 'red' }}>{detail.sizeOptionId} {detail.addOptionId !== "" && ": " + detail.addOptionId}</span>
                                                            </TableCell>
                                                            <TableCell align="center">
                                                                <div style={{ display: 'flex', marginTop: -10, marginLeft: -20 }}>
                                                                    <p style={{ marginLeft: 20, marginRight: 20, fontSize: 16 }}>{detail.quantity}</p>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell align="center" translate="no">{(detail.product.price).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</TableCell>
                                                            <TableCell align="center" translate="no">{(detail.product.price * detail.quantity).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</TableCell>
                                                        </TableRow>
                                                    ))
                                                ))}

                                            <TableRow>
                                                <TableCell colSpan={3} className={classes.cellWithoutBorder} />
                                                <TableCell className={classes.cellWithoutBorder} >
                                                    <b style={{ paddingLeft: 130 }}>Tạm tính:</b>
                                                </TableCell>
                                                <TableCell align="right" className={classes.cellWithoutBorder}>
                                                    <b style={{ paddingRight: 45 }} translate="no">{((order.totalPrice - order.shipping + order.memberVip) / 1.05).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</b>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell colSpan={3} className={classes.cellWithoutBorder} />
                                                <TableCell className={classes.cellWithoutBorder}>
                                                    <b style={{ paddingLeft: 130 }}>Thuế (5%):</b>
                                                </TableCell>
                                                <TableCell align="right" className={classes.cellWithoutBorder}>
                                                    <b style={{ paddingRight: 45 }} translate="no">{((order.totalPrice - order.shipping + order.memberVip) / 1.05 * 0.05).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</b>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell colSpan={3} className={classes.cellWithoutBorder} />
                                                <TableCell className={classes.cellWithoutBorder}>
                                                    <b style={{ paddingLeft: 130 }}>Phí vận chuyển:</b>
                                                </TableCell>
                                                <TableCell align="right" className={classes.cellWithoutBorder}>
                                                    <b style={{ paddingRight: 45 }} translate="no">{(order.shipping).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</b>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell colSpan={3} />
                                                <TableCell>
                                                    <b style={{ paddingLeft: 130 }}>Giảm giá:</b>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <b style={{ paddingRight: 45 }} translate="no">{(order.memberVip).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</b>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell colSpan={3} />
                                                {/* <TableCell>, paddingRight: 45
                                                    <b style={{ fontSize: 20, paddingLeft: 130 }}></b>align="right"
                                                </TableCell> */}
                                                <TableCell colSpan={3}>
                                                    <b style={{ fontSize: 20 }} translate="no">Tổng tiền thanh toán: {(order.totalPrice).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</b>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                
                                <Button
                                    style={{ margin: 10 }}
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    onClick={() => history.push("/order")}
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

export default Invoice