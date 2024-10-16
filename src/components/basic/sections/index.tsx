"use client";
import React, { useState, useEffect, useRef } from "react";
import { t } from "@/utils/translation";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import {
  Button as BaseButton,
  Alert,
  createTheme,
  Box,
  ThemeProvider,
  Tab,
  Button,
  Select,
  MenuItem,
  Pagination,
} from "@mui/material";
import { IconButton, Tooltip } from "@mui/material";
import Chip from "@mui/material/Chip";
import CommonDrawer from "@/common/Drawer";
import { fetchStudentsList } from "@/store/features/students/studentsSlice";
import { RootState, AppDispatch } from "@/store/store";
import { IoMdEye } from "react-icons/io";
import CommonSearch from "@/common/commonSearch";
import AddStudent from "./add";
import { useRouter } from "next/navigation";
import { LIST_DETAIL_STUDENTS } from "@/routes";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel/TabPanel";
import TabContext from "@mui/lab/TabContext";
import { FaUserGraduate } from "react-icons/fa"; // Import the icon you want to use
import { IoAddCircleSharp } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { register } from "module";
import { fetchSectionsList } from "@/store/features/sections/sectionsSlice";
const theme = createTheme({
  components: {
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: "#0097B2",
          // Set your custom color here
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            color: "#0097B2", // Set the text color for active tab here
          },
          "&.MuiTab-textColorInherit": {
            color: "red", // Set the text color for inactive tab here
          },
        },
      },
    },
  },
});
const tabStyles = {
  flexDirection: {
    xs: "column",
    sm: "row",
  },
  // fontWeight: "bold",
  alignItems: "center",
  fontSize: "15px",
  textDecoration: "none",
  textTransform: "none",
  "& .MuiTab-wrapper": {
    flexDirection: "row",
    alignItems: "center",
  },
};

function convertISOToNormalDate(isoDate: string): string {
  const date = new Date(isoDate);

  // Options for formatting the date
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long", // Month by name (e.g., "January")
    day: "numeric",
  };

  // Format the date
  return date.toLocaleDateString(undefined, options);
}
const optionsPerPage = [
  { label: "10", value: 10 },
  { label: "20", value: 20 },
  { label: "30", value: 30 },
  { label: "40", value: 40 },
  { label: "50", value: 50 },
  { label: "100", value: 100 },
  { label: "500", value: 500 },
];
const statusShow = (status: boolean) => {
  if (status) {
    return <Chip color="success" label=" Active" sx={{ width: "100px" }} />;
  } else {
    return <Chip color="error" label="Not active" sx={{ width: "100px" }} />;
  }
};

