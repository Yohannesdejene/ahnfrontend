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
import { apiGetShipmentsList } from "@/store/features/shipments/shipmentsApi";
import { writeFile, utils } from "xlsx";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import { AnyCnameRecord } from "node:dns";

const shipmentSchema = z.object({
  awb: z.string().optional(),
  paymentModeId: z.string().optional(),
  paymentMethodId: z.string().optional(), // Make it optional by default
  shipmentModeId: z.string().optional(),
  shipmentTypeId: z.string().optional(),
  senderBranchId: z.string().optional(),
  recipientBranchId: z.string().optional(),
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
  senderPhone: z
    .string()
    .min(9, { message: "Phone must be exactly 9 digits" })
    .max(9, { message: "Phone must be exactly 9 digits" })
    .regex(/^[7|9][0-9]{8}$/, {
      message: "Phone must be 9 digits and start with 7 or 9",
    })
    .optional(),
  recipientPhone: z
    .string()
    .max(9, { message: "Phone must be exactly 9 digits" })
    .regex(/^[7|9][0-9]{8}$/, {
      message: "Phone must be 9 digits and start with 7 or 9",
    })
    .optional(),
  companyId: z.number().optional(), // Initially optional
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

interface GradeDetailProps {
  id: string;
}

const ShipmentAirList: React.FC<GradeDetailProps> = ({ id }) => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { user, token } = useSelector((state: RootState) => state.auth);

  const { loadingBranch, errorBranch, optionsBranch, dataBranch, reloadYears } =
    useGetAllBranches();
  const {
    loadingShipmentType,
    errorShipmentType,
    optionsShipmentType,
    dataShipmentType,
    reloadShipmentTypes,
  } = useGetAllShipmentTypes();
  const {
    loadingShipmentMode,
    errorShipmentMode,
    optionsShipmentMode,
    dataShipmentMode,
    reloadShipmentModes,
  } = useGetAllShipmentModes();
  const {
    loadingPaymentMethod,
    errorPaymentMethod,
    optionsPaymentMethod,
    dataPaymentMethod,
    reloadPaymentMethods,
  } = useGetAllPaymentMethods();
  const {
    loadingPaymentMode,
    errorPaymentMode,
    optionsPaymentMode,
    dataPaymentMode,
    reloadPaymentModes,
  } = useGetAllPaymentModes();
  const { loadingRate, errorRate, optionsRate, dataRate, reloadRates } =
    useGetAllRates();
  const { loadingUnit, errorUnit, optionsUnit, dataUnit, reloadUnits } =
    useGetAllUnits();
  const {
    loadingCompany,
    errorCompany,
    optionsCompany,
    dataCompany,
    reloadCompanies,
  } = useGetAllCompanies();
  const [loadingExport, setLoadingExport] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  ////filter states all
  const [filterMore, setFilterMore] = useState(false);
  ////pagination
  const { shipments, errorShipments, loadingShipments, pagination } =
    useSelector((state: RootState) => state.shipment);
  const methods = useForm<any>({
    resolver: zodResolver(shipmentSchema),
    defaultValues: {
      awb: "",
      paymentModeId: "",
      paymentMethodId: "",
      shipmentModeId: 1,
      shipmentTypeId: "",
      senderBranchId: "",
      recipientBranchId: "",
      startDate: "",
      endDate: "",
      senderPhone: "",
      recipientPhone: "",
      companyId: undefined, // Number type, so undefined is better than ""
    },
  });
  const { reset } = methods;
  const { errors } = methods.formState; // Get form errors
  const formValues = methods.watch(); // This will give you the current form values

  useEffect(() => {
    let filters: any = { ...formValues };
    filters.shipmentModeId = 1;

    // Only modify filters if id is not "ALL_AIR" or "ALL_GROUND"

    switch (id) {
      case "READY_FOR_PICK_UP":
        filters.statusId = 1; // Example attribute
        break;
      case "ARRIVING":
        filters.statusId = 3; // Example attribute
        break;
      case "ARRIVED":
        filters.statusId = 5; // Example attribute
        break;
      case "DELIVERED":
        filters.statusId = 6; // Example attribute
        break;
      default:
        // Optionally handle unexpected id values
        break;
    }

    const data = { page, pageSize: size, filters: filters };
    let fil = dispatch(fetchShipmentsList(data));
  }, [page, size]);

  const handleSearch = () => {
    let filters: any = { ...formValues };
    filters.shipmentModeId = 1;
    switch (id) {
      case "READY_FOR_PICK_UP":
        {
          filters.status = 1; // Example attribute
          filters.senderBranchId = user?.Branch?.id;
        }
        break;
      case "ARRIVING":
        {
          filters.status = 3; // Example attribute
          filters.recipientBranchId = user?.Branch?.id;
        }
        break;
      case "ARRIVED":
        {
          filters.status = 5; // Example attribute
          filters.recipientBranchId = user?.Branch?.id;
        }
        break;
      case "DELIVERED":
        filters.status = 6; // Example attribute
        break;
      default:
        // Optionally handle unexpected id values
        break;
    }

    const data = { page: 1, pageSize: size, filters: filters };
    dispatch(fetchShipmentsList(data));
  };
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
    reset();
    let filters: any = {
      awb: "",
      paymentModeId: "",
      paymentMethodId: "",
      shipmentModeId: 1,
      shipmentTypeId: "",
      senderBranchId: "",
      recipientBranchId: "",
      startDate: "",
      endDate: "",
      senderPhone: "",
      recipientPhone: "",
      companyId: undefined,
    };
    filters.shipmentModeId = 1;
    switch (id) {
      case "READY_FOR_PICK_UP":
        {
          filters.status = 1; // Example attribute
          filters.senderBranchId = user?.Branch?.id;
        }
        break;
      case "ARRIVING":
        {
          filters.status = 3; // Example attribute
          filters.recipientBranchId = user?.Branch?.id;
        }
        break;
      case "ARRIVED":
        {
          filters.status = 5; // Example attribute
          filters.recipientBranchId = user?.Branch?.id;
        }
        break;
      case "DELIVERED":
        filters.status = 6; // Example attribute
        break;
      default:
        // Optionally handle unexpected id values
        break;
    }
    switch (id) {
      case "READY_FOR_PICK_UP":
        {
          filters.status = 1; // Example attribute
          filters.senderBranchId = user?.Branch?.id;
        }
        break;
      case "ARRIVING":
        {
          filters.status = 3; // Example attribute
          filters.recipientBranchId = user?.Branch?.id;
        }
        break;
      case "ARRIVED":
        {
          filters.status = 5; // Example attribute
          filters.recipientBranchId = user?.Branch?.id;
        }
        break;
      case "DELIVERED":
        filters.status = 6; // Example attribute
        break;
      default:
        // Optionally handle unexpected id values
        break;
    }

    const data = { page, pageSize: size, filters: filters };
    let fil = dispatch(fetchShipmentsList(data));
  };

  const handleExport = async () => {
    try {
      // const data = { page: 1, pageSize: 5000 };
      const page = 1,
        pageSize = 200;
      let filters: any = { ...formValues };
      switch (id) {
        case "READY_FOR_PICK_UP":
          {
            filters.status = 1; // Example attribute
            filters.senderBranchId = user?.Branch?.id;
          }
          break;
        case "ARRIVING":
          {
            filters.status = 3; // Example attribute
            filters.recipientBranchId = user?.Branch?.id;
          }
          break;
        case "ARRIVED":
          {
            filters.status = 5; // Example attribute
            filters.recipientBranchId = user?.Branch?.id;
          }
          break;
        case "DELIVERED":
          filters.status = 6; // Example attribute
          break;
        default:
          // Optionally handle unexpected id values
          break;
      }
      filters.shipmentModeId = 1;
      setLoadingExport(true);
      const exportShipment = await apiGetShipmentsList(page, pageSize, filters);
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
    !loadingShipments && shipments && shipments?.length > 0
      ? shipments?.map((shipment: any, index: number) => ({
          id: shipment.id, // Use shipment ID as the unique identifier
          ...shipment,
          senderBranch: shipment?.senderBranch?.name,
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
      headerName: "AWB",
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
      field: "senderBranch",
      headerName: "Sender City",
      width: 140,
      align: "left",
      headerAlign: "left",
      renderCell: (params) => (
        <div className="overflow-hidden whitespace-normal break-words">
          {params.value}
        </div>
      ),
    },
    // {
    //   field: "senderPhone",
    //   headerName: "Sender Phone",
    //   width: 120,
    //   align: "left",
    //   headerAlign: "left",
    //   renderCell: (params) => (
    //     <div className="overflow-hidden whitespace-normal break-words">
    //       {params.value}
    //     </div>
    //   ),
    // },
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
    // {
    //   field: "recipientPhone",
    //   headerName: "Recipient Phone",
    //   width: 150,
    //   align: "left",
    //   headerAlign: "left",
    //   renderCell: (params) => (
    //     <div className="overflow-hidden whitespace-normal break-words">
    //       {params.value}
    //     </div>
    //   ),
    // },
    {
      field: "recipientBranch",
      headerName: "Recipient City",
      width: 140,
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
      field: "quantity",
      headerName: "Weight(KG)",
      width: 130,
      align: "left",
      headerAlign: "left",
      renderCell: (params) => (
        <div className="overflow-hidden whitespace-normal break-words">
          {params.value}
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
    {
      field: "id",
      headerName: "Action",
      width: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <div className="my-2 flex justify-center">
          <Tooltip title="View Details" arrow>
            <IconButton
              onClick={() =>
                router.push(`/shipment/air/detail/${params.value}`)
              }
              sx={{
                color: "#0097B2",
                "&:hover": { backgroundColor: "rgba(0, 151, 178, 0.04)" },
              }}
            >
              <IoMdEye fontSize="large" />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div className="mx-auto max-w-230" style={{ maxWidth: "90vw" }}>
      <label className="mb-12  block text-title-lg font-medium text-black dark:text-white">
        {id == "READY_FOR_PICK_UP"
          ? "Ready for pick up shipments"
          : id == "ARRIVING"
            ? "Incoming shipments"
            : id == "ARRIVED"
              ? "Arrived shipments"
              : id == "DELIVERED"
                ? "Delivered shipments"
                : ""}
      </label>
      {errorShipments && (
        <Alert severity="error">Something went wrong try again </Alert>
      )}
      <FormProvider {...methods}>
        <div className="w-full ">
          <div className="mb-8 grid w-full grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-6">
            <div className="card flex flex-col justify-center">
              <InputString
                type="text"
                name="awb"
                label="Search by awb "
                placeholder="ex 48616082"
              />
            </div>

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
            {/* 
            <div className="mb-1 flex items-end">
              <BaseButton
                onClick={() => {
                  setFilterMore(!filterMore);
                }}
                variant="outlined"
                startIcon={filterMore ? <IoCloseOutline /> : <FaFilter />}
                sx={{
                  textTransform: "none",
                  borderRadius: "8px",
                  fontWeight: "500",
                  color: "white",
                }}
                style={{
                  backgroundColor: "#109101",
                  height: "31px",
                  width: "100%",
                }}
                className="flex items-center gap-2"
              >
                {filterMore ? "Close filter" : "More Filter"}
              </BaseButton>
            </div> */}
          </div>
        </div>
        {/* more filters  */}
        {/* {filterMore && (
          <div className="w-full ">
            <div className="mb-8 grid w-full grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-5">
              {(id == "ALL_AIR" || id == "ALL_GROUND") && (
                <>
                  <div className="card flex flex-col justify-center">
                    <SelectInput
                      name="senderBranchId"
                      label="Sender city  "
                      placeholder="Select Sender City   "
                      options={optionsBranch}
                      loading={loadingBranch} // Default to false if not provided
                    />
                  </div>

                  <div className="card flex flex-col justify-center">
                    <SelectInput
                      name="recipientBranchId"
                      label="Receiver city  "
                      placeholder="Select Receiver City   "
                      options={optionsBranch}
                      loading={loadingBranch} // Default to false if not provided
                    />
                  </div>
                </>
              )}

              <div className="card flex flex-col justify-center">
                <SelectInput
                  name="paymentModeId"
                  label="Payment Mode "
                  placeholder="Select Payment Methods"
                  options={optionsPaymentMode}
                  loading={loadingPaymentMode}
                  // Default to false if not provided
                />
              </div>
              <div className="card flex flex-col justify-center">
                <EthiopianNumberInput
                  type="text"
                  name="senderPhone"
                  label="Sender Phone Number"
                  placeholder="e.g. 912345678"
                />
              </div>
              <div className="card flex flex-col justify-center">
                <EthiopianNumberInput
                  type="text"
                  name="recipientPhone"
                  label="Recipient Phone Number"
                  placeholder="e.g. 912345678"
                />
              </div>
            </div>
          </div>
        )} */}
      </FormProvider>

      <div className=" flex justify-between ">
        <div>
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
        <div
          className=" mb-3 ml-auto flex items-center"
          style={{ width: "140px" }}
        >
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
              <div className=" max-w-230 overflow-x-auto bg-white text-black dark:bg-normalGray">
                {loadingShipments && <LinearProgress />}
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
                  sx={{ minHeight: "200px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-5 mt-5 flex justify-center">
        <Pagination
          count={pagination?.totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </div>
    </div>
  );
};

export default ShipmentAirList;
