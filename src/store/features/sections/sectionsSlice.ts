import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchSectionList,
  createSection,
  updateSection,
  getSectionById,
} from "./sectionsThunk"; // These need to be exported later
import { toast } from "react-hot-toast";
import { t } from "@/utils/translation";
import {
  SECTION_CREATE,
  SECTION_INITIAL_STATE,
  SECTION,
  PAGINATION,
} from "./type";

const initialState: SECTION_INITIAL_STATE = {
  sections: [],
  pagination: {
    page: 1,
    limit: 10,
    numberOfResults: 0,
    numberOfPages: 1,
  },
  loadingSections: false,
  errorSections: null,
  createSectionSuccess: false,
  createSectionLoading: false,
  createSectionError: null,
  updateSectionLoading: false,
  updateSectionError: null,
  updateSectionSuccess: false,
  selectedSection: null,
  getSectionByIdLoading: false,
  getSectionByIdError: null,
  deleteSectionLoading: false,
  deleteSectionError: null,
  deleteSectionSuccess: false,
};

const sectionsSlice = createSlice({
  name: "sections",
  initialState,
  reducers: {
    resetCreateState: (state) => {
      state.createSectionLoading = false;
      state.createSectionError = null;
      state.createSectionSuccess = false;
    },
    resetUpdateState: (state) => {
      state.updateSectionLoading = false;
      state.updateSectionError = null;
      state.updateSectionSuccess = false;
    },
  },
  extraReducers: (builder) => {
    let toastId: any = null;
    // Fetch course list
    builder
      .addCase(fetchSectionList.pending, (state) => {
        state.loadingSections = true;
        state.errorSections = null;
      })
      .addCase(
        fetchSectionList.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loadingSections = false;
          state.sections = action.payload.data;
          state.pagination = action.payload?.metadata?.pagination;
        },
      )
      .addCase(fetchSectionList.rejected, (state, action) => {
        state.loadingSections = false;
        state.errorSections =
          action.error.message || "Failed to fetch Sections";
      });

    // Create Year
    builder
      .addCase(createSection.pending, (state) => {
        state.createSectionLoading = true;
        state.createSectionError = null;
        state.createSectionSuccess = false;
        toastId = toast.loading(`${t("section.creatingSection")}...`);
      })
      .addCase(createSection.fulfilled, (state, action: PayloadAction<any>) => {
        state.createSectionLoading = false;
        state.createSectionSuccess = true;
        state.sections.push(action.payload);
        toast.success(t("section.sectionCreatedSuccessfully"), {
          id: toastId,
        });
      })
      .addCase(createSection.rejected, (state, action) => {
        state.createSectionLoading = false;
        state.createSectionSuccess = false;
        state.createSectionError =
          action.error.message || "Failed to create Section";
        toast.error(`${action?.payload || "Failed to create Section"}`, {
          id: toastId,
        });
      });

    // Update Year
    builder
      .addCase(updateSection.pending, (state) => {
        state.updateSectionLoading = true;
        state.updateSectionError = null;
        state.updateSectionSuccess = false;
        toastId = toast.loading(`${t("section.updatingSection")}...`);
      })
      .addCase(updateSection.fulfilled, (state, action: PayloadAction<any>) => {
        state.updateSectionLoading = false;
        state.updateSectionSuccess = true;
        console.log(" action.payload", action.payload);
        state.sections = state.sections.map((section) =>
          section.id === action.payload.id ? action.payload : section,
        );

        // Update sele   ctedYear if it's the same as the updated year
        if (
          state.selectedSection &&
          state.selectedSection.id === action.payload.id
        ) {
          state.selectedSection = action.payload;
        }
        toast.success(t("section.sectionUpdatedSuccessfully"), {
          id: toastId,
        });
      })
      .addCase(updateSection.rejected, (state, action) => {
        state.updateSectionLoading = false;
        state.updateSectionError =
          action.error.message || "Failed to update semester";

        toast.error(`${action?.payload || "Failed to update section"}`, {
          id: toastId,
        });
      });

    ///get course By id
    builder
      .addCase(getSectionById.pending, (state) => {
        state.getSectionByIdLoading = true;
        state.getSectionByIdError = null;
      })
      .addCase(
        getSectionById.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getSectionByIdLoading = false;
          state.selectedSection = action.payload;
        },
      )
      .addCase(getSectionById.rejected, (state, action) => {
        state.getSectionByIdLoading = false;

        state.getSectionByIdError =
          action.error.message || "Failed to fetch section";
      });

    // Delete Semest  er
  },
});
1;
// Export actions and reducer
export const { resetCreateState, resetUpdateState } = sectionsSlice.actions;

export default sectionsSlice.reducer;

// Export thunks so you can use them in other files
export { fetchSectionList, createSection, updateSection, getSectionById };
