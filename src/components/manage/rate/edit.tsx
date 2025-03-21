"use client";
import React, { useState, useEffect } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { InputNumber, CommonButton, SelectInput } from "@/common/formElements";
import { RootState, AppDispatch } from "@/store/store"; // Import RootState and AppDispatch
import { useDispatch, useSelector } from "react-redux";
import {
  getRateById,
  updateRate,
  fetchRateList,
} from "@/store/features/rates/ratesSlice";

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

interface EditRateProps {
  id: number | string | null;
  toggleDrawer: (open: boolean) => void; // Accepting toggleDrawer function as a prop
  setId: (id: number | null | string) => void; // Setters don't return a value
}

type FormData = z.infer<typeof formSchema>;

const EditRate: React.FC<EditRateProps> = ({ toggleDrawer, setId, id }) => {
  const dispatch: AppDispatch = useDispatch(); // Use the AppDispatch type
  const { loadingRate, errorRate } = useSelector(
    (state: RootState) => state.rate,
  );
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

  const [loading, setLoading] = useState<boolean>(false);
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const editRate = async (values: FormData) => {
    setLoading(true);
    const updatedRate = {
      rate: values.rate,
      sourceBranchId: parseInt(values.sourceBranchId),
      destinationBranchId: parseInt(values.destinationBranchId),
      shipmentModeId: parseInt(values.shipmentModeId),
      shipmentTypeId: parseInt(values.shipmentTypeId),
    };
    dispatch(updateRate({ id, rateData: updatedRate }))
      .then((data) => {
        if (data?.payload?.status === 200) {
          toggleDrawer(false);
          setLoading(false);
          dispatch(fetchRateList());
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message || "Failed to update rate");
      });
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    editRate(data);
  };

  useEffect(() => {
    if (id) {
      dispatch(getRateById(id))
        .then((data: any) => {
          methods.reset({
            rate: data?.payload?.data?.rate?.rate?.toString() || "0",
            sourceBranchId:
              data?.payload?.data?.rate?.sourceBranchId.toString() || "0",
            destinationBranchId:
              data?.payload?.data?.rate?.destinationBranchId.toString() || "0",
            shipmentModeId:
              data?.payload?.data?.rate?.shipmentModeId.toString() || "0",
            shipmentTypeId:
              data?.payload?.data?.rate?.shipmentTypeId.toString() || "0",
          });
        })
        .catch((error) => {
          console.error("Error fetching rate:", error);
        });
    }
  }, [id, methods, dispatch]);

  return (
    <>
      <div className="flex w-full overflow-x-hidden bg-white text-black dark:bg-boxdark dark:text-white">
        <FormProvider {...methods}>
          <div className="container mx-auto mt-0 max-w-full  px-4 sm:px-2">
            <div className="w-full">
              <div className="p-0">
                <h6 className="text-gray-700 w-full text-lg font-normal">
                  Edit Rate
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
                        label="Rate"
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
                    <div className="mb-4">
                      <CommonButton loading={loading} label="Update" />
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

export default EditRate;
