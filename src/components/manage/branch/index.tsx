"use client";
import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { IoAddCircleSharp } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import { Button as BaseButton } from "@mui/material";
import CommonDrawer from "@/common/Drawer";
import CommonDialog from "@/common/CommonDialogBox";
import AddBranch from "./add";
import EditBranch from "./edit";
import DeleteConfirmationDialog from "@/common/DeleteConfirmationDialog";
import { RootState, AppDispatch } from "@/store/store";
import {
  fetchBranchList,
  deleteBranch,
} from "@/store/features/branches/branchesSlice";
import { useDispatch, useSelector } from "react-redux";

function convertISOToNormalDate(isoDate: string): string {
  const date = new Date(isoDate);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return date.toLocaleDateString(undefined, options);
}

const ListBranch: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { branches, loadingBranch, errorBranch } = useSelector(
    (state: RootState) => state.branches,
  );
  const [drawerDisplay, setDrawerDisplay] = useState("add");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [id, setId] = useState<number | string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => {
    setIsDrawerOpen(open);
  };

  const handleDialog = (open: boolean) => {
    setIsDialogOpen(open);
  };

  const rows: GridRowsProp =
    !loadingBranch && branches
      ? branches.map((branch: any) => ({
          id: branch.id,
          name: branch.name,
          location: branch.location,
          phone: branch.phone,
          email: branch.email,
          createdAt: branch.createdAt,
          updatedAt: branch.updatedAt,
        }))
      : [];

  const handleEditDrawer = (id: number) => {
    setId(id);
    setDrawerDisplay("edit");
    toggleDrawer(true);
  };

  const handleDeleteDialog = (id: number) => {
    setId(id);
    handleDialog(true);
  };

  const handleAddDrawer = () => {
    setDrawerDisplay("add");
    toggleDrawer(true);
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "location", headerName: "Location", width: 200 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "email", headerName: "Email", width: 200 },

    {
      field: "createdAt",
      headerName: "Created At",
      width: 150,
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
              onClick={() => handleEditDrawer(value)}
              className="w-full cursor-pointer rounded-lg border border-solid border-primary bg-primary py-2 text-sm leading-normal text-white"
              style={{ textTransform: "none" }}
            >
              <FaEdit className="mr-3" />
              Edit
            </BaseButton>
            <BaseButton
              type="submit"
              className="w-full cursor-pointer rounded-lg border border-solid border-danger bg-danger py-2 text-sm leading-normal"
              style={{
                textTransform: "none",
                color: "red",
              }}
              onClick={() => handleDeleteDialog(value)}
            >
              <MdDeleteForever className="mr-3" style={{ color: "red" }} />
              Delete
            </BaseButton>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    try {
      dispatch(fetchBranchList());
    } catch (err) {
      console.log("err", err);
    }
  }, [dispatch]);

  const handleDelete = async (id: any) => {
    setIsDialogOpen(false);
    dispatch(deleteBranch(id)).then(() => {
      setIsDialogOpen(false);
      dispatch(fetchBranchList());
    });
  };

  return (
    <>
      <div className=" overflow-x-hidden" style={{ maxWidth: "90vw" }}>
        <div className=" flex-col justify-between  sm:flex ">
          <label className="mb-2 ml-2 mt-3 block text-title-md font-medium text-black dark:text-white">
            Branches
          </label>

          <BaseButton
            onClick={handleAddDrawer}
            style={{
              textTransform: "none",
              backgroundColor: "#0097B2",
              color: "white",
              marginBottom: "10px",
              marginLeft: "auto",
              display: "flex",
            }}
          >
            <IoAddCircleSharp className="mr-3" />
            Add Branch
          </BaseButton>
        </div>

        <div className="flex h-screen w-full bg-white text-black dark:bg-boxdark dark:text-white">
          <div className="container mx-auto mt-0">
            <div className="">
              <div className="p-4">
                <div className=" max-w-230 overflow-x-auto bg-white text-black dark:bg-normalGray">
                  <DataGrid
                    loading={loadingBranch}
                    rows={rows}
                    columns={columns}
                    autoHeight
                    slots={{ toolbar: GridToolbar }}
                    slotProps={{
                      toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500 },
                        csvOptions: {
                          allRows: true,
                          fileName: "branches", // Set your desired file name here
                        },
                      },
                    }}
                    sx={{
                      minHeight: "200px", // Set your desired minimum height
                    }}
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
              {drawerDisplay === "add" && (
                <AddBranch toggleDrawer={toggleDrawer} />
              )}
              {id !== null && drawerDisplay === "edit" && (
                <EditBranch toggleDrawer={toggleDrawer} id={id} setId={setId} />
              )}
            </div>
          }
          direction="right"
          width={400}
        />

        <DeleteConfirmationDialog
          isOpen={isDialogOpen}
          toggleDialog={handleDialog}
          onDelete={() => {
            handleDelete(id);
          }}
          elementName={`Branch with id = ${id}`}
          elementId={id}
        />
      </div>
    </>
  );
};

export default ListBranch;
