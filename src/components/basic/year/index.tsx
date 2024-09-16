"use client";
import React, { useState, useEffect, useRef } from "react";

import { useGetAllYears } from "@/hooks/useGetAllYears";
import { FaEdit } from "react-icons/fa";
import { IoAddCircleSharp } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";

import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { Button as BaseButton, Alert } from "@mui/material";
import Chip from "@mui/material/Chip";

import CommonDrawer from "@/common/Drawer";
import CommonDialog from "@/common/CommonDialogBox";
import AddYear from "./add";
import EditYear from "./edit";
// import  DeleteConfirmationDialog from './delete';
import DeleteConfirmationDialog from "@/common/DeleteConfirmationDialog";
import handleDelete from "./delete";
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

const statusShow = (status: boolean) => {
  if (status) {
    return <Chip color="success" label=" Active" sx={{ width: "100px" }} />;
  } else {
    return <Chip color="error" label="Not active" sx={{ width: "100px" }} />;
  }
};
const ListYears: React.FC = () => {
  const [drawerDisplay, setDrawerDisplay] = useState("add");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const [id, setId] = useState<number | string | null>(null);
  const { loadingYears, errorYears, optionsYears, dataYears, reloadYears } =
    useGetAllYears();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Function to toggle the drawer open/close
  const toggleDrawer = (open: boolean) => {
    setIsDrawerOpen(open);
  };
  const handleDialog = (open: boolean) => {
    setIsDialogOpen(open);
  };

  // Conditionally create rows only when loading is false and dataYears is available
  const rows: GridRowsProp =
    !loadingYears && dataYears
      ? dataYears.map((yearData: any, index: number) => ({
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
  const handleDeleteDialog = (id: number) => {
    console.log("id", id);
    setId(id);
    handleDialog(true);
  };
  const handleAddDrawer = () => {
    setDrawerDisplay("add");
    toggleDrawer(true);
  };
  const columns: GridColDef[] = [
    {
      field: "EUC_year",
      headerName: "European Calendar",
      width: 180,
      align: "left",
    },
    {
      field: "ETH_year",
      headerName: "Ethiopian Calendar",
      width: 180,
      align: "left",
    },
    {
      field: "start_date",
      headerName: "Start Date",
      width: 150,
      align: "left",

      renderCell: (params) => {
        const value = params.value;
        return <h6>{convertISOToNormalDate(value)}</h6>;
      },
    },
    {
      field: "end_date",
      headerName: "End Date",
      width: 150,
      align: "left",

      renderCell: (params) => {
        const value = params.value;
        return <h6>{convertISOToNormalDate(value)}</h6>;
      },
    },
    {
      field: "is_active",
      headerName: "Status",
      width: 150,
      align: "center",
      renderCell: (params) => {
        const value = params.value;

        return <div className="my-2 flex gap-2">{statusShow(value)}</div>;
      },
    },

    {
      field: "id",
      headerName: "Action",
      width: 100,
      align: "center",
      renderCell: (params) => {
        const value = params.value;

        return (
          <div className="my-2 flex gap-2">
            <BaseButton
              // onClick={() => toggleDrawer(true)}
              onClick={() => handleEditDrawer(value)}
              // className="w-full cursor-pointer rounded-lg border border-solid border-primary bg-primary py-2 text-sm  leading-normal text-white"
              style={{
                textTransform: "none",
                // backgroundColor: "#0097B2",
                color: "#0097B2",
              }}
            >
              <FaEdit className="mr-2" />
              Edit
            </BaseButton>
            {/* <BaseButton
              type="submit"
              style={{
                textTransform: "none",
                // backgroundColor: "#0097B2",
                color: "red",
              }}
              onClick={() => handleDeleteDialog(value)}
            >
              <MdDeleteForever className="mr-2" />
              Delete
            </BaseButton> */}
          </div>
        );
      },
    },
  ];
  return (
    <>
      <div className="mx-auto max-w-242.5">
        {/* <PageHeader
          title="Country List"
          url={URL.ADD_COUNTRY}
          // btnLabel="Add Country"
          // showButton={true}
        /> */}
        <div className="mx-1 flex justify-between">
          <label className="mb-2 block  text-title-md font-medium text-black dark:text-white">
            Year List
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
            Add Year
          </BaseButton>
        </div>

        <div className="flex h-screen w-full bg-white text-black dark:bg-boxdark dark:text-white">
          <div className="container mx-auto mt-0">
            <div className="">
              <div className="p-8">
                {/* Restrict the DataGrid's height and width, and allow horizontal scrolling */}
                <div className="overflow-x-auto bg-white text-black dark:bg-normalGray">
                  <DataGrid
                    loading={loadingYears}
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
                <AddYear
                  toggleDrawer={toggleDrawer}
                  reloadYears={reloadYears}
                />
              )}
              {id !== null && drawerDisplay == "edit" && (
                <EditYear
                  toggleDrawer={toggleDrawer}
                  reloadYears={reloadYears}
                  id={id}
                  setId={setId}
                />
              )}
            </div>
          }
          direction="right"
          width={400} // Set the drawer width
        />

        <DeleteConfirmationDialog
          isOpen={isDialogOpen}
          toggleDialog={handleDialog}
          onDelete={handleDelete}
          elementName={`Year with id =${id}`}
          elementId={id}
          onReload={reloadYears} // Pass the optional reload function
        />
      </div>
    </>
  );
};

export default ListYears;
