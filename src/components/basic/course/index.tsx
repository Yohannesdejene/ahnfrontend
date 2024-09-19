"use client";
import React, { useState, useEffect, useRef } from "react";
import { useGetAllCourses } from "@/hooks/useGetAllCourse";
import { FaEdit } from "react-icons/fa";
import { IoAddCircleSharp } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { Button as BaseButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CommonDrawer from "@/common/Drawer";
import AddCourse from "./add";
import EditCourse from "./edit";
// import  DeleteConfirmationDialog from './delete';
import DeleteConfirmationDialog from "@/common/DeleteConfirmationDialog";
import {
  fetchCourseList,
  createCourse,
  deleteCourse,
} from "@/store/features/courses/courseSlice";
import { RootState, AppDispatch } from "@/store/store"; // Import RootState and AppDispatch
import { t } from "@/utils/translation";

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

const ListCourse: React.FC = () => {
  const [drawerDisplay, setDrawerDisplay] = useState("add");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [size, setSize] = useState<number>(10);
  const [page, setPage] = useState<number>(0);
  const [id, setId] = useState<number | string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const test = () => {};
  const dispatch: AppDispatch = useDispatch(); // Use the AppDispatch type
  const { courses: dataCourse, loading: loadingCourse } = useSelector(
    (state: RootState) => state.courses,
  );

  useEffect(() => {
    const data = { size: 10, currentPage: 1 };
    try {
      dispatch(fetchCourseList(data));
    } catch (err) {
      console.log("Err", err);
    }
  }, [dispatch]);

  // Function to toggle the drawer open/close
  const toggleDrawer = (open: boolean) => {
    setIsDrawerOpen(open);
  };
  const handleDialog = (open: boolean) => {
    setIsDialogOpen(open);
  };

  // Conditionally create rows only when loading is false and dataYears is available
  const rows: GridRowsProp =
    !loadingCourse && dataCourse
      ? dataCourse.map((schoolData: any, index: number) => ({
          id: index, // Or use a unique property if available in your data
          ...schoolData,
        }))
      : [];

  const handleEditDrawer = (id: number) => {
    console.log("id", id);
    setId(id);
    setDrawerDisplay("edit");
    toggleDrawer(true);
  };
  const handleDeleteDialog = (id: number) => {
    console.log("id", id);
    setId(id);
    handleDialog(true);
  };
  const handleAddDrawer = () => {
    setDrawerDisplay("add");
    toggleDrawer(true);
  };

  const handleDelete = async (
    id: number | string | null,
    dispatch: AppDispatch,
  ) => {
    dispatch(deleteCourse(id));
    handleDialog(false);
  };
  const onDelete = async (id: number | string | null) => {
    await handleDelete(id, dispatch); // Pass dispatch to handleDelete
  };
  const columns: GridColDef[] = [
    { field: "name", headerName: `${t("course.name")}`, width: 120 },
    // { field: "sub_city", headerName: "Sub City", width: 120 },
    { field: "code", headerName: `${t("course.code")}`, width: 140 },
    {
      field: "department",
      headerName: `${t("course.department")}`,
      width: 170,
    },
    {
      field: "created_date",
      headerName: `${t("course.createdDate")}`,
      width: 200,

      renderCell: (params) => {
        const value = params.value;
        return <h6>{convertISOToNormalDate(value)}</h6>;
      },
    },

    {
      field: "id",
      headerName: `${t("common.action")}`,
      width: 220,
      align: "right",
      renderCell: (params) => {
        const value = params.value;

        return (
          <div className="my-2 flex gap-2">
            <BaseButton
              onClick={() => handleEditDrawer(value)}
              style={{
                textTransform: "none",
                color: "#0097B2",
              }}
            >
              <FaEdit className="mr-2" />
              {t("common.edit")}
            </BaseButton>
            <BaseButton
              type="submit"
              style={{
                textTransform: "none",
                // backgroundColor: "#0097B2",
                color: "red",
              }}
              onClick={() => handleDeleteDialog(value)}
            >
              <MdDeleteForever className="mr-3" />

              {t("common.delete")}
            </BaseButton>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="mx-auto max-w-242.5">
        <div className="mx-1 flex justify-between">
          <label className="mb-2 block  text-title-md font-medium text-black dark:text-white">
            {t("course.courseList")}
          </label>

          <BaseButton
            onClick={handleAddDrawer}
            style={{
              textTransform: "none",
              backgroundColor: "#0097B2",
              color: "white",
              marginBottom: "10px",
            }}
          >
            <IoAddCircleSharp className="mr-3" />

            {t("course.addCourse")}
          </BaseButton>
        </div>

        <div className="flex h-screen w-full bg-white text-black dark:bg-boxdark dark:text-white">
          <div className="container mx-auto mt-0">
            <div className="">
              <div className="p-8">
                {/* Restrict the DataGrid's height and width, and allow horizontal scrolling */}
                <div className="overflow-x-auto bg-white text-black dark:bg-normalGray">
                  <DataGrid
                    loading={loadingCourse}
                    rows={rows}
                    columns={columns}
                    autoHeight // This allows the grid to dynamically adjust height based on content
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Using CommonDrawer */}

        <CommonDrawer
          isOpen={isDrawerOpen}
          toggleDrawer={toggleDrawer}
          content={
            <div>
              {drawerDisplay == "add" && (
                <AddCourse toggleDrawer={toggleDrawer} />
              )}
              {id !== null && drawerDisplay == "edit" && (
                <EditCourse toggleDrawer={toggleDrawer} id={id} setId={setId} />
              )}
            </div>
          }
          direction="right"
          width={400} // Set the drawer width
        />

        <DeleteConfirmationDialog
          isOpen={isDialogOpen}
          toggleDialog={handleDialog}
          // onDelete={HandleDelete}
          onDelete={onDelete}
          elementName={`Course with id =${id}`}
          elementId={id}
          // onReload={test} // Pass the optional reload function
        />
      </div>
    </>
  );
};

export default ListCourse;
