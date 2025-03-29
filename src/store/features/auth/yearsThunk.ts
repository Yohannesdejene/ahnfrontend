// import { createAsyncThunk } from "@reduxjs/toolkit";
// import {
//   apiGetYearList,
//   apiCreateYear,
//   apiUpdateYear,
//   apiGetYearById,
// } from "./authApi";

// // Fetch course list thunk
// export const fetchYearList = createAsyncThunk(
//   "years/fetchYearList",
//   async (
//     { size, currentPage }: { size: number; currentPage: number },
//     { rejectWithValue },
//   ) => {
//     try {
//       const response = await apiGetYearList(size, currentPage);
//       return response;
//     } catch (error: any) {
//       return rejectWithValue(error.message.toString());
//     }
//   },
// );

// // Create course thunk
// export const createYear = createAsyncThunk(
//   "years/createYear",
//   async ({ yearData }: { yearData: Partial<any> }, { rejectWithValue }) => {
//     try {
//       const response = await apiCreateYear(yearData);
//       return response;
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   },
// );

// // Update course thunk
// export const updateYear = createAsyncThunk(
//   "years/updateYear",
//   async (
//     { id, yearData }: { id: number | string | null; yearData: Partial<any> },
//     { rejectWithValue },
//   ) => {
//     try {
//       const response = await apiUpdateYear(id, yearData);
//       return response;
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   },
// );

// //get course by id
// export const getYearById = createAsyncThunk(
//   "years/getYearById",
//   async ({ id }: { id: number | string | null }, { rejectWithValue }) => {
//     try {
//       const response = await apiGetYearById(id);
//       return response;
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   },
// );
