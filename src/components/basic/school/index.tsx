"use client";
import React, { useState, useEffect, useRef } from "react";
import { useGetAllSchools } from "@/hooks/useGetAllSchool";
import { FaEdit } from "react-icons/fa";
import { IoAddCircleSharp } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { Button as BaseButton } from "@mui/material";
import CommonDrawer from "@/common/Drawer";
import CommonDialog from "@/common/CommonDialogBox";
import AddYear from "./add";
import EditSchool from "./edit";
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

const ListSchools: React.FC = () => {
  const [drawerDisplay, setDrawerDisplay] = useState("add");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const [id, setId] = useState<number | string | null>(null);
  const {
    loadingSchools,
    errorSchools,
    optionsSchools,
    dataSchools,
    reloadSchools,
  } = useGetAllSchools();
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
    !loadingSchools && dataSchools
      ? dataSchools.map((schoolData: any, index: number) => ({
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

  const columns: GridColDef[] = [
    { field: "email", headerName: "Email", width: 150 },

    { field: "name", headerName: "Name", width: 120 },
    // { field: "sub_city", headerName: "Sub City", width: 120 },
    // { field: "city", headerName: "City", width: 120 },
    { field: "region", headerName: "Region", width: 120 },
    { field: "address", headerName: "Address", width: 120 },
    {
      field: "establish_date",
      headerName: "Establish Date",
      width: 120,
      renderCell: (params) => {
        const value = params.value;
        return <h6>{convertISOToNormalDate(value)}</h6>;
      },
    },

    {
      field: "id",
      headerName: "Action",
      width: 220,
      align: "right",
      renderCell: (params) => {
        const value = params.value;

        return (
          <div className="my-2 flex gap-2">
            <BaseButton
              // onClick={() => toggleDrawer(true)}
              onClick={() => handleEditDrawer(value)}
              className="w-full cursor-pointer rounded-lg border border-solid border-primary bg-primary py-2 text-sm  leading-normal text-white"
              style={{ textTransform: "none" }}
            >
              <FaEdit className="mr-3" />
              Edit
            </BaseButton>
            <BaseButton
              type="submit"
              className="w-full cursor-pointer rounded-lg border border-solid border-danger bg-danger py-2 text-sm  leading-normal text-white"
              style={{ textTransform: "none" }}
              onClick={() => handleDeleteDialog(value)}
            >
              <MdDeleteForever className="mr-3" />
              Delete
            </BaseButton>
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
            School List
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
            Add School
          </BaseButton>
        </div>

        <div className="flex h-screen w-full bg-white text-black dark:bg-boxdark dark:text-white">
          <div className="container mx-auto mt-0">
            <div className="">
              <div className="p-8">
                {/* Restrict the DataGrid's height and width, and allow horizontal scrolling */}
                <div className="overflow-x-auto bg-white text-black dark:bg-normalGray">
                  <DataGrid
                    loading={loadingSchools}
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
                  reloadYears={reloadSchools}
                />
              )}
              {id !== null && drawerDisplay == "edit" && (
                <EditSchool
                  toggleDrawer={toggleDrawer}
                  reloadSchools={reloadSchools}
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
          elementName={`School with id =${id}`}
          elementId={id}
        />
      </div>
    </>
  );
};

export default ListSchools;
