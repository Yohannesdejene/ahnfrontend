"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import {
  Button as BaseButton,
  Pagination,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
  LinearProgress,
  Alert,
} from "@mui/material";
import Chip from "@mui/material/Chip";
import { fetchShipmentsList } from "@/store/features/shipments/shipmentsThunk";
import { RootState, AppDispatch } from "@/store/store";
import { FaFilter } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { GrPowerReset } from "react-icons/gr";
import CommonSearch from "@/common/commonSearch";
import { IoMdEye } from "react-icons/io";
import { TiExport } from "react-icons/ti";
// import { LIST_DETAIL_SHIPMENTS } from "@/routes";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import {
  InputString,
  CommonButton,
  NumberInput,
  SelectInput,
  EthiopianNumberInput,
  InputNumber,
} from "@/common/formElements";
import { IoCloseOutline } from "react-icons/io5";
import { useGetAllBranches } from "@/hooks/useGetAllBranches";
import { useGetAllShipmentTypes } from "@/hooks/useGetAllShipmentTypes";
import { useGetAllShipmentModes } from "@/hooks/useGetAllShipmentModes";
import { useGetAllPaymentMethods } from "@/hooks/useGetAllPaymentMethods";
import { useGetAllPaymentModes } from "@/hooks/useGetAllPaymentModes";
import { useGetAllUnits } from "@/hooks/useGetAllUnits";
import { useGetAllRates } from "@/hooks/useGetAllRates";
import { useGetAllCompanies } from "@/hooks/useGetAllCompanies";
import { getBranchShipmentSummary } from "@/store/features/shipments/shipmentsApi";
import { writeFile, utils } from "xlsx";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import { AnyCnameRecord } from "node:dns";

const shipmentSchema = z.object({
  startDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Invalid date format. Use YYYY-MM-DD",
    })
    .optional(),
  endDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Invalid date format. Use YYYY-MM-DD",
    })
    .optional(),
});
const formatDataForTable = (data: any) => {
  return data.map((item: any, index: any) => ({
    id: item.id || index + 1,
    awb:
      item.manualAwb !== "" && item.manualAwb !== null
        ? item.manualAwb
        : item.awb || "N/A",
    "Sender Name": item.senderName || "N/A",
    "Sender Phone": item.senderPhone || "N/A",
    "Sender City": item.senderBranch?.name || "N/A",
    "Recipient Name": item.recipientName || "N/A",
    "Recipient Phone": item.recipientPhone || "N/A",
    "Recipient City": item.recipientBranch?.name || "N/A",
    "Payment Mode": item.PaymentMode?.code || "N/A",
    "Shipment Mode": item.ShipmentMode?.code || "N/A",
    "Shipment Type": item.ShipmentType?.code || "N/A",

    Rate: item?.rate,
    Quantity: item?.quantity,
    "No of pieces ": item?.noOfPcs,
    Status: item?.ShipmentPackageDispatchStatus?.displayText,
    "Created At": item.createdAt
      ? new Date(item.createdAt).toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      : "N/A",
  }));
};

