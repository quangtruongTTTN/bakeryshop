// import {
//   Button,
//   FormControl,
//   Grid,
//   Paper,
//   Select,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   makeStyles,
//   MenuItem, Checkbox,
//   Avatar, Box, withStyles, Chip, Dialog, DialogContent, Typography
// } from "@material-ui/core";

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Pagination from "@material-ui/lab/Pagination";
// import TableHeader fro../../TableHeaderder";

// import { useHistory, useLocation } from "react-router-dom";
// import {
//   PromotionDetailListAction,
//   PromotionDetailDeleteAction,
// } from "../../../store/actions/PromotionDetailAction";
// import {
//   ProductGetAll,
//   deleteProduct,
//   ShowProductPromotionDetail,
// } from "../../../store/actions/ProductAction";
// import { ProductPromotionDetail } from "../../../store/actions/ProductAction";
// import Logo from "./../../../assets/img/BakeryShop.gif";
// import { confirmAlert } from "react-confirm-alert";
// import Moment from "react-moment";
// import Notification from "../../../common/Notification";
// import {
//   CreateOutlined,
//   DeleteOutline,
//   Replay,
//   Visibility,
// } from "@material-ui/icons";
// const useStyles = makeStyles((theme) => ({
//   btn: {
//     width: 918,
//     height: 36,
//   },
//   searchField: {
//     [theme.breakpoints.down("sm")]: {
//       width: "100%",
//     },
//   },
//   btnSearch: {
//     background: "#020202",
//     width: 100,
//     height: 36,
//     marginTop: 16,
//     marginRight: 30,

//     [theme.breakpoints.down("sm")]: {
//       width: "100%",
//       marginBottom: 16,
//       marginRight: 0,
//     },
//   },
//   wrapForm: {
//     [theme.breakpoints.down("sm")]: {
//       flexDirection: "column-reverse",
//     },
//   },
//   select: {
//     marginLeft: 30,
//     [theme.breakpoints.down("sm")]: {
//       marginLeft: 200,
//     },
//   },
// }));

// const PromotionDetail = () => {
//   const classes = useStyles();
//   const history = useHistory();
//   const [checked, setChecked] = useState([]);
//   // const [checked, setChecked] = useState(JSON.parse(localStorage.getItem("checked") || "[]"));
//   // const compFileList = useRef(new Array(5));
//   const dispatch = useDispatch();
//   const { promotionproducts, promotiontotalPages } = useSelector((state) => state.product);
//   const { products, totalPages, promotiontotalElements } = useSelector((state) => state.product);
//   const [geted, setGeted] = useState(promotionproducts);
//   // const [checked, setChecked] = useState(new Array(geted.length));
//   const [page, setPage] = useState(1);
//   const [valueToOrderBy, setValueToOrderBy] = useState("id");
//   const [valueToSortDir, setValueToSortDir] = useState("asc");
//   const [keyword, setKeyword] = useState("");
//   const [discount, setDiscount] = useState(0);
//   const [pageSize, setPageSize] = useState(3);
//   const [temp, setTemp] = useState(0);
//   const [name, setName] = useState("");
//   const location = useLocation();
//   const [promotion] = useState(location?.state?.promotion);
//   const [open, setOpen] = useState(false);
//   const onSelectAllClick = () => {
//     // Notification.success(e.toString());
//     // return
//     if (checked.length === 0) {
//       const newSelected = checked.map((n) => n);
//       setChecked(products);
//       return;
//     }
//     setChecked([]);
//   };
//   const handleToggle = (value,id) => () => {
    // const currentIndex = checked.findIndex(obj => obj.id === value.id);
    // Notification.success(promotiontotalElements);
    // const newChecked = [...checked];
   
    // // if (currentIndex === -1) {
    // if (currentIndex === -1) {  
    //   newChecked.push(value);
    // } else {
    //   newChecked.splice(currentIndex, 1);
    // }
//     setChecked(newChecked);
//     localStorage.setItem("checked", JSON.stringify(newChecked));
    
    
//   };
//   const [isParentChecked, setIsParentChecked] = useState(false);
  
//   useEffect(() => {
//     dispatch(PromotionDetailListAction());
//   }, [dispatch]);

//   useEffect(() => {
//     dispatch(
//       ProductPromotionDetail({
//         page,
//         sortField: valueToOrderBy,
//         sortDir: valueToSortDir,
//         keyword,
//         pageSize,
//         discount,
//         promotionId: promotion.id,
//       })
//     );
//     dispatch(
//       ShowProductPromotionDetail({
//         page,
//         sortField: valueToOrderBy,
//         sortDir: valueToSortDir,
//         keyword,
//         pageSize,
//         promotionId: promotion.id,
//       })
//     );
//     // products.map((u) => (changeCheckboxStatus(u.id)));
//   }, [
//     dispatch,
//     page,
//     valueToOrderBy,
//     valueToSortDir,
//     keyword,
//     pageSize,
//     discount,
//   ]);
//   const handleClose = () => {
//     setOpen(false);
//   };
//   const handleShow =() => {

