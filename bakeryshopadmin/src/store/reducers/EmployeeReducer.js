import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employees: [],
  totalPages: 1,
  employee: {},
  wishlist: null,
  error: {},
};

const EmployeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    employeebyusername: (state, action) => {
      state.employee = action.payload.user;
      // state.employee = action.payload.user;
      state.wishlist = action.payload.wishlistResponse;
    },
    profileUpdate: (state, action) => {
      state.employee = action.payload;
    },
    getEmployees: (state, action) => {
      state.totalPages = action.payload.totalPages;
      state.employees = action.payload.content;
    },
    onStatus: (state, action) => {
      const index = state.employees.findIndex((u) =>
        Object.is(u.username, action.payload.username)
      );
      state.employees[index].deletedAt = action.payload.deletedAt;
    },
    employeeAdded: (state, action) => {
      state.employees.push(action.payload);
    },

  },
});

const { reducer, actions } = EmployeeSlice;
export const {employeebyusername, getEmployees, onStatus,employeeAdded, employeeUpdate, employeeDelete,profileUpdate } = actions;
export default reducer;
