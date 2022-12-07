import React, {useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import {
  Avatar,
  Button,
  Grid,
  makeStyles,
  TextField,
  FormHelperText,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { updateProfile } from "../../store/actions/EmployeeAction";
import Notification from "./../../common/Notification";
import moment from "moment";
import { EmployeeFindByUsernameAction } from "../../store/actions/EmployeeAction";
const useStyles = makeStyles((theme) => ({
  header: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    borderBottom: "1px solid #ececec",
  },
  title: {
    color: "#7f7f7f",
    fontSize: 14,
  },
  content: {
    paddingTop: 10,
    paddingRight: 50,
    paddingLeft: 30,
    paddingBottom: 30,
    display: "flex",
  },
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  button: {
    marginBottom: theme.spacing(3),
    marginLeft: 50,
  },
  btnUpload: {
    [theme.breakpoints.up("sm")]: {
      marginTop: 20,
    },
    marginTop: 10,
  },
  upload: {
    display: "grid",
    justifyItems: "center",
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

const Profile = ({ isOpen }) => {
  const auth = useSelector((state) => state.auth);
  const history = useHistory();
  const classes = useStyles();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  
 
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    setOpen(isOpen);
    if (auth?.user?.token) {
      dispatch(EmployeeFindByUsernameAction(auth.user.username));
      // dispatch(OrderFindAction(auth.user.id));
    }
  }, [auth, dispatch, isOpen]);
  //Display image
  const [img, setImg] = useState();
  const { employee } = useSelector((state) => state.employee);
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImg(URL.createObjectURL(event.target.files[0]));
    }
  };

  const onSubmit = (data) => {
    data.multipartFile = data.multipartFile[0] ? data.multipartFile[0] : null;
    data.email = employee?.email;
    setTimeout(() => {
      dispatch(updateProfile(data)).then((res) => {
        setOpen(false);
        history.replace("/accountInfo");
        Notification.success("Đã cập nhập thành công!");
      });
    }, 2000);
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <div className={classes.header}>
        <Typography variant="h6">HỒ SƠ CỦA TÔI</Typography>
        <Typography className={classes.title}>
          Quản lý thông tin hồ sơ và bảo mật tài khoản
          {employee.username}
        </Typography>
      </div>
      <div>
        
      </div>
      {employee && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            name="username"
            inputRef={register()}
            defaultValue={employee.username}
            style={{ display: "none" }}
          />
          <Grid container className={classes.content}>
            <Grid item md={8} xs={12} sm={12} style={{ paddingLeft: 20 }}>
              <Grid item xs={12} sm={12}>
                <TextField
                  multiline
                  label="Họ tên"
                  fullWidth
                  defaultValue={employee.fullName}
                  name="fullName"
                  inputRef={register({
                    required: "Họ tên không được để trống",
                    pattern: {
                      value: /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/,
                      message: "Tên không hợp lệ",
                    },
                  })}
                  InputLabelProps={{ shrink: true }}
                />
                {errors.fullName?.message && (
                  <FormHelperText
                    style={{ color: "red" }}
                    id="component-error-text"
                  >
                    {errors.fullName?.message}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  // multiline
                  name="birthday"
                  InputLabelProps={{ shrink: true }}
                  label="Ngày sinh"
                  type="date"
                  defaultValue={moment(employee.birthday).format("YYYY-MM-DD")}
                  inputRef={register({ required: true })}
                />
                {errors.birthday && (
                  <FormHelperText
                    style={{ color: "red" }}
                    id="component-error-text"
                  >
                    Ngày sinh không được để trống
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  multiline
                  name="address"
                  label="Địa chỉ"
                  fullWidth
                  defaultValue={employee.address}
                  inputRef={register({ required: true })}
                  InputLabelProps={{ shrink: true }}
                />
                {errors.address && (
                  <FormHelperText
                    style={{ color: "red" }}
                    id="component-error-text"
                  >
                    Địa chỉ không được để trống
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  multiline
                  name="phone"
                  label="Số điện thoại"
                  fullWidth
                  defaultValue={employee.phone}
                  inputRef={register({
                    required: "Số điện thoại không được để trống",
                    pattern: {
                      value: /^[0-9]{9,11}$/i,
                      message: "Số điện thoại không hợp lệ",
                    },
                  })}
                  InputLabelProps={{ shrink: true }}
                />
                {errors.phone?.message && (
                  <FormHelperText
                    style={{ color: "red" }}
                    id="component-error-text"
                  >
                    {errors.phone?.message}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  multiline
                  name="email"
                  label="Địa chỉ email"
                  fullWidth
                  defaultValue={employee.email}
                  disabled={true}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
              sm={12}
              style={{ paddingLeft: 30, paddingTop: 20 }}
            >
              <Grid item xs={12} sm={12} className={classes.upload}>
                <Avatar
                  alt="avatar"
                  src={img ? img : employee.linkImage}
                  className={classes.large}
                />
                <label htmlFor="upload-photo">
                  <TextField
                    id="upload-photo"
                    type="file"
                    style={{ display: "none" }}
                    onChange={onImageChange}
                    fullWidth
                    name="multipartFile"
                    inputRef={register({
                      validate: (value) => {
                        if (value[0]?.size >= 1048576) {
                          return "kích thước hình ảnh quả lớn";
                        }
                      },
                    })}
                  />
                  {errors.multipartFile?.message && (
                    <FormHelperText
                      className={classes.errorImg}
                      id="component-error-text"
                    >
                      {errors.multipartFile?.message}
                    </FormHelperText>
                  )}

                  <Button
                    color="secondary"
                    variant="contained"
                    component="span"
                    className={classes.btnUpload}
                  >
                    Tải ảnh lên
                  </Button>
                </label>
              </Grid>
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Cập nhật
          </Button>
          <Button
            
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => history.push("/account/changepassword")}
          >
            Đổi mật khẩu
          </Button>
        </form>
      )}
    
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </React.Fragment>
  );
};

export default Profile;
