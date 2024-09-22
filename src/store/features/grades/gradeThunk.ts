import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiGetGradeList,
  apiCreateGradeList,
  apiUpdateGrade,
  apiGetGradeById,
} from "./gradeApi";
import { GRADE_CREATE } from "./type";

// Fetch course list thunk
export const fetchGradeList = createAsyncThunk(
  "grades/fetchGradeList",
  async (
    { size, currentPage }: { size: number; currentPage: number },
    { rejectWithValue },
  ) => {
    try {
      const response = await apiGetGradeList(size, currentPage);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message.toString());
    }
  },
);

// Create course thunk
export const createGrade = createAsyncThunk(
  "grades/createGrade",
  async (
    { gradeData }: { gradeData: GRADE_CREATE },

    { rejectWithValue },
  ) => {
    try {
      const response = await apiCreateGradeList(gradeData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

// Update course thunk
export const updateGrade = createAsyncThunk(
  "grades/updateGrade",
  async (
    { id, gradeData }: { id: number | string | null; gradeData: GRADE_CREATE },
    { rejectWithValue },
  ) => {
    try {
      const response = await apiUpdateGrade(id, gradeData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

//get course by id
export const getGradeById = createAsyncThunk(
  "grades/getGradeById",
  async ({ id }: { id: number | string | null }, { rejectWithValue }) => {
    try {
      const response = await apiGetGradeById(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

// Delete semester thunk
