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
import AddUser from "./add";
import EditUser from "./edit";
import DeleteConfirmationDialog from "@/common/DeleteConfirmationDialog";
import { RootState, AppDispatch } from "@/store/store";
import { fetchUserList, deleteUser } from "@/store/features/user/usersThunk";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineAdd } from "react-icons/md";
import { Plus } from "lucide-react";
import NowAllowedPage from "@/components/common/allowedPage";
import Tooltip from "@/common/tooltip";
function convertISOToNormalDate(isoDate: string | null): string {
  if (!isoDate) return "N/A";
  const date = new Date(isoDate);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return date.toLocaleDateString(undefined, options);
}

const ListUser: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { users, loadingUser, errorUser } = useSelector(
    (state: RootState) => state.user,
  );
  const [drawerDisplay, setDrawerDisplay] = useState("add");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [id, setId] = useState<number | string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const auth = useSelector((state: any) => state?.auth?.permissions);
  const hasViewUsersPermission = auth.some(
    (permission: any) => permission.code === "VIEW_USERS",
  );
  const hasAddUserPermission = auth.some(
    (permission: any) => permission.code === "CREATE_USER",
  );
  const hasUpdateUserPermission = auth.some(
    (permission: any) => permission.code === "UPDATE_USER",
  );
  const hasDeleteUserPermission = auth.some(
    (permission: any) => permission.code === "DELETE_USER",
  );
  const toggleDrawer = (open: boolean) => {
    setIsDrawerOpen(open);
  };

  const handleDialog = (open: boolean) => {
    setIsDialogOpen(open);
  };

  const rows: GridRowsProp =
    !loadingUser && users
      ? users.map((user: any) => ({
          id: user.id,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          phone: user.phone,
          branch: user.Branch?.name || "N/A",
          role: user.Role?.name || "N/A",
          status: user.status,
          createdAt: user.createdAt,
        }))
      : [];

  const handleEditDrawer = (id: number | string) => {
    setId(id);
    setDrawerDisplay("edit");
    toggleDrawer(true);
  };

  const handleDeleteDialog = (id: number | string) => {
    setId(id);
    handleDialog(true);
  };

  const handleAddDrawer = () => {
    setDrawerDisplay("add");
    toggleDrawer(true);
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "branch", headerName: "Branch", width: 150 },
    { field: "role", headerName: "Role", width: 150 },
    // { field: "status", headerName: "Status", width: 120 },
    // {
    //   field: "createdAt",
    //   headerName: "Created At",
    //   width: 150,
    //   renderCell: (params) => {
    //     const value = params.value;
    //     return <h6>{convertISOToNormalDate(value)}</h6>;
    //   },
    // },
    {
      field: "id",
      headerName: "Action",
      width: 220,
      align: "right",
      renderCell: (params) => {
        const value = params.value;

        return (
          <div className="my-2 flex gap-2">
            <div className="flex flex-col">
              <BaseButton
                onClick={() => handleEditDrawer(value)}
                className={`t w-full cursor-pointer rounded-lg border  border-solid py-2  text-sm leading-normal ${!hasUpdateUserPermission ? "cursor-not-allowed opacity-50" : ""}`}
                style={{ textTransform: "none" }}
                disabled={!hasUpdateUserPermission}
              >
                <FaEdit className="mr-3" />
                Edit
              </BaseButton>
              {<Tooltip text="Not Allowed" />}
            </div>
            <div className="flex flex-col">
              <BaseButton
                type="submit"
                className={`t w-full cursor-pointer rounded-lg border  border-solid py-2  text-sm leading-normal ${!hasDeleteUserPermission ? "cursor-not-allowed opacity-50" : ""}`}
                disabled={!hasDeleteUserPermission}
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
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    try {
      dispatch(fetchUserList());
    } catch (err) {
      console.log("err", err);
    }
  }, [dispatch]);

  const handleDelete = async (id: any) => {
    setIsDialogOpen(false);
    dispatch(deleteUser(id)).then(() => {
      setIsDialogOpen(false);
      dispatch(fetchUserList());
    });
  };

  return (
    <>
      {hasViewUsersPermission ? (
        <div className=" overflow-x-hidden" style={{ maxWidth: "90vw" }}>
          <div className="mb-5 mt-5  flex   justify-between px-5  align-middle  ">
            <h5 className="text-title-md font-semibold   text-black  dark:text-white  ">
              System Users
            </h5>
            <div className="flex flex-col">
              <BaseButton
                style={{
                  textTransform: "none",
                  backgroundColor: "#0f6f03",
                  color: "white",
                  marginBottom: "10px",
                  paddingLeft: "10px",
                  paddingRight: "10px",

                  // marginLeft: "auto",
                  display: "flex",
                }}
                onClick={handleAddDrawer}
                disabled={!hasAddUserPermission}
                className={`${!hasAddUserPermission ? "cursor-not-allowed opacity-50" : ""}`}
              >
                <Plus
                  className="mr-3 text-white "
                  style={{
                    fontSize: "6px",
                    fontWeight: "bold",
                    color: "#ffffff",
                  }}
                />
                Add User
              </BaseButton>
              {!hasAddUserPermission && (
                <div className="bg-gray-900  rounded-lg text-xs   ">
                  You do not have permission
                </div>
              )}
            </div>
          </div>
          <div className="flex h-screen w-full bg-white text-black dark:bg-boxdark dark:text-white">
            <div className="container mx-auto mt-0">
              <div className="">
                <div className="p-4">
                  <div className=" max-w-230 overflow-x-auto bg-white text-black dark:bg-normalGray">
                    <DataGrid
                      loading={loadingUser}
                      rows={rows}
                      columns={columns}
                      autoHeight
                      slots={{ toolbar: GridToolbar }}
                      slotProps={{
                        toolbar: {
                          showQuickFilter: true,
                          quickFilterProps: { debounceMs: 500 },
                          csvOptions: {
                            allRows: true, // Exports all rows, not just the visible ones
                            fileName: "User", // Set your desired file name here (without extension)
                          },
                        },
                      }}
                      // sx={{
                      //   minHeight: "200px", // Set your desired minimum height
                      // }}
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
                  <AddUser toggleDrawer={toggleDrawer} />
                )}
                {id !== null && drawerDisplay === "edit" && (
                  <EditUser toggleDrawer={toggleDrawer} id={id} setId={setId} />
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
            elementName={`User with id = ${id}`}
            elementId={id}
          />
        </div>
      ) : (
        <NowAllowedPage />
      )}
    </>
  );
};

export default ListUser;
