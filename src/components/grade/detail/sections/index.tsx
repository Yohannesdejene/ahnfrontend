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
import GradeCard from "@/components/grade/detail/gradeCard";
import { fetchGradeList } from "@/store/features/grades/gradeSlice";

import { RootState, AppDispatch } from "@/store/store"; // Import RootState and AppDispatch
import { t } from "@/utils/translation";

interface SectionsProps {
  id: string | number | null;
}
const Sections: React.FC<SectionsProps> = ({ id }) => {
  const [drawerDisplay, setDrawerDisplay] = useState("add");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [size, setSize] = useState<number>(10);
  const [page, setPage] = useState<number>(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const dispatch: AppDispatch = useDispatch(); // Use the AppDispatch type
  const { grades, loadingGrades, errorGrades } = useSelector(
    (state: RootState) => state.grades,
  );
  useEffect(() => {
    const data = { size: 10, currentPage: 1 };
    try {
      dispatch(fetchGradeList(data));
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

  const handleAddDrawer = () => {
    setDrawerDisplay("add");
    toggleDrawer(true);
  };

  const handleDelete = async (
    id: number | string | null,
    dispatch: AppDispatch,
  ) => {
    handleDialog(false);
  };
  const onDelete = async (id: number | string | null) => {
    await handleDelete(id, dispatch); // Pass dispatch to handleDelete
  };
  const handleSearch = (searchTerm: string) => {
    console.log("Searching for:", searchTerm);
    // Implement your search logic here
  };

  return (
    <>
      <div className="mx-auto max-w-242.5 ">
        <div className="mb-4 flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
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
              {t("grade.addSection")}
            </BaseButton>
          </div>
          <div className="w-full sm:w-3/4">
            <CommonSearch
              label="Search Sections"
              placeholder={t("grade.searchSection")}
              onSearch={handleSearch}
            />
          </div>
        </div>
      </div>
      <div className="flex min-h-screen w-full flex-wrap  gap-4  pb-30 dark:bg-boxdark">
        {grades.map((grade: any, index: number) => (
          <div key={index}>
            <GradeCard id={grade.id} label={grade.name} data={grade} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Sections;
