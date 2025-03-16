"use client";
import React, { useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { InputString, CommonButton, NumberInput } from "@/common/formElements";
import { apiCreateSchool } from "@/services/ApiBasic";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/common/pageHeader";
import { useGetAllBranches } from "@/hooks/useGetAllBranches";
import { useGetAllShipmentTypes } from "@/hooks/useGetAllShipmentTypes";
import { useGetAllShipmentModes } from "@/hooks/useGetAllShipmentModes";
import { useGetAllPaymentMethods } from "@/hooks/useGetAllPaymentMethods";
import { useGetAllPaymentModes } from "@/hooks/useGetAllPaymentModes";
const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  city: z.string().min(1, { message: "City is required" }),
  region: z.string().min(1, { message: "Region is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  subcity: z.string().min(1, { message: "Subcity is required" }),
  establish_date: z.string().refine(
    (date) => {
      return !isNaN(Date.parse(date));
    },
    { message: "Invalid establish date" },
  ),
});

type FormData = z.infer<typeof formSchema>;
interface GradeDetailProps {
  id: string | number | null;
}

const AddShipment: React.FC<GradeDetailProps> = ({ id }) => {
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

  console.log("optionsPaymentMode-optionsPaymentMode", optionsPaymentMode);
  console.log("dataPaymentMode-dataPaymentMode", dataPaymentMode);

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const onSubmit: SubmitHandler<FormData> = (data) => {
    // addCountry(data);
  };

  return (
    <>
      <div className="flex  w-full bg-white text-black dark:bg-boxdark dark:text-white">
        <FormProvider {...methods}>
          <div className="container mx-auto mt-0">
            <div className="w-full">
              <div className="p-0">
                <h6 className="text-gray-700 w-full text-lg font-normal ">
                  Add shipment
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
                        name="name"
                        label="Name"
                        placeholder="ex Winget"
                      />
                    </div>
                    <div className="mb-3 w-full">
                      <InputString
                        type="text"
                        name="email"
                        label="Email"
                        placeholder="ex text@gmail.com"
                      />
                    </div>
                    <div className="mb-3 w-full">
                      <InputString
                        type="text"
                        name="region"
                        label="Region"
                        placeholder="ex Addis Ababa"
                      />
                    </div>
                    <div className="mb-3 w-full">
                      <InputString
                        type="text"
                        name="city"
                        label="City"
                        placeholder="ex Addis Ababa"
                      />
                    </div>
                    <div className="mb-3 w-full">
                      <InputString
                        type="text"
                        name="subcity"
                        label="Subcity"
                        placeholder="ex Yeka"
                      />
                    </div>

                    <div className="mb-3 w-full">
                      <InputString
                        type="text"
                        name="address"
                        label="Address"
                        placeholder="ex 4 killo"
                      />
                    </div>

                    <div className="mb-3 w-full">
                      <InputString
                        type="date"
                        name="establish_date"
                        label="Establish Date"
                        placeholder="ex 2024-08-04"
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

export default AddShipment;
