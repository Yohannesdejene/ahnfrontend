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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  MenuItem,
  IconButton,
  Tooltip,
  Select,
} from "@mui/material";
import { IoMdEye } from "react-icons/io";

import CommonDrawer from "@/common/Drawer";
import CommonDialog from "@/common/CommonDialogBox";
import AddCompany from "./add";
import EditCompany from "./edit";
import { Chip } from "@mui/material";
import DeleteConfirmationDialog from "@/common/DeleteConfirmationDialog";
import { RootState, AppDispatch } from "@/store/store";
import {
  fetchAllCompanies,
  deleteCompany,
  changeCompanyStatus,
} from "@/store/features/company/companiesThunk";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const ListCompany: React.FC = () => {
  const router = useRouter();

  const dispatch: AppDispatch = useDispatch();
  const { companies, loadingCompany } = useSelector(
    (state: RootState) => state.company,
  );
  const [drawerDisplay, setDrawerDisplay] = useState("add");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [id, setId] = useState<number | string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>(""); // For status change
  const [statusDialogOpen, setStatusDialogOpen] = useState(false); // Status dialog state

  const toggleDrawer = (open: boolean) => {
    setIsDrawerOpen(open);
  };

  const handleDialog = (open: boolean) => {
    setIsDialogOpen(open);
  };

  const rows: GridRowsProp =
    !loadingCompany && companies
      ? companies.map((company: any) => ({
          id: company.id,
          name: company.name,
          email: company.email,
          phone: company.phone,
          branchId: company.branchId || "N/A",
          status: company.status,
          createdAt: company.createdAt,
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

  const handleStatusDialog = (
    open: boolean,
    id?: number | string,
    status?: string,
  ) => {
    setStatusDialogOpen(open);
    if (id) setId(id);
    if (status) setSelectedStatus(status);
  };

  const confirmStatusChange = async () => {
    handleStatusDialog(false);
    if (id && selectedStatus) {
      await dispatch(changeCompanyStatus({ id, status: selectedStatus }));
      dispatch(fetchAllCompanies());
    }
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Phone", width: 120 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => {
        const value = params.value;
        const id = params.row.id;

        return (
          <div>
            <Chip
              label={value}
              color={
                value === "ACTIVE"
                  ? "success"
                  : value === "PENDING"
                    ? "warning"
                    : "error"
              }
              sx={{ textTransform: "none" }}
            />
          </div>
        );
      },
    },
    {
      field: "id",
      headerName: "Action",
      width: 280,
      align: "right",
      renderCell: (params) => {
        const value = params.value;
        const newValue = params.row.status;
        const id = params.row.id;
        return (
          <div className="my-2 flex gap-2">
            <BaseButton
              onClick={() => handleStatusDialog(true, id, newValue)}
              className="w-full cursor-pointer rounded-lg border border-solid  py-2 text-sm leading-normal"
              style={{
                textTransform: "none",
                marginTop: "8px",
                // backgroundColor: "#1976d2",
                color: "blue",
              }}
            >
              <FaEdit className="mr-3" style={{ color: "blue" }} />
              Change
            </BaseButton>
            <BaseButton
              type="submit"
              className="w-full cursor-pointer rounded-lg border border-solid  py-2 text-sm leading-normal"
              style={{
                textTransform: "none",
                color: "red",
              }}
              onClick={() => handleDeleteDialog(value)}
            >
              <MdDeleteForever className="mr-3" style={{ color: "red" }} />
              Delete{" "}
            </BaseButton>

            <div className="my-2 flex justify-center">
              <Tooltip title="View Details" arrow>
                <IconButton
                  onClick={() =>
                    router.push(`/companies/detail/${params.value}`)
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
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    try {
      dispatch(fetchAllCompanies());
    } catch (err) {
      console.log("err", err);
    }
  }, [dispatch]);

  const handleDelete = async (id: any) => {
    setIsDialogOpen(false);
    dispatch(deleteCompany(id)).then(() => {
      setIsDialogOpen(false);
      dispatch(fetchAllCompanies());
    });
  };

  return (
    <>
      <div className=" overflow-x-hidden" style={{ maxWidth: "90vw" }}>
        <div className=" flex-col justify-between  sm:flex ">
          <label className="mb-2 ml-2 mt-3 block text-title-md font-medium text-black dark:text-white">
            Companies
          </label>

          <BaseButton
            onClick={handleAddDrawer}
            style={{
              textTransform: "none",
              backgroundColor: "#0f6f03",
              color: "white",
              marginBottom: "10px",
              marginLeft: "auto",
              display: "flex",
            }}
          >
            <IoAddCircleSharp className="mr-3" />
            Add Company
          </BaseButton>
        </div>

        <div className="flex h-screen w-full bg-white text-black dark:bg-boxdark dark:text-white">
          <div className="container mx-auto mt-0">
            <div className="">
              <div className="p-4">
                <div className=" max-w-230 overflow-x-auto bg-white text-black dark:bg-normalGray">
                  <DataGrid
                    loading={loadingCompany}
                    rows={rows}
                    columns={columns}
                    autoHeight
                    slots={{ toolbar: GridToolbar }}
                    slotProps={{
                      toolbar: {
                        csvOptions: {
                          allRows: true,
                          fileName: "companies",
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

        <Dialog
          open={statusDialogOpen}
          onClose={() => handleStatusDialog(false)}
          fullWidth
          maxWidth={"xs"}
        >
          <DialogTitle>Change Company Status</DialogTitle>
          <DialogContent>
            <Select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              style={{ width: "100%" }}
            >
              <MenuItem value="ACTIVE">Active</MenuItem>
              <MenuItem value="PENDING">Pending</MenuItem>
              <MenuItem value="INACTIVE">Inactive</MenuItem>
            </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleStatusDialog(false)} color="primary">
              Cancel
            </Button>
            <Button
              onClick={confirmStatusChange}
              sx={{ color: "green" }}
              // variant="contained"
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>

        <DeleteConfirmationDialog
          isOpen={isDialogOpen}
          toggleDialog={handleDialog}
          onDelete={() => {
            handleDelete(id);
          }}
          elementName={`Company with id = ${id}`}
          elementId={id}
        />
      </div>
    </>
  );
};

export default ListCompany;
