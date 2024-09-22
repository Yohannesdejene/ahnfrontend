import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiGetSemesterList,
  apiCreateSemesterList,
  apiUpdateSemester,
  apiGetSemesterById,
  apiDeleteSemester,
} from "./semesterApi";
import { SEMESTER_CREATE } from "./type";

// Fetch course list thunk
export const fetchSemesterList = createAsyncThunk(
  "semesters/fetchSemesterList",
  async (
    { size, currentPage }: { size: number; currentPage: number },
    { rejectWithValue },
  ) => {
    try {
      const response = await apiGetSemesterList(size, currentPage);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message.toString());
    }
  },
);

// Create course thunk
export const createSemester = createAsyncThunk(
  "semesters/createSemester",
  async (
    { semesterData }: { semesterData: SEMESTER_CREATE },

    { rejectWithValue },
  ) => {
    try {
      const response = await apiCreateSemesterList(semesterData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

// Update course thunk
export const updateSemester = createAsyncThunk(
  "semesters/updateSemester",
  async (
    {
      id,
      semesterData,
    }: { id: number | string | null; semesterData: SEMESTER_CREATE },
    { rejectWithValue },
  ) => {
    try {
      const response = await apiUpdateSemester(id, semesterData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

//get course by id
export const getSemesterById = createAsyncThunk(
  "semesters/getSemesterById",
  async ({ id }: { id: number | string | null }, { rejectWithValue }) => {
    try {
      const response = await apiGetSemesterById(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

// Delete semester thunk
export const deleteSemester = createAsyncThunk(
  "semesters/deleteSemester",
  async ({ id }: { id: number | string | null }, { rejectWithValue }) => {
    try {
      const response = await apiDeleteSemester(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
