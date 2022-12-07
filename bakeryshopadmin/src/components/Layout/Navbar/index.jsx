import NotificationsIcon from "@material-ui/icons/Notifications";
import MenuIcon from "@material-ui/icons/Menu";
import Badge from "@material-ui/core/Badge";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {
  Avatar,
  IconButton,
  makeStyles,
  MenuItem,
  Typography,
  Menu,
  MenuList,
  Button,
} from "@material-ui/core";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MainListItems from "../ListItem";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import Drawer from "@material-ui/core/Drawer";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import { AuthLogoutAction } from "../../../store/actions/AuthAction";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import Logo from "./../../../assets/img/BakeryShop.gif";
import { Client } from "@stomp/stompjs";
import { RatingListAction } from "../../../store/actions/RatingAction";
// import { loadNotification, readNotification, pushNotification } from "../../../services/NotificationService";
import NotificationService from "../../../services/NotificationService";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { toast } from "react-toastify";
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
const SOCKET_URL = "ws://localhost:8080/ws/message";
const Navbar = () => {
  const auth = useSelector((state) => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();
  const [anchorElLogout, setAnchorElLogout] = useState(null);
  const [data, setData] = useState();
  const [notifications, setNotifications] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const loadData = async () => {
    await NotificationService.loadNotification()
      .then((resp) => setNotifications(resp.data))
      .catch((error) => console.log(error));

    //   await NotificationService.pushNotification()
    // .then((resp) => {
    //     resp.data.map((item) => (
    //      item.type == 1 ? toast.success(item.content) : toast.warning(item.content)
    //     ))
    // })
    // .catch((error) => console.log(error));
  };
  useEffect(() => {
    dispatch(RatingListAction())

  }, [dispatch])
  useEffect(() => {
    window.setInterval(loadData, 1000);
  }, []);
  useEffect(() => {
    let onConnected = () => {
      console.log("Connected!!");
      client.subscribe("/message", function (msg) {
        // console.log(msg);
        if (msg.body) {
          var jsonBody = JSON.parse(msg.body);
          // console.log(jsonBody);
          setData(jsonBody);
        }
      });
    };

    let onDisconnected = () => {
      console.log("Disconnected!");
    };

    const client = new Client({
      brokerURL: SOCKET_URL,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: onConnected,
      onDisconnect: onDisconnected,
    });

    client.activate();
  }, []);

  function handleClickLogout(event) {
    if (anchorElLogout !== event.currentTarget) {
      setAnchorElLogout(event.currentTarget);
    }
  }

  function handleCloseLogout() {
    setAnchorElLogout(null);
  }
  function handleClose() {
    setAnchorEl(null);
  }
  const drawerWidth = 240;

  const useStyles = makeStyles((theme) => ({
    hover: {
      "&:hover": {
          //   backgroundColor: "white !important",
          backgroundColor: "#e7deb5",
      },
  },
    root: {
      display: "flex",
    },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
      background: "#020202",
    },
    // btnSearch: {
    background: "#020202",
    //   background: "#020202",
    // },
    toolbarIcon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "0 8px",
      ...theme.mixins.toolbar,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    textTest: {
      backgroundColor: "#FFF2EE",
      color: "red"
    },

    
    menuButtonHidden: {
      display: "none",
    },
    title: {
      flexGrow: 1,
    },
    drawerPaper: {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    },
  }));

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const onHandleLogout = () => {
    dispatch(AuthLogoutAction());
    history.push("/login");
  };

  const onHandleInfo = () => {
    // dispatch(AuthLogoutAction());
    history.push("/accountInfo");
  };

  function handleClick(event) {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  }
  const renderNotificationItem = (item, index) => (
    <MenuItem to={item.type == 3 ? `/product-detail/${item.product.id}` : `/search/${item.order.id}`} exact key={index} onClick={() => readHandler(item.id)}>
      <div className="notification-item" >
        <i className="bx bx-package"></i>
        <span className={item.type === 1 ? "text-primary" : "text-danger"}>{item.content}</span>
      </div>
    </MenuItem>
  );
  const readHandler = (id) => {
    NotificationService.readNotification(id)
      .then(() => console.log(id))
      .catch((error) => console.log(error));
  }
  const handleSearch = (order) => {

    // Notification.error(name);
    if (order === null) {
      // Notification.success("Không tìm thấy đơn hàng");
      return;
    } else {
      // Notification.success("Tìm thấy nhưng có bug ");
      // Notification.success(order.order);
      history.push("/order/detail", { order: order });
    }

  };

  return (
    <>
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            BAKERYSHOP
          </Typography>
          <IconButton color="inherit">
            {/* <Badge badgeContent={data?.length ?? 0} color="secondary"> */}
            <Badge badgeContent={notifications.length} color="secondary"
            // renderItems={(item, index) => renderNotificationItem(item, index)}
            >

              <NotificationsIcon
                // style={{ color: "#ff9902" }}
                aria-owns={anchorEl ? "simple-menu" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              // onMouseOver={handleClick}
              />
            </Badge>
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            // MenuListProps={{ onMouseLeave: handleClose }}
            style={{ marginTop: 25, marginLeft: -100, width: "350", maxWidth: "10" }}
            badge={notifications.length}
            contentData={notifications}
          // renderItems={(item, index) => renderNotificationItem(item, index)}
          >
            <MenuItem
              style={{
                paddingLeft: 100,
                paddingRight: 100,
                color: "#ff9902",
                backgroundColor: "transparent",

              }}
              icon="bx bx-bell"

            />
            {notifications?.length > 0 && auth.user !== null ? (
              <MenuList style={{ overflowY: "scroll", height: 300, maxWidth: 400, maxLines: 3 }}>
                {notifications?.map((item) => (
                  <MenuItem
                    style={{
                      display: "flex",
                      // backgroundColor: "transparent",
                      paddingLeft: 20,
                      paddingRight: 20,
                      height: 60,
                      
                    }}
                    className={classes.hover, item.read === false ? ((classes.textTest)) : "text-danger"}
                    key={item.id}
                    onClick={() => { handleSearch(item?.order); readHandler(item.id);  handleClose() } }
                  // onClick={e => {e.preventDefault(); handleSearch(item?.order)}}
                  >
                    <ShoppingCartIcon />
                    <div className="notification-item" >
                      {/* <i className="bx bx-package">className={classes.hover}</i> */}
                      {item.read === 1 ? (<span  >{item.content}</span>)
                      :(<span >{item.content}</span>)}
                      
                    </div>
                    {/* <img
                      alt={1233}
                      src={"http://res.cloudinary.com/ptithcmn18dccn237/image/upload/v1668221038/image/keflfbgn9tstr2em4ms0.jpg"}
                      width={50}
                    /> */}

                  </MenuItem>
                ))}
                <MenuItem
                style={{
                  display: "flex",
                  justifyContent: "center",
                  color: "inherit",
                  backgroundColor: "transparent",
                }}
              >
                Xem tất cả
              </MenuItem>
                {/* <Button
                variant="outlined"
                size="small"
                style={{ color: "inherit" ,alignContent: "center"}}
                alignItems= "center"
              >
                Xem chi tiết
              </Button> */}
              </MenuList>
            ) : (
              <MenuItem
                style={{
                  display: "flex",
                  justifyContent: "center",
                  color: "red",
                  backgroundColor: "transparent",
                }}
              >
                Không có sản phẩm nào
              </MenuItem>
            )}
            {/* <MenuItem
              style={{
                paddingLeft: 100,
                paddingRight: 100,
                color: "#ff9902",
                backgroundColor: "transparent",
              }}
              icon="bx bx-bell"

            />
            <MenuItem
              style={{
                paddingLeft: 100,
                paddingRight: 100,
                color: "#ff9902",
                backgroundColor: "transparent",
              }}
              icon="bx bx-bell"

            /> */}
            {/* <MenuItem
              style={{
                paddingLeft: 100,
                paddingRight: 100,
                color: "#ff9902",
                backgroundColor: "transparent",
              }}
            >
              Giỏ hàng của bạn
            </MenuItem>
            
              <MenuItem
                style={{
                  display: "flex",
                  justifyContent: "center",
                  color: "red",
                  backgroundColor: "transparent",
                }}
              >
                Không có sản phẩm nào
              </MenuItem> */}

          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <MainListItems />
          {open ? (
            <>
              <div
                style={{
                  display: "flex",
                  position: "fixed",
                  bottom: 0,
                  paddingTop: 10,
                  paddingLeft: 10,
                  paddingBottom: 10,
                  cursor: "pointer",
                }}
                onClick={handleClickLogout}
              >
                <Avatar alt="Avatar Admin" src={Logo} />
                <Typography style={{ marginLeft: 20, marginTop: 10 }}>
                  {auth.user.fullName}
                </Typography>
                <ExpandLessIcon style={{ marginTop: 10, marginLeft: 10 }} />
              </div>
              <Menu
                id="simple-menu"
                anchorEl={anchorElLogout}
                open={Boolean(anchorElLogout)}
                onClose={handleCloseLogout}
                MenuListProps={{ onMouseLeave: handleCloseLogout }}
                style={{ marginTop: -40, marginLeft: 150 }}
              >
                <MenuItem
                  onClick={onHandleInfo}
                  style={{ backgroundColor: "white" }}
                >
                  <Typography>Thông tin cá nhân</Typography>
                </MenuItem>
                <MenuItem
                  onClick={onHandleLogout}
                  style={{ backgroundColor: "white" }}
                >
                  <Typography>Đăng xuất</Typography>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Avatar
              alt="Avatar Admin"
              src={Logo}
              style={{
                position: "fixed",
                bottom: 0,
                marginLeft: 14,
                marginBottom: 10,
              }}
            />
          )}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
