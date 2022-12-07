import { Button, TextField, Card, Grid, makeStyles, Tabs, Typography, Tab, Box, withStyles, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Select, Chip } from "@material-ui/core"
import React, { useState, useEffect } from "react"
import { LocalShippingOutlined, DeleteOutline, Visibility, CreateOutlined } from "@material-ui/icons"
import FastfoodIcon from '@material-ui/icons/Fastfood';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useDispatch, useSelector } from "react-redux";
import { ProductImportListSuccess, ProductImportGetById } from "../../store/actions/ProductImportAction";
import { Pagination } from '@material-ui/lab';
import TableHeader from "../TableHeader";
import moment from "moment";
import { useHistory } from "react-router";
import { confirmAlert } from 'react-confirm-alert';
import Notification from "../../common/Notification";
// import { ProductImportStatusUpdate } from "../../store/actions/ProductImportAction";
import BarCode from "react-barcode";

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
    title: {
        color: '#7f7f7f',
        fontSize: 14
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
    titleProductImport: {
        fontSize: 14,
        display: 'flex',
        paddingLeft: 20,
        paddingTop: 5,
        paddingBottom: 5,
        borderBottom: '1px solid #ececec'
    },
    titleProductImport1: {
        color: '#e8f803',
    },
    titleProductImport2: {
        color: '#3fb4a5',
    },
    titleProductImport3: {
        color: '#ff0000',
    },
    contentProductImport: {
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
    btnSearch: {
        background: "#020202",
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
    wrapped: {
        "& svg": {
            width: 150,
        },
    }
}));

