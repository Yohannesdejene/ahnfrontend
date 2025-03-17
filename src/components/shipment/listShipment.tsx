"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import {
  Button as BaseButton,
  Pagination,
  Select,
  MenuItem,
} from "@mui/material";
import { IconButton, Tooltip } from "@mui/material";
import Chip from "@mui/material/Chip";
import { fetchShipmentsList } from "@/store/features/shipments/shipmentsThunk";
import { RootState, AppDispatch } from "@/store/store";
import CommonSearch from "@/common/commonSearch";
import { IoMdEye } from "react-icons/io";
// import { LIST_DETAIL_SHIPMENTS } from "@/routes";
import { useRouter } from "next/navigation";
interface GradeDetailProps {
  id: string;
  type: string;
}
const ShipmentList: React.FC<GradeDetailProps> = ({ id, type }) => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const { shipments, loadingShipments, pagination } = useSelector(
    (state: RootState) => state.shipment,
  );

  const handleSearch = (searchTerm: string) => {
    const data = { page: 1, pageSize: size, search: searchTerm };
    dispatch(fetchShipmentsList(data));
  };

  useEffect(() => {
    const data = { page, pageSize: size };
    dispatch(fetchShipmentsList(data));
  }, [page, size, dispatch]);

  const handlePageSizeChange = (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    setSize(event.target.value as number);
    setPage(1); // Reset to first page when changing page size
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  const handleReset = () => {
    setPage(1);
    setSize(10);
    dispatch(fetchShipmentsList({ page: 1, pageSize: 10 }));
  };

  const rows: GridRowsProp =
    !loadingShipments && shipments && shipments?.length > 0
      ? shipments?.map((shipment: any, index: number) => ({
          id: shipment.id, // Use shipment ID as the unique identifier
          ...shipment,
        }))
      : [];

  const columns: GridColDef[] = [
    {
      field: "manualAwb",
      headerName: "AWB",
      width: 150,
      align: "left",
    },
    {
      field: "senderName",
      headerName: "Sender Name",
      width: 150,
      align: "left",
    },
    {
      field: "recipientName",
      headerName: "Recipient Name",
      width: 150,
      align: "left",
    },
    {
      field: "shipmentTypeId",
      headerName: "Shipment Type",
      width: 120,
      align: "left",
    },
    {
      field: "shipmentModeId",
      headerName: "Shipment Mode",
      width: 120,
      align: "left",
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      align: "center",
      renderCell: (params) => {
        const value = params.value;
        return (
          <Chip
            color={value === "ACTIVE" ? "success" : "error"}
            label={value}
            sx={{ width: "100px" }}
          />
        );
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
            <Tooltip title="View Details" arrow>
              <IconButton
                onClick={() => router.push(`${""}/${value}`)}
                sx={{
                  color: "#0097B2",
                  "&:hover": {
                    backgroundColor: "rgba(0, 151, 178, 0.04)",
                  },
                }}
              >
                <IoMdEye fontSize="large" />
              </IconButton>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  return (
    <div className="mx-auto max-w-242.5">
      <label className="mb-4 block text-title-md font-medium text-black dark:text-white">
        Shipment List
      </label>
      <div className="xs:d-flex xs:flex-column md:flex md:justify-between">
        <div className="flex w-full gap-2 sm:w-1/2">
          <div className="w-full">
            <CommonSearch
              label="Search Shipments"
              placeholder="Search by AWB, Sender, or Recipient"
              onSearch={handleSearch}
            />
          </div>

          <BaseButton
            onClick={handleReset}
            variant="contained"
            sx={{
              textTransform: "none",
              backgroundColor: "#0097B2",
              color: "white",
              mt: "3px",
              marginBottom: "10px",
              "&:hover": {
                backgroundColor: "#0097B2",
              },
            }}
            style={{ backgroundColor: "#0097B2", height: "31px" }}
          >
            Reset
          </BaseButton>
        </div>
        <div className="ml-3 mr-3 flex items-center">
          <select
            className="font-sans focus:shadow-outline-primary dark:focus:shadow-outline-primary w-full rounded-lg border border-solid border-slate-300 bg-white px-3 py-2 text-sm font-normal leading-5 text-slate-900 shadow-md shadow-slate-100 focus:border-primary focus:shadow-lg focus-visible:outline-0 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-300 dark:shadow-slate-900 dark:focus:border-primary"
            onChange={handlePageSizeChange}
            defaultValue={10} // Ensure a default value is set
          >
            {[5, 10, 20, 30, 50, 100].map((size) => (
              <option key={size} value={size}>
                {size} per page
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="auto flex w-full bg-white text-black dark:bg-boxdark dark:text-white">
        <div className="container mx-auto mt-0">
          <div className="">
            <div className="p-4">
              <div className="overflow-x-auto bg-white text-black dark:bg-normalGray">
                <DataGrid
                  loading={loadingShipments}
                  rows={rows}
                  columns={columns}
                  autoHeight
                  disableColumnFilter
                  disableColumnSelector
                  disableDensitySelector
                  disableColumnMenu
                  hideFooter
                  paginationMode="server"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-5 mt-5 flex justify-center">
        <Pagination
          count={pagination?.numberOfPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </div>
    </div>
  );
};

export default ShipmentList;
