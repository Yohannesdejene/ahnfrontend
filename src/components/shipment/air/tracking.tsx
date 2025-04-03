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
import { FiPackage } from "react-icons/fi"; //SHIPMENT_ACCEPTED
import { FcProcess } from "react-icons/fc"; ////PENDING_SHIPMENT
import { LuPlaneLanding } from "react-icons/lu"; ///ARRIVING
import { CiDeliveryTruck } from "react-icons/ci"; ///OUT_FOR_DELIVERY
import { PiBuildingOfficeDuotone } from "react-icons/pi"; //ARRIVED
import { FcAcceptDatabase } from "react-icons/fc"; ///DELIVERED
import { CiLocationOn } from "react-icons/ci";
import { GoLocation } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import NowAllowedPage from "@/components/common/allowedPage";

const statusSchema = z.object({
  awb: z.string().min(1, { message: "GWB is required" }),
});
interface TrackingForm {
  awb: string;
}

const TrackingPage = () => {
  const [trackingData, setTrackingData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const methods = useForm<TrackingForm>({
    resolver: zodResolver(statusSchema),
  });
  const { handleSubmit } = methods;

  const auth = useSelector((state: any) => state?.auth?.permissions);

  const hasTrackAirShipmentPermission = auth.some(
    (permission: any) => permission.code === "TRACK_AIR_SHIPMENT",
  );

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    setError(null);
    setTrackingData(null);
    setLoading(true);
    try {
      const response = await apiGetShipmentTracking(
        1, // Determine shipment mode based on the `id` prop
        data.awb,
      );
      if (response?.data?.data) {
        setTrackingData(response.data?.data);
      } else {
        setError("No tracking data found for the provided GWB.");
      }
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Failed to fetch tracking data.",
      );
    } finally {
      setLoading(false);
    }
  };

  const IconList = [
    {
      label: "SHIPMENT_ACCEPTED",
      value: (
        <FiPackage
          style={{ height: "50px", width: "50px", color: "#4CAF50" }}
        />
      ), // Green for accepted
    },
    {
      label: "PENDING_SHIPMENT",
      value: <FcProcess style={{ height: "50px", width: "50px" }} />, // Process icon
    },
    {
      label: "ARRIVING",
      value: (
        <CiDeliveryTruck
          style={{ height: "50px", width: "50px", color: "#FF9800" }}
        />
      ), // Truck for arriving
    },
    {
      label: "OUT_FOR_DELIVERY",
      value: (
        <CiDeliveryTruck
          style={{ height: "50px", width: "50px", color: "#2196F3" }}
        />
      ), // Blue truck for delivery
    },
    {
      label: "ARRIVED",
      value: (
        <PiBuildingOfficeDuotone
          style={{ height: "50px", width: "50px", color: "#9C27B0" }}
        />
      ), // Purple for arrived
    },
    {
      label: "DELIVERED",
      value: <FcAcceptDatabase style={{ height: "50px", width: "50px" }} />, // Delivered icon
    },
  ];

  return (
    <>
      {hasTrackAirShipmentPermission ? (
        <div
          className="container mx-auto mt-10 bg-white p-4 text-black dark:bg-boxdark dark:text-white md:p-12"
          style={{ maxWidth: "90vw" }}
        >
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
                  label="GWB"
                  placeholder={`Enter GWB Number`}
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
              <Stepper
                orientation="vertical"
                activeStep={-1}
                sx={{
                  "& .MuiStepLabel-root": {
                    alignItems: "flex-start", // Align icons to the top
                  },
                  "& .MuiStepLabel-iconContainer": {
                    alignSelf: "flex-start", // Align the icon container to the top
                  },
                }}
              >
                {trackingData.map((step: any) => {
                  const statusIcon = IconList.find(
                    (icon) =>
                      icon.label === step.ShipmentPackageDispatchStatus.code,
                  )?.value;

                  return (
                    <Step key={step.id}>
                      <StepLabel icon={statusIcon}>
                        <div
                          className="flex flex-col items-start"
                          style={{ width: "300px" }}
                        >
                          <span className="text-lg font-bold">
                            {step.ShipmentPackageDispatchStatus.displayText}
                          </span>
                          <div
                            className=" mb-2 mt-2 flex gap-2 font-bold"
                            style={{ fontSize: "15px" }}
                          >
                            <GoLocation
                              style={{
                                fontSize: "20px",
                                fontWeight: "bold",
                              }}
                            />
                            <span> {step.Branch.location}</span>
                          </div>
                          <span
                            className="text-gray-500 column mt-1  "
                            style={{ fontSize: "15px" }}
                          >
                            Handled by: {step.User?.firstName}{" "}
                            {step.User?.lastName}
                            <div className="text-gray-500  ">
                              {" "}
                              ( {step.User?.phone})
                            </div>
                          </span>
                          <span className=" text-gray-500 ml-auto  mt-2 flex flex-wrap pe-8 text-sm">
                            {new Date(step.createdAt).toLocaleString()}
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
                  );
                })}
              </Stepper>
            </div>
          )}
        </div>
      ) : (
        <NowAllowedPage />
      )}
    </>
  );
};

export default TrackingPage;
