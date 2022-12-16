import {
  Button,
  FormControl,
  Grid,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  makeStyles,
  Chip,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@material-ui/lab/Pagination";
import TableHeader from "../TableHeader";
import { useHistory } from "react-router-dom";
import {
  CreateOutlined,
  DeleteOutline,
  Replay,
  Visibility,
} from "@material-ui/icons";
import {
  PromotionPageAction,
  PromotionDeleteAction,
} from "../../store/actions/PromotionAction";
import { confirmAlert } from "react-confirm-alert";
import Notification from "../../common/Notification";
import Moment from "react-moment";
const useStyles = makeStyles((theme) => ({
  hover: {
    "&:hover": {
        //   backgroundColor: "white !important",
        // backgroundColor: "#e7deb5",
        backgroundColor: "#F5F5F5",
    },
},
  btn: {
    width: 90.18,
    height: 36,
  },
  searchField: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  btnSearch: {
    background: "#020202",
    background: "#020202",
    width: 100,
    height: 36,
    marginTop: 16,
    marginRight: 30,

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginBottom: 16,
      marginRight: 0,
    },
  },
  wrapForm: {
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column-reverse",
    },
  },
  select: {
    marginLeft: 30,
    [theme.breakpoints.down("sm")]: {
      marginLeft: 200,
    },
  },
}));

const Promotion = () => {
  const classes = useStyles();
  const history = useHistory();

  const dispatch = useDispatch();
  const { promotions, totalPages } = useSelector((state) => state.promotion);
  const [page, setPage] = useState(1);
  const [valueToOrderBy, setValueToOrderBy] = useState("id");
  const [valueToSortDir, setValueToSortDir] = useState("asc");
  const [keyword, setKeyword] = useState("");
  const [name, setName] = useState("");
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    dispatch(
      PromotionPageAction({
        page,
        sortField: valueToOrderBy,
        sortDir: valueToSortDir,
        keyword,
        pageSize,
      })
    );
  }, [dispatch, page, valueToOrderBy, valueToSortDir, keyword, pageSize]);

  const handleRequestSort = (property) => {
    const isAscending =
      Object.is(valueToOrderBy, property) && Object.is(valueToSortDir, "asc");
    setValueToOrderBy(property);
    setValueToSortDir(isAscending ? "desc" : "asc");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setKeyword(name);
    setPage(1);
  };

  const handlePage = (event, value) => {
    setPage(value);
  };

  const handlePageSize = (e) => {
    setPageSize(e.target.value);
    setPage(1);
  };

  const onHandleRedirect = () => {
    history.push("/promotion/add");
  };

  const onhandleUpdate = (item) => {
    history.push("/promotion/edit", { promotion: item });
  };

  const onhandleDetail = (item) => {
    history.push("/promotion/detail", { promotion: item });
  };

  const onhandleDelete = (id) => {
    confirmAlert({
      title: "Thông báo",
      message: "Bạn có chắc muốn cập nhật trạng thái?",
      buttons: [
        {
          label: "Có",
          onClick: () => {
            dispatch(PromotionDeleteAction(id));
            Notification.success("Đã cập nhật thành công!");
          },
        },
        {
          label: "Không",
        },
      ],
    });
  };

  const fields = [
    { name: "name", label: "Tên loại sản phẩm", dir: "asc" },
    { name: "employeeId", label: "Mã nhân viên tạo", dir: "asc" },
    { name: "createdAt", label: "Ngày tạo" },
    { name: "startDate", label: "Ngày bắt đầu" },
    { name: "endDate", label: "Ngày kết thúc" },
    { label: "Trạng thái" },
    { label: "Hành Động" },
  ];

  return (
    <div>
      <Grid
        container
        style={{
          display: "flex",
        }}
        className={classes.wrapForm}
      >
        <Grid
          item
          md={9}
          xl={12}
          sm={12}
          style={{
            marginTop: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          className={classes.wrapForm}
        >
          <form
            onSubmit={handleSearch}
            style={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row-reverse",
              alignItems: "center",
            }}
            className={classes.form}
          >
            <TextField
              label="Tìm kiếm"
              margin="normal"
              onChange={(e) => setName(e.target.value)}
              className={classes.searchField}
            />
            <Button
              className={classes.btnSearch}
              type="submit"
              variant="contained"
              color="primary"
            >
              Tìm Kiếm
            </Button>
          </form>
        </Grid>

        <Grid
          item
          md={3}
          xl={12}
          sm={12}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingTop: 16,
          }}
        >
          <FormControl
            style={{
              marginTop: 16,
              marginLeft: 10,
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <Button
              size="small"
              variant="outlined"
              color="primary"
              onClick={onHandleRedirect}
            >
              Thêm đợt khuyến mãi
            </Button>

            <Select
              native
              value={pageSize}
              onChange={handlePageSize}
              className={classes.select}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table style={{ minWidth: 650 }} aria-label="simple table">
          <TableHeader
            valueToOrderBy={valueToOrderBy}
            valueToSortDir={valueToSortDir}
            handleRequestSort={handleRequestSort}
            fields={fields}
          />
          <TableBody>
            {promotions.map((u) => (
              <TableRow className={classes.hover} key={u.id}>
                <TableCell>{u.name}</TableCell>
                <TableCell>{u?.employeeId?.username}</TableCell>
                <TableCell>
                  <Moment format="DD/MM/YYYY HH:mm">{u?.createdAt}</Moment>
                </TableCell>
                <TableCell>
                  <Moment format="DD/MM/YYYY HH:mm">{u?.startDate}</Moment>
                </TableCell>
                <TableCell>
                  <Moment format="DD/MM/YYYY HH:mm">{u?.endDate}</Moment>
                </TableCell>
                <TableCell>
                  {u.deletedAt ? (
                    <Chip
                      label="Ngừng khuyến mãi"
                      style={{ backgroundColor: "red", color: "white" }}
                    />
                  ) : (
                    <Chip
                      label="Hoạt động"
                      style={{ backgroundColor: "green", color: "white" }}
                    />
                  )}
                </TableCell>
                <TableCell>
                  <Visibility
                    style={{
                      color: "grey",
                      cursor: "pointer",
                      marginRight: 10,
                    }}
                    onClick={() => onhandleDetail(u)}
                  />
                  <CreateOutlined
                    style={{
                      color: "#3f51b5",
                      cursor: "pointer",
                      marginRight: 10,
                    }}
                    onClick={() => onhandleUpdate(u)}
                  />
                  {u.deletedAt ? (
                    <Replay
                      style={{ cursor: "pointer", color: "green" }}
                      onClick={() => onhandleDelete(u.id)}
                    />
                  ) : (
                    <DeleteOutline
                      style={{ color: "red", cursor: "pointer" }}
                      onClick={() => onhandleDelete(u.id)}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        style={{ marginTop: 50 }}
        color="primary"
        shape="rounded"
        count={totalPages}
        page={page}
        onChange={handlePage}
        showFirstButton
        showLastButton
      />
    </div>
  );
};

export default Promotion;