const SectionsList: React.FC = () => {
  const router = useRouter();
  const [drawerDisplay, setDrawerDisplay] = useState("add");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [id, setId] = useState<number | string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const dispatch: AppDispatch = useDispatch(); // Use the AppDispatch type
  const { students, loadingStudents, pagination } = useSelector(
    (state: RootState) => state.students,
  );
  console.log("pagination-pagination", pagination);
  const [value, setValue] = React.useState("listStudents");
  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };
  const handleSearch = (searchTerm: string) => {
    // setPage(1);
    // setSize(10);
    const data = { size: 10, currentPage: 1, search: searchTerm };
    dispatch(fetchStudentsList(data));
  };
  useEffect(() => {
    const data = { size: size, currentPage: page };
    dispatch(fetchStudentsList(data));
  }, [page, size, dispatch]);

  const handlePageSizeChange = (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    setSize(event.target.value as number);
    setPage(1); // Reset to first page when changing page size
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  const handleReset = () => {
    setPage(1);
    setSize(10);
    dispatch(fetchStudentsList({ size: 10, currentPage: 1 }));
  };
  // Function to toggle the drawer open/close
  const toggleDrawer = (open: boolean) => {
    setIsDrawerOpen(open);
  };
  const handleDialog = (open: boolean) => {
    setIsDialogOpen(open);
  };

  // Conditionally create rows only when loading is false and students is available
  const rows: GridRowsProp =
    !loadingStudents && students && students?.length > 0
      ? students?.map((yearData: any, index: number) => ({
          id: index, // Or use a unique property if available in your data
          ...yearData,
        }))
      : [];

  const handleEditDrawer = (id: number) => {
    console.log("id", id);
    setId(id);
    setDrawerDisplay("edit");
    toggleDrawer(true);
  };

  const handleAddDrawer = () => {
    toggleDrawer(true);
  };

  const columns: GridColDef[] = [
    {
      field: "first_name",
      headerName: t("students.firstName"),
      width: 120,
      align: "left",
    },
    {
      field: "middle_name",
      headerName: t("students.middleName"),
      width: 120,
      align: "left",
    },
    {
      field: "last_name",
      headerName: t("students.lastName"),
      width: 120,
      align: "left",
    },

    {
      field: "department",
      headerName: t("students.department"),
      width: 120,
      align: "left",
    },
    {
      field: "sex",
      headerName: t("students.sex"),
      width: 80,
      align: "left",
    },
    {
      field: "age",
      headerName: t("students.age"),
      width: 80,
      align: "left",
    },
    {
      field: "nationality",
      headerName: t("students.nationality"),
      width: 80,
      align: "left",
    },

    {
      field: "status",
      headerName: t("common.status"),
      width: 150,
      align: "center",
      renderCell: (params) => {
        const value = params.value;
        return <div className="my-2 flex gap-2">{statusShow(value)}</div>;
      },
    },
    {
      field: "id",
      headerName: t("common.action"),
      width: 100,
      align: "center",
      renderCell: (params) => {
        const value = params.value;
        return (
          <div className="my-2 flex gap-2">
            <Tooltip title={t("common.viewDetails")} arrow>
              <IconButton
                // onClick={() => handleEditDrawer(value)}
                onClick={() => router.push(`${LIST_DETAIL_STUDENTS}/${value}`)}
                sx={{
                  color: "#0097B2",
                  "&:hover": {
                    backgroundColor: "rgba(0, 151, 178, 0.04)",
                  },
                }}
              >
                <IoMdEye fontSize="large" />
              </IconButton>
            </Tooltip>
          </div>
        );
      },
    },
  ];
  return (
    <>
      <Box
        sx={{
          width: "100%",
          typography: "body1",
        }}
      >
        <ThemeProvider theme={theme}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
                sx={{
                  [`& .MuiTabs-scrollButtons`]: {
                    "&.Mui-disabled": { opacity: 0.3 },
                  },
                }}
              >
                <Tab
                  icon={
                    <div className="mr-2 mt-1 flex items-center justify-center">
                      <FaUserGraduate />
                    </div>
                  }
                  label="List Students"
                  value="listStudents"
                  className="text-black dark:text-white"
                  sx={{
                    ...tabStyles,
                  }}
                />

                <Tab
                  icon={
                    <div className=" mr-2 mt-1 flex items-center justify-center">
                      <IoMdAdd />
                    </div>
                  }
                  label="Add Students"
                  value="addStudent"
                  className="text-black dark:text-white"
                  sx={{
                    ...tabStyles,
                  }}
                />
              </TabList>
            </Box>
            <TabPanel
              value="listStudents"
              style={{
                textTransform: "none",
                textDecoration: "none",
                color: "#000000",
              }}
            >
              {/* <Sections id={id} /> */}
              <div className="mx-auto max-w-242.5">
                <label className="mb-4 block  text-title-md font-medium text-black dark:text-white">
                  {t("students.listStudents")}
                </label>
                <div className=" xs:d-flex xs:flex-column  md:flex md:justify-between ">
                  <div className="flex w-full gap-2 sm:w-1/2">
                    <div className="w-full ">
                      <CommonSearch
                        label="Search students"
                        placeholder={t("students.searchStudents")}
                        onSearch={handleSearch}
                      />
                    </div>

                    <BaseButton
                      onClick={handleReset}
                      variant="contained"
                      sx={{
                        textTransform: "none",
                        backgroundColor: "#0097B2",
                        color: "white",
                        mt: "3px",
                        marginBottom: "10px",
                        "&:hover": {
                          backgroundColor: "#0097B2",
                        },
                      }}
                      style={{ backgroundColor: "#0097B2", height: "31px" }}
                    >
                      {t("common.reset")}
                    </BaseButton>
                  </div>
                  <div className="ml-3 mr-3 flex items-center">
                    <select
                      className="font-sans focus:shadow-outline-primary dark:focus:shadow-outline-primary w-full rounded-lg border border-solid border-slate-300 bg-white px-3 py-2 text-sm font-normal leading-5 text-slate-900 shadow-md shadow-slate-100 focus:border-primary focus:shadow-lg focus-visible:outline-0 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-300 dark:shadow-slate-900 dark:focus:border-primary"
                      // aria-label={label}
                      onChange={handlePageSizeChange}
                      defaultValue={10} // Ensure a default value is set
                    >
                      {[5, 10, 20, 30, 50, 100].map((size) => (
                        <option key={size} value={size}>
                          {size} per page
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="auto flex w-full bg-white text-black dark:bg-boxdark dark:text-white">
                  <div className="container mx-auto mt-0">
                    <div className="">
                      <div className="p-4">
                        {/* Restrict the DataGrid's height and width, and allow horizontal scrolling */}
                        <div className="overflow-x-auto bg-white text-black dark:bg-normalGray">
                          <DataGrid
                            loading={loadingStudents}
                            rows={rows}
                            columns={columns}
                            autoHeight
                            disableColumnFilter
                            disableColumnSelector
                            disableDensitySelector
                            disableColumnMenu
                            hideFooter
                            paginationMode="server"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-5 mt-5 flex justify-center ">
                  <Pagination
                    count={pagination?.numberOfPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                  />
                </div>
              </div>
            </TabPanel>

            <TabPanel value="addStudent">
              <AddStudent />
            </TabPanel>
          </TabContext>
        </ThemeProvider>
      </Box>

      {/* <CommonDrawer
        isOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
        content={
          <div>
            <AddStudent toggleDrawer={toggleDrawer} />
          </div>
        }
        direction="right"
        width={400} // Set the drawer width
      /> */}
    </>
  );
};

export default SectionsList;
