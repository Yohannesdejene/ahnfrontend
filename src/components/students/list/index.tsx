"use client";
import React, { useState, useEffect, useRef } from "react";
import { IoAddCircleSharp } from "react-icons/io5";
import { t } from "@/utils/translation";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { Button as BaseButton, Alert } from "@mui/material";
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
];
const statusShow = (status: boolean) => {
  if (status) {
    return <Chip color="success" label=" Active" sx={{ width: "100px" }} />;
  } else {
    return <Chip color="error" label="Not active" sx={{ width: "100px" }} />;
  }
};

const StudentsList: React.FC = () => {
  const router = useRouter();
  const [drawerDisplay, setDrawerDisplay] = useState("add");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [id, setId] = useState<number | string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const dispatch: AppDispatch = useDispatch(); // Use the AppDispatch type
  const { students, loadingStudents } = useSelector(
    (state: RootState) => state.students,
  );
  const handleSearch = (searchTerm: string) => {
    const data = { size: 10, currentPage: 1, search: searchTerm };
    dispatch(fetchStudentsList(data));
  };
  const handleReset = () => {
    const data = { size: 10, currentPage: 1 };
    dispatch(fetchStudentsList(data));
  };
  // Function to toggle the drawer open/close
  const toggleDrawer = (open: boolean) => {
    setIsDrawerOpen(open);
  };
  const handleDialog = (open: boolean) => {
    setIsDialogOpen(open);
  };

  useEffect(() => {
    const data = { size: 10, currentPage: 1 };
    dispatch(fetchStudentsList(data));
  }, [dispatch]);
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
      <div className="mx-auto max-w-242.5">
        <label className="mb-4 block  text-title-md font-medium text-black dark:text-white">
          {t("students.listStudents")}
        </label>
        <div className=" xs:d-flex xs:flex-column  md:flex md:justify-between ">
          <BaseButton
            onClick={handleAddDrawer}
            variant="contained"
            startIcon={<IoAddCircleSharp size={24} />}
            sx={{
              textTransform: "none",
              backgroundColor: "#0097B2",
              color: "white",
              marginBottom: "10px",
              "&:hover": {
                backgroundColor: "#0097B2",
              },
              "& .MuiButton-startIcon": {
                marginRight: 1,
              },
            }}
            style={{ backgroundColor: "#0097B2" }}
          >
            {t("students.addStudents")}
          </BaseButton>
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
        </div>

        <div className="flex h-screen w-full bg-white text-black dark:bg-boxdark dark:text-white">
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
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CommonDrawer
        isOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
        content={
          <div>
            <AddStudent toggleDrawer={toggleDrawer} />
          </div>
        }
        direction="right"
        width={400} // Set the drawer width
      />
    </>
  );
};

export default StudentsList;