const AdminShipmentReport = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { user, token } = useSelector((state: RootState) => state.auth);
  const [loadingExport, setLoadingExport] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shipments, setShipments] = useState([]);
  const [errorMessage, setErrorMessage] = useState<any>(null);
  ////filter states all

  const methods = useForm<any>({
    resolver: zodResolver(shipmentSchema),
    defaultValues: {
      startDate: "",
      endDate: "",
    },
  });
  const { reset } = methods;
  const { errors } = methods.formState; // Get form errors
  const formValues = methods.watch(); // This will give you the current form values
  useEffect(() => {
    const fetchShipments = async () => {
      try {
        let filters: any = { ...formValues };

        setLoading(true);
        const exportShipment = await getBranchShipmentSummary(filters);
        if (exportShipment?.status === 200) {
          setShipments(exportShipment?.data?.shipments);
        }
      } catch (err: any) {
        console.error("Error fetching shipments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchShipments();
  }, [formValues]);

  const handleSearch = async () => {
    let filters: any = { ...formValues };

    setLoading(true);
    const exportShipment = await getBranchShipmentSummary(filters);
    if (exportShipment?.status == 200) {
      setShipments(exportShipment?.data?.shipments);
    }
    setLoading(true);
  };

  const handleReset = () => {
    reset();
    let filters: any = {
      startDate: "",
      endDate: "",
    };
  };

  const handleExport = async () => {
    try {
      // const data = { page: 1, pageSize: 5000 };

      let filters: any = { ...formValues };

      setLoadingExport(true);
      const exportShipment = await getBranchShipmentSummary(filters);
      if (exportShipment?.status == 200) {
        let filename = "shipment";
        const formattedData = formatDataForTable(
          exportShipment?.data?.shipments,
        );

        const csv = Papa.unparse(formattedData);
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        saveAs(blob, filename);
      }
      setLoadingExport(false);
    } catch (err: any) {
      console.log("err", err);
    }
  };

  const rows: GridRowsProp =
    !loading && shipments && shipments?.length > 0
      ? shipments?.map((shipment: any, index: number) => ({
          id: shipment.id, // Use shipment ID as the unique identifier
          totalQuantity: shipment?.totalQuantity,
          recipientBranch: shipment?.recipientBranch?.name,
          shipmentMode: shipment?.ShipmentMode?.description,
          shipmentType: shipment?.ShipmentType?.description,
          paymentMethod: shipment?.PaymentMethod?.description,
          paymentMode: shipment?.PaymentMode?.description,
        }))
      : [];

  const columns: GridColDef[] = [
    {
      field: "awb",
      headerName: "AWB OR GWB",
      width: 100,
      align: "left",
      headerAlign: "left",
      renderCell: (params) => (
        <div className="overflow-hidden whitespace-normal break-words">
          {params.value}
        </div>
      ),
    },
    {
      field: "senderName",
      headerName: "Sender Name",
      width: 120,
      align: "left",
      headerAlign: "left",
      renderCell: (params) => (
        <div className="overflow-hidden whitespace-normal break-words">
          {params.value}
        </div>
      ),
    },
    {
      field: "senderPhone",
      headerName: "Sender Phone",
      width: 120,
      align: "left",
      headerAlign: "left",
      renderCell: (params) => (
        <div className="overflow-hidden whitespace-normal break-words">
          {params.value}
        </div>
      ),
    },
    {
      field: "recipientName",
      headerName: "Recipient Name",
      width: 140,
      align: "left",
      headerAlign: "left",
      renderCell: (params) => (
        <div className="overflow-hidden whitespace-normal break-words">
          {params.value}
        </div>
      ),
    },
    {
      field: "recipientPhone",
      headerName: "Recipient Phone",
      width: 150,
      align: "left",
      headerAlign: "left",
      renderCell: (params) => (
        <div className="overflow-hidden whitespace-normal break-words">
          {params.value}
        </div>
      ),
    },
    {
      field: "recipientBranch",
      headerName: "Recipient City",
      width: 100,
      align: "left",
      headerAlign: "left",
      renderCell: (params) => (
        <div className="overflow-hidden whitespace-normal break-words">
          {params.value}
        </div>
      ),
    },
    // {
    //   field: "shipmentType",
    //   headerName: "Shipment Type",
    //   width: 100,
    //   align: "left",
    //   headerAlign: "left",
    //   renderCell: (params) => (
    //     <div className="overflow-hidden whitespace-normal break-words">
    //       {params.value}
    //     </div>
    //   ),
    // },

    {
      field: "paymentMode",
      headerName: "Payment Mode",
      width: 100,
      align: "left",
      headerAlign: "left",
      renderCell: (params) => (
        <div className="overflow-hidden whitespace-normal break-words">
          {params.value}
        </div>
      ),
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 150,
      align: "left",
      headerAlign: "left",
      renderCell: (params) => (
        <div className="overflow-hidden whitespace-normal break-words">
          {params.value
            ? new Date(params.value).toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
              })
            : "N/A"}
        </div>
      ),
    },
    // {
    //   field: "paymentMethod",
    //   headerName: "Payment Method",
    //   width: 100,
    //   align: "left",
    //   headerAlign: "left",
    //   renderCell: (params) => (
    //     <div className="overflow-hidden whitespace-normal break-words">
    //       {params.value}
    //     </div>
    //   ),
    // },
    // {
    //   field: "status",
    //   headerName: "Status",
    //   width: 100,
    //   align: "center",
    //   headerAlign: "center",
    //   renderCell: (params) => (
    //     <Chip
    //       color={params.value === "ACTIVE" ? "success" : "error"}
    //       label={params.value}
    //       sx={{
    //         width: "100px",
    //         whiteSpace: "normal",
    //         wordWrap: "break-word",
    //         overflow: "hidden",
    //       }}
    //     />
    //   ),
    // },
    // {
    //   field: "id",
    //   headerName: "Action",
    //   width: 100,
    //   align: "center",
    //   headerAlign: "center",
    //   renderCell: (params) => (
    //     <div className="my-2 flex justify-center">
    //       <Tooltip title="View Details" arrow>
    //         <IconButton
    //           onClick={() =>
    //             router.push(
    //               `/shipment/${shipments && shipments[0] && shipments[0]?.shipmentModeId == 1 ? "air" : "ground"}/detail/${params.value}`,
    //             )
    //           }
    //           sx={{
    //             color: "#0097B2",
    //             "&:hover": { backgroundColor: "rgba(0, 151, 178, 0.04)" },
    //           }}
    //         >
    //           <IoMdEye fontSize="large" />
    //         </IconButton>
    //       </Tooltip>
    //     </div>
    //   ),
    // },
  ];

  return (
    <div className="mx-auto max-w-242.5">
      <label className="mb-12  block text-title-lg font-medium text-black dark:text-white">
        Admin Branch Insight{" "}
      </label>
      {errorMessage && (
        <Alert severity="error">Something went wrong try again </Alert>
      )}

      <FormProvider {...methods}>
        <div className="w-full ">
          <div className="mb-8 grid w-full grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-6">
            <div className="card flex flex-col justify-center">
              <InputString
                type="date"
                name="startDate"
                label="Start Date"
                placeholder="ex "
              />
            </div>

            <div className="card flex flex-col justify-center">
              <InputString
                type="date"
                name="endDate"
                label="End Date"
                placeholder="ex "
              />
            </div>

            <div className="mb-1 flex items-end">
              <BaseButton
                onClick={handleSearch}
                startIcon={<IoSearch />}
                variant="contained"
                sx={{
                  textTransform: "none",
                  backgroundColor: "#109101",
                  color: "white",
                  borderRadius: "8px",

                  "&:hover": {
                    backgroundColor: "#109101",
                  },
                }}
                style={{
                  backgroundColor: "#109101",
                  height: "31px",
                  width: "100%",
                }}
              >
                Search
              </BaseButton>
            </div>

            <div className="mb-1 flex items-end">
              <BaseButton
                onClick={handleReset}
                variant="outlined"
                startIcon={<GrPowerReset />}
                sx={{
                  textTransform: "none",
                  borderRadius: "8px",
                  backgroundColor: "#109101",
                  color: "white",
                }}
                style={{
                  backgroundColor: "#109101",
                  height: "31px",
                  width: "100%",
                }}
                className="flex items-center gap-2"
              >
                Reset Filter
              </BaseButton>
            </div>
          </div>
        </div>
      </FormProvider>

      <div className=" flex justify-between ">
        <div className="flex align-middle">
          <BaseButton
            style={{ backgroundColor: "#2073de", color: "white" }}
            disabled={loadingExport}
            variant="contained"
            startIcon={<TiExport />}
            onClick={handleExport}
          >
            {loadingExport ? <span>exporting.....</span> : <span>Export</span>}
          </BaseButton>
        </div>
      </div>
      <div className="auto flex w-full bg-white text-black dark:bg-boxdark dark:text-white">
        <div className="container mx-auto mt-0">
          <div className="">
            <div className="p-4">
              <div className="overflow-x-auto bg-white text-black dark:bg-normalGray">
                {loading && <LinearProgress />}
                <DataGrid
                  loading={loading}
                  rows={rows}
                  columns={columns}
                  autoHeight
                  disableColumnFilter
                  disableColumnSelector
                  disableDensitySelector
                  disableColumnMenu
                  hideFooter
                  paginationMode="server"
                  sx={{ minHeight: "200px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminShipmentReport;
