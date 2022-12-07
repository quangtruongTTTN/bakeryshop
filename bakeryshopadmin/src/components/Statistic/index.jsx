import {
  Button,
  FormHelperText,
  Grid,
  makeStyles,
  TextField,
  Typography,
  InputLabel,
  CardActionArea,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useHistory } from "react-router-dom";
import Notification from "../../common/Notification";
import moment from "moment";
import { RevenueListReport, YearList, SumRevenue } from '../../store/actions/RevenueAction';
import StatusCard from "../status-card/StatusCard";
import statusCards from "../../assets/JsonData/status-card-data.json";
import RevenueService from "../../services/RevenueService";
import Chart from "react-apexcharts";
import { Link, NavLink } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "hidden",
  },
  formControl: {
    minWidth: 120,
    marginTop: 20,
  },
}));

const Statistic = () => {
  const classes = useStyles();

  const history = useHistory();

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const yearValue = new Date().getFullYear().toString();
  var months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  const monthValue = months[new Date().getMonth().toString()];
  const dayValue = (new Date().getDate()).toString().padStart(2, "0");
  const { promotions } = useSelector((state) => state.promotion);
  const { listRevenue, listYears, sumRevenue } = useSelector((state) => state.revenue);
  const [value1, setValue1] = useState('02-02-2020');
  const [value2, setValue2] = useState('12-12-2022');

  const [product, setProduct] = useState([]);
  const [year, setYear] = useState([]);
  const [countOr, setCountOr] = useState();
  const [total, setTotal] = useState();
  const [countAcc, setCountAcc] = useState();
  const [countPro, setCountPro] = useState();
  const [seri, setSeri] = useState([]);
  const [option, setOption] = useState({});

  useEffect(() => {
    RevenueService.countAccount()
      .then((resp) => setCountAcc(resp.data))
      .catch((error) => console.log(error));

    RevenueService.countProduct()
      .then((resp) => setCountPro(resp.data))
      .catch((error) => console.log(error));
    RevenueService.reportAmountYear()
      .then((resp) => {
        setYear(resp.data);
        const result = resp.data.reduce((price, item) => price + item.total, 0);
        setTotal(result);
      })
      .catch((error) => console.log(error));

    RevenueService.countOrder()
      .then((resp) => setCountOr(resp.data))
      .catch((error) => console.log(error));

    RevenueService.countOrderByName()
      .then((resp) => {
        const x = resp.data.map((item) => item.name);
        setOption({
          labels: x,
        });
        const y = resp.data.map((item) => item.count);
        setSeri(y);
      })
      .catch((error) => console.log(error));

      RevenueService.reportByProduct(1, 8)
      .then((resp) => {
        setProduct(resp.data.content);
      })
      .catch((error) => console.log(error));
  }, []);

  const onSubmit = (data) => {
    const foundName = promotions.some((item) => {
      return item.name === data.name;
    });
    if (data.createdAt > data.endDate) {
      Notification.error("Ngày bắt đầu phải sau ngày kết thúc!");
      return;
    }
    setValue1(moment(data.createdAt).format("DD/MM/YYYY"));
    setValue2(moment(data.endDate).format("DD/MM/YYYY"));
    // Notification.error(moment(data.createdAt).format("DD/MM/YYYY"));
    // return;
    history.push("/revenueReport/detail", { listRevenue: listRevenue, value1: moment(data.createdAt).format("MM-DD-YYYY"), value2: moment(data.endDate).format("MM-DD-YYYY") });

    if (foundName === true) {
      Notification.error("Tên loại sản phẩm đã có");
    } else {
      Notification.success("Test OK!");
      // dispatch(PromotionAddAction(data)).then((res) => {

      //   Notification.success("Đã thêm sản phẩm thành công!");
      // });
    }
  };

  return (
    <div className={classes.root}>
      <div>
        <h2 className="page-header">Thống kê</h2>
        <div className="row">
          <div className="col-7">
            <Grid container spacing={3}>
              <Grid item md={6} sm={6} xs={12}>
                <StatusCard
                  icon={statusCards[0].icon}
                  count={countAcc}
                  title={`Khách hàng`}
                />
              </Grid>
              <Grid item md={6} sm={6} xs={12}>
                <StatusCard
                  icon={statusCards[1].icon}
                  count={countPro}
                  title={`Sản phẩm`}
                />
              </Grid>
              <Grid item md={4} sm={6} xs={12}>
              <StatusCard
                  icon={statusCards[3].icon}
                  count={countOr}
                  title={`Đơn hàng`}
                />
              </Grid>
              <Grid item md={8} sm={6} xs={12}>
              <StatusCard
                  icon={statusCards[2].icon}
                  count={total && total.toLocaleString()}
                  title={`Tổng doanh thu`}
                />
              </Grid>
            </Grid>
            {/* <div className="row container-fluid">
              <div className="col">


                
                
              </div>
            </div> */}
          </div>
          <div className="col-5">
            <div className="card full-height">
              <Chart options={option} series={seri} type="donut" height="100%" />
            </div>
          </div>
        </div>
        
        <div className="card">
            <div className="card__header">
            <h2 className="page-header">Danh thu theo sản phẩm</h2>
            </div>
            <div className="card__body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Mã sản phẩm</th>
                    <th scope="col">Tên sản phẩm</th>
                    <th scope="col">Số lượng bán</th>
                    <th scope="col">Doanh thu</th>
                  </tr>
                </thead>
                <tbody>
                  {product &&
                    product.map((item, index) => (
                      <tr key={index}>
                        <th scope="row">
                          <NavLink to={`/order-product/${item.id}`} exact>
                            {" "}
                            {item.id}
                          </NavLink>
                        </th>
                        <td>{item.name}</td>
                        <td>{item.count}</td>
                        <td>{item.amount.toLocaleString()} đ</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="card__footer">
              <Link to="/report-product">Xem chi tiết</Link>
            </div>
          </div>
          <div className="card">
            <div className="card__header">
            <h2 className="page-header">Doanh thu theo Năm</h2>
    
            </div>
            <div className="card__body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Năm</th>
                    <th scope="col">Số lượng đơn</th>
                    <th scope="col">Doanh thu</th>
                  </tr>
                </thead>
                <tbody>
                  {year &&
                    year.map((item, index) => (
                      <tr key={index}>
                        <th scope="row">
                          <NavLink exact to={`/report-month/${item.year}`}>
                            {index + 1}
                          </NavLink>
                        </th>
                        <td>{item.year}</td>
                        <td>{item.count}</td>
                        <td>{item.total && item.total.toLocaleString()} đ</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="card__footer">
              <NavLink exact to={`/report-month/2022`}>
                Xem chi tiết
              </NavLink>
            </div>
          </div>              
      </div>
    </div>
  );
};

export default Statistic;
