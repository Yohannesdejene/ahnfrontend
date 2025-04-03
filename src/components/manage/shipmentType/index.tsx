"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaEdit, FaLessThanEqual } from "react-icons/fa";
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
import AddShipmentType from "./add";
import EditShipmentType from "./edit";
// import  DeleteConfirmationDialog from './delete';
import DeleteConfirmationDialog from "@/common/DeleteConfirmationDialog";
// import handleDelete from "./delete";
import { RootState, AppDispatch } from "@/store/store"; // Import RootState and AppDispatch
import {
  fetchShipmentTypeList,
  deleteShipmentType,
} from "@/store/features/shipmentTypes/shipmentTypeSlice";
import { useDispatch, useSelector } from "react-redux";
import NowAllowedPage from "@/components/common/allowedPage";
import { Plus } from "lucide-react";

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
const ListShipmentType: React.FC = () => {
  const dispatch: AppDispatch = useDispatch(); // Use the AppDispatch type
  const { shipmentTypes, loadingShipmentType, errorShipmentType } = useSelector(
    (state: RootState) => state.shipmentType,
  );
  const [drawerDisplay, setDrawerDisplay] = useState("add");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [id, setId] = useState<number | string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const auth = useSelector((state: any) => state?.auth?.permissions);
  const hasViewShipmentTypePermission = auth.some(
    (permission: any) => permission.code === "VIEW_SHIPMENT_TYPE",
  );
  const hasAddShipmentTypePermission = auth.some(
    (permission: any) => permission.code === "ADD_SHIPMENT_TYPE",
  );
  const hasUpdateShipmentTypePermission = auth.some(
    (permission: any) => permission.code === "UPDATE_SHIPMENT_TYPE",
  );
  const hasDeleteShipmentTypePermission = auth.some(
    (permission: any) => permission.code === "DELETE_SHIPMENT_TYPE",
  );
  // Function to toggle the drawer open/close
  const toggleDrawer = (open: boolean) => {
    setIsDrawerOpen(open);
  };
  const handleDialog = (open: boolean) => {
    setIsDialogOpen(open);
  };

  // Conditionally create rows only when loading is false and dataYears is available
  const rows: GridRowsProp =
    !loadingShipmentType && shipmentTypes
      ? shipmentTypes.map((schoolData: any, index: number) => ({
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
    { field: "code", headerName: "Code", width: 160 },
    // { field: "sub_city", headerName: "Sub City", width: 120 },
    // { field: "city", headerName: "City", width: 120 },
    { field: "description", headerName: "Description", width: 200 },
    {
      field: "updatedAt",
      headerName: "UpdatedAt ",
      width: 150,
      renderCell: (params) => {
        const value = params.value;
        return <h6>{convertISOToNormalDate(value)}</h6>;
      },
    },
    {
      field: "createdAt",
      headerName: "createdAt ",
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
              className={`w-full cursor-pointer rounded-lg border border-solid border-primary bg-primary py-2 text-sm leading-normal text-white  ${!hasUpdateShipmentTypePermission ? "cursor-not-allowed opacity-50" : ""}`}
              style={{ textTransform: "none" }}
              disabled={!hasUpdateShipmentTypePermission}
            >
              <FaEdit className="mr-3" />
              Edit
            </BaseButton>
            <BaseButton
              disabled={!hasDeleteShipmentTypePermission}
              type="submit"
              className={`w-full cursor-pointer rounded-lg border border-solid border-danger bg-danger py-2 text-sm leading-normal ${!hasDeleteShipmentTypePermission ? "cursor-not-allowed opacity-50" : ""}`}
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
    // const data = { size: 10, currentPage: 1 };
    try {
      dispatch(fetchShipmentTypeList());
    } catch (err) {
      console.log("err", err);
    }
  }, [dispatch]);
  const handleDelete = async (id: any) => {
    setIsDialogOpen(false);
    dispatch(deleteShipmentType(id)).then((data) => {
      // toggleDrawer(false);
      setIsDialogOpen(false);
      dispatch(fetchShipmentTypeList());
    });
    console.log("id", id);
  };
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5, // Default page size
    page: 0, // Default page (zero-based index)
  });
  return (
    <>
      {hasViewShipmentTypePermission ? (
        <div className=" overflow-x-hidden" style={{ maxWidth: "90vw" }}>
          {/* <PageHeader
          title="Country List"
          url={URL.ADD_COUNTRY}
          // btnLabel="Add Country"
          // showButton={true}
        /> */}
          <div className=" mb-5 mt-5  flex   justify-between px-5  align-middle  ">
            <label className="mb-2 ml-2 mt-3 block text-title-md font-medium text-black dark:text-white">
              Shipment Type
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
                disabled={!hasAddShipmentTypePermission}
                className={`${!hasAddShipmentTypePermission ? "cursor-not-allowed opacity-50" : ""}`}
              >
                <Plus
                  className="mr-3 text-white "
                  style={{
                    fontSize: "6px",
                    fontWeight: "bold",
                    color: "#ffffff",
                  }}
                />
                Add Shipment Type
              </BaseButton>
              {!hasAddShipmentTypePermission && (
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
                  {/* Restrict the DataGrid's height and width, and allow horizontal scrolling */}
                  <div className=" max-w-230 overflow-x-auto bg-white text-black dark:bg-normalGray">
                    <DataGrid
                      loading={loadingShipmentType}
                      rows={rows}
                      columns={columns}
                      autoHeight // This allows the grid to dynamically adjust height based on content
                      // pageSizeOptions={[5, 10, 25, 50]} // Allow users to select these page sizes
                      // paginationModel={paginationModel}
                      // onPaginationModelChange={(newPaginationModel) => {
                      //   setPaginationModel(newPaginationModel);
                      // }}
                      slots={{ toolbar: GridToolbar }}
                      slotProps={{
                        toolbar: {
                          showQuickFilter: true,
                          quickFilterProps: { debounceMs: 500 },
                          csvOptions: {
                            allRows: true, // Exports all rows, not just the visible ones
                            fileName: "shipment-type", // Set your desired file name here (without extension)
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

          {/* Using CommonDrawer */}

          <CommonDrawer
            isOpen={isDrawerOpen}
            toggleDrawer={toggleDrawer}
            content={
              <div>
                {drawerDisplay == "add" && (
                  <AddShipmentType toggleDrawer={toggleDrawer} />
                )}
                {id !== null && drawerDisplay == "edit" && (
                  <EditShipmentType
                    toggleDrawer={toggleDrawer}
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
            onDelete={() => {
              handleDelete(id);
            }}
            elementName={`Shipment type with id =${id}`}
            elementId={id}
          />
        </div>
      ) : (
        <NowAllowedPage />
      )}
    </>
  );
};

export default ListShipmentType;
