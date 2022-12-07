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
import Notification from "./../../../common/Notification";
import StarIcon from "@material-ui/icons/Star";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Report from "./report";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import { ShipperGetAll, EmployeeStatusAction } from "../../../store/actions/ShipperAction";
import OrderService from "../../../services/OrderService";
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

const HistoryDetail = () => {
    const classes = useStyles();
    const location = useLocation();
    const [order] = useState(location?.state?.order);
    const [status, setStatus] = useState(order.status);
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const history = useHistory();
    const { ratings } = useSelector((state) => state.rating);
    const { shippers } = useSelector((state) => state.shipper);
    const [shipper, setShipper] = useState(order.shipperId);
    const handleSelected = (event, value) => {
        setShipper(value);
    };
      
    useEffect(() => {
        dispatch(
          ShipperGetAll({
              
          })
        );
      }, [dispatch]);
    
    const handleOnDelete = (id) => {
        dispatch(OrderStatusUpdate({ id, status: 4 }));
        setStatus(4);
        //history.push("/order/");
        Notification.success("Đã hủy thành công");
    };

    const handleDelete = (id) => {
        confirmAlert({
            title: "HỦY ĐƠN HÀNG",
            message: "Bạn có chắc muốn hủy đơn hàng này không?",
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

    const handlePrint = async () => {
        const dataSend = { orderId: order.id  };
        // Notification.success(order.id );
        // return;
        try {
        const response = await OrderService.addInvoice(dataSend);

        if (response.status === 200) {
            // history.push("/productImport");
            Notification.success("Đã tạo hóa đơn thành công");
            // localStorage.removeItem("productImport")
            
        }
        } catch (error) {
           
            if (error.response) {
                Notification.error("Thêm hóa đơn thất bại. Thử lại123");
              
            } else {
                Notification.error("Thêm hóa đơn thất bại. Thử lại");
            }
          }
    } 
    const handleDirect = async () => {
        try {
            const response = await OrderService.getInvoice(order.id);
            // Notification.success(response.status);
            // return;
            if (response.status === 200) {
                // history.push("/productImport");
                
                
                history.push("/order/invoice" , { invoice: response.data })
                // localStorage.removeItem("productImport")
                
            }
            } catch (error) {
               
                if (error.response) {
                    Notification.error("Thêm hóa đơn thất bại. Thử lại123");
                  
                } else {
                    Notification.error("Thêm hóa đơn thất bại. Thử lại");
                }
              }
        
    }
    const handleComfirmedStatus = (id) => {
        dispatch(OrderStatusAndShipperUpdate({ id, status: 5 , shipperId: 7, employeeId: auth.user.id}));
        // dispatch(OrderStatusAndShipperUpdate({ id: id, status: 5 ,shipperId: shipperId, employeeId: auth.user.id}));
        setStatus(5);
        //history.push("/order/")
        Notification.success("Đã cập nhật thành công");
    };

    const handleShippingStatus = (id) => {
        dispatch(OrderStatusUpdate({ id, status: 2 }));
        setStatus(2);
        //history.push("/order/")
        Notification.success("Đã cập nhật thành công");
    };

    const handleCompleteStatus = (id) => {
        dispatch(OrderStatusUpdate({ id, status: 3 }));
        setStatus(3);
        //history.push("/order/")
        Notification.success("Đã cập nhật thành công");
    };

    const handleUpdate = (id, status, shipper) => {
        if(shipper === null){
            confirmAlert({
                title: "CHỌN SHIPPER CHO ĐƠN HÀNG",
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

    return (
        <React.Fragment>
            <CssBaseline />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Đơn Hàng
                    </Typography>
                    <PDFDownloadLink
                        document={<Report order={order} />}
                        fileName="report"
                    >
                        <Avatar style={{ cursor: "pointer", backgroundColor: "#FC8400", marginBottom: 10, marginLeft: 20 }}>
                            <PictureAsPdfIcon />
                        </Avatar>
                    </PDFDownloadLink>
                    <Typography variant="h6" className={classes.title}>
                        <Grid container spacing={3}>
                            <Grid item md={12} xl={12} sm={12} className={classes.wrapBarCode}>Mã đơn hàng: <BarCode value={order.id} /></Grid>
                            <Grid item md={6} xl={6} sm={12}>Ngày đặt hàng: {moment(order.createdAt).format("YYYY-MM-DD")}</Grid>
                            <Grid item md={6} xl={6} sm={12}>Lưu ý thêm: {order.noteOrder ? order.noteOrder : "Không có lưu ý"}</Grid>
                            <Grid item md={6} xl={6} sm={12}>Phương thức thanh toán:
                                {order.payment === 1 && (
                                    <span
                                        style={{ color: "black", fontWeight: 600 }}
                                    >
                                        Tiền mặt
                                    </span>
                                )}
                                {order.payment === 2 && (
                                    <span
                                        style={{ color: "green", fontWeight: 600 }}
                                    >
                                        Trực tuyến
                                    </span>
                                )}
                            </Grid>
                            <Grid item md={6} xl={6} sm={12}>
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
                            </Grid>
                            <Grid item md={6} xl={6} sm={12}>Người đặt hàng: {order.userId.fullName}</Grid>
                            <Grid item md={6} xl={6} sm={12}>Số điện thoại: {order.phone}</Grid>
                            <Grid item md={12} xl={12} sm={12}>
                                Địa chỉ: {order.address}
                            </Grid>
                            <Grid item md={6} xl={6} sm={12}>Nhân viên duyệt: {order?.employeeId?.fullName}</Grid>
                            <Grid item md={6} xl={6} sm={12}>Nhân viên giao: 
                            <FormControl>
      
      <Select
        value={shipper?.fullName}
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
                            {/* <Select 
                native
                value={shippers.size}
                
                className={classes.select}
         >
          {shippers.map((value, index) => {
          return <MenuItem value={value.fullName}>{value.fullName}</MenuItem>;
        })}

        </Select> */}
        </Grid>
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
                                                <TableCell align="center"><b>Hình ảnh</b></TableCell>
                                                <TableCell><b>Sản phẩm</b></TableCell>
                                                <TableCell align="left"><b>Số lượng</b></TableCell>
                                                <TableCell align="center"><b>Giá</b></TableCell>
                                                <TableCell align="center"><b>Tổng</b></TableCell>
                                                <TableCell align="center"></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {order?.orderDetails?.length > 0 ? order?.orderDetails?.map((item) => (
                                                <TableRow key={item.id}>
                                                    <TableCell align="center">
                                                        <img alt={item.productDetail.product.name} src={item.productDetail.product.linkImage} width={100} />
                                                    </TableCell>
                                                    <TableCell>
                                                        <p>{item.productDetail.product.name}</p>
                                                        {/* <span style={{ fontSize: 12, color: 'red' }}>{item.sizeOptionId} {item.addOptionId !== "" && ": " + item.addOptionId}</span> */}
                                                        <span style={{ fontSize: 12, color: 'red' }}>{item.sizeOptionId}</span>
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <div style={{ display: 'flex', marginTop: -10, marginLeft: -20 }}>
                                                            <p style={{ marginLeft: 20, marginRight: 20, fontSize: 16 }}>{item.quantity}</p>
                                                        </div>
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
                                                {/* <TableCell>
                                                    <b style={{ fontSize: 20, paddingLeft: 130 }}></b>, paddingRight: 45
                                                </TableCell> */}
                                                <TableCell align="right">
                                                    <b style={{ fontSize: 20 }} translate="no">Tổng tiền thanh toán: {(order.totalPrice).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</b>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                {(status === 1 || status === 2 || status === 5) && (<Button
                                    style={{ margin: 10 }}
                                    variant="contained"
                                    className={classes.button}
                                    onClick={() => handleUpdate(order.id, status, shipper)}
                                >
                                    CẬP NHẬT TRẠNG THÁI
                                </Button>)}
                                {status === 1 && (<Button
                                    style={{ margin: 10 }}
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                    onClick={() => handleDelete(order.id)}
                                >
                                    Hủy đơn hàng
                                </Button>)}
                                <Button
                                    style={{ margin: 10 }}
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    onClick={() => history.push("/order")}
                                >
                                    Quay lại
                                </Button>
                                {status === 3 && order.invoice === null && (<Button
                                    style={{ margin: 10 }}
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                    onClick={() => handlePrint()}
                                >
                                    In hóa đơn
                                </Button>)}
                                {status === 3 && order.invoice !== null && (<Button
                                    style={{ margin: 10 }}
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                    onClick={() => handleDirect()}
                                >
                                    Xem hóa đơn
                                </Button>)}
                            </Grid>
                        </Grid>
                    </React.Fragment>
                </Paper>
            </main>
        </React.Fragment>
    )
}

export default HistoryDetail