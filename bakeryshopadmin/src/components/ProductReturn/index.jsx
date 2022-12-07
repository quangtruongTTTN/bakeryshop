import { Button, TextField, Card, Grid, makeStyles, Tabs, Typography, FormControl, Tab, Avatar, Box, withStyles, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Select, Chip, Dialog, DialogContent } from "@material-ui/core"
import React, { useState, useEffect } from "react"
import { LocalShippingOutlined, DeleteOutline, Visibility, CreateOutlined, Replay } from "@material-ui/icons"
import FastfoodIcon from '@material-ui/icons/Fastfood';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useDispatch, useSelector } from "react-redux";
import { ProductReturnListSuccess, ProductReturnGetById } from "../../store/actions/ProductReturnAction";
import { Pagination } from '@material-ui/lab';
import TableHeader from "../TableHeader";
import moment from "moment";
import { useHistory } from "react-router";
import { confirmAlert } from 'react-confirm-alert';
import Notification from "../../common/Notification";
import { UserGetAll, UserStatusAction } from "../../store/actions/UserAction";
// import { ProductReturnStatusUpdate } from "../../store/actions/ProductReturnAction";
import BarCode from "react-barcode";
import Logo from "../../assets/img/BakeryShop.gif";
// import { DeleteOutline, Visibility } from "@material-ui/icons";
import {
    USER_ALERT_MESSAGE,
    USER_ALERT_TITLE,
    USER_NOTIFICATION_WARN,
} from "../../common/Constant";
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
    titleProductReturn: {
        fontSize: 14,
        display: 'flex',
        paddingLeft: 20,
        paddingTop: 5,
        paddingBottom: 5,
        borderBottom: '1px solid #ececec'
    },
    titleProductReturn1: {
        color: '#e8f803',
    },
    titleProductReturn2: {
        color: '#3fb4a5',
    },
    titleProductReturn3: {
        color: '#ff0000',
    },
    contentProductReturn: {
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
    hover: {
        "&:hover": {
            //   backgroundColor: "white !important",
            // backgroundColor: "#e7deb5",
            backgroundColor: "#F5F5F5",
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

const ProductReturn = () => {
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
    const { listSuccess, totalPagesSuccess } = useSelector((state) => state.productReturn);
    // const [listSuccess] = useSelector((state) => state.productReturn);
    const [pageProcess, setPageProcess] = useState(1);
    const [pageSuccess, setPageSuccess] = useState(1);
    const [pageFail, setPageFail] = useState(1);
    const [valueToProductReturnByProcess, setValueToProductReturnByProcess] = useState("id");
    const [valueToProductReturnBySuccess, setValueToProductReturnBySuccess] = useState("id");
    const [valueToProductReturnByFail, setValueToProductReturnByFail] = useState("id");
    const [valueToSortDirProcess, setValueToSortDirProcess] = useState("desc");
    const [valueToSortDirSuccess, setValueToSortDirSuccess] = useState("desc");
    const [valueToSortDirFail, setValueToSortDirFail] = useState("desc");
    const [pageSizeProcess, setPageSizeProcess] = useState(3);
    const [pageSizeSuccess, setPageSizeSuccess] = useState(3);
    const [pageSizeFail, setPageSizeFail] = useState(3);
    const [keyword, setKeyword] = useState("");
    const [productReturn, setProductReturn] = useState(null);
    const [name, setName] = useState("");
    const [page, setPage] = useState(1);
    const [valueToOrderBy, setValueToOrderBy] = useState("id");
    const [valueToSortDir, setValueToSortDir] = useState("asc");
    const [keywordU, setKeywordU] = useState("");
    const [nameU, setNameU] = useState("");
    const [pageSize, setPageSize] = useState(3);
    const [open, setOpen] = useState(false);
    const [invoiceOpen, setInvoiceOpen] = useState(false);
    const onHandleRedirect = () => {
        history.push("/productReturn/add");
    };
    const handleClickOpen = () => {
        setOpen(true);
    }

    // const handleShowInvoice = (u) => {
    //     history.push("/productReturn/add", { user: u } );
    //     // setInvoiceOpen(true);
    // }
    useEffect(() => {

        dispatch(
            ProductReturnListSuccess({
                page: pageSuccess,
                sortField: valueToProductReturnBySuccess,
                sortDir: valueToSortDirSuccess,
                pageSize: pageSizeSuccess,
                keyword,
            })
        );

        // dispatch(ProductReturnGetById(name)).then(
        //     (res) => res?.data && setProductReturn(res?.data)
        // );
        // dispatch(ProductReturnGetById({orderId: name}));
    }, [dispatch, pageSuccess, valueToProductReturnByProcess, valueToProductReturnBySuccess, valueToSortDirSuccess, pageSizeSuccess, keyword, name]);
    useEffect(() => {
        dispatch(
            UserGetAll({
                page,
                sortField: valueToOrderBy,
                sortDir: valueToSortDir,
                keyword: keywordU ,
                pageSize,
            })
        );
    }, [dispatch, page, valueToOrderBy, valueToSortDir, keywordU, pageSize]);
    const { users, totalPages } = useSelector((state) => state.user);
    const handleSearch = (e) => {
        e.preventDefault();
        setKeyword(name);
        // Notification.error(name);

        // if (productReturn.productReturn === null) {
        //     Notification.success("Không tìm thấy phiếu trả");
        // } else {
        //     // Notification.success("Tìm thấy nhưng có bug ");
        //     // Notification.success(productReturn.productReturn);
        //     history.push("/productReturn/detail", { productReturn: productReturn.productReturn });
        // }

        // dispatch(
        //     ProductReturnGetById(keyword)).then(
        //     (res) => res?.data && setProductReturn(res?.data)
        // );
        // dispatch(ProductReturnGetById({orderId: "O0882021035829"}));
        // dispatch(
        //     ProductReturnGetById(name)).then(
        //     (res) => res?.data && setProductReturn(res?.data)
        //   );
        // setProductReturn(dispatch(ProductReturnGetById({orderId: keyword})));
        // dispatch(ProductReturnGetById({ orderId: "O0882021035829" }));
        // Notification.success(name);
        // Notification.success(productReturn.getByID);
        // Notification.error(productReturn.id);
        // history.push("/productReturn/detail", { productReturn: productReturn });
        // Notification.success();
        // setPage(1);
    };
    const handleSearchUser = (e) => {
        e.preventDefault();
        setKeywordU(nameU);
        // setPage(1);
    };
    const handleRequestSortProcess = (property) => {
        const isAscending =
            Object.is(valueToProductReturnByProcess, property) && Object.is(valueToSortDirProcess, "asc");
        setValueToProductReturnByProcess(property);
        setValueToSortDirProcess(isAscending ? "desc" : "asc");
    };

    const handleRequestSortSuccess = (property) => {
        const isAscending =
            Object.is(valueToProductReturnBySuccess, property) && Object.is(valueToSortDirSuccess, "asc");
        setValueToProductReturnBySuccess(property);
        setValueToSortDirSuccess(isAscending ? "desc" : "asc");
    };

    const handleRequestSortFail = (property) => {
        const isAscending =
            Object.is(valueToProductReturnByFail, property) && Object.is(valueToSortDirFail, "asc");
        setValueToProductReturnByFail(property);
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
    const handleClose = () => {
        setOpen(false);
    };
    //   const handleSearch = (e) => {
    //     e.preventDefault();
    //     setKeyword(name);
    //     setPage(1);
    //   };

    const handlePage = (event, value) => {
        setPage(value);
    };

    const handlePageSize = (e) => {
        setPageSize(e.target.value);
        setPage(1);
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
    const handleRequestSort = (property) => {
        const isAscending =
            Object.is(valueToOrderBy, property) && Object.is(valueToSortDir, "asc");
        setValueToOrderBy(property);
        setValueToSortDir(isAscending ? "desc" : "asc");
    };
    const fields = [
        { name: "id", label: "Mã Số Phiếu Trả", dir: "desc" },
        // { name: "productId", label: "Mã Số Sản phẩm", dir: "desc" },
        { name: "createdAt", label: "Ngày tạo", dir: "asc" },
        { name: "totalQuantity", label: "Tổng số lượng trả", dir: "asc" },
        // { name: "totalPrice", label: "Tổng giá nhập", dir: "asc" },
        { name: "employeeId", label: "Mã nhân viên tạo", dir: "asc" },
        { name: "employeeName", label: "Họ và tên nhân viên tạo", dir: "asc" },
        // { label: "Trạng Thái" },
        { label: "Hành Động" },
    ];
    const fieldsU = [
        { label: "Hình Ảnh" },
        { name: "username", label: "Tài Khoản", dir: "asc" },
        { name: "fullName", label: "Họ & Tên", dir: "asc" },
        { name: "phone", label: "Số Điện Thoại", dir: "asc" },
        { name: "email", label: "Email", dir: "asc" },
        { label: "Trạng Thái" },
        // { label: "Hành Động" },
    ];

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
                            TRẢ HÀNG
                        </Typography>
                        <Typography className={classes.title}>
                            Quản lý Trả hàng
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
                                onClick={handleClickOpen}
                            >
                                Thêm phiếu trả
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
                                <Typography className={classes.titleProductReturn} component={'span'}>
                                    <Grid item
                                        md={3}
                                        xl={3}
                                        sm={3} className={classes.titleProductReturn2}>
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
                                            valueToProductReturnBy={valueToProductReturnBySuccess}
                                            valueToSortDir={valueToSortDirSuccess}
                                            handleRequestSort={handleRequestSortSuccess}
                                            fields={fields}
                                        />
                                        <TableBody>
                                            {listSuccess.map((productReturn) => (
                                                <TableRow key={productReturn.id}>
                                                    <TableCell component="th" scope="row" className={classes.wrapped}>
                                                        <BarCode value={productReturn.id} />
                                                    </TableCell>
                                                    <TableCell>{moment(productReturn.createdAt).format("YYYY-MM-DD")}</TableCell>
                                                    <TableCell>{productReturn.totalQuantity}</TableCell>
                                                    {/* <TableCell>{(productReturn.totalPrice).toLocaleString("it-IT", {
                                                        style: "currency",
                                                        currency: "VND",
                                                    })}</TableCell> */}
                                                    <TableCell>{productReturn.employeeId}</TableCell>
                                                    <TableCell>{productReturn.employeeName}</TableCell>



                                                    <TableCell>
                                                        <Visibility
                                                            style={{
                                                                color: "grey",
                                                                cursor: "pointer",
                                                                marginRight: 10,
                                                            }}
                                                            onClick={() => history.push("/productReturn/detail", { productReturn: productReturn })}
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
                            <h1 style={{ paddingLeft: 15, color: "red" }}>Chưa có phiếu trả</h1>
                        )}
                    </Card>
                </div>
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
                        <DialogContent className={classes.descriptionCard}>
                            <Typography component="h1" variant="h4" align="center">
                                Chọn khách Hàng cần trả hàng
                            </Typography>
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
                                        md={10}
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
                                            onSubmit={handleSearchUser}
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
                                                onChange={(e) => setNameU(e.target.value)}
                                                className={classes.searchField}
                                            />
                                            <Button
                                                className={classes.btnSearch}
                                                // type="submit"
                                                onClick={handleSearchUser}
                                                variant="contained"
                                                color="primary"
                                            >
                                                Tìm Kiếm
                                            </Button>
                                        </form>
                                    </Grid>

                                    <Grid
                                        item
                                        md={2}
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
                                                marginTop: 16,
                                                marginLeft: 10,
                                                display: "flex",
                                                width: "100%",
                                                justifyContent: "space-between",
                                                flexDirection: "row",
                                            }}
                                        >
                                            {/* <PDFDownloadLink
              document={<Report users={users} />}
              fileName="report"
            >
              <Avatar style={{ cursor: "pointer", backgroundColor: "#FC8400" }}>
                <PictureAsPdfIcon />
              </Avatar>
            </PDFDownloadLink> */}
                                            <Select native value={pageSize} onChange={handlePageSize}>
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
                                            fields={fieldsU}
                                        />
                                        <TableBody>
                                            {users.map((u) => (
                                                <TableRow key={u.id} className={classes.hover} onClick={() => history.push("/productReturn/add", { user: u })}>
                                                    <TableCell component="th" scope="row">
                                                        <Avatar src={u.linkImage ?? Logo} />
                                                    </TableCell>
                                                    <TableCell>{u.username}</TableCell>
                                                    <TableCell>{u.fullName}</TableCell>
                                                    <TableCell>{u.phone}</TableCell>
                                                    <TableCell>{u.email}</TableCell>
                                                    <TableCell>
                                                        {u.deletedAt ? (
                                                            <Chip
                                                                label="Vi phạm"
                                                                style={{ backgroundColor: "red", color: "white" }}
                                                            />
                                                        ) : (
                                                            <Chip
                                                                label="Hoạt động"
                                                                style={{ backgroundColor: "green", color: "white" }}
                                                            />
                                                        )}
                                                    </TableCell>
                                                    
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <Pagination
                                    style={{ marginTop: 50 }}
                                    color="primary"
                                    shape="rounded"
                                    count={totalPages}
                                    page={page}
                                    onChange={handlePage}
                                    showFirstButton
                                    showLastButton
                                />
                            </div>
                            
                        </DialogContent>
                    </form>
                </Dialog>
            </div>

        </React.Fragment >
    );
};

export default ProductReturn;