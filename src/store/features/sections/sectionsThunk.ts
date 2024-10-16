import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiGetSectionList,
  apiCreateSectionList,
  apiUpdateSection,
  apiGetSectionById,
} from "./sectionsApi";
import { SECTION_CREATE } from "./type";

// Fetch course list thunk
export const fetchSectionList = createAsyncThunk(
  "sections/fetchSectionList",
  async (
    { size, currentPage }: { size: number; currentPage: number },
    { rejectWithValue },
  ) => {
    try {
      const response = await apiGetSectionList(size, currentPage);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message.toString());
    }
  },
);

// Create course thunk
export const createSection = createAsyncThunk(
  "sections/createSection",
  async (
    { sectionData }: { sectionData: SECTION_CREATE },

    { rejectWithValue },
  ) => {
    try {
      const response = await apiCreateSectionList(sectionData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

// Update course thunk
export const updateSection = createAsyncThunk(
  "sections/updateSection",
  async (
    {
      id,
      sectionData,
    }: { id: number | string | null; sectionData: SECTION_CREATE },
    { rejectWithValue },
  ) => {
    try {
      const response = await apiUpdateSection(id, sectionData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

//get course by id
export const getSectionById = createAsyncThunk(
  "sections/getSectionById",
  async ({ id }: { id: number | string | null }, { rejectWithValue }) => {
    try {
      const response = await apiGetSectionById(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

// Delete semester thunk
