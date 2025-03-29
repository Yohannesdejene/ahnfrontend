"use client";
import React, { useState, useRef, useEffect } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SelectInput, CommonButton } from "@/common/formElements";
import { useGetAllShipmentStatuses } from "@/hooks/useGetAllShipmentStatus";
import useTags from "@/common/useTag";
import { TagField } from "@/common/tagFeild";
import toast from "react-hot-toast";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { apiBulkChangeShipmentStatus } from "@/store/features/shipments/shipmentsApi";
import Table from "@mui/material/Table";
import ResultsTable from "./resultTable";
import { Box, TableCell } from "@mui/material";

const statusSchema = z.object({
  statusId: z.string().min(1, { message: "Status is required" }),
  remark: z.string().optional(),
});
// Function to validate AWB/GWB format
const validateAWB = (value: any) => {
  const awbs = value.split(",");
  for (const awb of awbs) {
    const trimmedAWB = awb.trim();
    if (trimmedAWB.length !== 8 || !/^[a-zA-Z0-9]+$/.test(trimmedAWB)) {
      return false;
    }
  }
  return true;
};

type FormData = z.infer<typeof statusSchema>;

interface GradeDetailProps {
  id: string;
}

const BulkChangeStatus: React.FC<GradeDetailProps> = ({ id }) => {
  const { loadingStatus, errorStatus, optionsStatus } =
    useGetAllShipmentStatuses("Shipment");

  const methods = useForm<FormData>({
    resolver: zodResolver(statusSchema),
  });

  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [arrayMessage, setArrayMessage] = useState<any>([]);
  const { handleSubmit } = methods;

  const [awbs, setAwbs] = useState("");
  const [awbCount, setAwbCount] = useState(0);

  const handleAWBChange = (e: any) => {
    const newAwbs = e.target.value;
    setAwbs(newAwbs);

    // Calculate the number of AWBs
    const awbArray = newAwbs
      ?.split(",")
      .filter((awb: any) => awb.trim() !== "");
    setAwbCount(awbArray.length);
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setError(null);
    setMessage(null);
    setArrayMessage([]);
    setLoading(true);
    try {
      // Convert comma-separated AWB/GWB to an array of strings
      const awbArray = awbs.split(",").map((awb) => awb.trim());

      // Validate each AWB/GWB before sending to API
      if (!validateAWB(awbs)) {
        toast.error("Invalid AWB/GWB format. Please check your input.");
        setLoading(false);
        return;
      }

      const request_Body = {
        awbs: awbArray, // Pass the array of AWBs
        statusId: parseInt(data?.statusId),
        shipmentModeId: id === "air" ? 1 : 2,
        remark: data.remark,
      };

      const response: any = await apiBulkChangeShipmentStatus(
        request_Body?.awbs,
        request_Body?.statusId,
        request_Body?.shipmentModeId,
        request_Body?.remark,
      );
      if (response.status == 200) {
        setArrayMessage(response?.data?.results);
        setAwbs("");
      } else {
        toast.error("Shipment status not updated try again later");
      }
      console.log("response-response", response);

      toast.success("Shipment status updated successfully!");
    } catch (err) {
      setError("Failed to update shipment statuses.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto mt-10 bg-white p-4 text-black dark:bg-boxdark dark:text-white md:p-12">
      <h1 className="mb-5 text-2xl font-bold">Bulk Change Shipment Status</h1>

      {error && <p className="text-red-500">{error}</p>}
      {message && <p className="text-green-500">{message}</p>}

      {/* Barcode Scanner */}

      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid max-w-lg grid-cols-1 gap-6"
        >
          <div>
            <label className="mb-2 block text-sm font-medium">
              Enter {id === "air" ? "AWB" : "GWB"} ( Separate them with comma )
            </label>

            <TextareaAutosize
              minRows={4}
              value={awbs}
              onChange={handleAWBChange}
              aria-label="maximum height"
              placeholder={`Enter the 8 characters  ${id === "air" ? "AWB" : "GWB"} `}
              style={{
                width: "100%",
                border: "1px solid black",
                padding: "10px",
              }}
            />
            {validateAWB(awbs) || awbs === "" ? null : (
              <div className="mt-2 text-sm text-danger">
                Invalid AWB/GWB format. Use 8 characters separated by commas.
              </div>
            )}
          </div>

          <SelectInput
            name="statusId"
            label="Select Status"
            placeholder="Choose a Status"
            options={optionsStatus}
          />

          <div className="flex justify-end">
            <CommonButton
              loading={loading}
              label={`Update ${awbCount} shipments `}
            />
          </div>
        </form>
      </FormProvider>
      {arrayMessage && arrayMessage?.length > 0 && (
        <ResultsTable results={arrayMessage} />
      )}
    </div>
  );
};

export default BulkChangeStatus;
