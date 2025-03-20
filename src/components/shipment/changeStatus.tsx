"use client";
import React, { useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CircularProgress, Alert } from "@mui/material";
import { InputString, SelectInput, CommonButton } from "@/common/formElements";
import { apiChangeShipmentStatus } from "@/store/features/shipments/shipmentsApi";
import { useGetAllShipmentStatuses } from "@/hooks/useGetAllShipmentStatus";

const statusSchema = z.object({
  awb: z.string().min(1, { message: "AWB is required" }),
  statusId: z.string().min(1, { message: "Status is required" }),
  remark: z.string().optional(),
});

type FormData = z.infer<typeof statusSchema>;
interface GradeDetailProps {
  id: string;
}

const ChangeStatus: React.FC<GradeDetailProps> = ({ id }) => {
  const {
    loadingStatus,
    errorStatus,
    optionsStatus,
    dataStatus,
    reloadStatuses,
  } = useGetAllShipmentStatuses("Shipment");
  const methods = useForm<FormData>({
    resolver: zodResolver(statusSchema),
  });
  const [error, setError] = useState<any>(null);
  const [message, setMessage] = useState<any>(null);
  const { handleSubmit, watch } = methods;
  const formValues = watch();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    setError(null);
    setMessage(null);
    const request_data = { ...data, shipmentModeId: id == "air" ? 1 : 2 };
    setLoading(true);
    try {
      const response: any = await apiChangeShipmentStatus(
        data?.awb,
        parseInt(data?.statusId),
        id == "air" ? 1 : 2,
        data.remark,
      );
      console.log("response", response);
      if (response?.status == 200) {
        // toast.success("Shipment status updated successfully!");
        setMessage("Shipment status updated successfully!");
      } else {
        setError(
          response?.data?.message || "Failed to update shipment status.",
        );
      }
      console.log("response-response", response);
    } catch (error: any) {
      setError(null);

      setError(
        error?.response?.data?.message || "Failed to update shipment status.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto  mt-10 bg-white p-12 text-black dark:bg-boxdark dark:text-white ">
      <h1 className="mb-5 text-2xl font-bold">Change Shipment Status</h1>
      <div className="m-5">
        {" "}
        {error && <Alert severity="error">{error}</Alert>}
      </div>
      <div className="m-5">
        {" "}
        {message && <Alert severity="success">{message}</Alert>}
      </div>
      {/* Note Section */}
      <div className="mb-5 rounded-md bg-blue-100 p-4 text-blue-800">
        <p>
          <strong>Note:</strong> Statuses like <strong>Arrived</strong> and{" "}
          <strong>Delivered</strong> should only be updated by the{" "}
          <strong>destination branch</strong>, not the source branch(city).
          Ensure that the shipment has reached the correct branch before
          updating these statuses.
        </p>
      </div>

      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid max-w-lg grid-cols-1 gap-6"
        >
          {/* AWB Input */}
          <InputString
            type="text"
            name="awb"
            label={`${id == "air" ? "AWB" : "GWB"}`}
            placeholder={`Enter ${id == "air" ? "AWB" : "GWB"} Number`}
          />

          {/* Status Dropdown */}
          <SelectInput
            name="statusId"
            label="Select Status"
            placeholder="Choose a Status"
            options={optionsStatus}
          />
          <InputString
            type="text"
            name="remark"
            label="Remark(Optional)"
            placeholder="Remark(Optional)"
          />

          {/* Submit Button */}
          <div className="flex justify-end">
            <CommonButton loading={loading} label="Update Status" />
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default ChangeStatus;
