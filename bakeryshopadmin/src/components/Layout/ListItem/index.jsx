import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import BarChartIcon from "@material-ui/icons/BarChart";
import ManageHistoryIcon from "@material-ui/icons/ChangeHistory";
import { ReactComponent as Logo } from "./../../../assets/img/import1.svg";
import { ReactComponent as Return } from "./../../../assets/img/return.svg";
import PeopleIcon from "@material-ui/icons/People";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import { Euro } from "@material-ui/icons";
import CategoryIcon from "@material-ui/icons/Category";
import LoupeIcon from "@material-ui/icons/Loupe";
import LocalDrinkIcon from "@material-ui/icons/LocalDrink";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SvgIcon } from "@material-ui/core";

const ConditionalLink = ({ children, to, condition }) => (!!condition && to)
  ? <Link to={to}>{children}</Link>
  : <>{children}</>;


const MainListItems = () => {
  const auth = useSelector((state) => state.auth);
  const isLoggedIn = JSON.parse(localStorage.getItem('user')).roles.includes("ROLE_ADMIN");
  const isShipper = JSON.parse(localStorage.getItem('user')).roles.includes("ROLE_SHIPPER");
  return (
    <div style={{
      // marginTop: 10,
      overflowY: "scroll",
      height: 500,
    }}>
      {isShipper ? (
        <Link to="/orderOfShipper" style={{ textDecoration: "none", color: "black" }}>
          <ListItem button>
            <ListItemIcon>
              <ShoppingCartIcon style={{ marginLeft: 5 }} />
            </ListItemIcon>
            <ListItemText primary="Đơn hàng" />
          </ListItem>
        </Link>
        
      ) : (
        <>
        <Link to="/dashboard" style={{ textDecoration: "none", color: "black" }}>
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon style={{ marginLeft: 5 }} />
          </ListItemIcon>
          <ListItemText primary="Trang chủ" />
        </ListItem>
      </Link>
      <Link to="/order" style={{ textDecoration: "none", color: "black" }}>
        <ListItem button>
          <ListItemIcon>
            <ShoppingCartIcon style={{ marginLeft: 5 }} />
          </ListItemIcon>
          <ListItemText primary="Đơn hàng" />
        </ListItem>
      </Link>

      <Link to="/productImport" style={{ textDecoration: "none", color: "black" }}>
        <ListItem button>
          <ListItemIcon>
            <SvgIcon style={{ marginLeft: 5, width: "24px", height: "24px" }} >
              <Logo />
            </SvgIcon >
          </ListItemIcon>
          <ListItemText primary="Nhập hàng" />
        </ListItem>
      </Link>
      <Link to="/productReturn" style={{ textDecoration: "none", color: "black" }}>
        <ListItem button>
          <ListItemIcon>
            <SvgIcon style={{ marginLeft: 5, width: "24px", height: "24px" }} >
              <Return />
            </SvgIcon>
          </ListItemIcon>
          <ListItemText primary="Trả hàng" />
        </ListItem>
      </Link>
      <Link to="/statistic" style={{ textDecoration: "none", color: "black" }}>
        <ListItem button>
          <ListItemIcon>
            <BarChartIcon style={{ marginLeft: 5 }} />
          </ListItemIcon>
          <ListItemText primary="Thống kê" />
        </ListItem>
      </Link>
      <Link to="/revenueReport" style={{ textDecoration: "none", color: "black" }}>
        <ListItem button>
          <ListItemIcon>
            <BarChartIcon style={{ marginLeft: 5 }} />
          </ListItemIcon>
          <ListItemText primary="Báo cáo" />
        </ListItem>
      </Link>
      <Link to="/product" style={{ textDecoration: "none", color: "black" }}>
        <ListItem button>
          <ListItemIcon>
            <Euro style={{ marginLeft: 5 }} />
          </ListItemIcon>
          <ListItemText primary="Sản phẩm" />
        </ListItem>
      </Link>
      <Link to="/pricehistory" style={{ textDecoration: "none", color: "black" }}>
        <ListItem button>
          <ListItemIcon>
            <ManageHistoryIcon style={{ marginLeft: 5 }} />
          </ListItemIcon>
          <ListItemText primary="Thay đổi giá" />
        </ListItem>
      </Link>

      <Link to="/category" style={{ textDecoration: "none", color: "black" }}>
        <ListItem button>
          <ListItemIcon>
            <CategoryIcon style={{ marginLeft: 5 }} />
          </ListItemIcon>
          <ListItemText primary="Loại Sản phẩm" />
        </ListItem>
      </Link>
      <Link to="/promotion" style={{ textDecoration: "none", color: "black" }}>
        <ListItem button>
          <ListItemIcon>
            <AttachMoneyIcon style={{ marginLeft: 5 }} />
          </ListItemIcon>
          <ListItemText primary="Khyến mãi" />
        </ListItem>
      </Link> 
      <Link to="/sizeoption" style={{ textDecoration: "none", color: "black" }}>
        <ListItem button>
          <ListItemIcon>
            <LocalDrinkIcon style={{ marginLeft: 5 }} />
          </ListItemIcon>
          <ListItemText primary="Thêm Size" />
        </ListItem>
      </Link>
      <Link to="/user" style={{ textDecoration: "none", color: "black" }}>
        <ListItem button>
          <ListItemIcon>
            <PeopleIcon style={{ marginLeft: 5 }} />
          </ListItemIcon>
          <ListItemText primary="Người dùng" />
        </ListItem>
      </Link>
      {isLoggedIn ? (
        <Link to="/employee" style={{ textDecoration: "none", color: "black" }}>
          <ListItem button>
            <ListItemIcon>
              <PeopleIcon style={{ marginLeft: 5 }} />
            </ListItemIcon>
            <ListItemText primary="Nhân Viên" />
          </ListItem>
        </Link>
      ) : (null)}
      {isLoggedIn ? (
        <Link to="/shipper" style={{ textDecoration: "none", color: "black" }}>
          <ListItem button>
            <ListItemIcon>
              <PeopleIcon style={{ marginLeft: 5 }} />
            </ListItemIcon>
            <ListItemText primary="Shipper" />
          </ListItem>
        </Link>
      ) : (null)}
      {/* <if condition={JSON.parse(localStorage.getItem('user')).roles.includes("ROLE_ADMIN")}>
        <Link to="/employee" style={{ textDecoration: "none", color: "black" }}>
        <ListItem button>
          <ListItemIcon>
            <PeopleIcon style={{ marginLeft: 5 }} />
          </ListItemIcon>
          <ListItemText primary="Nhân Viên" />
        </ListItem>
      </Link>
      </if> */}
      <Link to="/spinner" style={{ textDecoration: "none", color: "black" }}>
        <ListItem>
          <ListItemIcon>
            <CardGiftcardIcon style={{ marginLeft: 5 }} />
          </ListItemIcon>
          <ListItemText primary="Vòng Quay" />
        </ListItem>
      </Link>
        </>
        
      )}
      

      {/* 
      <Link to="/form" style={{ textDecoration: "none", color: "black" }}>
        <ListItem button>
          <ListItemIcon>
            <FormatAlignCenter style={{ marginLeft: 5 }} />
          </ListItemIcon>
          <ListItemText primary="Form" />
        </ListItem>
      </Link>
      <Link to="/table" style={{ textDecoration: "none", color: "black" }}>
        <ListItem button>
          <ListItemIcon>
            <FormatAlignCenter style={{ marginLeft: 5 }} />
          </ListItemIcon>
          <ListItemText primary="Table" />
        </ListItem>
      </Link> */}
    </div>
  );
};

export default MainListItems;
