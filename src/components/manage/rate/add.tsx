"use client";
import React, { useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { CREATE_RATE } from "@/store/features/rates/type";
import {
  InputString,
  InputNumber,
  CommonButton,
  SelectInput,
} from "@/common/formElements";
import { createRate, fetchRateList } from "@/store/features/rates/ratesSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store"; // Import AppDispatch
import { useGetAllShipmentTypes } from "@/hooks/useGetAllShipmentTypes";
import { useGetAllShipmentModes } from "@/hooks/useGetAllShipmentModes";
import { useGetAllBranches } from "@/hooks/useGetAllBranches";
// Form schema for rate
const formSchema = z.object({
  rate: z
    .number()
    .min(1, { message: "Rate is required and must be greater than 0" }),
  sourceBranchId: z
    .string()
    .min(1, { message: "Source Branch ID is required" }),
  destinationBranchId: z
    .string()
    .min(1, { message: "Destination Branch ID is required" }),
  shipmentModeId: z
    .string()
    .min(1, { message: "Shipment Mode ID is required" }),
  shipmentTypeId: z
    .string()
    .min(1, { message: "Shipment Type ID is required" }),
});

interface AddRateProps {
  toggleDrawer: (open: boolean) => void; // Accepting toggleDrawer function as a prop
}
type FormData = z.infer<typeof formSchema>;

const AddRate: React.FC<AddRateProps> = ({ toggleDrawer }) => {
  const dispatch: AppDispatch = useDispatch(); // Use the AppDispatch type
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
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
  const { loadingBranch, errorBranch, optionsBranch, dataBranch, reloadYears } =
    useGetAllBranches();

  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const formValues = methods.watch(); // This will give you the current form values
  const addRate = async (values: FormData) => {
    setErrorMessage(null);
    setLoading(true);
    const create_rate: CREATE_RATE = {
      rate: values.rate,
      sourceBranchId: parseInt(values.sourceBranchId),
      destinationBranchId: parseInt(values.destinationBranchId),
      shipmentModeId: parseInt(values.shipmentModeId),
      shipmentTypeId: parseInt(values.shipmentTypeId),
    };
    dispatch(createRate({ rateData: create_rate }))
      .then((data) => {
        if (data?.payload?.status >= 200 && data?.payload?.status < 300) {
          setLoading(false);
          toggleDrawer(false);
          dispatch(fetchRateList());
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        setErrorMessage(error.message || "Failed to add rate");
        toast.error("Failed to add rate");
      });
  };
  const onSubmit: SubmitHandler<FormData> = (data) => {
    addRate(data);
  };

  return (
    <>
      <div className="flex w-full bg-white text-black dark:bg-boxdark dark:text-white">
        <FormProvider {...methods}>
          <div className="container mx-auto mt-0">
            <div className="w-full">
              <div className="p-0">
                <h6 className="text-gray-700 w-full text-lg font-normal">
                  Add Rate
                </h6>

                <hr className="mb-4 mt-4 w-full text-lg font-normal text-normalGray" />
                <div className="w-full">
                  <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className="p-fluid"
                  >
                    <div className="mb-3 w-full">
                      <InputNumber
                        name="rate"
                        label="Rate (Birr)"
                        placeholder="e.g., 100"
                      />
                    </div>

                    <div className="mb-3 w-full">
                      <SelectInput
                        name="sourceBranchId"
                        label="Source  "
                        placeholder="Select Source  "
                        options={optionsBranch}
                        loading={loadingBranch} // Default to false if not provided
                      />
                    </div>
                    <div className="mb-3 w-full">
                      <SelectInput
                        name="destinationBranchId"
                        label="Destination  "
                        placeholder="Select Destination "
                        options={optionsBranch}
                        loading={loadingBranch} // Default to false if not provided
                      />
                    </div>
                    <div className="mb-3 w-full">
                      <SelectInput
                        name="shipmentModeId"
                        label="Shipment Mode "
                        placeholder="Select shipment mode"
                        options={optionsShipmentMode}
                        loading={loadingShipmentMode} // Default to false if not provided
                      />
                    </div>
                    <div className="mb-3 w-full">
                      <SelectInput
                        name="shipmentTypeId"
                        label="Shipment Type "
                        placeholder="Select shipment type"
                        options={optionsShipmentType}
                        loading={loadingShipmentType} // Default to false if not provided
                      />
                    </div>

                    <div className="mb-4 mt-4">
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

export default AddRate;
