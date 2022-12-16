import {
  Button,
  FormHelperText,
  Grid,
  makeStyles,
  TextField,
  Typography,
  InputLabel,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import {
  PromotionAddAction,
  PromotionListAction,
} from "../../../store/actions/PromotionAction";
import { useHistory } from "react-router-dom";
import Notification from "../../../common/Notification";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "hidden",
  },
  formControl: {
    minWidth: 120,
    marginTop: 20,
  },
}));

const AddPromotion = () => {
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
  const auth = useSelector((state) => state.auth);
  const monthValue = months[new Date().getMonth().toString()];
  const dayValue = (new Date().getDate()).toString().padStart(2, "0");
  const { promotions } = useSelector((state) => state.promotion);
  const [startDate, setStartDate] = useState(dayjs('2022-12-12'));
  const [endDate, setEndDate] = useState(dayjs('2022-12-12'));
  // const [value, setValue] = React.useState<Dayjs | null>(
  //   dayjs('2018-01-01T00:00:00.000Z'),
  // );
  useEffect(() => { 
    dispatch(PromotionListAction());
  }, [dispatch]);

  // Create promotion
  const onSubmit = (data) => {
    // Notification.error(JSON.stringify(value));
    
    const foundName = promotions.some((item) => {
      return item.name === data.name;
    });
    if(startDate > endDate){
      Notification.error("Ngày bắt đầu phải sau ngày kết thúc!");
      return;
    }
    const obj = {
      "name" : data.name, 
      "startDate" :  startDate,
      "endDate": endDate,
      "employeeId" : auth?.user?.id
    }
    // Notification.error(dayjs(value).format('YYYY/MM/DD'));
    // Notification.error(JSON.stringify(obj));
    // return;
    if (foundName === true) {
      Notification.error("Tên loại sản phẩm đã có");
    } else {
      dispatch(PromotionAddAction(obj)).then((res) => {
        history.push("/promotion");
        Notification.success("Đã thêm sản phẩm thành công!");
      });
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item md={12} sm={12} xs={12}>
          <Typography variant="h4">Thêm đợt khuyến mãi mới</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item md={8} xs={12}>
                <TextField
                  label="Nhập tên đợt khuyến mãi"
                  style={{ marginTop: 10 }}
                  fullWidth
                  name="name"
                  inputRef={register({ required: true })}
                />
                {errors.name && (
                  <FormHelperText
                    style={{ color: "red" }}
                    id="component-error-text"
                  >
                    Không Được Để Trống
                  </FormHelperText>
                )}
              </Grid>
              {/* <Grid item md={8} xs={12}>
                <InputLabel htmlFor="uncontrolled-native">
                  Ngày Bắt Đầu
                </InputLabel>
                <TextField
                  style={{ marginTop: 10 }}
                  fullWidth
                  format={"yyyy/MM/dd"}
                  defaultValue={yearValue + "-" + monthValue + "-" + dayValue}
                  type="date"
                  // name="createdAt"
                  inputRef={register({ validate: true })}
                  // inputProps={{
                  //   min: yearValue + "-" + monthValue + "-" + dayValue,
                  // }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item md={8} xs={12}>
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
                  // inputProps={{
                  //   min: yearValue + "-" + monthValue + "-" + dayValue,
                  // }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid> */}
              <Grid item md={8} xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <DateTimePicker
          renderInput={(params) => <TextField {...params} />}
          label="Ngày bắt đầu"
          value={startDate}
          name="createdAt"
          onChange={(newValue) => {
            setStartDate(newValue);
          }}
          minDateTime={dayjs('2022-04-02T12:00')}
        />
        <DateTimePicker
          renderInput={(params) => <TextField {...params} />}
          label="Ngày kết thúc"
          value={endDate}
          
          onChange={(newValue) => {
            setEndDate(newValue);
            // Notification.error(JSON.stringify(value));
          }}
          minDateTime={dayjs('2022-04-02T12:00')}
          // minDate={dayjs('2022-02-14')}
          // minTime={dayjs('2022-02-14T08:00')}
          // maxTime={dayjs('2022-02-14T18:45')}
        />
      </Stack>
    </LocalizationProvider>
              </Grid>
            </Grid> 
            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={{ marginTop: 20, marginLeft: "50%" }}
            >
              Tạo đợt khuyến mãi
            </Button>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddPromotion;
