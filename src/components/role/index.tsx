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
import {
  Button as BaseButton,
  CircularProgress,
  LinearProgress,
} from "@mui/material";
import CommonDrawer from "@/common/Drawer";
import toast from "react-hot-toast";
import DeleteConfirmationDialog from "@/common/DeleteConfirmationDialog";
import { apiDeleteRole } from "@/store/features/roles/rolesApi";
import { RootState, AppDispatch } from "@/store/store";
import { fetchRoles } from "@/store/features/roles/rolesThunk";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineAdd } from "react-icons/md";
import { Plus } from "lucide-react";
import { FiEdit } from "react-icons/fi";
import CommonDialogFull from "@/common/DialogBox";
import CommonDialog from "@/common/CommonDialogBox";
import NowAllowedPage from "@/components/common/allowedPage";

import Loader from "@/common/loader";
import AddRole from "./add";
import EditRole from "./edit";
import { FiTrash2 } from "react-icons/fi"; // Import FiTrash2 for delete icon
const ListRole: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { roles, loadingRole, errorRole } = useSelector(
    (state: RootState) => state.role,
  );
  const auth = useSelector((state: any) => state?.auth?.permissions);
  const hasViewRolesPermission = auth.some(
    (permission: any) => permission.code === "VIEW_ROLES",
  );
  const hasAddRolePermission = auth.some(
    (permission: any) => permission.code === "ADD_ROLE",
  );
  const hasUpdateRolePermission = auth.some(
    (permission: any) => permission.code === "UPDATE_ROLE",
  );
  console.log("auth-1000000000000000", auth);
  const [id, setId] = useState<number | string | null>(null);
  const [dialogType, setDialogType] = useState<string>("add");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteRole, setDeleteRole] = useState<any>(null);

  const handleDialog = (open: boolean) => {
    setIsDialogOpen(open);
  };

  const handleEditDialog = (id: number | string) => {
    setId(id);
    setDialogType("edit");
    setIsDialogOpen(true);
  };
  const handleDelete = async () => {
    const deleted = await apiDeleteRole(deleteRole?.id);
    console.log("deteled");
    if (deleted?.status == 200) {
      toast.success("Role deleted successfully");
      dispatch(fetchRoles());
    }
  };

  const handleAddDialog = () => {
    setDialogType("add");
    setIsDialogOpen(true);
  };

  useEffect(() => {
    try {
      dispatch(fetchRoles());
    } catch (err) {
      console.log("err", err);
    }
  }, []);
  return (
    <>
      <div
        className="container  "
        style={{ height: "auto", minHeight: "85vh" }}
      >
        <div className="mb-5 mt-5  flex  justify-between px-1 align-middle  ">
          <h5 className="text-title-md font-semibold   text-black  dark:text-white  ">
            Roles and permission
          </h5>
        </div>
        {loadingRole ? (
          <div
            className="flex items-center justify-center"
            style={{ minHeight: "200px" }} // Ensure the loader has space
          >
            <div className="border-gray-200 h-12 w-12 animate-spin rounded-full border-4 border-t-4 border-t-black"></div>{" "}
          </div>
        ) : (
          <>
            {hasViewRolesPermission ? (
              <div className="container mx-auto mt-0">
                <div className="p-0">
                  <div className=" grid w-full grid-cols-2  gap-8 p-1 md:grid-cols-4 md:p-3">
                    <div
                      className=" flex  flex-col justify-start  bg-white p-5 text-black dark:bg-boxdark dark:text-white"
                      style={{ boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }}
                    >
                      <div className="ms-auto flex flex-col">
                        <div className=" ms-auto mt-0  flex  ">
                          <div className="">
                            <BaseButton
                              style={{
                                textTransform: "none",
                                backgroundColor: "#0f6f03",
                                color: "white",
                                marginBottom: "10px",
                                paddingLeft: "10px",
                                paddingRight: "10px",
                                display: "flex",
                              }}
                              onClick={handleAddDialog}
                              disabled={!hasAddRolePermission}
                              className={`${!hasAddRolePermission ? "cursor-not-allowed opacity-50" : ""}`}
                            >
                              <Plus className="mr-3 text-white" />
                              Add Role
                            </BaseButton>
                            {!hasAddRolePermission && (
                              <div className="bg-gray-900  rounded-lg text-xs   ">
                                You do not have permission
                              </div>
                            )}
                          </div>

                          {/* Tooltip: Shown only when permission is absent */}
                        </div>
                        <h6 className=" text text-gray-500 mt-1 text-title-xsm1">
                          Add role , if it doesn&apos;t exist{" "}
                        </h6>
                        <h5 className=" text-title-"> </h5>
                      </div>
                    </div>
                    {roles &&
                      roles?.map((data: any, index: number) => (
                        <div
                          key={index}
                          className="relative flex flex-col justify-start bg-white p-5 text-black dark:bg-boxdark dark:text-white" // Added 'relative' for positioning
                          style={{
                            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          {/* Delete Icon in Top-Right */}
                          {/* <button
                          onClick={() => {
                            setDeleteRole(data), setDeleteDialog(true);
                          }} // Add your delete handler here
                          className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 absolute right-2 top-2"
                        >
                          <FiTrash2 style={{ fontSize: "16px" }} />
                        </button> */}

                          <h5 className="text-title-sm">{data?.name}</h5>
                          <div className="ms-0 mt-2 flex flex-col justify-start align-top">
                            <div>
                              <BaseButton
                                onClick={() => handleEditDialog(data?.id)}
                                style={{
                                  textTransform: "none",
                                  color: "#0f6f03",
                                  fontWeight: "bold",
                                  display: "flex",
                                  margin: "0px",
                                  padding: "0px",
                                  justifyContent: "start",
                                }}
                                className={`${!hasUpdateRolePermission ? "cursor-not-allowed opacity-50" : ""}`}
                                disabled={!hasUpdateRolePermission}
                              >
                                <FiEdit
                                  className="mr-3 text-primary dark:text-white"
                                  style={{
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                  }}
                                />
                                <span className="text-primary dark:text-white">
                                  Edit Role
                                </span>
                              </BaseButton>
                            </div>
                            {!hasUpdateRolePermission && (
                              <div className="bg-gray-900  rounded-lg text-xs   ">
                                You do not have permission
                              </div>
                            )}
                          </div>
                          <div></div>
                        </div>
                      ))}
                  </div>
                  {/* <div className=" max-w-230 overflow-x-auto bg-white text-black dark:bg-normalGray"></div> */}
                </div>
              </div>
            ) : (
              <>
                <NowAllowedPage />
              </>
            )}
          </>
        )}

        <CommonDialogFull
          isOpen={isDialogOpen}
          toggleDialog={setIsDialogOpen}
          content={
            <div>
              {dialogType === "add" && (
                <AddRole setIsDialogOpen={setIsDialogOpen} />
              )}
              {id !== null && id !== undefined && dialogType === "edit" && (
                <EditRole
                  setIsDialogOpen={setIsDialogOpen}
                  id={id}
                  setId={setId}
                />
              )}
            </div>
          }
          actions={<></>}
        />

        {/* <CommonDialog
          isOpen={deleteDialog}
          toggleDialog={setDeleteDialog}
          title="Delete Role"
          content={
            <div>
              <div>
                Are You Sure You Want To Delete
                <span style={{ marginRight: "3px" }}></span>
                <strong style={{ marginRight: "3px" }}>
                  Role with name {deleteRole?.name}
                </strong>
                This Action Can not Be Undone
              </div>
            </div>
          }
          actions={
            <>
              {" "}
              <BaseButton
                onClick={() => setDeleteDialog(false)}
                color="primary"
              >
                cancel
              </BaseButton>
              <BaseButton
                onClick={handleDelete}
                sx={{ color: "red" }}
                // variant="contained"
              >
                Delete
              </BaseButton>
            </>
          }
        /> */}
      </div>
    </>
  );
};

export default ListRole;
