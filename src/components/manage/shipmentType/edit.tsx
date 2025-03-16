"use client";
import React, { useState, useEffect } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import {
  InputString,
  CommonButton,
  NumberInput,
  SelectInput,
  ReactSelect,
} from "@/common/formElements";
import StringToBoolean from "@/utils/stringToBoolean";
import { apiPutSchool, apiGetSchoolById } from "@/services/ApiBasic";
import { useRouter } from "next/navigation";
import { RootState, AppDispatch } from "@/store/store"; // Import RootState and AppDispatch
import { useDispatch, useSelector } from "react-redux";
import { CREATE_SHIPMENT_TYPE } from "@/store/features/shipmentTypes/type";
import {
  getShipmentTypeById,
  updateShipmentType,
  fetchShipmentTypeList,
} from "@/store/features/shipmentTypes/shipmentTypeSlice";
const formSchema = z.object({
  code: z.string().min(1, { message: "Code is required" }), // Restricts "code" to exactly "Large objects"
  description: z.string().min(1, { message: "Description is required" }), // Restricts "description" to exactly "Large objects"
});

interface AddYearProps {
  id: number | string | null;
  toggleDrawer: (open: boolean) => void; // Accepting toggleDrawer function as a prop
  setId: (id: number | null | string) => void; // Setters don't return a value
}

type FormData = z.infer<typeof formSchema>;

const EditShipmentType: React.FC<AddYearProps> = ({
  toggleDrawer,
  setId,
  id,
}) => {
  const dispatch: AppDispatch = useDispatch(); // Use the AppDispatch type
  const {
    shipmentTypes,
    loadingShipmentType,
    errorShipmentType,
    currentShipmentType,
  } = useSelector((state: RootState) => state.shipmentType);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingDefault, setLoadingDefaults] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null | string>(
    null,
  );
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const editShipmentType = async (values: any) => {
    setErrorMessage(null);
    setLoading(true);
    const create_shipment: CREATE_SHIPMENT_TYPE = {
      code: values?.code,
      description: values?.description,
    };
    dispatch(
      updateShipmentType({ shipmentTypeData: create_shipment, id: id }),
    ).then((data) => {
      toggleDrawer(false);
      setLoading(false);
      dispatch(fetchShipmentTypeList());
    });
    // Fix 3: Assuming createShipmentType is a function that returns a Promise
  };
  const onSubmit: SubmitHandler<FormData> = (data) => {
    editShipmentType(data);
  };
  useEffect(() => {
    try {
      dispatch(getShipmentTypeById(id))
        .then((data: any) => {
          methods.reset({
            code: data?.payload?.data.shipmentType?.code.toString(),
            description:
              data?.payload?.data?.shipmentType?.description.toString(),
          });
        })
        .catch((error) => {
          console.error("Error fetching course:", error);
        });
    } catch (err) {
      console.log("err", err);
    }
  }, [id, methods]);
  return (
    <>
      <div className="flex  w-full bg-white text-black dark:bg-boxdark dark:text-white">
        <FormProvider {...methods}>
          <div className="container mx-auto mt-0">
            <div className="w-full">
              <div className="p-0">
                <h6 className="text-gray-700 w-full text-lg font-normal ">
                  Edit Shipment type
                </h6>

                <hr className="mb-4 mt-4 w-full text-lg font-normal text-normalGray " />
                <div className="w-full ">
                  <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className="p-fluid"
                  >
                    <div className="mb-3 w-full">
                      <InputString
                        type="text"
                        name="code"
                        label="Code "
                        placeholder="ex small_objects"
                      />
                    </div>
                    <div className="mb-3 w-full">
                      <InputString
                        type="text"
                        name="description"
                        label="Description"
                        placeholder="ex description"
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

export default EditShipmentType;
