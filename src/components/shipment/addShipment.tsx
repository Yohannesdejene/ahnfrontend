"use client";
import React, { useState, useEffect } from "react";
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
import { apiCreateSchool } from "@/services/ApiBasic";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/common/pageHeader";
import { useGetAllBranches } from "@/hooks/useGetAllBranches";
import { useGetAllShipmentTypes } from "@/hooks/useGetAllShipmentTypes";
import { useGetAllShipmentModes } from "@/hooks/useGetAllShipmentModes";
import { useGetAllPaymentMethods } from "@/hooks/useGetAllPaymentMethods";
import { useGetAllPaymentModes } from "@/hooks/useGetAllPaymentModes";
import { useGetAllUnits } from "@/hooks/useGetAllUnits";
import { useGetAllRates } from "@/hooks/useGetAllRates";
import { useGetAllCompanies } from "@/hooks/useGetAllCompanies";
import { RootState, AppDispatch } from "@/store/store";
import {
  fetchShipmentModeList,
  deleteShipmentMode,
} from "@/store/features/shipmentModes/shipmentModesSlice";
import { apiSearchRate } from "@/store/features/rates/ratesApi";
import { useDispatch, useSelector } from "react-redux";
import { SHIPMENT_CREATE_UPDATE } from "@/store/features/shipments/type"; // Correct import for shipment type
import {
  createShipment,
  fetchShipmentsList,
} from "@/store/features/shipments/shipmentslice"; // Correct import for shipment actions
const shipmentSchema = z
  .object({
    manualAwb: z.string().optional(),
    paymentModeId: z.string().min(1, { message: "Payment Mode is required" }),
    paymentMethodId: z.string().optional(), // Make it optional by default
    // shipmentModeId: z.string().min(1, { message: "Shipment Mode is required" }),
    shipmentTypeId: z.string().min(1, { message: "Shipment Type is required" }),
    deliveryModeId: z.string().min(1, { message: "Delivery Mode is required" }),
    // senderBranchId: z.string().min(1, { message: "Sender city is required" }),
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
    rate: z.number(), // Changed to number for double values
    // rateId: z.number().min(1, { message: "Quantity is required" })
    // netFee: z.string(),
    quantity: z.number().min(1, { message: "Quantity is required" }), // Changed to number with min validation
    // unitId: z.string().min(1, { message: "Units  is required" }),
    noOfPcs: z.number().min(1, { message: "Quantity is required" }),
  })
  .superRefine((data: any, ctx: any) => {
    // Check if paymentModeId is "2"
    if (data.paymentModeId === "2") {
      // If companyId is missing or not a number, add an error
      if (!data.companyId || typeof data.companyId !== "string") {
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
export type Shipment = z.infer<typeof shipmentSchema>;

type FormData = z.infer<typeof shipmentSchema>;
interface GradeDetailProps {
  id: string | number | null;
}
const AddShipment: React.FC<GradeDetailProps> = ({ id }) => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter(); // Initialize useRouter
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
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const methods = useForm<FormData>({
    resolver: zodResolver(shipmentSchema),
  });
  const { errors } = methods.formState; // Get form errors
  const formValues = methods.watch(); // This will give you the current form values
  console.log("Error", errors);
  console.log("formValues upadted", formValues);
  // Function to search for rates
  const searchRate = async () => {
    const {
      // senderBranchId,
      recipientBranchId,
      shipmentTypeId,
      // shipmentModeId,
    } = formValues;
    // Ensure all required fields are filled before searching
    if (
      // senderBranchId &&
      recipientBranchId &&
      shipmentTypeId
      // shipmentModeId
    ) {
      setLoadingRateSearch(true);
      try {
        const response = await apiSearchRate({
          // sourceBranchId: parseInt(senderBranchId),
          sourceBranchId: user?.Branch?.id,
          destinationBranchId: parseInt(recipientBranchId),
          shipmentTypeId: parseInt(shipmentTypeId),
          shipmentModeId: id == "air" ? 1 : 2,
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
    // formValues.senderBranchId,
    formValues.recipientBranchId,
    formValues.shipmentTypeId,
  ]);
  const addShipment = async (values: FormData) => {
    setErrorMessage(null);
    setLoading(true);

    let create_shipment: any = {
      manualAwb: values?.manualAwb ? values?.manualAwb : "",
      shipmentTypeId: parseInt(values.shipmentTypeId),
      shipmentModeId: id == "air" ? 1 : 2,
      paymentModeId: parseInt(values.paymentModeId),
      paymentMethodId: values.paymentMethodId
        ? parseInt(values.paymentMethodId)
        : 1,
      deliveryModeId: parseInt(values.deliveryModeId),
      senderBranchId: user?.Branch?.id,
      senderName: values.senderName,
      senderPhone: `251${values.senderPhone}`,
      recipientBranchId: parseInt(values.recipientBranchId),
      recipientName: values.recipientName,
      recipientPhone: `251${values.recipientPhone}`,
      shipmentDescription: values.shipmentDescription,
      rate: rate,
      rateId: rateId,
      netFee: rate,
      quantity: values.quantity,
      unitId: 1,
      noOfPcs: values.noOfPcs,
    };
    if (
      values?.companyId &&
      values?.companyId !== null &&
      values?.companyId !== ""
    ) {
      create_shipment.companyId = parseInt(values?.companyId);
    }
    dispatch(createShipment({ shipmentData: create_shipment }))
      .then((data) => {
        console.log("data", data);
        if (data?.payload?.status >= 200 && data?.payload?.status < 300) {
          setLoading(false);
          const shipmentId = data.payload.data?.shipment?.id; // Adjust based on your API response structure
          const shipmentMode = data.payload.data?.shipment?.shipmentModeId;
          if (shipmentId) {
            router.push(
              `/shipment/${shipmentMode == 1 ? "air" : "ground"}/detail/${shipmentId}`,
            ); // Redirect to detail page
          } else {
            // router.push("/shipments"); // Fallback to shipment list
          }
          // toast.success("Shipment created successfully  ");
          // dispatch(fetchShipmentsList({ page: 1, pageSize: 10 })); // Refresh the shipment list
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        setErrorMessage(error.message || "Failed to add shipment");
        toast.error("Failed to add shipment");
      });
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (!rate) {
      toast.error("Rate is not found ");
      return;
    }
    console.log("sub,itted");
    addShipment(data);
  };
  return (
    <>
      <div className="flex  w-full bg-white text-black dark:bg-boxdark dark:text-white">
        <FormProvider {...methods}>
          <div className="container mx-auto mt-0">
            <div className="w-full">
              <div className="p-0">
                <h6 className=" text-gray-700 w-full  pl-5 pr-3 pt-4 text-title-xl2  font-normal ">
                  Add {id == "air" ? "Air" : "Ground"} Shipment
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
                            label="Recipient Phone Number"
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
                        {/* <div className="mb-3 w-full">
                          <SelectInput
                            name="unitId"
                            label="Unit "
                            placeholder="Select measuring unit  "
                            options={optionsUnit}
                            loading={loadingUnit} // Default to false if not provided
                          />
                        </div> */}

                        <div className="mb-3 w-full">
                          <InputNumber
                            name="quantity"
                            label="Quantity(Weight) in kg"
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
                              name="companyId"
                              label="Company "
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
    </>
  );
};

export default AddShipment;
