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
import ProductImportService from "../../../services/ProductImportService";
import { PromotionDetailAddListAction } from "./../../../store/actions/PromotionDetailAction";
import StarIcon from "@material-ui/icons/Star";
import { PDFDownloadLink } from "@react-pdf/renderer";
// import Report from "./report";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
// import { ShipperGetAll, EmployeeStatusAction } from "../../../store/actions/ShipperAction";
import {
    CreateOutlined,
    DeleteOutline,
    Replay,
    Visibility,
  } from "@material-ui/icons";
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
    promotionDetailDetail: {
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

const AddPromotionDetail = () => {
    const classes = useStyles();
    const location = useLocation();
    // const [promotionDetail] = useState(location?.state?.promotionDetail);
    const [data, setData] = useState(JSON.parse(localStorage.getItem("promotionDetail") || "[]"));
    // const [productSelect, setProductSelect] = useState(location?.state?.productSelect);
    const [productSelect] = useState(location?.state?.productSelect);
    const [promotion] = useState(location?.state?.promotion);
    //localStorage.getItem('promotionDetail')
    // const [status, setStatus] = useState(promotionDetail.status);location?.state?.promotionDetail
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        // const promotionDetail = JSON.parse(localStorage.getItem('promotionDetail'));

        if (productSelect !==null) {
            
        }
        else if (productSelect === null || productSelect.length === 0) {
            // localStorage.clear();
            // localStorage.removeItem("promotionDetail")
            Notification.success("promotionDetail");
        }
        else{
            Notification.success("Null");
        }
        
        // if(productSelect !== null){
        //     promotionDetail.push(productSelect)
            
        // }else{
        //    
        // }, [productSelect]
        
    },[]);
    const onhandleDelete = (e) => {
        var array = [...data]; // make a separate copy of the array
        var index = array.indexOf(e)
        if (index !== -1) {
            array.splice(index, 1);
            setData(array);
        }
    }
    const onChangeDiscount = (id,discount) => {
        const newData = data.map((item,i) => {
            if(item.id===id) {
                return {...item, discount: discount };
            }else{
               return item;
            }
        });
        setData(newData);
        localStorage.setItem("promotionDetail", JSON.stringify(data));
    };
    const getTotalPrice = () => {
        return data.reduce((total,item) => {
            return total = total + (item.price * item.quantity);
        },0)
        
    };
    const onHandleSave = async () => {
        var datasend = [];

        for( let i =0 ; i< data.length; i++){
            var obj =  {
            discount: data[i].discount,
            productId : data[i].id,
            promotionId: promotion.id,
            }
            datasend.push(obj);
            
        }
       
        const send = { promotionDetailRequestList: datasend  };
    //    Notification.success(JSON.parse(send));
        await dispatch(PromotionDetailAddListAction( datasend)).then((res) => {
            
            if(res.message==="OK"){
                history.push("/promotion/detail", {promotion: promotion});
                Notification.success("Thêm sản phẩm khuyến mãi thành công!");
            }else{
                Notification.error(res.message);
            }
            
          }); 
          
          return
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
        
        const response = await ProductImportService.add(dataSend);
        if (response.status === 200) {
            history.push("/promotionDetail");
            Notification.success("Đã tạo thành công");
            localStorage.removeItem("promotionDetail")
            
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
    
    //   setProductImport([...promotionDetail,productSelect]), [ productSelect], [ productSelect]

    // const [shipper, setShipper] = useState(promotionDetail.shipperId);
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
        //history.push("/promotionDetail/")
        Notification.success("Đã cập nhật thành công");
    };

    const handleShippingStatus = (id) => {
        // dispatch(OrderStatusUpdate({ id, status: 2 }));
        // setStatus(2);
        //history.push("/promotionDetail/")
        Notification.success("Đã cập nhật thành công");
    };

    const handleCompleteStatus = (id) => {
        // dispatch(OrderStatusUpdate({ id, status: 3 }));
        // setStatus(3);
        //history.push("/promotionDetail/")
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
        history.push("/promotionDetail/select");
      };
    return (
        <React.Fragment>
            <Button
              size="small"
              variant="outlined"
              color="primary"
              
              onClick={onHandleRedirect}
            >
              Chọn thêm sản phẩm giảm giá
            </Button>
            <CssBaseline />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Giảm giá cho sản phẩm
                    </Typography>
                    <React.Fragment>
                        <Grid container spacing={3} style={{ marginTop: 10 }}>
                            <Grid item xs={12} md={12}>
                                <TableContainer component={Paper}>
                                    <Table className={classes.table} aria-label="spanning table">
                                        <TableHead>
                                            <TableRow>
                                            <TableCell align="center"><b>STT</b></TableCell>
                                                <TableCell align="center"><b>Hình ảnh</b></TableCell>
                                                {/* <TableCell align="center"><b>Mã sản phẩm</b></TableCell> */}
                                                <TableCell align="center"><b>Sản phẩm</b></TableCell>
                                                <TableCell align="left"><b>Phần trăm giảm </b></TableCell>
                                                <TableCell align="center"></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                        {/* promotionDetail.length > 0 ? promotionDetail.map((item) */}
                                            {data.length > 0 ? data.map((item,index)  => (
                                                (item !== null) ? ( 
                                                <TableRow key={item.id}>
                                                    <TableCell align="center">{index+1}</TableCell>
                                                    <TableCell align="center">
                                                        <img alt={item.name} src={item.linkImage} width={100} />
                                                    </TableCell>
                                                    {/* <TableCell align="center">
                                                        <p>{item.id}</p>
                                                    </TableCell> */}
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
                                                    label="Nhập phần trăm giảm"
                                                    // style={{ marginTop: 10 }}
                                                    defaultValue={item.discount}
                                                    fullWidth
                                                    // onChange={item.quantity}e.target.value
                                                    onChange={(e) => {onChangeDiscount(item.id,e.target.value)}}
                                                    type="number"
                                                    name={"discount"}
                                                    InputProps={{
                                                        inputProps: { //
                                                            max: 99 , min: 0 
                                                        }
                                                    }}
                                                    // inputRef={register({
                                                    //     required: "Nhập phần trăm giảm", pattern: { value: /^[0-9]+$/i, message: "Phần trăm giảm không hợp lệ" }, validate: (value) => {
                                                    //         if (value > 10000 || value < 1) {
                                                    //             return "Phần trăm giảm phải > 1";
                                                    //         }
                                                    //     },
                                                    //     min: 1,
                                                    // })}
                                                />
                                                    </>
                                                {/* {errors.price?.message &&.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
                                                    <FormHelperText style={{ color: 'red' }} id="component-error-text">{errors.price?.message}</FormHelperText>.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }
                                                } */}
                                                    </TableCell>
                                                    <TableCell>
                                                    <DeleteOutline
                      style={{ color: "red", cursor: "pointer" }}
                      onClick={() => onhandleDelete(item)}
                    />
                </TableCell>
                                                    {/* <TableCell align="center" translate="no">{item.price}</TableCell>
                                                    <TableCell align="center" translate="no">{(item.price * item.quantity)}</TableCell> */}
                                                </TableRow>
                                            ) : (<></>)))
                                            : (
                                                <TableRow>
                                                    <TableCell colSpan={5} align="center"><b style={{ color: 'red' }}>Không có sản phẩm trong giỏ hàng</b></TableCell>
                                                </TableRow>
                                            )
                                            }
                                            {/* <TableRow>
                                                <TableCell colSpan={2} />
                                                
                                                <TableCell colSpan={4} align="right">
                                                    <b style={{ fontSize: 20} } translate="no">Tổng tiền: { (getTotalPrice()).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</b>
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
                                    onClick={() => {history.push("/promotion/detail", {promotion: promotion}); localStorage.removeItem("promotionDetail"); localStorage.removeItem("checked")}}
                                >
                                    Quay lại
                                </Button>
                                <Button
                                    style={{ margin: 10 }}
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    onClick={()=> onHandleSave()}
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

export default AddPromotionDetail