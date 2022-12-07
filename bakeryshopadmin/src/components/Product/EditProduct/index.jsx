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
} from "@material-ui/core";
import { useState, useEffect,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import React from "react";
import { ErrorOutline } from "@material-ui/icons";
import { useHistory, useLocation } from "react-router-dom";
import { CategoryListAction } from "./../../../store/actions/CategoryAction";
import { AdditionOptionListAction } from "./../../../store/actions/AdditionOptionAction";
import { SizeOptionAction } from "./../../../store/actions/SizeOptionAction";
import { updateProduct } from "./../../../store/actions/ProductAction";
import Notification from "./../../../common/Notification";
// import  { UploadFile } from 'antd/es/upload/interface';
import type { UploadFile } from 'antd/es/upload/interface';

import {
  message,
  Upload,
  Col,
} from 'antd';
import Compressor from 'compressorjs';
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

  const [product] = useState(location.state.product);
  const [cate, setCate] = useState(product.categoryId.name);
  const [image, setImage] = useState([]);
  const [imageRM, setImageRM] = useState([]);
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
  const [checkSize,setCheckSize] = useState(product.sizeOptions);

  // var addOptionLeft = location.state.addition;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  var sizeOptionLeft = location.state.size;
  const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
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
    data.categoryId = categories.find((c) => c.name === data.categoryId);
    // data.additionOptions = right;
    data.sizeOptions = rightSize;
    data.multipartFile = data.multipartFile[0] ? data.multipartFile[0] : null;
    // for (let i = 0; i < count; i++) {
      
    //   Notification.success(JSON.stringify(fileList[i]));
    // }
    
    for (let i = 0; i < fileList.length; i++) {
      
      // Notification.success((fileList[i].originFileObj));
      // if(fileList[i].url === null ){
      if(fileList[i].url === undefined){
        image.push( fileList[i].originFileObj);
        Notification.success((i));
        // if(fileList[i].url === null ){  
      }else{
        Notification.error(i);
        imageRM.push( fileList[i].uid);
      }
      // Notification.success(JSON.stringify(fileList[i].originFileObj));
      // image.push( fileList[i].originFileObj);
    }
    // for (let i = count; i < fileList.length; i++) {
      
    // }
    // Notification.success(JSON.stringify(fileList[0]));
        // return
    data.catalogs = image;
    data.removeImage = imageRM;
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

  const handleAllRightSize = () => {
    // setRightSize(rightSize.concat(leftSize));
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
    // setLeftSize(leftSize.concat(rightSize));
    setLeftSize(leftSize.concat(not(rightSize, checkSize)));
    setRightSize(checkSize);
    // setRightSize([]);
  };

  const handleOpenAddSize = () => {
    // Notification.success(JSON.stringify(checkSize));
    // return;
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
  // const handlePreview = async (file) => {
  //   if (!file.url && !file.preview) {
  //     file.preview = await getBase64(file.originFileObj);
  //   }

  //   setPreviewImage(file.url || (file.preview ));
  //   setPreviewOpen(true);
  //   setPreviewTitle(file.name || file.url.substring(file.url).lastIndexOf('/') + 1);
  // };
  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
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
              // disabled={ true }
              disabled={checkSize.some(item => value.id === item.id) ? true : false}
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  // disableRipple
                  // disabled={checkSize.some(item => value.id === item.id) ? true : false}
                 
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

  
  const [fileList, setFileList] : UploadFile[] = useState(product.images.map(item => ({
    uid: item.id,
    name: item.name,
    url: item.imageLink,
    status: 'done'
  })));
  // const [fileList, setFileList] = useState<UploadFile[]>(product.images.map(item => ({
  //     uid: item.id,
  //     name: item.name,
  //     url: item.imageLink,
  //     status: 'done'
  //   })));
  // const [fileList, setFileList] = useState(product.images.map(item => ({
  //   uid: item.id,
  //   name: item.name,
  //   url: item.imageLink 
  // })));


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
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item md={12} sm={12} xs={12}>
          <Typography variant="h4">CẬP NHẬT SẢN PHẨM</Typography>
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
                  label="Nhập nội dung"
                  style={{ marginTop: 10 }}
                  defaultValue={product.title}
                  fullWidth
                  name="title"
                  inputRef={register({ required: true })}
                />
                {errors.title && (
                  <FormHelperText
                    style={{ color: "red" }}
                    id="component-error-text"
                  >
                    Nhập nội dung sản phẩm
                  </FormHelperText>
                )}
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="uncontrolled-native">
                    Loại sản phẩm
                  </InputLabel>
                  <NativeSelect
                    value={cate}
                    onChange={(e) => {
                      setCate(e.target.value);
                    }}
                    name="categoryId"
                    error={errors.categoryId?.message && true}
                    inputRef={register({
                      validate: (value) => {
                        if (value === "default") {
                          return "chọn loại sản phẩm";
                        }
                      },
                    })}
                  >
                    <option value="default">Chưa chọn</option>
                    {categories.map((cate) => (
                      <option key={cate.id} value={cate.name}>
                        {cate.name}
                      </option>
                    ))}
                  </NativeSelect>
                  {errors.categoryId?.message && (
                    <FormHelperText
                      style={{ color: "red" }}
                      id="component-error-text"
                    >
                      {errors.categoryId?.message}
                    </FormHelperText>
                  )}
                </FormControl>

                <div style={{ marginTop: 20 }}>
                  <div style={{ display: "flex" }}>
                    <Typography>Kích thước:</Typography>
                    <div style={{ marginBottom: 10 }}>
                      {rightSize.length > 0 ? (
                        rightSize.map((item) => (
                          <Chip
                            style={{
                              marginTop: -5,
                              marginLeft: 10,
                              marginBottom: 10,
                            }}
                            variant="outlined"
                            label={item.name}
                            key={item.id}
                            onDelete={ !checkSize.some(a => a.id === item.id) ? () => handleRemoveSize(item.id): false}
                            // onDelete={false}
                          />
                        ))
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
                  <Button
                    disabled={(Object.is(cate, "default") || Object.is(cate, "Snack") || Object.is(cate, "Product")) ? true : false}
                    color="primary"
                    variant="contained"
                    onClick={handleOpenAddSize}
                  >
                    Thêm kích thước
                  </Button>
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
                  <Button
                    color="secondary"
                    variant="contained"
                    component="span"
                    className={classes.btnUpload}
                  >
                    Thêm ảnh
                  </Button>
                </label>
              </Grid>
            </Grid>
           
            <Dialog
              open={openSize}
              keepMounted
              maxWidth="sm"
              fullWidth={true}
              onClose={handleCloseSize}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >
              <div>
                <Typography
                  style={{
                    fontSize: 24,
                    paddingTop: 20,
                    textAlign: "center",
                    color: "#3f51b5",
                  }}
                >
                  Thêm kích thước
                </Typography>
              </div>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                className={classes.rootModal}
              >
                <Grid item style={{ marginRight: 20 }}>
                  {customList(leftSize)}
                </Grid>
                <Grid item style={{ marginRight: 20 }}>
                  <Grid container direction="column" alignItems="center">
                    <Button
                      variant="outlined"
                      size="small"
                      className={classes.button}
                      onClick={handleAllRightSize}
                      disabled={leftSize.length === 0}
                      aria-label="move all right"
                    >
                      ≫
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      className={classes.button}
                      onClick={handleCheckedRightSize}
                      disabled={leftCheckedSize.length === 0}
                      aria-label="move selected right"
                    >
                      &gt;
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      className={classes.button}
                      onClick={handleCheckedLeftSize}
                      disabled={rightCheckedSize.length === 0}
                      aria-label="move selected left"
                    >
                      &lt;
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      className={classes.button}
                      onClick={handleAllLeftSize}
                      disabled={rightSize.length === 0}
                      aria-label="move all left"
                    >
                      ≪
                    </Button>
                  </Grid>
                </Grid>
                <Grid item>{customList(rightSize)}</Grid>
              </Grid>
            </Dialog>
            <Col span={24}>
                <h2 className="m-b-10">
                  Hình ảnh của sản phẩm (Tối đa 10 sản phẩm)
                </h2>
                

                <Upload
                  listType="picture-card"
                // listType="file"
                  multiple={true}
                  
                  onRemove={(file) => {
                    // fileCompressedList.current = fileCompressedList.current.filter(
                    //   (item) => item.uid !== file.uid,
                    // );
                    fileCompressedList.current = fileCompressedList.current.filter(
                      (item) => item.uid !== file.uid,
                    );
                  }}
                  // defaultFileList={
                  //   [
                  //     {
                  //       uid:"123",
                  //       name:"232.png",
                  //       url: "http://res.cloudinary.com/ptithcmn18dccn237/image/upload/v1667732817/image/eedeef5qzamyklyyksq1.jpg",
                  //     },
                  //     {
                  //       uid:"1234",
                  //       name:"232.png",
                  //       url: "http://res.cloudinary.com/ptithcmn18dccn237/image/upload/v1667732817/image/eedeef5qzamyklyyksq1.jpg",
                  //     }
                  //   ]
                  // }
                  fileList={fileList}
                  onChange={({ fileList }) => setFileList(fileList)}
                  onPreview={handlePreview}
                  beforeUpload={(file) => {
                    // onCompressFile(file, 1);
                    return false;
                  }}>

                  {fileList.length < 10 && '+ Thêm ảnh'}
                 
                                
                </Upload>
              </Col>      
            <Dialog
              open={open}
              keepMounted
              maxWidth="sm"
              fullWidth={true}
              onClose={handleClose}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >
              <div>
                <Typography
                  style={{
                    fontSize: 24,
                    paddingTop: 20,
                    textAlign: "center",
                    color: "#3f51b5",
                  }}
                >
                  Thêm Topping
                </Typography>
              </div>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                className={classes.rootModal}
              >
                <Grid item style={{ marginRight: 20 }}>
                  {customList(left)}
                </Grid>
                <Grid item style={{ marginRight: 20 }}>
                  <Grid container direction="column" alignItems="center">
                    <Button
                      variant="outlined"
                      size="small"
                      className={classes.button}
                      // onClick={handleAllRight}
                      disabled={left.length === 0}
                      aria-label="move all right"
                    >
                      ≫
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      className={classes.button}
                      // onClick={handleCheckedRight}
                      disabled={leftChecked.length === 0}
                      aria-label="move selected right"
                    >
                      &gt;
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      className={classes.button}
                      // onClick={handleCheckedLeft}
                      // disabled={rightChecked.length === 0}
                      aria-label="move selected left"
                    >
                      &lt;
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      className={classes.button}
                      // onClick={handleAllLeft}
                      // disabled={right.length === 0}
                      aria-label="move all left"
                    >
                      ≪
                    </Button>
                  </Grid>
                </Grid>
                {/* <Grid item>{customList(right)}</Grid> */}
              </Grid>
            </Dialog>

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
    </div>
  );
};

export default EditProduct;
