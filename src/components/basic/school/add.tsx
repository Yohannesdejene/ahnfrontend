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
interface AddYearProps {
  reloadYears: () => void; // Add reloadYears as a prop

  toggleDrawer: (open: boolean) => void; // Accepting toggleDrawer function as a prop
}

type FormData = z.infer<typeof formSchema>;

const AddYear: React.FC<AddYearProps> = ({ toggleDrawer, reloadYears }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const addCountry = async (values: any) => {
    setErrorMessage(null);
    setLoading(true);

    toast
      .promise(
        apiCreateSchool({
          ...values,
        }),
        {
          loading: "Creating school...",
          success: <b>School created successfully!</b>,
          error: (error) => (
            <b>
              {error.message || "An error occurred while creating the school."}
            </b>
          ),
        },
      )
      .then(() => {
        setLoading(false);
        reloadYears();
      })
      .catch((error: any) => {
        const errorMessage =
          error.message || "An error occurred while creating the school.";
        setErrorMessage(errorMessage);
        setLoading(false);
      })
      .finally(() => {
        // This will execute regardless of success or failure
        setLoading(false);
        toggleDrawer(false);
      });
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    addCountry(data);
  };

  return (
    <>
      <div className="flex  w-full bg-white text-black dark:bg-boxdark dark:text-white">
        <FormProvider {...methods}>
          <div className="container mx-auto mt-0">
            <div className="w-full">
              <div className="p-0">
                <h6 className="text-gray-700 w-full text-lg font-normal ">
                  Add School
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

export default AddYear;
