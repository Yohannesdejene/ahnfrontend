"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaEdit } from "react-icons/fa";
import { IoAddCircleSharp } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { IoAddSharp } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { Button as BaseButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CommonDrawer from "@/common/Drawer";
import DeleteConfirmationDialog from "@/common/DeleteConfirmationDialog";
import {
  fetchSemesterList,
  deleteSemester,
} from "@/store/features/semesters/semesterSlice";

import AddSemester from "./add";
import EditSemester from "./edit";
import { RootState, AppDispatch } from "@/store/store"; // Import RootState and AppDispatch
import { t } from "@/utils/translation";
import { SEMESTER_CREATE } from "@/store/features/semesters/type";
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
  const dispatch: AppDispatch = useDispatch(); // Use the AppDispatch type
  const { semesters, loadingSemesters, errorSemesters } = useSelector(
    (state: RootState) => state.semesters,
  );
  useEffect(() => {
    const data = { size: 10, currentPage: 1 };
    try {
      dispatch(fetchSemesterList(data));
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
    !loadingSemesters && semesters
      ? semesters?.map((semesterData: any, index: number) => ({
          id: index, // Or use a unique property if available in your data
          ...semesterData,
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
    dispatch(deleteSemester({ id }));
    handleDialog(false);
  };
  const onDelete = async (id: number | string | null) => {
    await handleDelete(id, dispatch); // Pass dispatch to handleDelete
  };
  const columns: GridColDef[] = [
    { field: "name", headerName: `${t("semester.name")}`, width: 120 },
    { field: "year_id", headerName: `${t("semester.yearId")}`, width: 100 },
    {
      field: "starting_date",
      headerName: `${t("semester.startingDate")}`,
      width: 150,
      renderCell: (params) => <h6>{convertISOToNormalDate(params.value)}</h6>,
    },
    {
      field: "end_date",
      headerName: `${t("semester.endDate")}`,
      width: 150,
      renderCell: (params) => <h6>{convertISOToNormalDate(params.value)}</h6>,
    },
    {
      field: "status",
      headerName: `${t("semester.status")}`,
      width: 120,
      renderCell: (params) => (
        <span
          className={
            params.value === "Active" ? "text-green-600" : "text-red-600"
          }
        >
          {params.value}
        </span>
      ),
    },
    {
      field: "id",
      headerName: `${t("common.action")}`,
      width: 220,
      align: "right",
      renderCell: (params) => (
        <div className="my-2 flex gap-2">
          <BaseButton
            onClick={() => handleEditDrawer(params.value)}
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
              color: "red",
            }}
            onClick={() => handleDeleteDialog(params.value)}
          >
            <MdDeleteForever className="mr-3" />
            {t("common.delete")}
          </BaseButton>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="mx-auto max-w-242.5">
        <div className="mx-1 flex justify-between">
          <label className="mb-2 block text-title-md font-medium text-black dark:text-white">
            {t("semester.semesterList")}
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
            <IoAddSharp
              className="mr-2 h-5 w-5 text-white"
              style={{ color: "#ffffff" }}
            />
            {t("semester.addSemester")}
          </BaseButton>
        </div>

        <div className="flex h-screen w-full bg-white text-black dark:bg-boxdark dark:text-white">
          <div className="container mx-auto mt-0">
            <div className="">
              <div className="p-8">
                <div className="overflow-x-auto bg-white text-black dark:bg-normalGray">
                  <DataGrid
                    loading={loadingSemesters}
                    rows={rows}
                    columns={columns}
                    autoHeight
                  />
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
              {drawerDisplay == "add" && (
                <AddSemester toggleDrawer={toggleDrawer} />
              )}
              {id !== null && drawerDisplay == "edit" && (
                <EditSemester
                  toggleDrawer={toggleDrawer}
                  id={id}
                  setId={setId}
                />
              )}
            </div>
          }
          direction="right"
          width={400}
        />

        <DeleteConfirmationDialog
          isOpen={isDialogOpen}
          toggleDialog={handleDialog}
          onDelete={onDelete}
          elementName={`Semester with id =${id}`}
          elementId={id}
        />
      </div>
    </>
  );
};

export default ListCourse;