//   }
//   // const changeCheckboxStatus = (e, id) => {
//   //   const myUsers = [...geted];
//   //   // const { checked } = e.target;
//   //   myUsers.map((user,index) => {
//   //     if (id === "p1") {
//   //       setIsParentChecked(checked);
//   //       checked[index] = checked;
//   //     } else {
//   //       if (user.id === id) {
//   //         checked[index] = checked;
//   //         // user.isChecked = checked;
//   //       }
//   //       const isAllChildsChecked = myUsers.every(
//   //         (user,index1) => checked[index1] === true
//   //       );
//   //       if (isAllChildsChecked) {
//   //         setIsParentChecked(checked);
//   //       } else {
//   //         setIsParentChecked(false);
//   //       }
//   //     }
//   //     return user;
//   //   });
    

//   //   setGeted([...myUsers]);
//   // };
//   const handleOK = () => {
//     // Notification.success(promotion.id.toString());
//     // return;
//     // const data = [];
//     // for( let i =0 ; i< checked.length; i++){
//     //   var obj =  {
//     //     discount: checked[i].name,
//     //     productId : checked[i].id,
//     //     promotionId: promotion.id,
          
//     //     }
//     //     data.push(obj);
//     // }
//     localStorage.setItem("promotionDetail", JSON.stringify(checked));
    
//     history.push("/promotiondetail/add", { promotionDetail: checked });
//   };

//   const handleRequestSort = (property) => {
//     const isAscending =
//       Object.is(valueToOrderBy, property) && Object.is(valueToSortDir, "asc");
//     setValueToOrderBy(property);
//     setValueToSortDir(isAscending ? "desc" : "asc");
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     setKeyword(discount);
//   };

//   const handlePage = (event, value) => {
//     setPage(value);
//   };
//   const onhandleUpdate = (item) => {

//   };
//   const handlePageSize = (e) => {
//     setPageSize(e.target.value);
//     setPage(1);
//   };

//   const onHandleRedirect = () => {
//     setOpen(true);

    
//   };

//   const handleChangeDiscount = (event) => {
//     setDiscount(event.target.value);
//     setPage(1);
//   };

//   const onhandleDelete = (id) => {
//     confirmAlert({
//       title: "Thông báo",
//       message: "Bạn có chắc muốn ngưng giảm giá sản phẩm?",
//       buttons: [
//         {
//           label: "Có",
//           onClick: () => {
//             dispatch(PromotionDetailDeleteAction(id));
//             Notification.success("Đã ngưng giảm giá sản phẩm thành công!");
//           },
//         },
//         {
//           label: "Không",
//         },
//       ],
//     });
//   };

//   const fields = [
//     { label: "Hình Ảnh" },
//     { name: "name", label: "Tên Sản Phẩm", dir: "asc" },
//     { label: "Giảm Giá" },
//     // { name: "price", label: "Đã Giảm Còn", dir: "asc" },
//     { name: "categoryId", label: "Loại", dir: "asc" },
//     // { name: "createdAt", label: "Ngày tạo" },
//     // { name: "endDate", label: "Ngày hết" },
//     { label: "Hành Động" },
//   ];
//   const fieldsP = [
//     { id:"image" , name: "name", label: "Hình Ảnh" },
//     { id:"name" ,name: "name", label: "Tên Sản Phẩm", dir: "asc" },
//     { id:"title" ,name: "", label: "Chú Thích", dir: "asc" },
//     //   { name: "price", label: "Giá", dir: "asc" },
//     { id:"categoryId" ,name: "categoryId", label: "Loại", dir: "asc" },
//     // { label: "Trạng Thái" },
//     // { label: "Hành Động" },
//   ];
//   const discounts = [
//     {
//       value: 0,
//       label: "Discount",
//     },
//     {
//       value: 10,
//       label: "10%",
//     },
//     {
//       value: 20,
//       label: "20%",
//     },
//     {
//       value: 30,
//       label: "30%",
//     },
//     {
//       value: 40,
//       label: "40%",
//     },
//     {
//       value: 50,
//       label: "50%",
//     },
//     {
//       value: 60,
//       label: "60%",
//     },
//     {
//       value: 70,
//       label: "70%",
//     },
//     {
//       value: 80,
//       label: "80%",
//     },
//     {
//       value: 90,
//       label: "90%",
//     },

