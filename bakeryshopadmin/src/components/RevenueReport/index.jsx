import {
  Button,
  FormHelperText,
  Grid,
  makeStyles,
  TextField,
  Typography,
  InputLabel,
  CardActionArea,
  MenuItem,
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
import RevenueService from "./../../services/RevenueService";
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

const RevenueReport = () => {
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
  const [typeReport, setTypeReport] = useState(0);
  const labelReport = [
    {
      value: 0,
      label: "Theo Tháng",
    },
    {
      value: 1,
      label: "Theo Năm",
    },
    {
      value: 2,
      label: "Theo Ngày",
    },
    {
      value: 3,
      label: "Theo Quý",
    },
  ];
  const handleChangeTypeReport = (event) => {
    setTypeReport(event.target.value);
    // setPage(1);
    Notification.error(event.target.value);
  };
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
    setValue1(moment(data.createdAt1).format("DD/MM/YYYY"));
    setValue2(moment(data.endDate1).format("DD/MM/YYYY"));
    // Notification.error(moment(data.createdAt).format("DD/MM/YYYY"));
    // return;
    history.push("/revenueReport/detail", { listRevenue: listRevenue, value1: moment(data.createdAt1).format("MM-DD-YYYY"), value2: moment(data.endDate1).format("MM-DD-YYYY") });

    if (foundName === true) {
      Notification.error("Tên loại sản phẩm đã có");
    } else {
      Notification.success("Test OK!");
      // dispatch(PromotionAddAction(data)).then((res) => {

      //   Notification.success("Đã thêm sản phẩm thành công!");
      // });
    }
  };


  const onProfitSubmit = (data) => {
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
    history.push("/profitReport/detail", {  value1: moment(data.createdAt).format("MM-DD-YYYY"), value2: moment(data.endDate).format("MM-DD-YYYY"), typeReport: typeReport });

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
      <Typography variant="h4">BÁO CÁO</Typography>
      <div>
        {/* <h2 className="page-header">Báo cáo</h2> */}
        <div className="card">
          <div className="card__header">
            <h2 className="page-header">Doanh thu theo tháng</h2>
          </div>
          <div className="card__body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <InputLabel htmlFor="uncontrolled-native">
                    Ngày Bắt Đầu
                  </InputLabel>
                  <TextField
                    style={{ marginTop: 10 }}
                    fullWidth
                    format={"yyyy/MM/dd"}
                    defaultValue={yearValue + "-" + monthValue + "-" + dayValue}
                    type="date"
                    name="createdAt1"
                    inputRef={register({ validate: true })}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <InputLabel htmlFor="uncontrolled-native">
                    Ngày Kết Thúc
                  </InputLabel>
                  <TextField
                    style={{ marginTop: 10 }}
                    fullWidth
                    format={"yyyy/MM/dd"}
                    defaultValue={yearValue + "-" + monthValue + "-" + dayValue}
                    type="date"
                    name="endDate1"
                    inputRef={register({ validate: true })}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                style={{ marginTop: 20 }}
              >
                Kiểm tra
              </Button>
            </form>
          </div>
        </div>
        <div className="card">
          <div className="card__header">
            <h2 className="page-header">Lợi nhuận</h2>
          </div>
          <div className="card__body">
            <form onSubmit={handleSubmit(onProfitSubmit)}>
              <Grid container spacing={3}>

              <Grid item md={12} xs={12}>
              <TextField
              id="outlined-select-currency"
              select
              // label="Discount"
              value={typeReport}
              onChange={handleChangeTypeReport}
              // helperText="Chọn discount để lọc sản phẩm"
            >
              {labelReport.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
              </Grid>
              
                <Grid item md={6} xs={12}>
                
                  <InputLabel htmlFor="uncontrolled-native">
                    Ngày Bắt Đầu
                  </InputLabel>
                  <TextField
                    style={{ marginTop: 10 }}
                    fullWidth
                    format={"yyyy/MM/dd"}
                    defaultValue={yearValue + "-" + monthValue + "-" + dayValue}
                    type="date"
                    name="createdAt"
                    inputRef={register({ validate: true })}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <InputLabel htmlFor="uncontrolled-native">
                    Ngày Kết Thúc
                  </InputLabel>
                  <TextField
                    style={{ marginTop: 10 }}
                    fullWidth
                    format={"yyyy/MM/dd"}
                    defaultValue={yearValue + "-" + monthValue + "-" + dayValue}
                    type="date"
                    name="endDate"
                    inputRef={register({ validate: true })}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                style={{ marginTop: 20 }}
              >
                Kiểm tra
              </Button>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
};

export default RevenueReport;
