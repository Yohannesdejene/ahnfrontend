"use client";
import React, { useEffect, useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { CircularProgress } from "@mui/material";
import {
  InputString,
  CommonButton,
  NumberInput,
  SelectInput,
  EthiopianNumberInput,
  InputNumber,
} from "@/common/formElements";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import {
  getShipmentById,
  updateShipment,
} from "@/store/features/shipments/shipmentsThunk";
import { useGetAllBranches } from "@/hooks/useGetAllBranches";
import { useGetAllShipmentTypes } from "@/hooks/useGetAllShipmentTypes";
import { useGetAllShipmentModes } from "@/hooks/useGetAllShipmentModes";
import { useGetAllPaymentMethods } from "@/hooks/useGetAllPaymentMethods";
import { useGetAllPaymentModes } from "@/hooks/useGetAllPaymentModes";
import { useGetAllUnits } from "@/hooks/useGetAllUnits";
import { useGetAllRates } from "@/hooks/useGetAllRates";
import { useGetAllCompanies } from "@/hooks/useGetAllCompanies";
import { apiSearchRate } from "@/store/features/rates/ratesApi";

const shipmentSchema = z
  .object({
    manualAwb: z.string().optional(),
    paymentModeId: z.string().min(1, { message: "Payment Mode is required" }),
    paymentMethodId: z.string().optional(), // Make it optional by default
    shipmentModeId: z.number().optional(),
    shipmentTypeId: z.string().min(1, { message: "Shipment Type is required" }),
    deliveryModeId: z.string().min(1, { message: "Delivery Mode is required" }),
    senderBranchId: z.string().min(1, { message: "Sender city is required" }),
    senderName: z.string().min(1, { message: "Sender name is required" }),
    senderPhone: z
      .string()
      .min(9, { message: "Phone must be exactly 9 digits" })
      .max(9, { message: "Phone must be exactly 9 digits" })
      .regex(/^[7|9][0-9]{8}$/, {
        message: "Phone must be 9 digits and start with 7 or 9",
      }),
    recipientBranchId: z
      .string()
      .min(1, { message: "Recipient city is required" }),
    recipientName: z.string().min(1, { message: "Recipient Mode is required" }),
    recipientPhone: z
      .string()
      .max(9, { message: "Phone must be exactly 9 digits" })
      .regex(/^[7|9][0-9]{8}$/, {
        message: "Phone must be 9 digits and start with 7 or 9",
      }),
    shipmentDescription: z
      .string()
      .min(1, { message: "Shipment Description  is required" }),
    companyId: z.string().optional(), // Initially optional
    // rate: z.number(), // Changed to number for double values
    // rateId: z.number().min(1, { message: "Quantity is required" })
    netFee: z.number().optional(),
    quantity: z.number().min(1, { message: "Quantity is required" }), // Changed to number with min validation
    unitId: z.string().min(1, { message: "Units  is required" }),
    noOfPcs: z.number().min(1, { message: "Quantity is required" }),
  })
  .superRefine((data: any, ctx: any) => {
    // Check if paymentModeId is "2"
    if (data.paymentModeId === "2") {
      // If companyId is missing or not a number, add an error
      if (!data.companyId || typeof data.companyId !== "number") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["companyId"],
          message: "Company is required when Payment Mode is credit",
        });
      }
    }
    // Condition for paymentMethodId when paymentModeId is "1"
    if (data.paymentModeId === "1") {
      if (!data.paymentMethodId || data.paymentMethodId.length < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["paymentMethodId"],
          message: "Payment Method is required when Payment Mode is cash ",
        });
      }
    }
  });

type FormData = z.infer<typeof shipmentSchema>;

interface UpdateShipmentProps {
  id: string | number | null;
  type: string;
}

