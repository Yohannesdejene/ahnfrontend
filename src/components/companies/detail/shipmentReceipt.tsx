"use client";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { getShipmentById } from "@/store/features/shipments/shipmentsThunk";
import { CircularProgress, Button, Alert } from "@mui/material";
import { useReactToPrint } from "react-to-print";
import Barcode from "react-barcode"; // Import the Barcode component

interface PersonalInfoProps {
  id: string | number | null;
  type: string;
}

const ShipmentReceipt: React.FC<PersonalInfoProps> = ({ id, type }) => {
  const dispatch: AppDispatch = useDispatch();
  const { selectedShipment, getShipmentByIdLoading, getShipmentByIdError } =
    useSelector((state: RootState) => state.shipment);
  console.log("selectedShipment", selectedShipment);
  const printRef = useRef<HTMLDivElement>(null);

  // const handlePrint = useReactToPrint({
  //   content: () => printRef.current as HTMLElement,
  //   documentTitle: `Shipment_Receipt_${id}`,
  // });

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
        <Alert severity="error">Something went wrong </Alert>
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
    <div className="container mx-auto mt-10">
      {/* Print Button */}
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{/* Ahununu Express */}</h1>
        {/* <Button
          variant="contained"
          color="primary"
          onClick={handlePrint}
          style={{ textTransform: "none" }}
        >
          Print Receipt
        </Button> */}
      </div>

      {/* Receipt Content */}
      <div
        ref={printRef}
        className="border-gray-300 relative w-full rounded-lg border bg-white p-5 shadow-md md:w-3/5"
      >
        {/* Diagonal Watermark */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <h1
            className="text-gray-300 text-6xl font-bold"
            style={{
              transform: "rotate(-45deg)", // Rotate the watermark
              whiteSpace: "nowrap", // Prevent text wrapping
              opacity: 0.1, // Make it faint
            }}
          >
            {/* Ahununu Express */}
          </h1>
        </div>

        {/* Tracking Information */}
        <div className="mb-5 text-center">
          <h2 className="text-xl font-semibold">
            Shipment Tracking Information
          </h2>
          <p className="text-gray-600 mt-2">
            {type == "air" ? "Air way bill number" : "Ground way bill"}{" "}
            <strong>
              {selectedShipment.manualAwb
                ? selectedShipment.manualAwb
                : selectedShipment.awb || "N/A"}
            </strong>
          </p>
        </div>

        {/* Sender and Receiver Information */}
        <div className="mb-5 grid grid-cols-2 gap-4">
          <div className="border-gray-300 rounded border p-4">
            <h3 className="mb-2 text-lg font-semibold">Sender Information</h3>
            <p>
              <strong>Name:</strong> {selectedShipment.senderName}
            </p>
            {/* <p>
              <strong>Phone:</strong> {selectedShipment.senderPhone}
            </p> */}
            <p>
              <strong>City:</strong>{" "}
              {(selectedShipment.senderBranch &&
                selectedShipment.senderBranch?.name) ||
                "N/A"}
            </p>
          </div>
          <div className="border-gray-300 rounded border p-4">
            <h3 className="mb-2 text-lg font-semibold">Receiver Information</h3>
            <p>
              <strong>Name:</strong> {selectedShipment.recipientName}
            </p>
            {/* <p>
              <strong>Phone:</strong> {selectedShipment.recipientPhone}
            </p> */}
            <p>
              <strong>City:</strong>{" "}
              {selectedShipment.recipientBranch?.name || "N/A"}
            </p>
          </div>
        </div>

        {/* Shipment Details */}
        <div className="mb-5">
          <h3 className="mb-2 text-lg font-semibold">Shipment Details</h3>
          <table className="border-gray-300 w-full border-collapse border">
            <tbody>
              <tr>
                <td className="border-gray-300 border px-4 py-2 font-semibold">
                  Payment Mode
                </td>
                <td className="border-gray-300 border px-4 py-2">
                  {selectedShipment.PaymentMode?.description || "N/A"}
                </td>
              </tr>
              <tr>
                <td className="border-gray-300 border px-4 py-2 font-semibold">
                  Quantity
                </td>
                <td className="border-gray-300 border px-4 py-2">
                  {selectedShipment.quantity || "N/A"}
                </td>
              </tr>
              <tr>
                <td className="border-gray-300 border px-4 py-2 font-semibold">
                  Pieces
                </td>
                <td className="border-gray-300 border px-4 py-2">
                  {selectedShipment.noOfPcs || "N/A"}
                </td>
              </tr>

              <tr>
                <td className="border-gray-300 border px-4 py-2 font-semibold">
                  Amount Paid
                </td>
                <td className="border-gray-300 border px-4 py-2">
                  {selectedShipment.netFee || "N/A"} Birr
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Barcode */}
        <div className="mt-10 flex justify-center">
          {selectedShipment.awb && (
            <Barcode
              value={
                selectedShipment.manualAwb
                  ? selectedShipment.manualAwb
                  : selectedShipment.awb
              }
            />
          )}
        </div>

        {/* Footer */}
        <div className="mt-10 text-center">
          <p className="text-gray-600">Thank you for using our service!</p>
          <p className="text-gray-600">
            For inquiries, contact us at +251-123-456-789
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShipmentReceipt;
