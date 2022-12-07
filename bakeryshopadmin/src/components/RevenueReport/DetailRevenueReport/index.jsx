import { Button, TextField, Grid, makeStyles, Typography, CssBaseline, Chip, Avatar, MenuItem, Select,FormControl,InputLabel } from "@material-ui/core"
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
import { useForm } from "react-hook-form";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
// import { OrderStatusUpdate,OrderStatusAndShipperUpdate } from "../../../store/actions/OrderAction";
import { confirmAlert } from "react-confirm-alert";
import Notification from "../../../common/Notification";
import RevenueService from "../../../services/RevenueService";
import StarIcon from "@material-ui/icons/Star";
import { PDFDownloadLink } from "@react-pdf/renderer";
// import Report from "./report";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import { RevenueListReport, YearList, SumRevenue } from '../../../store/actions/RevenueAction';
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
    revenueDetail: {
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

const DetailRevenueReport = () => {
    const classes = useStyles();
    const location = useLocation();
    // const [revenue] = useState(location?.state?.revenue);
    const [data, setData] = useState(JSON.parse(localStorage.getItem("revenue") || "[]"));
    const [productSelect, setProductSelect] = useState(location?.state?.productSelect);
    // const [listRevenue] = useState(location?.state?.listRevenue);
    const { listRevenue, listYears, sumRevenue } = useSelector((state) => state.revenue);
    const [value1] = useState(location?.state?.value1);
    const [value2] = useState(location?.state?.value2);
    //localStorage.getItem('revenue')
    // const [status, setStatus] = useState(revenue.status);location?.state?.revenue
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        dispatch(
          RevenueListReport({
            value1: value1.toString(),
            value2: value2.toString()
          })
        );
        
        
      }, [dispatch, value1,value2])
    useEffect(() => {
        // const revenue = JSON.parse(localStorage.getItem('revenue'));

        if (productSelect !==null) {
            
        }
        else if (productSelect === null || productSelect.length === 0) {
            // localStorage.clear();
            // localStorage.removeItem("revenue")
            Notification.success("revenue");
        }
        else{
            Notification.success("Null");
        }
        
        // if(productSelect !== null){
        //     revenue.push(productSelect)
            
        // }else{
        //    
        // }, [productSelect]
        
    },[]);
    const onChangeQuantity = (id,quantity) => {
        const newData = data.map((item,i) => {
            if(item.id===id) {
                return {...item, quantity:quantity };
            }else{
               return item;
            }
        });
        setData(newData);
        localStorage.setItem("revenue", JSON.stringify(data));
    };
    const getTotalPrice = () => {
        return listRevenue.reduce((total,item) => {
            return total = total + (item.revenue);
        },0)
        
    };
    const onHandleSave = async () => {

        const detailImportRequestList = [];
        for( let i =0 ; i< data.length; i++){
            var obj =  {
                name: data[i].name,
                id : data[i].id,
                linkImage: data[i].linkImage,
                sizeName: data[i].name,
                price: data[i].price,
                quantity: data[i].quantity,
              }
            detailImportRequestList.push(obj);
        }
        const dataSend = { employeeId: 1 , detailImportRequestList: detailImportRequestList };
        try {
        
        const response = await RevenueService.add(dataSend);
        if (response.status === 200) {
            history.push("/revenue");
            Notification.success("Đã tạo thành công");
            localStorage.removeItem("revenue")
            
        }else{
            Notification.error("Tạo thất bại ");
        }} catch (error) {
           
            if (error.response) {
                Notification.error("Thêm sản phẩm thất bại. Thử lại");
              
            } else {
                Notification.error("Thêm sản phẩm thất bại. Thử lại");
            }
          }

    };
    
    //   setRevenue([...revenue,productSelect]), [ productSelect], [ productSelect]

    // const [shipper, setShipper] = useState(revenue.shipperId);
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
        //history.push("/revenue/")
        Notification.success("Đã cập nhật thành công");
    };

    const handleShippingStatus = (id) => {
        // dispatch(OrderStatusUpdate({ id, status: 2 }));
        // setStatus(2);
        //history.push("/revenue/")
        Notification.success("Đã cập nhật thành công");
    };

    const handleCompleteStatus = (id) => {
        // dispatch(OrderStatusUpdate({ id, status: 3 }));
        // setStatus(3);
        //history.push("/revenue/")
        Notification.success("Đã cập nhật thành công");
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    const handleUpdate = (id, status, shipper) => {
        if(shipper === null){
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
        history.push("/revenue/select");
      };
    return (
        <React.Fragment>
            
            <CssBaseline />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        BÁO CÁO DOANH THU THEO THÁNG
                    </Typography>
                    {/* <PDFDownloadLink
                        document={<Report revenue={revenue} />}
                        fileName="report"
                    >
                        <Avatar style={{ cursor: "pointer", backgroundColor: "#FC8400", marginBottom: 10, marginLeft: 20 }}>
                            <PictureAsPdfIcon />
                        </Avatar>
                    </PDFDownloadLink> */}
                    <Typography variant="h6" className={classes.title}>
                        <Grid container spacing={3}>
                        <Grid item md={12} xl={12} sm={12}>Từ ngày: {value1}</Grid>
                            {/* <Grid item md={12} xl={12} sm={12} className={classes.wrapBarCode}>Mã phiếu nhập: <BarCode value={revenue.id} /></Grid> */}
                        <Grid item md={12} xl={12} sm={12}>Tới ngày: {value2}</Grid>
                           
                            
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
                                                <TableCell align="center"><b>STT</b></TableCell>
                                                <TableCell align="center"><b>Tháng</b></TableCell>
                                                <TableCell align="center"><b>Doanh thu</b></TableCell>
                                               
                                                
                                                <TableCell align="center"></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                        {/* revenue.length > 0 ? revenue.map((item) */}
                                        { listRevenue.map((item, index) => (
                <TableRow key={index}>
                    {/* <View style={styles.row}> */}
                    <TableCell align="center">{index+1}</TableCell>
                        <TableCell align="center">{item.month}</TableCell>
                        {/* <Text style={styles.revenueItem}> {item.revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VNĐ</Text> */}
                        <TableCell align="right"> {item.revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VNĐ</TableCell>
                    {/* </View> */}
                </TableRow>
            ))}
                                            
                                    
                                            <TableRow>
                                                <TableCell colSpan={2} />
                                                {/* <TableCell>
                                                    <b style={{ fontSize: 15, paddingLeft: 150, width: 200 }}>Tổng tiền: </b>
                                                </TableCell> */}
                                                <TableCell colSpan={3} align="right">
                                                {/* <b style={{ fontSize: 15, paddingRight: 25 }paddingLeft: 150, width: 200 }}> </b> */}
                                                    <b style={{ fontSize: 20} } translate="no">Tổng tiền: { (getTotalPrice()).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</b>
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
                                    onClick={() => {history.push("/revenueReport"); localStorage.removeItem("revenue")}}
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

export default DetailRevenueReport