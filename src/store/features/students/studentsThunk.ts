import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiGetStudentsList,
  apiCreateStudentsList,
  apiUpdateStudents,
  apiGetStudentsById,
} from "./studentsApi";
import { STUDENT_CREATE, GET_STUDENT_BY_ID } from "./type";

// Fetch course list thunk
export const fetchStudentsList = createAsyncThunk(
  "students/fetchStudentsList",
  async (
    {
      size,
      currentPage,
      search,
    }: { size: number; currentPage: number; search?: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await apiGetStudentsList(size, currentPage, search);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message.toString());
    }
  },
);

// Create course thunk
export const createStudents = createAsyncThunk(
  "students/createStudents",
  async (
    { studentsData }: { studentsData: STUDENT_CREATE },

    { rejectWithValue },
  ) => {
    try {
      const response = await apiCreateStudentsList(studentsData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

// Update course thunk
export const updateStudents = createAsyncThunk(
  "students/updateStudents",
  async (
    {
      id,
      studentsData,
    }: { id: number | string | null; studentsData: STUDENT_CREATE },
    { rejectWithValue },
  ) => {
    try {
      const response = await apiUpdateStudents(id, studentsData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

//get course by id
export const getStudentsById = createAsyncThunk(
  "students/getStudentsById",
  async ({ id }: { id: number | string | null }, { rejectWithValue }) => {
    try {
      const response = await apiGetStudentsById(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
