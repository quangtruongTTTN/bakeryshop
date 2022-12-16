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
  NativeSelect,
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
import { AdditionOptionListAction } from "../../../store/actions/AdditionOptionAction";
import { SizeOptionAction } from "../../../store/actions/SizeOptionAction";
import { updateProduct } from "../../../store/actions/ProductAction";
import {
  ProductDetailGetAll,

} from "./../../../store/actions/ProductDetailAction";

import Notification from "../../../common/Notification";
import {
  message,
  Upload,
  Col,
} from 'antd';
import Compressor from 'compressorjs';
import TableHeader from "../../TableHeader";
import Logo from "../../../assets/img/BakeryShop.gif"; 
import {
  CreateOutlined,
  DeleteOutline,
  Replay,
  Visibility,
} from "@material-ui/icons";
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

const EditProduct = () => {
  const classes = useStyles();

  const history = useHistory();

  const location = useLocation();
  const [isLoad, setIsLoad] = useState(true);
  const [product] = useState(location.state.product);
  const [cate, setCate] = useState(product.categoryId.name);
  const [ptest, setPtest] = useState([]);
  const [image, setImage] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.category);
  const count = product.images.length;
  // const { additionOptions } = useSelector((state) => state.additionOption);
  
  const { sizeOptions } = useSelector((state) => state.sizeOption);
  
  // var addOptionLeft = location.state.addition;

  var sizeOptionLeft = location.state.size;
  const [productId, setProductId] = useState(product.id);
  const { productDetails} = useSelector((state) => state.productDetail);
  //get list category, addOption, sizeOption
  useEffect(() => {
    // dispatch(CategoryListAction());
    
    // dispatch(SizeOptionAction());
    dispatch(
      ProductDetailGetAll({
        // page,
        // sortField: valueToOrderBy,
        // sortDir: valueToSortDir,
        productId,
        // pageSize,
      })
    );

  }, [dispatch], productId);
  const [productDetailsSort, setProductDetailsSort] = useState([]);
  // Create product
  const onSubmit = (data) => {
    // Notification.success(count);
    // return;
    data.categoryId = categories.find((c) => c.name === data.categoryId);
    // data.additionOptions = right;
    data.sizeOptions = rightSize;
    data.multipartFile = data.multipartFile[0] ? data.multipartFile[0] : null;
    for (let i = count; i < fileList.length; i++) {
      image.push( fileList[i].originFileObj);
    }
    data.catalogs = image;
    setOpenBD(!open);
    setTimeout(() => {
      dispatch(updateProduct(data)).then((res) => {
        history.push("/product");
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

  const onHandleSelectProductDetails = (item) => {
    
    // var arrayForSort = [...item];

    // var price =
    //   productSelect.price *
    //   (productSelect?.saleOff[0]?.discount
    //     ? 1 - productSelect?.saleOff[0]?.discount
    //     : 1);
    // price += item.price;
    // price += selectedAdd.reduce((a, b) => a + (b["price"] || 0), 0);
    const items = [...item.priceHistories];
    setProductDetailsSort(items.sort((a, b) => a.price - b.price));
    setIsLoad(false)
    // if (!isLoad) setIsLoad(true);
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
  // const [productDetails,setProductDetails]= useState(product.productDetails);

  const leftCheckedSize = intersection(checked, leftSize);
  const rightCheckedSize = intersection(checked, rightSize);

  const handleAllRightSize = () => {
    setRightSize(rightSize.concat(leftSize));
    setLeftSize([]);
  };

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
  const onhandleUpdate = (item, size, productDetailId) => {
    history.push("/priceHistory/update", {
      product: product,
      productDetailId: productDetailId,
      priceHistory: item,
      // addition: additionOptions,
      sizeName : size.name
    });
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
  const customList = (items) => (
    <Paper className={classes.paper}>
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value}-label`;

          return (
            <ListItem
              key={value.id}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value.name} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  //Display image
  const [img, setImg] = useState();
      
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImg(URL.createObjectURL(event.target.files[0]));
    }
  };

  //Backdrop
  const [openBD, setOpenBD] = React.useState(false);
  // const [testImg, setTestImg] = useState([]);
  // for(let i in product.images){
  //   testImg.push(
  //     {
  //       uid : product.images[i].id,
  //       name : product.images[i].name ,
  //       url: product.images[i].imageLink 
  //     }
  //   );
  // }
  const [fileList, setFileList] = useState(product.images.map(item => ({
    uid: item.id,
    name: item.name,
    url: item.imageLink 
  })));
  // setFileList();
  // const [fileList, setFileList] = useState([{
  //   uid : "product.images[0].id",
  //   name : product.images[0].name ,
  //   url: product.images[0].imageLink ,
  // },{
  //   uid : "product.images[1].id",
  //   name : product.images[1].name ,
  //   url: product.images[1].imageLink ,
  // }]);

  
  // setFileList(product.images)
    // const [image, setImage] = useState([]);
    const fileCompressedList = useRef([]);
    const compFileList = useRef(new Array(5));
    const onCompressFile = async (file, index) => {
        new Compressor(file, {
            
          quality: 0.6,
          convertSize: 2000000,
          success(fileCompressed) {
            const reader = new FileReader();
            reader.readAsDataURL(fileCompressed); 
            reader.onloadend = async () => {
              compFileList.current[index] = reader.result;
            };
          },
          error(err) {
            message.error('Lỗi: ', err);
          },
        });
        // setImage(file);
      };
      const fields = [
        { label: "Hình Ảnh" },
        { name: "size", label: "Kích thước", dir: "asc" },
        // { name: "name", label: "Tên Sản Phẩm", dir: "asc" },
        // { name: "title", label: "Chú Thích", dir: "asc" },
        { name: "price", label: "Giá", dir: "asc" },
        { name: "stock", label: "Tồn kho", dir: "asc" },
        // { name: "categoryId", label: "Loại", dir: "asc" },
        // { label: "Trạng Thái" },
        { label: "Hành Động" },
      ];
  return (
    <div className={classes.root}>

      <TableContainer component={Paper}>
        <Table style={{ minWidth: 650 }} aria-label="simple table">
          <TableHeader
            // valueToOrderBy={valueToOrderBy}
            // valueToSortDir={valueToSortDir}
            // handleRequestSort={handleRequestSort}product.productDetails
            fields={fields}
          />
          <TableBody>
            {productDetails.map((u) => (
              <TableRow key={u.id}>
                <TableCell component="th" scope="row">
                  <img
                    alt=""
                    width={60}
                    height={60}
                    src={product.linkImage ?? Logo}
                  />
                </TableCell>
                {/* <TableCell>{u.name}</TableCell>const gPrice =  product.productDetails
                <TableCell>{u.title}</TableCell> */}
                <TableCell>{u.sizeOption.name}
                </TableCell>
                {/* <TableCell>
                {isLoad  && onHandleSelectProductDetails(u) ? (productDetailsSort[0].price)
                : (120000)
              }
                   
              </TableCell> */}
                <TableCell>{u?.priceHistories[0].price}</TableCell>
                <TableCell>{u.stock}</TableCell>
                {/* <TableCell>{onHandleSelectProductDetails(u)}</TableCell> */}
                {/* <TableCell>{onHandleSelectProductDetails(u)}</TableCell> */}
                {/* <TableCell>
                  {u.deletedAt ? (
                    <Chip
                      label="Ngừng bán"
                      style={{ backgroundColor: "red", color: "white" }}
                    />
                  ) : (
                    <Chip
                      label="Hoạt động"
                      style={{ backgroundColor: "green", color: "white" }}
                    />
                  )}
                </TableCell> */}
                <TableCell>
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
                    onClick={() => onhandleUpdate(u.priceHistories, u.sizeOption, u.id)}
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    
  );
};

export default EditProduct;
