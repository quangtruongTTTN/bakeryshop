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
import React, { useEffect } from "react";
import {
  PromotionAddAction,
  PromotionListAction,
} from "../../../store/actions/PromotionAction";
import { useHistory } from "react-router-dom";
import Notification from "../../../common/Notification";

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
  const monthValue = months[new Date().getMonth().toString()];
  const dayValue = (new Date().getDate()).toString().padStart(2, "0");
  const { promotions } = useSelector((state) => state.promotion);

  useEffect(() => {
    dispatch(PromotionListAction());
  }, [dispatch]);

  // Create promotion
  const onSubmit = (data) => {
    const foundName = promotions.some((item) => {
      return item.name === data.name;
    });
    if(data.createdAt>data.endDate){
      Notification.error("Ngày bắt đầu phải sau ngày kết thúc!");
      return;
    }
    if (foundName === true) {
      Notification.error("Tên loại sản phẩm đã có");
    } else {
      dispatch(PromotionAddAction(data)).then((res) => {
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
              <Grid item md={8} xs={12}>
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
