import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  ListItem,
  ListItemText,
  makeStyles,
  TextField,
  Typography,
  ListItemIcon,
  Paper,
  List,
  Checkbox,
  Dialog,
  Chip,
  Backdrop,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@material-ui/core";
import { useState, useEffect,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import React from "react";
import { ErrorOutline } from "@material-ui/icons";
import { useHistory, useLocation } from "react-router-dom";
import { CategoryListAction } from "../../../store/actions/CategoryAction";
import { SizeOptionAction } from "../../../store/actions/SizeOptionAction";
import { updateProduct } from "../../../store/actions/ProductAction";
import Notification from "../../../common/Notification";
import {
  CreateOutlined,
  DeleteOutline,
  Replay,
  Visibility,
} from "@material-ui/icons";
import TableHeader from "../../TableHeader";
import moment from "moment";

import { addPriceHistory } from "./../../../store/actions/PriceHistoryAction";
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

const UpdatePrice = () => {
  const classes = useStyles();

  const history = useHistory();

  const location = useLocation();

  const [product] = useState(location.state.product);
  const [productDetailId] = useState(location.state.productDetailId);
  const [sizeName] = useState(location.state.sizeName) ?? {};
  const [priceHistory] = useState(location.state.priceHistory) ?? [];
  const [priceHistories] = useState(location.state.priceHistory) ?? [];
  const auth = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.category);

  // const { additionOptions } = useSelector((state) => state.additionOption);

  const { sizeOptions } = useSelector((state) => state.sizeOption);

  // var addOptionLeft = location.state.addition;

  var sizeOptionLeft = location.state.size;

  //get list category, addOption, sizeOption
  useEffect(() => {
    dispatch(CategoryListAction());
    // dispatch(AdditionOptionListAction());
    dispatch(SizeOptionAction());
  }, [dispatch]);

  // Create product
  const onSubmit = (data) => {
    // Notification.success(count);
    // return;
    data.productDetailId = productDetailId;
    // data.additionOptions = right;
    data.price = data.price;
    data.employeeId = auth.user.id;
    setOpenBD(!open);
    setTimeout(() => {
      dispatch(addPriceHistory(data)).then((res) => {
        history.push("/priceHistory");
        Notification.success("Đã cập nhập thành công!");
      });
    }, 2000);
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
  // const [right, setRight] = useState([...product.additionOptions]);
  const [addOpen, setaddOpen] = useState(0);

  const handleClose = () => {
    setOpen(false);
    setChecked([]);
  };

  const leftChecked = intersection(checked, left);
  // const rightChecked = intersection(checked, right);

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

  // const handleAllRight = () => {
  //   setRight(right.concat(left));
  //   setLeft([]);
  // };

  // const handleCheckedRight = () => {
  //   setRight(right.concat(leftChecked));
  //   setLeft(not(left, leftChecked));
  //   setChecked(not(checked, leftChecked));
  // };

  // const handleCheckedLeft = () => {
  //   setLeft(left.concat(rightChecked));
  //   setRight(not(right, rightChecked));
  //   setChecked(not(checked, rightChecked));
  // };

  // const handleAllLeft = () => {
  //   setLeft(left.concat(right));
  //   setRight([]);
  // };

  // const handleOpenAdd = () => {
  //   if (addOpen === 0) {
  //     setaddOpen(1);
  //     for (let i = 0; i < product.additionOptions.length; i++) {
  //       addOptionLeft = addOptionLeft.filter(
  //         (a) => a.name !== product.additionOptions[i].name
  //       );
  //     }
  //     setLeft(addOptionLeft);
  //   }
  //   setOpen(true);
  // };

  // const handleRemoveAdd = (id) => {
  //   if (addOpen === 0) {
  //     setaddOpen(1);
  //     for (let i = 0; i < product.additionOptions.length; i++) {
  //       addOptionLeft = addOptionLeft.filter(
  //         (a) => a.name !== product.additionOptions[i].name
  //       );
  //     }
  //     addOptionLeft.push(additionOptions.find((e) => e.id === id));
  //     setRight(right.filter((e) => e.id !== id));
  //     setLeft(addOptionLeft);
  //   } else {
  //     setRight(right.filter((e) => e.id !== id));
  //     setLeft([...left, additionOptions.find((e) => e.id === id)]);
  //   }
  // };

  // Handle tranferlist sizeOption
  const [openSize, setOpenSize] = useState(false);

  const handleCloseSize = () => {
    setChecked([]);
    setOpenSize(false);
  };

  const [leftSize, setLeftSize] = useState([]);
  const [rightSize, setRightSize] = useState(product.sizeOptions);
  const [addOpenSize, setaddOpenSize] = useState(0);
  const [productDetails,setProductDetails]= useState(product.productDetails);

  const leftCheckedSize = intersection(checked, leftSize);
  const rightCheckedSize = intersection(checked, rightSize);

 

  const handleCheckedRightSize = () => {
    setRightSize(rightSize.concat(leftCheckedSize));
    setLeftSize(not(leftSize, leftCheckedSize));
    setChecked(not(checked, leftCheckedSize));
  };

  const handleCheckedLeftSize = () => {
    setLeftSize(leftSize.concat(rightCheckedSize));
    setRightSize(not(rightSize, rightCheckedSize));
    setChecked(not(checked, rightCheckedSize));
  };

  const handleAllLeftSize = () => {
    setLeftSize(leftSize.concat(rightSize));
    setRightSize([]);
  };

  const handleOpenAddSize = () => {
    if (addOpenSize === 0) {
      setaddOpenSize(1);
      for (let i = 0; i < product.sizeOptions.length; i++) {
        sizeOptionLeft = sizeOptionLeft.filter(
          (a) => a.name !== product.sizeOptions[i].name
        );
      }
      setLeftSize(sizeOptionLeft);
    }
    setOpenSize(true);
  };

  const handleRemoveSize = (id) => {
    if (addOpenSize === 0) {
      setaddOpenSize(1);
      for (let i = 0; i < product.sizeOptions.length; i++) {
        sizeOptionLeft = sizeOptionLeft.filter(
          (a) => a.name !== product.sizeOptions[i].name
        );
      }
      setRightSize(rightSize.filter((e) => e.id !== id));
      sizeOptionLeft.push(sizeOptions.find((e) => e.id === id));
      setLeftSize(sizeOptionLeft);
    } else {
      setRightSize(rightSize.filter((e) => e.id !== id));
      setLeftSize([...leftSize, sizeOptions.find((e) => e.id === id)]);
    }
  };

  // Custom tranfer list
  const fields = [
    { label: "STT" },
    { label: "Ngày tạo" },
    // { name: "size", label: "Kích thước", dir: "asc" },
    // { name: "name", label: "Tên Sản Phẩm", dir: "asc" },
    // { name: "title", label: "Chú Thích", dir: "asc" },
    { name: "price", label: "Giá", dir: "asc" },
    // { name: "stock", label: "Tồn kho", dir: "asc" },
    { name: "username", label: "Mã nhân viên", dir: "asc" },
    { name: "fullName", label: "Tên nhân viên", dir: "asc" },
    // { label: "Trạng Thái" },
    // { label: "Hành Động" },
  ];

  //Display image
  const [img, setImg] = useState();

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImg(URL.createObjectURL(event.target.files[0]));
    }
  };

  //Backdrop
  const [openBD, setOpenBD] = React.useState(false);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item md={12} sm={12} xs={12}>
          <Typography variant="h4">CẬP NHẬT GIÁ TIỀN SẢN PHẨM</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item md={8} xs={12}>
                <TextField
                  name="id"
                  inputRef={register()}
                  defaultValue={product.id}
                  style={{ display: "none" }}
                />
                <TextField
                  label="Nhập tên sản phẩm"
                  style={{ marginTop: 10 }}
                  defaultValue={product.name}
                  value={product.name}
                  fullWidth
                  name="name"
                  inputRef={register({ required: true })}
                />
                {errors.name && (
                  <FormHelperText
                    style={{ color: "red" }}
                    id="component-error-text"
                  >
                    Nhập tên sản phẩm
                  </FormHelperText>
                )}
                <TextField
                  label="Nhập giá tiền"
                  style={{ marginTop: 10 }}
                  defaultValue={priceHistory[0].price}
                  fullWidth
                  type="number"
                  name="price"
                  inputRef={register({
                    required: "Nhập giá sản phẩm",
                    pattern: {
                      value: /^[0-9]+$/i,
                      message: "Giá không hợp lệ",
                    },
                    validate: (value) => {
                      if (value > 10000000 || value < 10000) {
                        return "Giá phải từ 10.000 VND - 10.000.000 VND";
                      }
                    },
                  })}
                />
                {errors.price?.message && (
                  <FormHelperText
                    style={{ color: "red" }}
                    id="component-error-text"
                  >
                    {errors.price?.message}
                  </FormHelperText>
                )}
                <div style={{ marginTop: 20 }}>
                  <div style={{ display: "flex" }}>
                    <Typography>Kích thước:</Typography>
                    <div style={{ marginBottom: 10 }}>
                      {sizeName.length > 0  ? (
                        <Chip
                        style={{
                          marginTop: -5,
                          marginLeft: 10,
                          marginBottom: 10,
                        }}
                        variant="outlined"
                        label={sizeName}
                        key={sizeName}
                        // onDelete={() => handleRemoveSize(size)}
                      />
                      ) : (
                        <Chip
                          style={{ marginTop: -5, marginLeft: 10 }}
                          icon={<ErrorOutline />}
                          label="Chưa thêm kích thước"
                          color="secondary"
                          variant="outlined"
                        />
                      )}
                    </div>
                  </div>
                  
                </div>

                

                
              </Grid>

              <Grid item md={4} xs={12}>
                <img
                  alt=""
                  src={img ? img : product.linkImage}
                  className={classes.displayImg}
                  width={250}
                  height={300}
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
                  {/* <Button
                    color="secondary"
                    variant="contained"
                    component="span"
                    className={classes.btnUpload}
                  >
                    Thêm ảnh
                  </Button> */}
                </label>
              </Grid>
            </Grid>
            

              
            

            <Backdrop className={classes.backdrop} open={openBD}>
              <CircularProgress color="inherit" />
            </Backdrop>

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
      <Typography variant="h4">LỊCH SỬ THAY ĐỔI GIÁ SẢN PHẨM</Typography>
      <TableContainer component={Paper}>
        <Table style={{ minWidth: 650 }} aria-label="simple table">
          <TableHeader
            // valueToOrderBy={valueToOrderBy}
            // valueToSortDir={valueToSortDir}
            // handleRequestSort={handleRequestSort}product.productDetails
            fields={fields}
          />
          <TableBody>
            {priceHistories.map((u,index) => (
              <TableRow key={u.id}>
                <TableCell>{index+1}</TableCell>
                <TableCell>{moment(u.createdAt).format("YYYY-MM-DD HH:mm:ss")}</TableCell>
                {/* <TableCell>{u.createdAt}</TableCell> */}
                <TableCell>{u.price}</TableCell>
                <TableCell>{u.employeeId.username}</TableCell>
                <TableCell>{u.employeeId.fullName}</TableCell>
                {/* <TableCell>
                  <Visibility
                    style={{
                      color: "grey",
                      cursor: "pointer",
                      marginRight: 10,
                    }}
                    onClick={() => {
                      history.push("/priceHistory/detail", { product: u });
                    }}
                  />
                  <CreateOutlined
                    style={{
                      color: "#3f51b5",
                      cursor: "pointer",
                      marginRight: 10,
                    }}
                    // onClick={() => onhandleUpdate(u.priceHistories, u.sizeOption)}
                  />

                  {u.deletedAt ? (
                    <Replay
                      style={{ cursor: "pointer", color: "green" }}
                      // onClick={() => onhandleDelete(u.id)}
                    />
                  ) : (
                    <DeleteOutline
                      style={{ color: "red", cursor: "pointer" }}
                      // onClick={() => onhandleDelete(u.id)}
                    />
                  )}
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UpdatePrice;