//   ];

//   return (
//     <div>
//       <Grid
//         container
//         style={{
//           display: "flex",
//         }}
//         className={classes.wrapForm}
//       >
//         <Grid
//           item
//           md={7}
//           xl={12}
//           sm={12}
//           style={{
//             marginTop: 16,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//           }}
//           className={classes.wrapForm}
//         >
//           <form
//             onSubmit={handleSearch}
//             style={{
//               display: "flex",
//               flexWrap: "wrap",
//               flexDirection: "row-reverse",
//               alignItems: "center",
//             }}
//           >
//             <TextField
//               id="outlined-select-currency"
//               select
//               label="Discount"
//               value={discount}
//               onChange={handleChangeDiscount}
//               helperText="Chọn discount để lọc sản phẩm"
//             >
//               {discounts.map((option) => (
//                 <MenuItem key={option.value} value={option.value}>
//                   {option.label}
//                 </MenuItem>
//               ))}
//             </TextField>
//           </form>
//         </Grid>

//         <Grid
//           item
//           md={5}
//           xl={12}
//           sm={12}
//           style={{
//             display: "flex",
//             justifyContent: "flex-end",
//             alignItems: "center",
//             paddingTop: 16,
//           }}
//         >
//           <FormControl
//             style={{
//               marginLeft: 10,
//               display: "flex",
//               width: "100%",
//               justifyContent: "flex-end",
//               flexDirection: "row",
//             }}
//           >
//             <Button
//               size="small"
//               variant="outlined"
//               color="primary"
//               onClick={onHandleRedirect}
//             >
//               Thêm sản phẩm giảm giá
//             </Button>

//             <Select
//               native
//               value={pageSize}
//               onChange={handlePageSize}
//               className={classes.select}
//             >
//               <option value={3}>3</option>
//               <option value={5}>5</option>
//             </Select>
//           </FormControl>
//         </Grid>
//       </Grid>

//       <TableContainer component={Paper}>
//         <Table style={{ minWidth: 650 }} aria-label="simple table">
//           <TableHeader
//             valueToOrderBy={valueToOrderBy}
//             valueToSortDir={valueToSortDir}
//             handleRequestSort={handleRequestSort}
//             fields={fields}
//           />
//           <TableBody>
//             {promotionproducts.map((u, index) => (
//               u.promotionDetails.map((v, index) => (

//                 (v?.promotion?.id === promotion?.id) ? (
//                   <>
//                     <TableRow key={v.id}>
//                       <TableCell component="th" scope="row">
//                         <img
//                           alt=""
//                           width={60}
//                           height={60}
//                           src={u.linkImage ?? Logo}
//                         />
//                       </TableCell>
//                       <TableCell>{u.name}</TableCell>
//                       <TableCell>{v.discount}%</TableCell>
//                       {/* <TableCell>
//                         {(u.price * (1 - v?.discount / 100))
//                           .toLocaleString("it-IT", {
//                             style: "currency",
//                             currency: "VND",
//                           })
//                           .toString()}
//                       </TableCell> */}
//                       <TableCell>{u.categoryId?.name}</TableCell>

//                       <TableCell>
//                         <DeleteOutline
//                           style={{ color: "red", cursor: "pointer" }}
//                           // onClick={() => onhandleDelete(u.promotionDetail.id)}
//                           onClick={() => onhandleDelete(v.id)}
//                         />
//                       </TableCell>
//                     </TableRow>
//                   </>
//                 ) : (<></>)
//                 // <TableRow key={u.id}>

//               ))
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <Pagination
//         style={{ marginTop: 50 }}
//         color="primary"
//         shape="rounded"
//         count={promotiontotalPages}
//         page={page}
//         onChange={handlePage}
//         showFirstButton
//         showLastButton
//       />
//       <Dialog
//         open={open}
//         keepMounted
//         maxWidth="md"
//         fullWidth={true}
//         onClose={handleClose}
//         aria-labelledby="alert-dialog-slide-title"
//         aria-describedby="alert-dialog-slide-description"
//       >
//         {/* onSubmit={handleSubmit(onSubmit)} */}
//         <form >
//           <DialogContent className={classes.descriptionCard}>
//             <Typography component="h1" variant="h4" align="center">
//               Chọn sản phẩm giảm giá
//             </Typography>
//             <div>
//               <Grid
//                 container
//                 style={{
//                   display: "flex",
//                 }}
//                 className={classes.wrapForm}
//               >
//                 <Grid
//                   item
//                   md={10}
//                   xl={12}
//                   sm={12}
//                   style={{
//                     marginTop: 16,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "space-between",
//                   }}
//                   className={classes.wrapForm}
//                 >
//                   <form
//                     // onSubmit={handleSearchUser}
//                     style={{
//                       display: "flex",
//                       flexWrap: "wrap",
//                       flexDirection: "row-reverse",
//                       alignItems: "center",
//                     }}
//                     className={classes.form}
//                   >
//                     <TextField
//                       label="Tìm kiếm"
//                       margin="normal"
//                       onChange={(e) => setName(e.target.value)}
//                       className={classes.searchField}
//                     />
//                     <Button
//                       className={classes.btnSearch}
//                       type="submit"
//                       variant="contained"
//                       color="primary"
//                     >
//                       Tìm Kiếm
//                     </Button>
//                   </form>
//                 </Grid>

