import { Button, FormControl, FormHelperText, Grid, InputLabel, ListItem, ListItemText, makeStyles, NativeSelect, TextField, Typography, ListItemIcon, Paper, List, Checkbox, Dialog, Chip, Backdrop, CircularProgress } from "@material-ui/core";
// import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CategoryListAction } from "../../../store/actions/CategoryAction"
// import { AdditionOptionListAction } from "../../../store/actions/AdditionOptionAction"
import { SizeOptionAction } from "../../../store/actions/SizeOptionAction"
import { useForm } from "react-hook-form";
import React from "react";
import { ErrorOutline } from "@material-ui/icons"
import { addShipper } from "../../../store/actions/ShipperAction"
import { useHistory } from "react-router-dom";
// import { ShipperAction } from "./../../store/actions/ShipperAction";
import Notification from "../../../common/Notification"
import { useRef, useState } from "react";
import { useEffect } from "react";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(6),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
    root: {
        overflow: "hidden",
    },
    formControl: {
        minWidth: 120,
        marginTop: 20
    },
    paper: {
        width: 180,
        height: 230,
        overflow: 'auto',
        [theme.breakpoints.down('sm')]: {
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
        [theme.breakpoints.down('sm')]: {
            marginLeft: 60
        },
    },
    displayImg: {
        [theme.breakpoints.up('sm')]: {
            marginLeft: 60,
        },
    },
    errorImg: {
        color: 'red',
        marginLeft: 60,
        marginBottom: 10,
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
        },
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const AddShipper = () => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    // const { categories } = useSelector(
    //     (state) => state.category
    // );
    const { register, handleSubmit, errors, watch } = useForm();
    // const { user } = useSelector((state) => state.auth);
    // const { sizeOptions } = useSelector(
    //     (state) => state.sizeOption
    // );
    // const { register, handleSubmit, errors, watch } = useForm();
    const [message, setMessage] = useState("");
    const password = useRef({});
    password.current = watch("password", "");
  
  // password.current = watch("password", "");
    //get list category, addOption, sizeOption
    // useEffect(() => {
    //     dispatch(CategoryListAction());
    //     // dispatch(AdditionOptionListAction());
    //     dispatch(SizeOptionAction());
    // }, [dispatch]);

    //state category
    const [cateName, setCateName] = useState("default");

    // Create product
    // const onSubmit = (data) => {
    //     // data.categoryId = categories.find(c => c.name === data.categoryId);
    //     // data.additionOptions = right;
    //     // data.sizeOptions = rightSize;
    //     data.multipartFile = data.multipartFile[0];
    //     setOpenBD(!open);
    //     setTimeout(() => {
    //         dispatch(addShipper(data)).then(res => {
    //             history.push("/shipper")
    //             Notification.success("Đã thêm sản phẩm thành công!");
    //         });
    //     }, 2000);
    // };
    const onSubmit = (data) => {
      // ShipperAction(data)(dispatch).then((res) => {
        dispatch(addShipper(data)).then(res => {
        if (!Object.is("Đăng ký thành công", res.message)) {
          setMessage(res.message);
          return;
        }
        if (Object.is("Đăng ký thành công", res.message)) {
          history.push("/shipper");
          return;
        }
      });
    };
    // Function add, remove tranfer list
    function not(a, b) {
        return a.filter((value) => b.indexOf(value) === -1);
    }

    function intersection(a, b) {
        return a.filter((value) => b.indexOf(value) !== -1);
    }

    // Handle tranferlist addOption
    const [open, setOpen] = useState(false);
    const [checked, setChecked] = useState([]);
    const [left, setLeft] = useState([]);
    const [right, setRight] = useState([]);
    const [addOpen, setaddOpen] = useState(0);

    const handleClose = () => {
        setOpen(false);
        setChecked([]);
    };

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };

    const handleAllRight = () => {
        setRight(right.concat(left));
        setLeft([]);
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const handleAllLeft = () => {
        setLeft(left.concat(right));
        setRight([]);
    };

    // const handleOpenAdd = () => {
    //     if (addOpen === 0) {
    //         setaddOpen(1);
    //         setLeft(additionOptions);
    //     }
    //     setOpen(true);
    // }

    // const handleRemoveAdd = (id) => {
    //     setRight(right.filter(e => e.id !== id));
    //     setLeft([...left, additionOptions.find(e => e.id === id)]);
    // }

    // Handle tranferlist sizeOption
    // const [openSize, setOpenSize] = useState(false);

    // const handleCloseSize = () => {
    //     setChecked([]);
    //     setOpenSize(false);
    // };

    // const [leftSize, setLeftSize] = useState([]);
    // const [rightSize, setRightSize] = useState([]);
    // const [addOpenSize, setaddOpenSize] = useState(0);

    // const leftCheckedSize = intersection(checked, leftSize);
    // const rightCheckedSize = intersection(checked, rightSize);


    // const handleAllRightSize = () => {
    //     setRightSize(rightSize.concat(leftSize));
    //     setLeftSize([]);
    // };

    // const handleCheckedRightSize = () => {
    //     setRightSize(rightSize.concat(leftCheckedSize));
    //     setLeftSize(not(leftSize, leftCheckedSize));
    //     setChecked(not(checked, leftCheckedSize));
    // };

    // const handleCheckedLeftSize = () => {
    //     setLeftSize(leftSize.concat(rightCheckedSize));
    //     setRightSize(not(rightSize, rightCheckedSize));
    //     setChecked(not(checked, rightCheckedSize));
    // };

    // const handleAllLeftSize = () => {
    //     setLeftSize(leftSize.concat(rightSize));
    //     setRightSize([]);
    // };

    // const handleOpenAddSize = () => {
    //     if (addOpenSize === 0) {
    //         setaddOpenSize(1);
    //         setLeftSize(sizeOptions);
    //     }
    //     setOpenSize(true);
    // }

    // const handleRemoveSize = (id) => {
    //     setRightSize(rightSize.filter(e => e.id !== id));
    //     setLeftSize([...leftSize, sizeOptions.find(e => e.id === id)]);
    // }

    // Custom tranfer list
    // const customList = (items) => (
    //     <Paper className={classes.paper}>
    //         <List dense component="div" role="list">
    //             {items.map((value) => {
    //                 const labelId = `transfer-list-item-${value}-label`;

    //                 return (
    //                     <ListItem key={value.id} role="listitem" button onClick={handleToggle(value)}>
    //                         <ListItemIcon>
    //                             <Checkbox
    //                                 checked={checked.indexOf(value) !== -1}
    //                                 tabIndex={-1}
    //                                 disableRipple
    //                                 inputProps={{ 'aria-labelledby': labelId }}
    //                             />
    //                         </ListItemIcon>
    //                         <ListItemText id={labelId} primary={value.name} />
    //                     </ListItem>
    //                 );
    //             })}
    //             <ListItem />
    //         </List>
    //     </Paper>
    // );

    //Display image
    const [img, setImg] = useState();

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImg(
                URL.createObjectURL(event.target.files[0])
            );
        }
    }

    //Backdrop
    const [openBD, setOpenBD] = React.useState(false);

    //Category
    const onHandleChangeCategory = (e) => {
        setCateName(e.target.value);
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item md={12} sm={12} xs={12}>
                    <Typography variant="h4">
                        Thêm nhân viên giao hàng
                    </Typography>
                    {message && (
          <Typography
            component="span"
            variant="h6"
            style={{ color: "red", fontSize: 16 }}
          >
            {message}
          </Typography>
        )}
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Tài khoản"
                name="username"
                inputRef={register({
                  required: {
                    value: true,
                    message: "Tài khoản không được để trống",
                  },
                  minLength: {
                    value: 5,
                    message: "Tài khoản không được nhỏ hơn 5 kí tự",
                  },
                  maxLength: {
                    value: 20,
                    message: "Tài khoản không được quá 20 kí tự",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9]+$/,
                    message: "Tài khoản chp phép chữ cái và số",
                  },
                })}
                autoComplete="off"
                // InputProps={{
                //   startAdornment: (
                //     <InputAdornment position="start">
                //       <AccountCircle />
                //     </InputAdornment>
                //   ),
                // }}
              />
              {errors.username?.message && (
                <FormHelperText style={{ color: "red" }}>
                  {errors.username?.message}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Địa chỉ email"
                name="email"
                inputRef={register({
                  required: {
                    value: true,
                    message: "Email không được để trống",
                  },
                  pattern: {
                    value: /^[\w.]+@\w{2,}(\.\w{2,}){1,2}$/,
                    message: "Email chưa đúng định dạng",
                  },
                })}
                autoComplete="off"
                // InputProps={{
                //   startAdornment: (
                //     <InputAdornment position="start">
                //       <EmailIcon />
                //     </InputAdornment>
                //   ),
                // }}
              />
              {errors.email?.message && (
                <FormHelperText style={{ color: "red" }}>
                  {errors.email?.message}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="password"
                inputRef={register({
                  required: {
                    value: true,
                    message: "Mật khẩu không được để trống",
                  },
                  minLength: {
                    value: 6,
                    message: "Mật khẩu không được nhỏ hơn 6 kí tự",
                  },
                  pattern: {
                    value: /^[^\s]+$/,
                    message: "Mật khẩu không được có khoảng trắng",
                  },
                })}
                label="Mật khẩu"
                type="password"
                autoComplete="current-password"
                // InputProps={{
                //   startAdornment: (
                //     <InputAdornment position="start">
                //       <LockRounded />
                //     </InputAdornment>
                //   ),
                // }}
              />
              {errors.password?.message && (
                <FormHelperText style={{ color: "red" }}>
                  {errors.password?.message}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="rePassword"
                inputRef={register({
                  validate: (value) =>
                    Object.is(value, password.current) ||
                    "Mật khẩu nhập lại chưa đúng",
                })}
                label="Nhập lại mật khẩu"
                type="password"
                autoComplete="current-password"
                // InputProps={{
                //   startAdornment: (
                //     <InputAdornment position="start">
                //       <LockRounded />
                //     </InputAdornment>
                //   ),
                // }}
              />
              {errors.rePassword?.message && (
                <FormHelperText style={{ color: "red" }}>
                  {errors.rePassword?.message}
                </FormHelperText>
              )}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Đăng ký
          </Button>
          <Grid container justifyContent="space-between">
            <Grid item>
              {/* <Link to="/forget" style={{ textDecoration: "none" }}>
                Quên mật khẩu?
              </Link> */}
            </Grid>
            <Grid item>
              {/* <Link to="/signin" style={{ textDecoration: "none" }}>
                Bạn đã có tài khoản? Đăng nhập
              </Link> */}
            </Grid>
          </Grid>
        </form>
                </Grid>
            </Grid>
        </div>
    )
}

export default AddShipper;