const UpdateShipment: React.FC<UpdateShipmentProps> = ({ id, type }) => {
  const dispatch: AppDispatch = useDispatch();
  const { selectedShipment, getShipmentByIdLoading } = useSelector(
    (state: RootState) => state.shipment,
  );

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
  const [rate, setRate] = useState<number | null>(null); // State to store the rate
  const [rateId, setRateId] = useState<number | null>(null); // State to store the rate ID
  const [loadingRateSearch, setLoadingRateSearch] = useState<boolean>(false); // Loading state for rate search
  const methods = useForm<FormData>({
    resolver: zodResolver(shipmentSchema),
  });

  const { watch, reset, handleSubmit } = methods;
  const formValues = watch();
  const { errors } = methods.formState; // Get form errors
  console.log("formValues", formValues);
  const [loading, setLoading] = useState(false);
  const searchRate = async () => {
    const {
      senderBranchId,
      recipientBranchId,
      shipmentTypeId,
      // shipmentModeId,
    } = formValues;
    // Ensure all required fields are filled before searching
    if (
      senderBranchId &&
      recipientBranchId &&
      shipmentTypeId
      // shipmentModeId
    ) {
      setLoadingRateSearch(true);
      try {
        const response = await apiSearchRate({
          sourceBranchId: parseInt(senderBranchId),
          // sourceBranchId: user?.Branch?.id,
          destinationBranchId: parseInt(recipientBranchId),
          shipmentTypeId: parseInt(shipmentTypeId),
          shipmentModeId: type == "air" ? 1 : 2,
        });
        if (response?.status == 200) {
          const foundRate = response?.data?.rates[0]?.rate || null;
          const foundRateId = response?.data?.rates[0]?.id || null;
          setRate(foundRate);
          setRateId(foundRateId);
        } else {
          toast.error("Rate not found ");
        }
        // Update rate and rateId based on the response
      } catch (error) {
        toast.error("Rate not found ");
        console.error("Error searching rate:", error);
        setRate(null);
        setRateId(null);
      } finally {
        setLoadingRateSearch(false);
      }
    } else {
      // console.log("else parts started");
    }
  };
  // Watch for changes in the relevant fields and trigger rate search
  useEffect(() => {
    searchRate();
  }, [
    formValues.senderBranchId,
    formValues.recipientBranchId,
    formValues.shipmentTypeId,
  ]);
  // Fetch shipment details and prepopulate the form
  useEffect(() => {
    if (selectedShipment) {
      reset({
        manualAwb: selectedShipment?.manualAwb || "",
        paymentModeId: selectedShipment?.paymentModeId?.toString() || "",
        paymentMethodId: selectedShipment?.paymentMethodId?.toString() || "",
        shipmentTypeId: selectedShipment?.shipmentTypeId?.toString() || "",
        shipmentModeId: type == "air" ? 1 : 2,
        deliveryModeId: selectedShipment?.deliveryModeId?.toString() || "",
        senderName: selectedShipment?.senderName || "",
        senderPhone: selectedShipment?.senderPhone?.slice(-9) || "",
        senderBranchId: selectedShipment?.senderBranchId?.toString() || "",
        recipientBranchId:
          selectedShipment?.recipientBranchId?.toString() || "",
        recipientName: selectedShipment?.recipientName || "",
        recipientPhone: selectedShipment?.recipientPhone?.slice(-9) || "", // Extract the last 9 digits
        shipmentDescription: selectedShipment?.shipmentDescription || "",
        quantity: selectedShipment?.quantity || 0,
        unitId: selectedShipment?.unitId?.toString() || "",
        noOfPcs: selectedShipment?.noOfPcs || 0,
        netFee: selectedShipment?.netFee || 0,
      });
    }
  }, [
    id,
    selectedShipment,
    optionsShipmentType,
    loadingPaymentMode,
    loadingPaymentMethod,
    loadingCompany,
    dispatch,
  ]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (!rate) {
      toast.error("Rate is not found ");
      return;
    }
    setLoading(true);

    try {
      const create_shipment: any = {
        manualAwb: data?.manualAwb ? data?.manualAwb : "",
        shipmentTypeId: parseInt(data.shipmentTypeId),
        shipmentModeId: type == "air" ? 1 : 2,
        paymentModeId: parseInt(data.paymentModeId),
        paymentMethodId: data.paymentMethodId
          ? parseInt(data.paymentMethodId)
          : 1,
        deliveryModeId: parseInt(data.deliveryModeId),
        companyId: data?.companyId,
        senderBranchId: parseInt(data?.senderBranchId),
        senderName: data?.senderName,
        senderPhone: `251${data?.senderPhone}`,
        recipientBranchId: parseInt(data?.recipientBranchId),
        recipientName: data.recipientName,
        recipientPhone: `251${data?.recipientPhone}`,
        shipmentDescription: data?.shipmentDescription,
        rate: rate,
        rateId: rateId,
        netFee: rate,
        quantity: data?.quantity,
        unitId: parseInt(data?.unitId),
        noOfPcs: data.noOfPcs,
      };
      const response = await dispatch(
        updateShipment({ id: id ? id : "", shipmentData: create_shipment }),
      ).unwrap();

      dispatch(getShipmentById(id || "")).then(() => setLoading(false));
      console.log("response-response", response);
      // toast.success("Shipment updated successfully!");
    } catch (error) {
      //   toast.error("Failed to update shipment.");
    } finally {
      setLoading(false);
    }
  };

  if (getShipmentByIdLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <CircularProgress />
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
    <div className="flex  w-full bg-white text-black dark:bg-boxdark dark:text-white">
      <FormProvider {...methods}>
        <div className="container mx-auto mt-0">
          <div className="w-full">
            <div className="p-0">
              <h6 className=" text-gray-700 w-full  pl-5 pr-3 pt-4 text-title-xl2  font-normal ">
                Update {type == "air" ? "Air" : "Ground"} Shipment
              </h6>

              <hr className="mb-4 mt-4 w-full text-lg font-normal text-normalGray " />
              <div className="w-full p-5 ">
                <form
                  onSubmit={methods.handleSubmit(onSubmit)}
                  className="p-fluid"
                >
                  <div className="  grid  max-w-6xl grid-cols-1 gap-10  md:grid-cols-2">
                    <div className=" ">
                      <h4 className=" mb-5 flex  text-title-md ">
                        Sender Information
                      </h4>

                      <div className="mb-2">
                        <InputString
                          type="text"
                          name="senderName"
                          label="Sender full name"
                          placeholder="ex Abebe kebede "
                        />
                      </div>
                      <div className="mb-2">
                        <EthiopianNumberInput
                          type="text"
                          name="senderPhone"
                          label="Sender Phone Nunber"
                          placeholder="e.g. 912345678"
                        />
                      </div>
                      <div className="mb-3 w-full">
                        <SelectInput
                          name="senderBranchId"
                          label="Sender city  "
                          placeholder="Select Sender City   "
                          options={optionsBranch}
                          loading={loadingBranch} // Default to false if not provided
                        />
                      </div>
                    </div>
                    <div className="">
                      <h4 className=" mb-5 flex  text-title-md ">
                        Receiver Information
                      </h4>
                      {/* ,recipientPhone, */}
                      <div className="mb-2">
                        <InputString
                          type="text"
                          name="recipientName"
                          label="Receiver full name"
                          placeholder="ex Abebe kebede "
                        />
                      </div>
                      <div className="mb-2">
                        <EthiopianNumberInput
                          type="text"
                          name="recipientPhone"
                          label="Receiver Phone Number"
                          placeholder="e.g. 912345678"
                        />
                      </div>

                      <div className="mb-3 w-full">
                        <SelectInput
                          name="recipientBranchId"
                          label="Receiver city  "
                          placeholder="Select Receiver City   "
                          options={optionsBranch}
                          loading={loadingBranch} // Default to false if not provided
                        />
                      </div>
                    </div>
                  </div>
                  <hr className="mb-5 mt-5 w-full text-lg font-normal text-normalGray " />
                  <div className="  grid  max-w-6xl grid-cols-1 gap-10  md:grid-cols-2">
                    <div className=" ">
                      <h4 className=" mb-5 flex  text-title-md ">
                        Shipment Information
                      </h4>
                      <div className="mb-2">
                        <InputString
                          type="text"
                          name="manualAwb"
                          label="Manual Awb (Optional)"
                          placeholder="ex. 122020202 "
                        />
                      </div>
                      <div className="mb-2">
                        <InputString
                          type="text"
                          name="shipmentDescription"
                          label="Shipment Description"
                          placeholder="ex Cloths , laptop.. "
                        />
                      </div>
                      {/* <div className="mb-3 w-full">
                               <SelectInput
                                 name="shipmentModeId"
                                 label="Shipment Mode "
                                 placeholder="Select shipment mode"
                                 options={optionsShipmentMode}
                                 loading={loadingShipmentMode} // Default to false if not provided
                               />
                             </div> */}

                      <div className="mb-3 w-full">
                        <SelectInput
                          name="shipmentTypeId"
                          label="Shipment Type "
                          placeholder="Select shipment type"
                          options={optionsShipmentType}
                          loading={loadingShipmentType} // Default to false if not provided
                        />
                      </div>
                    </div>
                    <div className=" ">
                      <h4
                        className=" mb-5 flex  text-title-md "
                        style={{ height: "25px" }}
                      >
                        Measures
                      </h4>
                      {/* ,recipientPhone, */}
                      <div className="mb-3 w-full">
                        <SelectInput
                          name="unitId"
                          label="Unit "
                          placeholder="Select measuring unit  "
                          options={optionsUnit}
                          loading={loadingUnit} // Default to false if not provided
                        />
                      </div>

                      <div className="mb-3 w-full">
                        <InputNumber
                          name="quantity"
                          label="Quantity"
                          placeholder="e.g. 10"
                        />
                      </div>
                      <div className="mb-3 w-full">
                        <InputNumber
                          name="noOfPcs"
                          label="No of pieces "
                          placeholder="e.g. 10"
                        />
                      </div>
                    </div>
                  </div>
                  <hr className="mb-5 mt-5 w-full text-lg font-normal text-normalGray " />
                  <div className="  grid  max-w-6xl grid-cols-1 gap-10  md:grid-cols-2">
                    <div className=" ">
                      <h4 className=" mb-5 flex  text-title-md ">
                        Payment Information
                      </h4>
                      <div className="mb-3 w-full">
                        <SelectInput
                          name="paymentModeId"
                          label="Payment Mode "
                          placeholder="Select Payment Methods"
                          options={optionsPaymentMode}
                          loading={loadingPaymentMode}
                          // Default to false if not provided
                        />
                      </div>
                      {formValues && formValues?.paymentModeId == "1" && (
                        <div className="mb-3 w-full">
                          <SelectInput
                            name="paymentMethodId"
                            label="Payment Method "
                            placeholder="Select Payment Methods"
                            options={optionsPaymentMethod}
                            loading={loadingPaymentMethod}
                            // Default to false if not provided
                          />
                          <h4 style={{ fontSize: "13px", color: "red" }}>
                            {errors?.paymentModeId?.message}
                          </h4>
                        </div>
                      )}
                      {formValues && formValues?.paymentModeId == "2" && (
                        <div className="mb-3 w-full">
                          <SelectInput
                            name="conpanyId"
                            label="Compnay  "
                            placeholder="Select The Company"
                            options={optionsCompany}
                            loading={loadingCompany}
                            // Default to false if not provided
                          />
                          <h4 style={{ fontSize: "13px", color: "red" }}>
                            {errors?.companyId?.message}
                          </h4>
                        </div>
                      )}
                      <div className="mb-3 w-full">
                        <SelectInput
                          name="deliveryModeId"
                          label="Delivery Mode"
                          placeholder="Select delivery mode "
                          options={[
                            { label: "Home Delivery", value: 1 },
                            { label: "Office Delivery", value: 2 },
                          ]}
                          loading={false} // Default to false if not provided
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-center rounded-lg  border p-5 shadow-md md:m-7 ">
                      <div className="border-gray-300 flex flex-col items-center justify-center space-y-3 md:space-y-5">
                        <span className="text-title-xl2 font-semibold ">
                          Total Fee:
                        </span>
                        {loadingRateSearch ? (
                          <div className="flex items-center gap-2">
                            <span className="text-gray-700 text-sm">
                              Calculating total cost...
                            </span>
                            <CircularProgress
                              size={20}
                              className="animate-spin "
                            />
                          </div>
                        ) : (
                          <span className="text-title-xl2 font-bold text-danger">
                            {rate ? `${rate} Birr` : "--"}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mb-4 mt-5">
                    <CommonButton loading={loading} label="Submit" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </FormProvider>
    </div>
  );
};

export default UpdateShipment;
