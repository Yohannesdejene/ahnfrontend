import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiGetCourseList,
  apiCreateCourse,
  apiUpdateCourse,
  apiDeleteCourse,
  apiGetCourseById,
} from "./courseApi";
import { GiConsoleController } from "react-icons/gi";

// Fetch course list thunk
export const fetchCourseList = createAsyncThunk(
  "courses/fetchCourseList",
  async (
    { size, currentPage }: { size: number; currentPage: number },
    { rejectWithValue },
  ) => {
    try {
      const response = await apiGetCourseList(size, currentPage);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message.toString());
    }
  },
);

// Create course thunk
export const createCourse = createAsyncThunk(
  "courses/createCourse",
  async ({ courseData }: { courseData: Partial<any> }, { rejectWithValue }) => {
    try {
      const response = await apiCreateCourse(courseData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

// Update course thunk
export const updateCourse = createAsyncThunk(
  "courses/updateCourse",
  async (
    {
      id,
      courseData,
    }: { id: number | string | null; courseData: Partial<any> },
    { rejectWithValue },
  ) => {
    try {
      const response = await apiUpdateCourse(id, courseData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

//get course by id
export const getCourseById = createAsyncThunk(
  "courses/getCourseById",
  async ({ id }: { id: number | string | null }, { rejectWithValue }) => {
    try {
      const response = await apiGetCourseById(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

// Delete course thunk
export const deleteCourse = createAsyncThunk(
  "courses/deleteCourse",
  async (id: number | string | null, { rejectWithValue }) => {
    try {
      const response = await apiDeleteCourse(id);
      console.log("response", response);
      return response;
    } catch (error: any) {
      console.log("err", error);
      return rejectWithValue(error.message);
    }
  },
);
