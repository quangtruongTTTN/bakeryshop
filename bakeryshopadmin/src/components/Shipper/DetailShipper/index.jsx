import {
  Avatar,
  Grid,
  Typography,
  makeStyles,
  List,
  ListItem,
  Divider,
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  Chip,
} from "@material-ui/core";
import React, { useState } from "react";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { ListItemIcon, ListItemText } from "@material-ui/core";
import ChildCareIcon from "@material-ui/icons/ChildCare";
import HomeIcon from "@material-ui/icons/Home";
import PhonelinkRingIcon from "@material-ui/icons/PhonelinkRing";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import DateRangeIcon from "@material-ui/icons/DateRange";
import Moment from "react-moment";
import { Visibility } from "@material-ui/icons";
import BarCode from "react-barcode";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import Report from "./report";
import Logo from "./../../../assets/img/BakeryShop.gif";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: 120,
    height: 120,
    border: "2px solid #000",
  },
  wrapAvatar: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    "& .mark": {
      fontSize: 14,
      color: "red",
    },
  },
  wrapInfo: {
    backgroundColor: theme.palette.background.paper,
  },
  wrapDetails: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
    },
  },
  wrapOrders: {
    width: "100%",
    maxWidth: "100%",
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: 250,

    "& svg": {
      width: 150,
    },
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0,
  },
  listSection: {
    backgroundColor: "inherit",
  },
  table: {
    minWidth: "100%",
  },
}));
// const DetailShipper = () => {
const DetailShipper = () => {
  const classes = useStyles();

  const location = useLocation();
  const [shipper] = useState(location?.state?.shipper);
  const history = useHistory();

  const fields = [
    { label: "Mã Đơn Hàng" },
    { label: "Địa Chỉ" }, 
    { label: "Điện Thoại" },
    { label: "Tổng Tiền" },
    { label: "Hình Thức" },
    { label: "Trạng thái" },
    { label: "Ngày Tạo" },
    { label: "Hành Động" },
  ];

  return (
    <>
      {Object.is(shipper, undefined) && <Redirect to="/shipper" />}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12}>
          <Typography variant="h5">THÔNG TIN NHÂN VIÊN GIAO HÀNG</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Grid container spacing={3} className={classes.wrapDetails}>
            <Grid item md={3}>
              <div className={classes.wrapAvatar}>
                <Avatar
                  src={shipper?.linkImage ?? Logo}
                  alt={shipper?.nameImage ?? "logo"}
                  className={classes.avatar}
                />
                <Typography variant="h6" component="p">
                  {shipper?.fullName}
                </Typography>
                {/* <Typography variant="h6" component="span" className="mark">
                  Điểm: {shipper?.memberVip?.mark ?? "0"}
                </Typography> */}
                <PDFDownloadLink
                  document={<Report shipper={shipper} />}
                  fileName="report"
                >
                  <Avatar
                    style={{
                      cursor: "pointer",
                      backgroundColor: "#FC8400",
                      marginTop: 30,
                    }}
                  >
                    <PictureAsPdfIcon />
                  </Avatar>
                </PDFDownloadLink>
              </div>
            </Grid>
            <Grid item md={9}>
              <div className={classes.wrapInfo}>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <ChildCareIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        (
                          <Moment format="DD/MM/YYYY" date={shipper?.birthday} />
                        ) ?? <Moment format="DD/MM/YYYY" date={new Date()} />
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary={shipper?.address} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <PhonelinkRingIcon />
                    </ListItemIcon>
                    <ListItemText primary={shipper?.phone} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <AlternateEmailIcon />
                    </ListItemIcon>
                    <ListItemText primary={shipper?.email} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <DateRangeIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Moment
                          format="DD/MM/YYYY HH:mm:ss"
                          date={shipper?.createdAt}
                        />
                      }
                    />
                  </ListItem>
                </List>
              </div>
            </Grid>
          </Grid>
        </Grid>
        {/* <Grid item xs={12} sm={12} md={12}>
          <Divider />
          {shipper?.orders?.length > 0 &&
            !Object.is(
              shipper?.orders?.findIndex((o) => !Object.is(o.payment, 0)),
              -1
            ) && <Typography variant="h6">ĐƠN HÀNG</Typography>}
          {shipper?.orders?.length > 0 &&
            !Object.is(
              shipper?.orders?.findIndex((o) => !Object.is(o.payment, 0)),
              -1
            ) && (
              <TableContainer component={Paper} className={classes.wrapOrders}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      {fields.map((field, index) => (
                        <TableCell key={index}>{field.label}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {shipper?.orders.map((order, index) => {
                      return (
                        order.payment !== 0 && (
                          <TableRow key={index}>
                            <TableCell>
                              <BarCode value={order.id} />
                            </TableCell>
                            <TableCell>{order.address}</TableCell>
                            <TableCell>{order.phone}</TableCell>
                            <TableCell>{order.totalPrice}</TableCell>
                            <TableCell>
                              {Object.is(order.payment, 1) ? (
                                <Typography
                                  style={{ color: "black", fontWeight: 600 }}
                                >
                                  Tiền mặt
                                </Typography>
                              ) : Object.is(order.payment, 2) ? (
                                <Typography
                                  style={{ color: "green", fontWeight: 600 }}
                                >
                                  Trực tuyến
                                </Typography>
                              ) : (
                                <Typography
                                  style={{ color: "red", fontWeight: 600 }}
                                >
                                  Lỗi
                                </Typography>
                              )}
                            </TableCell>
                            <TableCell>
                              {Object.is(order.status, 1) ? (
                                <Chip
                                  label="Đang xử lý"
                                  style={{
                                    backgroundColor: "#9500AE",
                                    color: "white",
                                  }}
                                />
                              ) : Object.is(order.status, 2) ? (
                                <Chip
                                  label="Đang giao hàng"
                                  style={{
                                    backgroundColor: "orange",
                                    color: "white",
                                  }}
                                />
                              ) : Object.is(order.status, 3) ? (
                                <Chip
                                  label="Hoàn thành"
                                  style={{
                                    backgroundColor: "green",
                                    color: "white",
                                  }}
                                />
                              ) : (
                                <Chip
                                  label="Đã huỷ"
                                  style={{
                                    backgroundColor: "red",
                                    color: "white",
                                  }}
                                />
                              )}
                            </TableCell>
                            <TableCell>
                              {
                                <Moment
                                  format="DD/MM/YYYY HH:mm:ss"
                                  date={order.createdAt}
                                />
                              }
                            </TableCell>
                            <TableCell>
                              <Visibility
                                style={{
                                  color: "grey",
                                  cursor: "pointer",
                                  marginRight: 10,
                                  position: "relative",
                                  right: 35,
                                }}
                                onClick={() =>
                                  history.push("/order/detail", {
                                    order: { ...order, shipperId: shipper },
                                  })
                                }
                                // onClick={() => console.log({ order: { ...order, shipperId: shipper } })}
                              />
                            </TableCell>
                          </TableRow>
                        )
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
        </Grid> */}
      </Grid>
    </>
  );
};

export default DetailShipper;
// export default DetailUser;

