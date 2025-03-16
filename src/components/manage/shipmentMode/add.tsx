"use client";
import React, { useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { CREATE_SHIPMENT_MODE } from "@/store/features/shipmentModes/type";
import { InputString, CommonButton } from "@/common/formElements";
import {
  createShipmentMode,
  fetchShipmentModeList,
} from "@/store/features/shipmentModes/shipmentModesSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store"; // Import AppDispatch

const formSchema = z.object({
  code: z.string().min(1, { message: "Code is required" }),
  description: z.string().min(1, { message: "Description is required" }),
});

interface AddShipmentModeProps {
  toggleDrawer: (open: boolean) => void; // Accepting toggleDrawer function as a prop
}

type FormData = z.infer<typeof formSchema>;

const AddShipmentMode: React.FC<AddShipmentModeProps> = ({ toggleDrawer }) => {
  const dispatch: AppDispatch = useDispatch(); // Use the AppDispatch type

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const addShipmentMode = async (values: any) => {
    setErrorMessage(null);
    setLoading(true);
    const create_shipment_mode: CREATE_SHIPMENT_MODE = {
      code: values?.code,
      description: values?.description,
    };
    dispatch(createShipmentMode({ shipmentModeData: create_shipment_mode }))
      .then((data) => {
        if (data?.payload?.status >= 200 && data?.payload?.status < 300) {
          setLoading(false);
          toggleDrawer(false);
          dispatch(fetchShipmentModeList());
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        setErrorMessage(error.message || "Failed to add shipment mode");
        toast.error("Failed to add shipment mode");
      });
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    addShipmentMode(data);
  };

  return (
    <>
      <div className="flex w-full bg-white text-black dark:bg-boxdark dark:text-white">
        <FormProvider {...methods}>
          <div className="container mx-auto mt-0">
            <div className="w-full">
              <div className="p-0">
                <h6 className="text-gray-700 w-full text-lg font-normal">
                  Add Shipment Mode
                </h6>

                <hr className="mb-4 mt-4 w-full text-lg font-normal text-normalGray" />
                <div className="w-full">
                  <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className="p-fluid"
                  >
                    <div className="mb-3 w-full">
                      <InputString
                        type="text"
                        name="code"
                        label="Code"
                        placeholder="e.g., small_objects"
                      />
                    </div>
                    <div className="mb-3 w-full">
                      <InputString
                        type="text"
                        name="description"
                        label="Description"
                        placeholder="e.g., Description of the shipment mode"
                      />
                    </div>

                    <div className="mb-4">
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

export default AddShipmentMode;
