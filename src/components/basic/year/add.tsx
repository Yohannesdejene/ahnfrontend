"use client";
import React, { useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { InputString, CommonButton, NumberInput } from "@/common/formElements";
import { apiCreateYear } from "@/services/ApiBasic";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/common/pageHeader";

const formSchema = z
  .object({
    EUC_year: z.string(),

    ETH_year: z.string(),
    start_date: z
      .string()
      .nonempty("Start date is required")
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format for Start Date",
      }),
    end_date: z
      .string()
      .nonempty("End date is required")
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format for End Date",
      }),
  })
  .refine(
    (data) => {
      const startDate = new Date(data.start_date);
      const endDate = new Date(data.end_date);
      return startDate <= endDate;
    },
    {
      message: "Start date must be before or the same as the end date",
      path: ["end_date"], // Error will be assigned to the end_date field
    },
  );

interface AddYearProps {
  reloadYears: () => void; // Add reloadYears as a prop

  toggleDrawer: (open: boolean) => void; // Accepting toggleDrawer function as a prop
}

type FormData = z.infer<typeof formSchema>;

const AddYear: React.FC<AddYearProps> = ({ toggleDrawer, reloadYears }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const addCountry = async (values: any) => {
    setErrorMessage(null);
    setLoading(true);
    const newValue = {
      ...values,
      EUC_year: parseInt(values.EUC_year),
      ETH_year: parseInt(values.ETH_year),
    };

    toast
      .promise(
        apiCreateYear({
          ...newValue,
          addedBy: null,
        }),
        {
          loading: "Creating Year...",
          success: <b>Year created successfully!</b>,
          error: (error) => (
            <b>
              {error.message || "An error occurred while creating the country."}
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
          error.message || "An error occurred while creating the country.";
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
                  Add Year
                </h6>

                <hr className="mb-4 mt-4 w-full text-lg font-normal text-normalGray " />
                <div className="w-full ">
                  <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className="p-fluid"
                  >
                    <div className="mb-3 w-full">
                      <NumberInput
                        // type="year"
                        name="EUC_year"
                        label="Gregorian  Calender"
                        placeholder="ex 2024"
                        min={2000}
                        max={2030}
                      />
                    </div>
                    <div className="mb-3 w-full">
                      <NumberInput
                        name="ETH_year"
                        label="Ethiopian Calender"
                        placeholder="ex 2016"
                        min={2000}
                        max={2030}
                      />
                    </div>
                    <div className="mb-3 w-full">
                      <InputString
                        type="date"
                        name="start_date"
                        label="Start Date"
                        placeholder="ex 2024-01-04"
                      />
                    </div>
                    <div className="mb-3 w-full">
                      <InputString
                        type="date"
                        name="end_date"
                        label="End Date"
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
