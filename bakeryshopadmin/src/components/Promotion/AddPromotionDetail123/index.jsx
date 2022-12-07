// import {
//   Button,
//   FormControl,
//   Paper,
//   Select,
//   Grid,
//   makeStyles,
//   Table,
//   TableCell,
//   TextField,
//   Typography,
//   TableContainer,
//   TableBody,
//   TableRow,
// } from "@material-ui/core";
// import { useDispatch, useSelector } from "react-redux";
// import React, { useEffect, useState } from "react";
// // import { PromotionDetailListAction } from "../../../store/actions/PromotionDetailAction";
// import { ShowProductPromotionDetail } from "../../../store/actions/ProductAction";
// import Logo from "./../../../assets/img/BakeryShop.gif";
// import Pagination from "@material-ui/lab/Pagination";
// import { useHistory, useLocation } from "react-router-dom";
// import TableHeader from "../../TableHeader";
// import { ProductSaleOff } from "../../../store/actions/ProductAction";
// const useStyles = makeStyles((theme) => ({
//   root: {
//     overflow: "hidden",
//   },
//   formControl: {
//     minWidth: 120,
//     marginTop: 20,
//   },
//   btn: {
//     width: 90.18,
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

// const AddPromotionDetail = () => {
//   const classes = useStyles();

//   const history = useHistory();
//   const location = useLocation();
//   const [promotion] = useState(location?.state.promotion);
//   const dispatch = useDispatch();

//   const { products, totalPages } = useSelector((state) => state.product);
//   const [page, setPage] = useState(1);
//   const [valueToOrderBy, setValueToOrderBy] = useState("id");
//   const [valueToSortDir, setValueToSortDir] = useState("asc");
//   const [keyword, setKeyword] = useState("");
//   const [name, setName] = useState("");
//   const [pageSize, setPageSize] = useState(3);
//   const [discount, setDiscount] = useState(0);
//   useEffect(() => {
//     dispatch(
//       ShowProductPromotionDetail({
//         page,
//         sortField: valueToOrderBy,
//         sortDir: valueToSortDir,
//         keyword,
//         pageSize,
//       })
//     );
//   }, [dispatch, page, valueToOrderBy, valueToSortDir, keyword, pageSize]);

//   // useEffect(() => {
//   //   dispatch(
//   //     ProductSaleOff({
//   //       page,
//   //       sortField: valueToOrderBy,
//   //       sortDir: valueToSortDir,
//   //       keyword,
//   //       pageSize,
//   //       discount,
//   //     })
//   //   );
//   // }, [
//   //   dispatch,
//   //   page,
//   //   valueToOrderBy,
//   //   valueToSortDir,
//   //   keyword,
//   //   pageSize,
//   //   discount,
//   // ]);

//   const handleRequestSort = (property) => {
//     const isAscending =
//       Object.is(valueToOrderBy, property) && Object.is(valueToSortDir, "asc");
//     setValueToOrderBy(property);
//     setValueToSortDir(isAscending ? "desc" : "asc");
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     setKeyword(name);
//     setPage(1);
//   };

//   const handlePage = (event, value) => {
//     setPage(value);
//   };

//   const handlePageSize = (e) => {
//     setPageSize(e.target.value);
//     setPage(1);
//   };

//   const fields = [
//     { label: "Hình Ảnh" },
//     { name: "name", label: "Tên Sản Phẩm", dir: "asc" },
//     { name: "price", label: "Giá", dir: "asc" },
//     { name: "categoryId", label: "Loại", dir: "asc" },
//     { label: "Hành Động" },
//   ];


//   const handleAddPromotionDetail = (item) => {
//     history.push("/promotiondetail/create", { product: item , promotion: promotion  });
//   };

//   return (
//     <div className={classes.root}>
//       <Grid container spacing={3}>
//         <Grid item md={12} sm={12} xs={12}>
//           <Typography variant="h4">Giảm giá cho sản phẩm</Typography>

//           <Grid
//             container
//             style={{
//               display: "flex",
//             }}
//             className={classes.wrapForm}
//           >
//             <Grid
//               item
//               md={9}
//               xl={12}
//               sm={12}
//               style={{
//                 marginTop: 16,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//               }}
//               className={classes.wrapForm}
//             >
//               <form
//                 onSubmit={handleSearch}
//                 style={{
//                   display: "flex",
//                   flexWrap: "wrap",
//                   flexDirection: "row-reverse",
//                   alignItems: "center",
//                 }}
//                 className={classes.form}
//               >
//                 <TextField
//                   label="Tìm kiếm"
//                   margin="normal"
//                   onChange={(e) => setName(e.target.value)}
//                   className={classes.searchField}
//                 />
//                 <Button
//                   className={classes.btnSearch}
//                   type="submit"
//                   variant="contained"
//                   color="primary"
//                 >
//                   Tìm Kiếm
//                 </Button>
//               </form>
//             </Grid>

//             <Grid
//               item
//               md={3}
//               xl={12}
//               sm={12}
//               style={{
//                 display: "flex",
//                 justifyContent: "flex-end",
//                 alignItems: "center",
//                 paddingTop: 16,
//               }}
//             >
//               <FormControl
//                 style={{
//                   marginTop: 16,
//                   marginLeft: 10,
//                   display: "flex",
//                   width: "100%",
//                   justifyContent: "flex-end",
//                   flexDirection: "row",
//                 }}
//               >
//                 <Select
//                   native
//                   value={pageSize}
//                   onChange={handlePageSize}
//                   className={classes.select}
//                 >
//                   <option value={3}>3</option>
//                   <option value={5}>5</option>
//                 </Select>
//               </FormControl>
//             </Grid>
//           </Grid>

//           <TableContainer component={Paper}>
//             <Table style={{ minWidth: 650 }} aria-label="simple table">
//               <TableHeader
//                 valueToOrderBy={valueToOrderBy}
//                 valueToSortDir={valueToSortDir}
//                 handleRequestSort={handleRequestSort}
//                 fields={fields}
//               />
//               <TableBody>
//                 {products.map((u) => (
//                   <TableRow key={u.id}>
//                     <TableCell component="th" scope="row">
//                       <img
//                         alt=""
//                         width={60}
//                         height={60}
//                         src={u.linkImage ?? Logo}
//                       />
//                     </TableCell>
//                     <TableCell>{u.name}</TableCell>
//                     <TableCell>
//                       {u.price.toLocaleString("it-IT", {
//                         style: "currency",
//                         currency: "VND",
//                       })}
//                     </TableCell>
//                     <TableCell>{u.categoryId.name}</TableCell>
//                     <TableCell>
//                       <Button
//                         className={classes.btnSearch}
//                         variant="contained"
//                         color="secondary"
//                         onClick={() => handleAddPromotionDetail(u)}
//                       >
//                         Giảm Giá
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//           <Pagination
//             style={{ marginTop: 50 }}
//             color="primary"
//             shape="rounded"
//             count={totalPages}
//             page={page}
//             onChange={handlePage}
//             showFirstButton
//             showLastButton
//           />
//         </Grid>
//       </Grid>
//     </div>
//   );
// };

// export default AddPromotionDetail;
