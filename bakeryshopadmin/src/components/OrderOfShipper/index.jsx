import { Button, TextField, Card, Grid, makeStyles, Tabs, Typography, Tab, Box, withStyles, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Select, Chip } from "@material-ui/core"
import React, { useState, useEffect } from "react"
import { LocalShippingOutlined, DeleteOutline, Visibility, CreateOutlined } from "@material-ui/icons"
import FastfoodIcon from '@material-ui/icons/Fastfood';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useDispatch, useSelector } from "react-redux";
import { OrderListProcess, OrderListSuccess, OrderListFail, OrderGetById } from "../../store/actions/ShipperAction";
import { Pagination } from '@material-ui/lab';
import TableHeader from "../TableHeader";
import moment from "moment";
import { useHistory } from "react-router";
import { confirmAlert } from 'react-confirm-alert';
import Notification from "../../common/Notification";
import { OrderStatusUpdate } from "../../store/actions/OrderAction";
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
    titleOrder: {
        fontSize: 14,
        display: 'flex',
        paddingLeft: 20,
        paddingTop: 5,
        paddingBottom: 5,
        borderBottom: '1px solid #ececec'
    },
    titleOrder1: {
        color: '#e8f803',
    },
    titleOrder2: {
        color: '#3fb4a5',
    },
    titleOrder3: {
        color: '#ff0000',
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

const OrderOfShipper = () => {
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

    const AntTab = withStyles((theme) => ({
        root: {
            textTransform: 'none',
            minWidth: 72,
            fontWeight: theme.typography.fontWeightRegular,
            marginRight: theme.spacing(4),
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
            '&:hover': {
                color: '#0a0a0a',
                opacity: 1,
            },
            '&$selected': {
                color: '#0a0a0a',
                fontWeight: theme.typography.fontWeightMedium,
            },
            '&:focus': {
                color: '#0a0a0a',
            },
        },
        selected: {},
    }))((props) => <Tab disableRipple {...props} />);

    const dispatch = useDispatch();
    const history = useHistory();

    const { listProcess, totalPagesProcess, listSuccess, totalPagesSuccess, listFail, totalPagesFail, getByID } = useSelector((state) => state.shipper);
    const [pageProcess, setPageProcess] = useState(1);
    const [pageSuccess, setPageSuccess] = useState(1);
    const [pageFail, setPageFail] = useState(1);
    const [valueToOrderByProcess, setValueToOrderByProcess] = useState("id");
    const [valueToOrderBySuccess, setValueToOrderBySuccess] = useState("id");
    const [valueToOrderByFail, setValueToOrderByFail] = useState("id");
    const [valueToSortDirProcess, setValueToSortDirProcess] = useState("desc");
    const [valueToSortDirSuccess, setValueToSortDirSuccess] = useState("desc");
    const [valueToSortDirFail, setValueToSortDirFail] = useState("desc");
    const [pageSizeProcess, setPageSizeProcess] = useState(3);
    const [pageSizeSuccess, setPageSizeSuccess] = useState(3);
    const [pageSizeFail, setPageSizeFail] = useState(3);
    const [keyword, setKeyword] = useState("");
    const [order, setOrder] = useState(null);
    const [name, setName] = useState("");
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(
            OrderListProcess({
                page: pageProcess,
                sortField: valueToOrderByProcess,
                sortDir: valueToSortDirProcess,
                pageSize: pageSizeProcess,
                shipperId: auth.user.id,
            })
        );
        dispatch(
            OrderListSuccess({
                page: pageSuccess,
                sortField: valueToOrderBySuccess,
                sortDir: valueToSortDirSuccess,
                pageSize: pageSizeSuccess,
                shipperId: auth.user.id,
            })
        );
        dispatch(
            OrderListFail({
                page: pageFail,
                sortField: valueToOrderByFail,
                sortDir: valueToSortDirFail,
                pageSize: pageSizeFail,
                shipperId: auth.user.id,
            })
        );

        dispatch(OrderGetById(name)).then(
            (res) => res?.data && setOrder(res?.data)
        );
        // dispatch(OrderGetById({orderId: name}));
    }, [dispatch, pageProcess, pageSuccess, pageFail, valueToOrderByProcess, valueToOrderBySuccess, valueToOrderByFail, valueToSortDirProcess, valueToSortDirSuccess, valueToSortDirFail, pageSizeProcess, pageSizeSuccess, pageSizeFail, keyword, name]);
    const handleSearch = (e) => {
        e.preventDefault();
        setKeyword(name);
        // Notification.error(name);

        if (order.order === null) {
            Notification.success("Không tìm thấy đơn hàng");
        } else {
            // Notification.success("Tìm thấy nhưng có bug ");
            // Notification.success(order.order);
            history.push("/order/detail", { order: order.order });
        }
        // dispatch(
        //     OrderGetById(keyword)).then(
        //     (res) => res?.data && setOrder(res?.data)
        // );
        // dispatch(OrderGetById({orderId: "O0882021035829"}));
        // dispatch(
        //     OrderGetById(name)).then(
        //     (res) => res?.data && setOrder(res?.data)
        //   );
        // setOrder(dispatch(OrderGetById({orderId: keyword})));
        // dispatch(OrderGetById({ orderId: "O0882021035829" }));
        // Notification.success(name);
        // Notification.success(order.getByID);
        // Notification.error(order.id);
        // history.push("/order/detail", { order: order });
        // Notification.success();
        // setPage(1);
    };
    const handleRequestSortProcess = (property) => {
        const isAscending =
            Object.is(valueToOrderByProcess, property) && Object.is(valueToSortDirProcess, "asc");
        setValueToOrderByProcess(property);
        setValueToSortDirProcess(isAscending ? "desc" : "asc");
    };

    const handleRequestSortSuccess = (property) => {
        const isAscending =
            Object.is(valueToOrderBySuccess, property) && Object.is(valueToSortDirSuccess, "asc");
        setValueToOrderBySuccess(property);
        setValueToSortDirSuccess(isAscending ? "desc" : "asc");
    };

    const handleRequestSortFail = (property) => {
        const isAscending =
            Object.is(valueToOrderByFail, property) && Object.is(valueToSortDirFail, "asc");
        setValueToOrderByFail(property);
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
        { name: "id", label: "Số Hóa Đơn", dir: "desc" },
        { name: "createdAt", label: "Ngày đặt hàng", dir: "asc" },
        { name: "userId", label: "Khách hàng", dir: "asc" },
        { name: "payment", label: "Thanh toán", dir: "asc" },
        { name: "totalPrice", label: "Tổng tiền", dir: "asc" },
        { label: "Trạng Thái" },
        { label: "Hành Động" },
    ];

    const handleOnDelete = (id) => {
        dispatch(OrderStatusUpdate({ id, status: 4 }));
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

    const handleOnShippingStatus = (id) => {
        dispatch(OrderStatusUpdate({ id, status: 2 }));
        Notification.success("Đã cập nhật thành công");
    };

    const handleShippingStatus = (id) => {
        confirmAlert({
            title: "CẬP NHẬT TRẠNG THÁI",
            message: "Bạn muốn chuyển sang trạng thái GIAO HÀNG?",
            buttons: [
                {
                    label: "Có",
                    onClick: () => handleOnShippingStatus(id),
                },
                {
                    label: "Không",
                }
            ],
        });
    };

    const handleOnCompleteStatus = (id) => {
        dispatch(OrderStatusUpdate({ id, status: 3 }));
        Notification.success("Đã cập nhật thành công");
    };

    const handleCompleteStatus = (id) => {
        confirmAlert({
            title: "CẬP NHẬT TRẠNG THÁI",
            message: "Bạn muốn chuyển sang trạng thái HOÀN THÀNH?",
            buttons: [
                {
                    label: "Có",
                    onClick: () => handleOnCompleteStatus(id),
                },
                {
                    label: "Không",
                }
            ],
        });
    };


    // const handleFindOrderDetail = (name) => {
    //     // dispatch(OrderGetById({orderId: name}));
    //     Notification.success(name);
    //     // history.push("/order/detail", { order: item });
    //     history.push("/order/detail", );
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
                            ĐƠN HÀNG
                        </Typography>
                        <Typography className={classes.title}>
                            Quản lý các đơn hàng
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
                {/* <Typography variant="h6">
                    ĐƠN HÀNG
                </Typography>
                <Typography className={classes.title}>
                    Quản lý các đơn hàng
                </Typography> */}
            </div>
            {/* <Grid
                container
                style={{
                    display: "flex",
                }}
                className={classes.wrapForm}
            >
                <Grid
                    item
                    md={12}
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


            </Grid> */}
            {/* <form
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
            </form> */}
            <AntTabs
                value={valueTab}
                onChange={handleChange}
                aria-label="scrollable auto tabs"
                centered={true}
            >
                <AntTab label="Đang xử lý" {...a11yProps(0)} />
                <AntTab label="Hoàn thành" {...a11yProps(1)} />
                <AntTab label="Đã hủy" {...a11yProps(2)} />
            </AntTabs>
            <TabPanel value={valueTab} index={0}>
                <div className={classes.orderDetail}>
                    <Card >
                        {listProcess.length > 0 && (
                            <>
                                <Typography className={classes.titleOrder} component={'span'}>
                                    <Grid item
                                        md={3}
                                        xl={3}
                                        sm={3} className={classes.titleOrder1}>
                                        <FastfoodIcon />Đang xử lý
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
                                        <Select native value={pageSizeProcess} onChange={handlePageSizeProcess}>
                                            <option value={3}>3</option>
                                            <option value={5}>5</option>
                                        </Select>
                                    </Grid>
                                </Typography>


                                <TableContainer component={Paper}>
                                    <Table style={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHeader
                                            valueToOrderBy={valueToOrderByProcess}
                                            valueToSortDir={valueToSortDirProcess}
                                            handleRequestSort={handleRequestSortProcess}
                                            fields={fields}
                                        />
                                        <TableBody>
                                            {listProcess.map((order) => (
                                                <TableRow key={order.id}>
                                                    <TableCell component="th" scope="row" className={classes.wrapped}>
                                                        <BarCode value={order.id} className={classes.barCode} />
                                                    </TableCell>
                                                    <TableCell>{moment(order.createdAt).format("YYYY-MM-DD")}</TableCell>
                                                    <TableCell>{order.userId.fullName}</TableCell>
                                                    <TableCell>
                                                        {order.payment === 1 && (
                                                            <Typography
                                                                style={{ color: "black", fontWeight: 600 }}
                                                            >
                                                                Tiền mặt
                                                            </Typography>
                                                        )}
                                                        {order.payment === 2 && (
                                                            <Typography
                                                                style={{ color: "green", fontWeight: 600 }}
                                                            >
                                                                Trực tuyến
                                                            </Typography>
                                                        )}
                                                    </TableCell>
                                                    <TableCell>{(order.totalPrice).toLocaleString("it-IT", {
                                                        style: "currency",
                                                        currency: "VND",
                                                    })}</TableCell>
                                                    <TableCell>
                                                        {order.status === 1 &&
                                                            (
                                                                <Chip
                                                                    label="Đang xử lý"
                                                                    style={{ backgroundColor: "pearl", color: "white" }}
                                                                />
                                                            )}
                                                        {order.status === 2 &&
                                                            (
                                                                <Chip
                                                                    label="Đang giao hàng"
                                                                    style={{ backgroundColor: "lightblue", color: "white" }}
                                                                />
                                                            )}
                                                        {order.status === 5 &&
                                                            (
                                                                <Chip
                                                                    label="Chờ lấy hàng"
                                                                    style={{ backgroundColor: "lightskyblue", color: "white" }}
                                                                />
                                                            )}    
                                                    </TableCell>
                                                    <TableCell>
                                                        <Visibility
                                                            style={{
                                                                color: "grey",
                                                                cursor: "pointer",
                                                                marginRight: 10,
                                                            }}
                                                            onClick={() => history.push("/order/detail", { order: order })}
                                                        />
                                                        {order.status === 1 && (
                                                            <CreateOutlined
                                                                style={{
                                                                    color: "#3f51b5",
                                                                    cursor: "pointer",
                                                                    marginRight: 10,
                                                                }}
                                                                onClick={() => handleShippingStatus(order.id)}
                                                            />
                                                        )}
                                                        {order.status === 2 && (
                                                            <CreateOutlined
                                                                style={{
                                                                    color: "#3f51b5",
                                                                    cursor: "pointer",
                                                                    marginRight: 10,
                                                                }}
                                                                onClick={() => handleCompleteStatus(order.id)}
                                                            />
                                                        )}
                                                        {order.status === 1 && order.payment === 1 && (
                                                            <DeleteOutline
                                                                style={{ color: "red", cursor: "pointer" }}
                                                                onClick={() => handleDelete(order.id)}
                                                            />
                                                        )}
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
                                    count={totalPagesProcess}
                                    page={pageProcess}
                                    onChange={handlePageProcess}
                                    showFirstButton
                                    showLastButton
                                />
                            </>
                        )}
                        {listProcess.length === 0 && (
                            <h1 style={{ paddingLeft: 15, color: "red" }}>Chưa có đơn hàng nào đang xử lý</h1>
                        )}
                    </Card>
                </div>
            </TabPanel>
            <TabPanel value={valueTab} index={1} >
                <div className={classes.orderDetail}>
                    <Card >
                        {listSuccess.length > 0 && (
                            <>
                                <Typography className={classes.titleOrder} component={'span'}>
                                    <Grid item
                                        md={3}
                                        xl={3}
                                        sm={3} className={classes.titleOrder2}>
                                        <LocalShippingOutlined />Giao hàng thành công
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
                                            valueToOrderBy={valueToOrderBySuccess}
                                            valueToSortDir={valueToSortDirSuccess}
                                            handleRequestSort={handleRequestSortSuccess}
                                            fields={fields}
                                        />
                                        <TableBody>
                                            {listSuccess.map((order) => (
                                                <TableRow key={order.id}>
                                                    <TableCell component="th" scope="row" className={classes.wrapped}>
                                                        <BarCode value={order.id} />
                                                    </TableCell>
                                                    <TableCell>{moment(order.createdAt).format("YYYY-MM-DD")}</TableCell>
                                                    <TableCell>{order.userId.fullName}</TableCell>
                                                    <TableCell>
                                                        {order.payment === 1 && (
                                                            <Typography
                                                                style={{ color: "black", fontWeight: 600 }}
                                                            >
                                                                Tiền mặt
                                                            </Typography>
                                                        )}
                                                        {order.payment === 2 && (
                                                            <Typography
                                                                style={{ color: "green", fontWeight: 600 }}
                                                            >
                                                                Trực tuyến
                                                            </Typography>
                                                        )}
                                                    </TableCell>
                                                    <TableCell>{(order.totalPrice).toLocaleString("it-IT", {
                                                        style: "currency",
                                                        currency: "VND",
                                                    })}</TableCell>
                                                    <TableCell>
                                                        {order.status === 3 &&
                                                            (
                                                                <Chip
                                                                    label="Hoàn thành"
                                                                    style={{ backgroundColor: "green", color: "white" }}
                                                                />
                                                            )}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Visibility
                                                            style={{
                                                                color: "grey",
                                                                cursor: "pointer",
                                                                marginRight: 10,
                                                            }}
                                                            onClick={() => history.push("/order/detail", { order: order })}
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
                            <h1 style={{ paddingLeft: 15, color: "red" }}>Chưa có đơn hàng nào hoàn thành</h1>
                        )}
                    </Card>
                </div>
            </TabPanel>
            <TabPanel value={valueTab} index={2}>
                <div className={classes.orderDetail}>
                    <Card >
                        {listFail.length > 0 && (
                            <>
                                <Typography className={classes.titleOrder} component={'span'}>
                                    <Grid item
                                        md={3}
                                        xl={3}
                                        sm={3} className={classes.titleOrder3}>
                                        <DeleteForeverIcon />Đơn hàng đã hủy
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
                                        <Select native value={pageSizeFail} onChange={handlePageSizeFail}>
                                            <option value={3}>3</option>
                                            <option value={5}>5</option>
                                        </Select>
                                    </Grid>
                                </Typography>


                                <TableContainer component={Paper}>
                                    <Table style={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHeader
                                            valueToOrderBy={valueToOrderByFail}
                                            valueToSortDir={valueToSortDirFail}
                                            handleRequestSort={handleRequestSortFail}
                                            fields={fields}
                                        />
                                        <TableBody>
                                            {listFail.map((order) => (
                                                <TableRow key={order.id}>
                                                    <TableCell component="th" scope="row" className={classes.wrapped}>
                                                        <BarCode value={order.id} />
                                                    </TableCell>
                                                    <TableCell>{moment(order.createdAt).format("YYYY-MM-DD")}</TableCell>
                                                    <TableCell>{order.userId.fullName}</TableCell>
                                                    <TableCell>
                                                        {order.payment === 1 && (
                                                            <Typography
                                                                style={{ color: "black", fontWeight: 600 }}
                                                            >
                                                                Tiền mặt
                                                            </Typography>
                                                        )}
                                                        {order.payment === 2 && (
                                                            <Typography
                                                                style={{ color: "green", fontWeight: 600 }}
                                                            >
                                                                Trực tuyến
                                                            </Typography>
                                                        )}
                                                    </TableCell>
                                                    <TableCell>{(order.totalPrice).toLocaleString("it-IT", {
                                                        style: "currency",
                                                        currency: "VND",
                                                    })}</TableCell>
                                                    <TableCell>
                                                        {order.status === 4 && (
                                                            <Chip
                                                                label="Đã hủy"
                                                                style={{ backgroundColor: "red", color: "white" }}
                                                            />
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Visibility
                                                            style={{
                                                                color: "grey",
                                                                cursor: "pointer",
                                                                marginRight: 10,
                                                            }}
                                                            onClick={() => history.push("/order/detail", { order: order })}
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
                                    count={totalPagesFail}
                                    page={pageFail}
                                    onChange={handlePageFail}
                                    showFirstButton
                                    showLastButton
                                />
                            </>
                        )}
                        {listFail.length === 0 && (
                            <h1 style={{ paddingLeft: 15, color: "red" }}>Chưa có đơn hàng nào đã hủy</h1>
                        )}
                    </Card>
                </div>
            </TabPanel>
        </React.Fragment >
    );
};

export default OrderOfShipper;