"use client";
import React, { useState, useEffect } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { InputString, CommonButton } from "@/common/formElements";
import { RootState, AppDispatch } from "@/store/store"; // Import RootState and AppDispatch
import { useDispatch, useSelector } from "react-redux";
import { CREATE_SHIPMENT_MODE } from "@/store/features/shipmentModes/type";
import {
  getShipmentModeById,
  updateShipmentMode,
  fetchShipmentModeList,
} from "@/store/features/shipmentModes/shipmentModesSlice";

const formSchema = z.object({
  code: z.string().min(1, { message: "Code is required" }),
  description: z.string().min(1, { message: "Description is required" }),
});

interface EditShipmentModeProps {
  id: number | string | null;
  toggleDrawer: (open: boolean) => void; // Accepting toggleDrawer function as a prop
  setId: (id: number | null | string) => void; // Setters don't return a value
}

type FormData = z.infer<typeof formSchema>;

const EditShipmentMode: React.FC<EditShipmentModeProps> = ({
  toggleDrawer,
  setId,
  id,
}) => {
  const dispatch: AppDispatch = useDispatch(); // Use the AppDispatch type
  const { loadingShipmentMode, errorShipmentMode } = useSelector(
    (state: RootState) => state.shipmentMode,
  );
  const [loading, setLoading] = useState<boolean>(false);
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const editShipmentMode = async (values: any) => {
    setLoading(true);
    const updatedShipmentMode: CREATE_SHIPMENT_MODE = {
      code: values?.code,
      description: values?.description,
    };
    dispatch(updateShipmentMode({ shipmentModeData: updatedShipmentMode, id }))
      .then((data) => {
        if (data?.payload?.status == 200) {
          toggleDrawer(false);
          setLoading(false);
          dispatch(fetchShipmentModeList());
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message || "Failed to update shipment mode");
      });
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    editShipmentMode(data);
  };

  useEffect(() => {
    try {
      if (id) {
        dispatch(getShipmentModeById(id))
          .then((data: any) => {
            console.log("data mode", data);
            methods.reset({
              code: data?.payload?.shipmentMode?.code || "",
              description: data?.payload?.shipmentMode?.description || "",
            });
          })
          .catch((error) => {
            console.error("Error fetching shipment mode:", error);
          });
      }
    } catch (err) {
      console.log("err", err);
    }
  }, [id, methods, dispatch]);

  return (
    <>
      <div className="flex w-full bg-white text-black dark:bg-boxdark dark:text-white">
        <FormProvider {...methods}>
          <div className="container mx-auto mt-0">
            <div className="w-full">
              <div className="p-0">
                <h6 className="text-gray-700 w-full text-lg font-normal">
                  Edit Shipment Mode
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

export default EditShipmentMode;