function TabPanel(props) {

    const { children, value, index, ...other } = props;


    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const ProductImport = () => {
    const classes = useStyles();
    const [valueTab, setValueTab] = React.useState(0);

    const handleChange = (event, newValueTab) => {
        setValueTab(newValueTab);
    };

    const a11yProps = (index) => {
        return {
            id: `scrollable-auto-tab-${index}`,
            'aria-controls': `scrollable-auto-tabpanel-${index}`,
        };
    }

    const AntTabs = withStyles({
        root: {
            borderBottom: '1px solid #e8e8e8',
        },
        indicator: {
            backgroundColor: '#1890ff',
        },
    })(Tabs);


    const dispatch = useDispatch();
    const history = useHistory();
    // listSuccess, 
    const { listSuccess, totalPagesSuccess } = useSelector((state) => state.productImport);
    // const [listSuccess] = useSelector((state) => state.productImport);
    const [pageProcess, setPageProcess] = useState(1);
    const [pageSuccess, setPageSuccess] = useState(1);
    const [pageFail, setPageFail] = useState(1);
    const [valueToProductImportByProcess, setValueToProductImportByProcess] = useState("id");
    const [valueToProductImportBySuccess, setValueToProductImportBySuccess] = useState("id");
    const [valueToProductImportByFail, setValueToProductImportByFail] = useState("id");
    const [valueToSortDirProcess, setValueToSortDirProcess] = useState("desc");
    const [valueToSortDirSuccess, setValueToSortDirSuccess] = useState("desc");
    const [valueToSortDirFail, setValueToSortDirFail] = useState("desc");
    const [pageSizeProcess, setPageSizeProcess] = useState(3);
    const [pageSizeSuccess, setPageSizeSuccess] = useState(3);
    const [pageSizeFail, setPageSizeFail] = useState(3);
    const [keyword, setKeyword] = useState("");
    const [page, setPage] = useState(1);
    const [productImport, setProductImport] = useState(null);
    const [name, setName] = useState("");
    const onHandleRedirect = () => {
        history.push("/productImport/add");
      };

    useEffect(() => {
        dispatch(
            ProductImportListSuccess({
                page: pageSuccess,
                sortField: valueToProductImportBySuccess,
                sortDir: valueToSortDirSuccess,
                pageSize: pageSizeSuccess,
                keyword,
            })
        );

        // dispatch(ProductImportGetById(name)).then(
        //     (res) => res?.data && setProductImport(res?.data)
        // );
        // dispatch(ProductImportGetById({orderId: name}));
    }, [dispatch, pageProcess, pageSuccess, pageFail, valueToProductImportByProcess, valueToProductImportBySuccess, valueToProductImportByFail, valueToSortDirProcess, valueToSortDirSuccess, valueToSortDirFail, pageSizeProcess, pageSizeSuccess, pageSizeFail, keyword, name]);
    const handleSearch = (e) => {
        e.preventDefault();
        setKeyword(name);
        // Notification.error(name);

        // if (productImport === null) {
        //     Notification.success("Không tìm thấy phiếu nhập");
        // } else {
        //     // Notification.success("Tìm thấy nhưng có bug ");
        //     // Notification.success(productImport.productImport);

        //     history.push("/productImport/detail", { productImport: productImport });
        // }

        setPage(1);
    };
    const handleRequestSortProcess = (property) => {
        const isAscending =
            Object.is(valueToProductImportByProcess, property) && Object.is(valueToSortDirProcess, "asc");
        setValueToProductImportByProcess(property);
        setValueToSortDirProcess(isAscending ? "desc" : "asc");
    };

    const handleRequestSortSuccess = (property) => {
        const isAscending =
            Object.is(valueToProductImportBySuccess, property) && Object.is(valueToSortDirSuccess, "asc");
        setValueToProductImportBySuccess(property);
        setValueToSortDirSuccess(isAscending ? "desc" : "asc");
    };

    const handleRequestSortFail = (property) => {
        const isAscending =
            Object.is(valueToProductImportByFail, property) && Object.is(valueToSortDirFail, "asc");
        setValueToProductImportByFail(property);
        setValueToSortDirFail(isAscending ? "desc" : "asc");
    };

    const handlePageProcess = (event, value) => {
        setPageProcess(value);
    };

    const handlePageSuccess = (event, value) => {
        setPageSuccess(value);
    };

    const handlePageFail = (event, value) => {
        setPageFail(value);
    };

    const handlePageSizeProcess = (e) => {
        setPageSizeProcess(e.target.value);
        setPageProcess(1);
    };

    const handlePageSizeSuccess = (e) => {
        setPageSizeSuccess(e.target.value);
        setPageSuccess(1);
    };

    const handlePageSizeFail = (e) => {
        setPageSizeFail(e.target.value);
        setPageFail(1);
    };

    const fields = [
        { name: "id", label: "Mã Số Phiếu Nhập", dir: "desc" },
        // { name: "productId", label: "Mã Số Sản phẩm", dir: "desc" },
        { name: "createdAt", label: "Ngày tạo", dir: "asc" },
        { name: "totalQuantity", label: "Tổng số lượng nhập", dir: "asc" },
        { name: "totalPrice", label: "Tổng giá nhập", dir: "asc" },
        { name: "employeeId", label: "Mã nhân viên tạo", dir: "asc" },
        { name: "employeeName", label: "Họ và tên nhân viên tạo", dir: "asc" },
        // { label: "Trạng Thái" },
        { label: "Hành Động" },
    ];

    // const handleOnDelete = (id) => {
    //     dispatch(ProductImportStatusUpdate({ id, status: 4 }));
    //     Notification.success("Đã hủy thành công");
    // };

    // const handleDelete = (id) => {
    //     confirmAlert({
    //         title: "HỦY ĐƠN HÀNG",
    //         message: "Bạn có chắc muốn hủy đơn hàng này không?",
    //         buttons: [
    //             {
    //                 label: "Có",
    //                 onClick: () => handleOnDelete(id),
    //             },
    //             {
    //                 label: "Không",
    //             }
    //         ],
    //     });
    // };

    // const handleOnShippingStatus = (id) => {
    //     dispatch(ProductImportStatusUpdate({ id, status: 2 }));
    //     Notification.success("Đã cập nhật thành công");
    // };

    // const handleShippingStatus = (id) => {
    //     confirmAlert({
    //         title: "CẬP NHẬT TRẠNG THÁI",
    //         message: "Bạn muốn chuyển sang trạng thái GIAO HÀNG?",
    //         buttons: [
    //             {
    //                 label: "Có",
    //                 onClick: () => handleOnShippingStatus(id),
    //             },
    //             {
    //                 label: "Không",
    //             }
    //         ],
    //     });
    // };

    // const handleOnCompleteStatus = (id) => {
    //     dispatch(ProductImportStatusUpdate({ id, status: 3 }));
    //     Notification.success("Đã cập nhật thành công");
    // };

    // const handleCompleteStatus = (id) => {
    //     confirmAlert({
    //         title: "CẬP NHẬT TRẠNG THÁI",
    //         message: "Bạn muốn chuyển sang trạng thái HOÀN THÀNH?",
    //         buttons: [
    //             {
    //                 label: "Có",
    //                 onClick: () => handleOnCompleteStatus(id),
    //             },
    //             {
    //                 label: "Không",
    //             }
    //         ],
    //     });
    // };


    // const handleFindProductImportDetail = (name) => {
    //     // dispatch(ProductImportGetById({orderId: name}));
    //     Notification.success(name);
    //     // history.push("/productImport/detail", { productImport: item });
    //     history.push("/productImport/detail", );
    //     Notification.success(name);

    //   };
    return (
        <React.Fragment>
            <div className={classes.header}>
                <Grid
                    container
                    style={{
                        display: "flex",
                    }}
                    className={classes.wrapForm}
                >
                    <Grid
                        item
                        md={3}
                        xl={12}
                        sm={12}

                    >
                        <Typography variant="h6">
                            NHẬP HÀNG
                        </Typography>
                        <Typography className={classes.title}>
                            Quản lý nhập hàng
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        md={9}
                        xl={12}
                        sm={12}
                        style={{

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
                            <Button
              size="small"
              variant="outlined"
              color="primary"
              onClick={onHandleRedirect}
            >
              Thêm phiếu nhập
            </Button>
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


                </Grid>
                
                <div className={classes.orderDetail}>
                    <Card >
                        {listSuccess.length > 0 && (
                            <>
                                <Typography className={classes.titleProductImport} component={'span'}>
                                    <Grid item
                                        md={3}
                                        xl={3}
                                        sm={3} className={classes.titleProductImport2}>
                                        {/* <LocalShippingOutlined />Giao hàng thành công */}
                                    </Grid>

                                    <Grid
                                        item
                                        md={9}
                                        xl={9}
                                        sm={9}
                                        style={{
                                            direction: "row",
                                            display: "flex",
                                            justifyContent: "flex-end",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Select native value={pageSizeSuccess} onChange={handlePageSizeSuccess}>
                                            <option value={3}>3</option>
                                            <option value={5}>5</option>
                                        </Select>
                                    </Grid>
                                </Typography>


                                <TableContainer component={Paper}>
                                    <Table style={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHeader
                                            valueToProductImportBy={valueToProductImportBySuccess}
                                            valueToSortDir={valueToSortDirSuccess}
                                            handleRequestSort={handleRequestSortSuccess}
                                            fields={fields}
                                        />
                                        <TableBody>
                                            {listSuccess.map((productImport) => (
                                                <TableRow key={productImport.id}>
                                                    <TableCell component="th" scope="row" className={classes.wrapped}>
                                                        <BarCode value={productImport.id} />
                                                    </TableCell>
                                                    <TableCell>{moment(productImport.createdAt).format("YYYY-MM-DD")}</TableCell>
                                                    <TableCell>{productImport.totalQuantity}</TableCell>
                                                    <TableCell>{(productImport.totalPrice).toLocaleString("it-IT", {
                                                        style: "currency",
                                                        currency: "VND",
                                                    })}</TableCell>
                                                    <TableCell>{productImport.employeeId}</TableCell>
                                                    <TableCell>{productImport.employeeName}</TableCell>
                                                    
                                                    
                                                    
                                                    <TableCell>
                                                        <Visibility
                                                            style={{
                                                                color: "grey",
                                                                cursor: "pointer",
                                                                marginRight: 10,
                                                            }}
                                                            onClick={() => history.push("/productImport/detail", { productImport: productImport })}
                                                        />

                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <Pagination
                                    style={{ marginTop: 50, marginBottom: 10, marginLeft: 10 }}
                                    color="primary"
                                    shape="rounded"
                                    count={totalPagesSuccess}
                                    page={pageSuccess}
                                    onChange={handlePageSuccess}
                                    showFirstButton
                                    showLastButton
                                />
                            </>
                        )}
                        {listSuccess.length === 0 && (
                            <h1 style={{ paddingLeft: 15, color: "red" }}>Chưa có phiếu nhập</h1>
                        )}
                    </Card>
                </div>
            </div>

        </React.Fragment >
    );
};

export default ProductImport;