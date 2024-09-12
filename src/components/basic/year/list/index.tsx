"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Alert from "@mui/material/Alert";
import { InputString, Button } from "@/common/formElements";
import { apiCreateCountry } from "@/services/ApiCountry";
import { useGetAllYears } from "@/hooks/useGetAllYears";
import * as URL from "@/routes/index";
import { useRouter } from "next/navigation";
import DynamicTable from "@/common/DynamicTable";
import toast from "react-hot-toast";
import { PageHeader } from "@/common/pageHeader";
import { IoAddCircleSharp } from "react-icons/io5";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";

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

// Example usage
const isoDate = "2024-01-04T00:00:00.000Z";
const normalDate = convertISOToNormalDate(isoDate);
console.log(normalDate); // Output: January 4, 2024

const columns: GridColDef[] = [
  { field: "EUC_year", headerName: "European Calendar", width: 150 },
  { field: "ETH_year", headerName: "Ethiopian Calendar", width: 150 },
  { field: "start_date", headerName: "Start Date", width: 150 },
  { field: "end_date", headerName: "End Date", width: 150 },
  {
    field: "created_date",
    headerName: "Created At",
    width: 170,
    align: "right",
  },
];

const ListYears: React.FC = () => {
  const router = useRouter();
  const { loadingYears, errorYears, optionsYears, dataYears, reloadYears } =
    useGetAllYears();

  useEffect(() => {
    let toastId: string | undefined;

    if (loadingYears) {
      // Show loading toast
      toastId = toast.loading("Fetching countries...");
    } else {
      // Loading finished
      if (toastId) {
        toast.dismiss(toastId); // Dismiss the loading toast when the fetch completes
      }

      if (errorYears) {
        // Show error toast
        toast.error("Failed to fetch countries.");
      } else if (dataYears) {
        // Show success toast only if data is successfully fetched
        toast.success("Countries fetched successfully.");
      }
    }

    // Cleanup function to dismiss the toast if the component unmounts
    return () => {
      if (toastId) {
        toast.dismiss(toastId);
      }
    };
  }, [loadingYears, errorYears, dataYears]);
  console.log("dataYears", dataYears);
  // Conditionally create rows only when loading is false and dataYears is available
  const rows: GridRowsProp =
    !loadingYears && dataYears
      ? dataYears.map((yearData: any, index: number) => ({
          id: index, // Or use a unique property if available in your data
          ...yearData,
        }))
      : [];

  console.log("rows", rows);
  return (
    <>
      <PageHeader
        title="Country List"
        url={URL.ADD_COUNTRY}
        btnLabel="Add Country"
        showButton={true}
      />
      <div className=" flex h-screen  w-full bg-white text-black   dark:bg-boxdark   dark:text-white ">
        <div className="container mx-auto mt-0">
          <div className="w-full">
            {/* <div className="rounded-lg bg-white shadow"> */}
            <div className="p-8">
              {/* <h6 className="text-gray-700 w-full text-lg font-normal ">
                Add Country
              </h6> */}
              {/* {dataYears && !loadingYears && (
                <DynamicTable
                  columns={columns}
                  rows={dataYears}
                  tableTitle="Country Statistics"
                />
              )} */}

              <div
                style={{ height: 300, width: "100%" }}
                className="text-white"
              >
                <DataGrid rows={rows} columns={columns} />
              </div>

              <div style={{ height: 300, width: "100%" }}></div>
              <hr className="mb-4 mt-4 w-full text-lg font-normal text-normalGray " />
              <div className="w-full ">{/* </div> */}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListYears;
