"use client";
import React, { useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { CREATE_SHIPMENT_TYPE } from "@/store/features/shipmentTypes/type";
import { InputString, CommonButton, NumberInput } from "@/common/formElements";
import {
  createShipmentType,
  fetchShipmentTypeList,
} from "@/store/features/shipmentTypes/shipmentTypeSlice";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/common/pageHeader";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store"; // Import RootState and AppDispatch

const formSchema = z.object({
  code: z.string().min(1, { message: "Code is required" }), // Restricts "code" to exactly "Large objects"
  description: z.string().min(1, { message: "Description is required" }), // Restricts "description" to exactly "Large objects"
});
interface AddYearProps {
  // reloadYears: () => void; // Add reloadYears as a prop
  toggleDrawer: (open: boolean) => void; // Accepting toggleDrawer function as a prop
}

type FormData = z.infer<typeof formSchema>;

const AddShipmentType: React.FC<AddYearProps> = ({
  toggleDrawer,
  // reloadYears,
}) => {
  const dispatch: AppDispatch = useDispatch(); // Use the AppDispatch type

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const addShipmentType = async (values: any) => {
    setErrorMessage(null);
    setLoading(true);
    const create_shipment: CREATE_SHIPMENT_TYPE = {
      code: values?.code,
      description: values?.description,
    };
    dispatch(createShipmentType({ shipmentTypeData: create_shipment })).then(
      (data) => {
        setLoading(false);
        toggleDrawer(false);
        dispatch(fetchShipmentTypeList());
      },
    );
    // Fix 3: Assuming createShipmentType is a function that returns a Promise
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    addShipmentType(data);
  };

  return (
    <>
      <div className="flex  w-full bg-white text-black dark:bg-boxdark dark:text-white">
        <FormProvider {...methods}>
          <div className="container mx-auto mt-0">
            <div className="w-full">
              <div className="p-0">
                <h6 className="text-gray-700 w-full text-lg font-normal ">
                  Add shipment Type{" "}
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

export default AddShipmentType;
