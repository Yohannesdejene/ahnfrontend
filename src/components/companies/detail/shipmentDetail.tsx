"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { getShipmentById } from "@/store/features/shipments/shipmentsThunk";
import { CircularProgress, Alert } from "@mui/material";

interface ShipmentDetailProps {
  id: string | number | null;
}

const ShipmentDetail: React.FC<ShipmentDetailProps> = ({ id }) => {
  const dispatch: AppDispatch = useDispatch();
  const { selectedShipment, getShipmentByIdLoading, getShipmentByIdError } =
    useSelector((state: RootState) => state.shipment);

  const [loading, setLoading] = useState<boolean>(true);

  // Fetch shipment details by ID
  useEffect(() => {
    if (id) {
      dispatch(getShipmentById(id))
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
    }
  }, [id, dispatch]);

  if (loading || getShipmentByIdLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  if (getShipmentByIdError) {
    return (
      <div>
        <Alert severity="error">Something went wrong</Alert>
      </div>
    );
  }

  if (!selectedShipment) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>No shipment details found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-2 p-2">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Shipment Overview</h1>
      </div>

      {/* Shipment Details */}
      <div className=" relative w-full rounded-lg border-normalGray bg-white p-5 shadow-md">
        {/* Shipment Information */}
        <div className="mb-5">
          <h2 className="text-xl font-semibold">Shipment Information</h2>
          <p>
            <strong>AWB(Gwb):</strong> {selectedShipment.awb || "N/A"}
          </p>
          <p>
            <strong>Manual AWB(GWB):</strong>{" "}
            {selectedShipment.manualAwb || "N/A"}
          </p>
          <p>
            <strong>Description:</strong>{" "}
            {selectedShipment.shipmentDescription || "N/A"}
          </p>
          <p>
            <strong>Quantity:</strong> {selectedShipment.quantity || "N/A"}
          </p>
          <p>
            <strong>Number of Pieces:</strong>{" "}
            {selectedShipment.noOfPcs || "N/A"}
          </p>
          <p>
            <strong>Rate:</strong> {selectedShipment.rate || "N/A"} Birr
          </p>
          <p>
            <strong>Net Fee:</strong> {selectedShipment.netFee || "N/A"} Birr
          </p>
        </div>

        {/* Sender and Recipient Information */}
        <div className="mb-5 grid grid-cols-1  gap-2  border-normalGray md:grid-cols-2">
          <div className="rounded border border-normalGray p-4">
            <h3 className="mb-2 text-lg font-semibold">Sender Information</h3>
            <p>
              <strong>Name:</strong> {selectedShipment.senderName || "N/A"}
            </p>
            <p>
              <strong>Phone:</strong> {selectedShipment.senderPhone || "N/A"}
            </p>
            <p>
              <strong>Branch:</strong>{" "}
              {selectedShipment.senderBranch?.name || "N/A"}
            </p>
          </div>
          <div className="rounded border border-normalGray p-4">
            <h3 className="mb-2 text-lg font-semibold">
              Recipient Information
            </h3>
            <p>
              <strong>Name:</strong> {selectedShipment.recipientName || "N/A"}
            </p>
            <p>
              <strong>Phone:</strong> {selectedShipment.recipientPhone || "N/A"}
            </p>
            <p>
              <strong>Branch:</strong>{" "}
              {selectedShipment.recipientBranch?.name || "N/A"}
            </p>
          </div>
        </div>

        {/* Additional Details */}
        <div className="mb-5">
          <h3 className="mb-2 text-lg font-semibold">Additional Details</h3>
          <p>
            <strong>Shipment Type:</strong>{" "}
            {selectedShipment.ShipmentType?.description || "N/A"}
          </p>
          <p>
            <strong>Shipment Mode:</strong>{" "}
            {selectedShipment.ShipmentMode?.description || "N/A"}
          </p>
          <p>
            <strong>Payment Mode:</strong>{" "}
            {selectedShipment.PaymentMode?.description || "N/A"}
          </p>
          <p>
            <strong>Payment Method:</strong>{" "}
            {selectedShipment.PaymentMethod?.description || "N/A"}
          </p>
          <p>
            <strong>Delivery Mode:</strong>{" "}
            {selectedShipment.DeliveryMode?.description || "N/A"}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            {selectedShipment.ShipmentPackageDispatchStatus?.displayText ||
              "N/A"}
          </p>
        </div>

        {/* Company Information */}
        <div className="mb-5">
          <h3 className="mb-2 text-lg font-semibold">Company Information</h3>
          <p>
            <strong>Name:</strong> {selectedShipment.Company?.name || "N/A"}
          </p>
          <p>
            <strong>Phone:</strong> {selectedShipment.Company?.phone || "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {selectedShipment.Company?.email || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShipmentDetail;
