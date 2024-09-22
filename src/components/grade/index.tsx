"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaEdit } from "react-icons/fa";
import { IoAddCircleSharp } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { IoAddSharp } from "react-icons/io5";

import { Button as BaseButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CommonDrawer from "@/common/Drawer";
import DeleteConfirmationDialog from "@/common/DeleteConfirmationDialog";
import CommonSearch from "@/common/commonSearch";
import GradeCard from "./gradeCard";
import {
  fetchSemesterList,
  deleteSemester,
} from "@/store/features/semesters/semesterSlice";

import { RootState, AppDispatch } from "@/store/store"; // Import RootState and AppDispatch
import { t } from "@/utils/translation";

const GradeList: React.FC = () => {
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
  const handleSearch = (searchTerm: string) => {
    console.log("Searching for:", searchTerm);
    // Implement your search logic here
  };

  const handleToggle = (id: number | string | null) => {
    console.log("id", id);
  };

  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <>
      <div className="mx-auto max-w-242.5 ">
        <div className="mb-4 flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <div className="w-full sm:w-1/2">
            <CommonSearch
              label="Search Users"
              placeholder={t("grade.searchGrade")}
              onSearch={handleSearch}
            />
          </div>

          <div className="w-full sm:w-auto">
            <BaseButton
              onClick={handleAddDrawer}
              style={{
                textTransform: "none",
                backgroundColor: "#0097B2",
                color: "white",
                padding: "5px 10px",
              }}
            >
              <IoAddSharp
                className="mr-2 h-5 w-5 text-white"
                style={{ color: "#ffffff" }}
              />
              {t("grade.addGrade")}
            </BaseButton>
          </div>
        </div>
      </div>
      <div className="flex min-h-screen w-full flex-wrap  gap-4  pb-30 dark:bg-boxdark">
        {data.map((data: any, index: number) => (
          <div key={index}>
            <GradeCard id={1} label={"Grade 10"} handleToggle={handleToggle} />
          </div>
        ))}
      </div>
    </>
  );
};

export default GradeList;
