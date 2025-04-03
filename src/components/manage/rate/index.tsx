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
import AddRate from "./add";
import EditRate from "./edit";
import DeleteConfirmationDialog from "@/common/DeleteConfirmationDialog";
import { RootState, AppDispatch } from "@/store/store";
import { fetchRateList, deleteRate } from "@/store/features/rates/ratesSlice";
import { useDispatch, useSelector } from "react-redux";
import { Plus } from "lucide-react";

// State for pagination
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

const ListRate: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { rates, loadingRate, errorRate } = useSelector(
    (state: RootState) => state.rate,
  );

  const [drawerDisplay, setDrawerDisplay] = useState("add");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [id, setId] = useState<number | string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const auth = useSelector((state: any) => state?.auth?.permissions);
  const hasViewRatePermission = auth.some(
    (permission: any) => permission.code === "VIEW_SHIPMENT_RATE",
  );
  const hasAddRatePermission = auth.some(
    (permission: any) => permission.code === "ADD_SHIPMENT_RATE",
  );
  const hasUpdateRatePermission = auth.some(
    (permission: any) => permission.code === "UPDATE_SHIPMENT_RATE",
  );
  const hasDeleteRatePermission = auth.some(
    (permission: any) => permission.code === "DELETE_SHIPMENT_RATE",
  );
  const toggleDrawer = (open: boolean) => {
    setIsDrawerOpen(open);
  };

  const handleDialog = (open: boolean) => {
    setIsDialogOpen(open);
  };

  const rows: GridRowsProp =
    !loadingRate && rates
      ? rates.map((rate: any) => ({
          id: rate.id,
          rate: rate.rate,
          sourceBranch: rate.sourceBranch?.name,
          destinationBranch: rate.destinationBranch?.name,
          shipmentMode: rate.ShipmentMode?.description,
          shipmentType: rate.ShipmentType?.description,
          createdAt: rate.createdAt,
          updatedAt: rate.updatedAt,
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
    { field: "rate", headerName: "Rate (Birr)", width: 100 },
    { field: "sourceBranch", headerName: "Source ", width: 200 },
    {
      field: "destinationBranch",
      headerName: "Destination ",
      width: 200,
    },
    {
      field: "shipmentMode",
      headerName: "Shipment Mode",
      width: 200,
    },
    {
      field: "shipmentType",
      headerName: "Shipment Type",
      width: 200,
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
              className={`w-full cursor-pointer rounded-lg border border-solid border-primary bg-primary py-2 text-sm leading-normal text-white  ${!hasUpdateRatePermission ? "cursor-not-allowed opacity-50" : ""}`}
              style={{ textTransform: "none" }}
              disabled={!hasUpdateRatePermission}
            >
              <FaEdit className="mr-3" />
              Edit
            </BaseButton>
            <BaseButton
              disabled={!hasDeleteRatePermission}
              type="submit"
              className={`w-full cursor-pointer rounded-lg border border-solid border-danger bg-danger py-2 text-sm leading-normal ${!hasDeleteRatePermission ? "cursor-not-allowed opacity-50" : ""}`}
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
      dispatch(fetchRateList());
    } catch (err) {
      console.log("err", err);
    }
  }, [dispatch]);

  const handleDelete = async (id: any) => {
    setIsDialogOpen(false);
    dispatch(deleteRate(id)).then(() => {
      setIsDialogOpen(false);
      dispatch(fetchRateList());
    });
  };
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5, // Default page size
    page: 0, // Default page (zero-based index)
  });
  return (
    <>
      {hasViewRatePermission ? (
        <div className=" overflow-x-hidden" style={{ maxWidth: "90vw" }}>
          <div className="mb-5 mt-5  flex  justify-between px-5  align-middle  ">
            <h5 className="text-title-md font-semibold   text-black  dark:text-white  ">
              Rates{" "}
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
                disabled={!hasAddRatePermission}
                className={`${!hasAddRatePermission ? "cursor-not-allowed opacity-50" : ""}`}
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
              {!hasAddRatePermission && (
                <div className="bg-gray-900  rounded-lg text-xs   ">
                  You do not have permission
                </div>
              )}
            </div>
          </div>
          <div className="flex h-screen w-full bg-white text-black dark:bg-boxdark dark:text-white">
            <div className="F container mx-auto mt-0 px-4">
              <div className="">
                <div className="p-0 sm:p-3">
                  <div className=" max-w-230 overflow-x-auto bg-white text-black dark:bg-normalGray">
                    <DataGrid
                      loading={loadingRate}
                      rows={rows} // Ensure this contains all data, not just paginated data
                      columns={columns}
                      autoHeight
                      // pageSizeOptions={[5, 10, 25, 50]}
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
                            fileName: "rate", // Set your desired file name here (without extension)
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
                  <AddRate toggleDrawer={toggleDrawer} />
                )}
                {id !== null && drawerDisplay === "edit" && (
                  <EditRate toggleDrawer={toggleDrawer} id={id} setId={setId} />
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
            elementName={`Rate with id = ${id}`}
            elementId={id}
          />
        </div>
      ) : (
        <NowAllowedPage />
      )}
    </>
  );
};

export default ListRate;
