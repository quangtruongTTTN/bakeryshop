import React, { useState } from "react";
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
// import { updateProfile } from "../../../store/actions/UserAction";
import {AuthChangePassAction} from "../../store/actions/AuthAction";
// import {AuthChangePassAction} from "./../../store/actions/AuthAction";
import Notification from "../../common/Notification";
import moment from "moment";

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

const ChangePassword = () => {
  const history = useHistory();
  const classes = useStyles();
  const { employee } = useSelector((state) => state.employee);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  //Display image
  const [img, setImg] = useState();

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImg(URL.createObjectURL(event.target.files[0]));
    }
  };

  const onSubmit = (data) => {
    // data.multipartFile = data.multipartFile[0] ? data.multipartFile[0] : null;
    // data.email = employee?.email;
    data.password = data.password;
    data.oldPassword = data.oldPassword;
    data.username = employee?.username;
    setTimeout(() => {
      dispatch(AuthChangePassAction(data)).then((res) => {
        setOpen(false);
        if(res==='OK'){
          history.replace("/account/changepassword");
          Notification.success("Đổi mật khẩu thành công!");
        }else if(res==='CONFLICT'){
          Notification.error("Mật khẩu không chính xác");
        }else{
          history.replace("/account/changepassword");
          // Notification.error("Đổi mật khẩu thất bại !");
          Notification.error(res.message);
        }
        
      });
    }, 2000);
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <div className={classes.header}>
        <Typography variant="h6">Đổi mật khẩu</Typography>
        <Typography className={classes.title}>
          Đổi mật khẩu và bảo mật tài khoản
        </Typography>
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
                  label="Password Old"
                  fullWidth
                  // defaultValue={employee.fullName}
                  type="password"
                  name="oldPassword"
                  inputRef={register({
                    required: "Password không được để trống",
                    // pattern: {
                    //   value: /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/,
                    //   message: "Password không hợp lệ",
                    // },
                  })}
                />
                {errors.oldPassword?.message && (
                  <FormHelperText
                    style={{ color: "red" }}
                    id="component-error-text"
                  >
                    {errors.oldPassword?.message}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  label="Password New"
                  fullWidth
                  // defaultValue={employee.fullName}
                  type="password"
                  name="password"
                  inputRef={register({
                    required: "Password không được để trống",
                    // pattern: {
                    //   value: /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/,
                    //   message: "Password không hợp lệ",
                    // },
                  })}
                />
                {errors.password?.message && (
                  <FormHelperText
                    style={{ color: "red" }}
                    id="component-error-text"
                  >
                    {errors.password?.message}
                  </FormHelperText>
                )}
              </Grid>

              {/* <Grid item xs={12}>
                <TextField
                  name="email"
                  label="Địa chỉ email"
                  fullWidth
                  defaultValue={employee.email}
                  disabled={true}
                />
              </Grid> */}
            </Grid>
            
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
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

export default ChangePassword;