//                 <Grid
//                   item
//                   md={2}
//                   xl={12}
//                   sm={12}
//                   style={{
//                     display: "flex",
//                     justifyContent: "flex-end",
//                     alignItems: "center",
//                     paddingTop: 16,
//                   }}
//                 >
//                   <FormControl
//                     style={{
//                       marginTop: 16,
//                       marginLeft: 10,
//                       display: "flex",
//                       width: "100%",
//                       justifyContent: "space-between",
//                       flexDirection: "row",
//                     }}
//                   >
//                     <Select native value={pageSize} onChange={handlePageSize}>
//                       <option value={3}>3</option>
//                       <option value={5}>5</option>
//                     </Select>
//                   </FormControl>
//                 </Grid>
//               </Grid>

//               <TableContainer component={Paper}>
//                 <Table style={{ minWidth: 650 }} aria-label="simple table">
//                   <TableHead
//                     // valueToOrderBy={valueToOrderBy}
//                     // valueToSortDir={valueToSortDir}
//                     // handleRequestSort={handleRequestSort}
//                     // fields={fieldsP}
//                   >
//                     <TableCell padding="checkbox">
//           <Checkbox
//             color="primary"
//             indeterminate={checked.length > 0 && checked.length < promotiontotalElements}
//             // checked={promotiontotalElements > 0 && checked.length === promotiontotalElements}
//             checked={false}
//             onChange={onSelectAllClick}
//             inputProps={{
//               'aria-label': 'select all desserts',
//             }}
//           />
//         </TableCell>
//         {fieldsP.map((headCell) => (
//           <TableCell
//             key={headCell.id}
//             // align={headCell.numeric ? 'right' : 'left'}
//             // padding={headCell.disablePadding ? 'none' : 'normal'}
//             // sortDirection={orderBy === headCell.id ? order : false}
//           >
//             {headCell.label}
//           </TableCell>
//         ))}
//                   </TableHead>
//                   <TableBody>
//                     {products.map((u) => (

//                       <TableRow key={u.id}>
// {/* <TableCell>
//   <Checkbox       
//                           checked={u?.isChecked}
//                           tabIndex={-1}
//                           disableRipple
//                           onClick={handleToggle(u)}
//                         /></TableCell> */}
//                         <TableCell><Checkbox
//                           // checked={checked.indexOf(u) !== -1}
//                           // checked={checked.some(element => {
//                           //   if (element.id === u.id) {
//                           //     return true;
//                           //   }
//                           //   return false;
//                           // })}
//                           checked={checked.some(element => {
//                             return element.id === u.id;
//                           })}
//                           tabIndex={-1}
//                           disableRipple
//                           onClick={handleToggle(u,u.id)}
//                         // inputProps={{ 'aria-labelledby': labelId }}
//                         /></TableCell>
//                         <TableCell component="th" scope="row">
//                           <img
//                             alt=""
//                             width={60}
//                             height={60}
//                             src={u.linkImage ?? Logo}
//                           />
//                         </TableCell>
//                         <TableCell>{u.name}</TableCell>
//                         <TableCell>{u.title}</TableCell>
//                         {/* <TableCell>
//                   {u.price.toLocaleString("it-IT", {
//                     style: "currency",
//                     currency: "VND",
//                   })}
//                 </TableCell> */}
//                         <TableCell>{u.categoryId.name}</TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
              
//               <Pagination
//                 style={{ marginTop: 50 }}
//                 color="primary"
//                 shape="rounded"
//                 count={totalPages}
//                 page={page}
//                 onChange={handlePage}
//                 showFirstButton
//                 showLastButton
//               />
//               <Button
//                 className={classes.btnSearch}
//                 onClick={handleOK}
//                 variant="contained"
//                 color="primary"
//               >
//                 OK
//               </Button>
//             </div>

//           </DialogContent>
//         </form>

//       </Dialog>
//     </div>
//   );
// };

// export default PromotionDetail;
