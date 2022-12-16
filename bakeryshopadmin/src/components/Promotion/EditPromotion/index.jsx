import {
  Button,
  FormHelperText,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import React from "react";
import { PromotionUpdateAction } from "../../../store/actions/PromotionAction";
import { useHistory, useLocation } from "react-router-dom";
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
  paper: {
    width: 180,
    height: 230,
    overflow: "auto",
    [theme.breakpoints.down("sm")]: {
      width: 140,
      height: 230,
    },
  },
  rootModal: {
    margin: 0,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  btnUpload: {
    marginLeft: 130,
    marginTop: 0,
    [theme.breakpoints.down("sm")]: {
      marginLeft: 60,
    },
  },
  displayImg: {
    [theme.breakpoints.up("sm")]: {
      marginLeft: 60,
    },
  },
  errorImg: {
    color: "red",
    marginLeft: 60,
    marginBottom: 10,
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const EditPromotion = () => {
  const classes = useStyles();

  const history = useHistory();

  const location = useLocation();

  const [promotion] = useState(location.state.promotion);

  const { promotions } = useSelector((state) => state.promotion);
  const [startDate, setStartDate] = useState(dayjs(promotion.startDate));
  const [endDate, setEndDate] = useState(dayjs(promotion.endDate));
  const auth = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  // Update Promotion
  const onSubmit = (data) => {
    const foundName = promotions.some((item) => {
      return item.name === data.name;
    });
    const obj = {
      "id" : promotion.id, 
      "name" : data.name, 
      "startDate" :  startDate,
      "endDate": endDate,
      "employeeId" : auth?.user?.id
    }
    if (getValues("name") !== promotion.name) {
      if (foundName === true) {
        Notification.error("Tên đợt khuyến mãi đã tồn tại");
      } else {
        dispatch(PromotionUpdateAction(obj));
        history.push("/promotion");
        Notification.success("Đã cập nhật đợt khuyến mãi thành công!");
      }
    } else {
      dispatch(PromotionUpdateAction(obj));
      history.push("/promotion");
      Notification.success("Đã cập nhật đợt khuyến mãi thành công!");
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item md={12} sm={12} xs={12}>
          <Typography variant="h4">Cập nhật đợt khuyến mãi</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item md={8} xs={12}>
                <TextField
                  name="id"
                  inputRef={register()}
                  defaultValue={promotion.id}
                  style={{ display: "none" }}
                />
                <TextField
                  label="Nhập tên đợt khuyến mãi"
                  style={{ marginTop: 10 }}
                  defaultValue={promotion.name}
                  fullWidth
                  name="name"
                  inputRef={register({ required: true })}
                />
                {errors.name && (
                  <FormHelperText
                    style={{ color: "red" }}
                    id="component-error-text"
                  >
                    Nhập tên đợt khuyến mãi
                  </FormHelperText>
                )}
              </Grid>
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
              Cập nhật
            </Button>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default EditPromotion;
