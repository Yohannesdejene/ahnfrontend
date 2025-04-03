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
import AddPaymentMethod from "./add";
import EditPaymentMethod from "./edit";
import DeleteConfirmationDialog from "@/common/DeleteConfirmationDialog";
import { RootState, AppDispatch } from "@/store/store";
import {
  fetchPaymentMethodList,
  deletePaymentMethod,
} from "@/store/features/paymentMethods/paymentMethodsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Plus } from "lucide-react";
import NowAllowedPage from "@/components/common/allowedPage";

function convertISOToNormalDate(isoDate: string): string {
  const date = new Date(isoDate);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return date.toLocaleDateString(undefined, options);
}

const ListPaymentMethod: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { paymentMethods, loadingPaymentMethod, errorPaymentMethod } =
    useSelector((state: RootState) => state.paymentMethod);
  const [drawerDisplay, setDrawerDisplay] = useState("add");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [id, setId] = useState<number | string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const auth = useSelector((state: any) => state?.auth?.permissions);
  const hasViewPaymentMethodPermission = auth.some(
    (permission: any) => permission.code === "VIEW_PAYMENT_METHODS",
  );
  const hasAddPaymentMethodPermission = auth.some(
    (permission: any) => permission.code === "ADD_PAYMENT_METHOD",
  );
  const hasUpdatePaymentMethodPermission = auth.some(
    (permission: any) => permission.code === "UPDATE_PAYMENT_METHOD",
  );
  const hasDeletePaymentMethodPermission = auth.some(
    (permission: any) => permission.code === "DELETE_PAYMENT_METHOD",
  );
  const toggleDrawer = (open: boolean) => {
    setIsDrawerOpen(open);
  };

  const handleDialog = (open: boolean) => {
    setIsDialogOpen(open);
  };

  const rows: GridRowsProp =
    !loadingPaymentMethod && paymentMethods
      ? paymentMethods.map((paymentMethod: any, index: number) => ({
          id: paymentMethod.id,
          ...paymentMethod,
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
    { field: "code", headerName: "Code", width: 160 },
    { field: "description", headerName: "Description", width: 200 },
    {
      field: "updatedAt",
      headerName: "Updated At",
      width: 150,
      renderCell: (params) => {
        const value = params.value;
        return <h6>{convertISOToNormalDate(value)}</h6>;
      },
    },
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
              className={`w-full cursor-pointer rounded-lg border border-solid border-primary bg-primary py-2 text-sm leading-normal text-white  ${!hasUpdatePaymentMethodPermission ? "cursor-not-allowed opacity-50" : ""}`}
              style={{ textTransform: "none" }}
              disabled={!hasUpdatePaymentMethodPermission}
            >
              <FaEdit className="mr-3" />
              Edit
            </BaseButton>
            <BaseButton
              disabled={!hasDeletePaymentMethodPermission}
              type="submit"
              className={`w-full cursor-pointer rounded-lg border border-solid border-danger bg-danger py-2 text-sm leading-normal ${!hasDeletePaymentMethodPermission ? "cursor-not-allowed opacity-50" : ""}`}
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
      dispatch(fetchPaymentMethodList());
    } catch (err) {
      console.log("err", err);
    }
  }, [dispatch]);

  const handleDelete = async (id: any) => {
    setIsDialogOpen(false);
    dispatch(deletePaymentMethod(id)).then(() => {
      setIsDialogOpen(false);
      dispatch(fetchPaymentMethodList());
    });
  };

  return (
    <>
      {hasViewPaymentMethodPermission ? (
        <div
          className=" m-0 overflow-x-hidden p-0"
          style={{ maxWidth: "90vw" }}
        >
          <div className=" mb-5 mt-5  flex   justify-between px-5  align-middle  ">
            <label className="mb-2 ml-2 mt-3 block text-title-md font-medium text-black dark:text-white">
              Payment Method
            </label>

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
                disabled={!hasAddPaymentMethodPermission}
                className={`${!hasAddPaymentMethodPermission ? "cursor-not-allowed opacity-50" : ""}`}
              >
                <Plus
                  className="mr-3 text-white "
                  style={{
                    fontSize: "6px",
                    fontWeight: "bold",
                    color: "#ffffff",
                  }}
                />
                Add Payment Method
              </BaseButton>
              {!hasAddPaymentMethodPermission && (
                <div className="bg-gray-900  rounded-lg text-xs   ">
                  You do not have permission
                </div>
              )}
            </div>
          </div>

          <div className="flex h-screen w-full bg-white text-black dark:bg-boxdark dark:text-white">
            <div className="container mx-auto mt-0 ">
              <div className="">
                <div className="p-0 sm:p-3">
                  <div className=" max-w-230 overflow-x-auto bg-white text-black dark:bg-normalGray">
                    <DataGrid
                      loading={loadingPaymentMethod}
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
                            fileName: "payment-methods", // Set your desired file name here (without extension)
                          },
                        },
                      }}
                      sx={{
                        minHeight: "250px", // Set your desired minimum height
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
                  <AddPaymentMethod toggleDrawer={toggleDrawer} />
                )}
                {id !== null && drawerDisplay === "edit" && (
                  <EditPaymentMethod
                    toggleDrawer={toggleDrawer}
                    id={id}
                    setId={setId}
                  />
                )}
              </div>
            }
            direction="right"
            width={350}
          />

          <DeleteConfirmationDialog
            isOpen={isDialogOpen}
            toggleDialog={handleDialog}
            onDelete={() => {
              handleDelete(id);
            }}
            elementName={`Payment method with id = ${id}`}
            elementId={id}
          />
        </div>
      ) : (
        <NowAllowedPage />
      )}
    </>
  );
};

export default ListPaymentMethod;
