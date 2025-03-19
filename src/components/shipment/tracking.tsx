"use client";
import React, { useState } from "react";
import {
  CircularProgress,
  Alert,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from "@mui/material";
import { apiGetShipmentTracking } from "@/store/features/shipments/shipmentsApi";
import { InputString, SelectInput, CommonButton } from "@/common/formElements";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
const statusSchema = z.object({
  awb: z.string().min(1, { message: "AWB is required" }),
});

interface TrackingForm {
  awb: string;
}

interface TrackingData {
  id: number;
  entityId: number;
  entityType: string;
  statusId: number;
  branchId: number;
  remark: string;
  addedBy: string;
  createdAt: string;
  updatedAt: string;
  Branch: {
    id: number;
    name: string;
    location: string;
  };
  ShipmentPackageDispatchStatus: {
    id: number;
    code: string;
    displayText: string;
    description: string;
    entityType: string;
    who: string;
    createdAt: string;
    updatedAt: string;
  };
}

const TrackingPage: React.FC<{ id: string }> = ({ id }) => {
  const { register, handleSubmit, reset } = useForm<TrackingForm>();
  const [trackingData, setTrackingData] = useState<TrackingData[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const methods = useForm<FormData>({
    resolver: zodResolver(statusSchema),
  });
  const onSubmit: SubmitHandler<any> = async (data: any) => {
    setError(null);
    setTrackingData(null);
    setLoading(true);
    try {
      const response = await apiGetShipmentTracking(
        id === "air" ? 1 : 2, // Determine shipment mode based on the `id` prop
        data.awb,
      );
      console.log("response-response", response);
      if (response?.data?.data) {
        setTrackingData(response.data?.data);
      } else {
        setError("No tracking data found for the provided AWB.");
      }
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Failed to fetch tracking data.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto mt-10 bg-white p-12 text-black dark:bg-boxdark dark:text-white">
      <h1 className="mb-5 text-2xl font-bold">Shipment Tracking</h1>

      {/* Error Message */}
      {error && (
        <div className="mb-5">
          <Alert severity="error">{error}</Alert>
        </div>
      )}

      {/* Tracking Form */}
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid max-w-lg grid-cols-1 gap-6"
        >
          <div className="flex flex-col">
            <InputString
              type="text"
              name="awb"
              label="AWB Number"
              placeholder="Enter AWB Number"
            />
          </div>
          <div className="flex justify-end">
            <CommonButton loading={loading} label="Track Shipment" />
          </div>
        </form>
      </FormProvider>

      {/* Loading Indicator */}
      {loading && (
        <div className="mt-10 flex justify-center">
          <CircularProgress />
        </div>
      )}

      {/* Tracking Data */}
      {trackingData && (
        <div className="mt-10">
          <h2 className="mb-5 text-xl font-semibold">Tracking Details</h2>
          <Stepper orientation="vertical" activeStep={-1}>
            {trackingData.map((step) => (
              <Step key={step.id}>
                <StepLabel>
                  <div className="flex items-center">
                    <span className="font-bold">
                      {step.ShipmentPackageDispatchStatus.displayText}
                    </span>
                    <span className="text-gray-500 ml-2 text-sm">
                      ({new Date(step.createdAt).toLocaleString()})
                    </span>
                  </div>
                </StepLabel>
                <StepContent>
                  <p className="text-gray-700">
                    {step.ShipmentPackageDispatchStatus.description}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Branch: {step.Branch.name} ({step.Branch.location})
                  </p>
                  {step.remark && (
                    <p className="text-gray-500 text-sm">
                      Remark: {step.remark}
                    </p>
                  )}
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </div>
      )}
    </div>
  );
};

export default TrackingPage;
