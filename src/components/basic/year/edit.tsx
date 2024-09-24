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
import { LinearProgress } from "@mui/material";
import { updateYear, getYearById } from "@/store/features/years/yearsSlice";

import StringToBoolean from "@/utils/stringToBoolean";
import { apiPutYear, apiGetYearById } from "@/services/ApiBasic";
import { useRouter } from "next/navigation";
import { RootState, AppDispatch } from "@/store/store"; // Import RootState and AppDispatch

const IsActiveOptions = [
  {
    label: "True",
    value: "true",
  },
  {
    label: "False",
    value: "false",
  },
];
const formSchema = z
  .object({
    EUC_year: z.string(),

    ETH_year: z.string(),
    is_active: z.string(),
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
  id: number | string | null;

  toggleDrawer: (open: boolean) => void; // Accepting toggleDrawer function as a prop
  setId: (id: number | null) => void; // Setters don't return a value
}

type FormData = z.infer<typeof formSchema>;
  const dispatch: AppDispatch = useDispatch(); // Use the AppDispatch type

const EditYear: React.FC<AddYearProps> = ({ toggleDrawer, setId, id }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingDefault, setLoadingDefaults] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const editYear = async (values: any) => {
    setErrorMessage(null);
    setLoading(true);
    const newValue = {
      ...values,
      is_active: StringToBoolean(values.is_active),
      EUC_year: parseInt(values.EUC_year),
      ETH_year: parseInt(values.ETH_year),
    };

    toast
      .promise(apiPutYear(id, newValue), {
        loading: "Updeting Year...",
        success: <b>Year Updated Successfully!</b>,
        error: (error) => (
          <b>
            {error.message || "An error occurred while updating  the year."}
          </b>
        ),
      })
      .then(() => {
        setLoading(false);
      })
      .catch((error: any) => {
        const errorMessage =
          error.message || "An error occurred while updating the year.";
        setErrorMessage(errorMessage);
        setLoading(false);
      })
      .finally(() => {
        setId(null);
        // This will execute regardless of success or failure
        setLoading(false);
        toggleDrawer(false);
      });
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    editYear(data);
  };
  useEffect(() => {
    setLoadingDefaults(true);
    const fetchData = async () => {
      try {
        // Fetch data from the API
        const data = await apiGetYearById(id);
        console.log("data", data);
        // Reset the form with fetched data
        methods.reset({
          EUC_year: data.EUC_year.toString(),
          ETH_year: data.ETH_year.toString(),
          start_date: data.start_date.slice(0, 10), // Format to YYYY-MM-DD
          end_date: data.end_date.slice(0, 10), // Format to YYYY-MM-DD
          is_active: data.is_active.toString(),
        });
        setLoadingDefaults(false);
      } catch (error) {
        setLoadingDefaults(false);
        console.error("Failed to fetch data", error);
      }
    };

    fetchData();
  }, [id, methods]);

  useEffect(() => {
    try {
      dispatch(getYearById({ id }))
        .then((data: any) => {
          methods.reset({
            EUC_year: data.EUC_year.toString(),
            ETH_year: data.ETH_year.toString(),
            start_date: data.start_date.slice(0, 10), // Format to YYYY-MM-DD
            end_date: data.end_date.slice(0, 10), // Format to YYYY-MM-DD
            is_active: data.is_active.toString(),
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
            {loadingDefault && <LinearProgress />}
            <div className="w-full">
              <div className="p-0">
                <h6 className="text-gray-700 w-full text-lg font-normal ">
                  Edit Year
                </h6>

                <hr className="mb-4 mt-4 w-full text-lg font-normal text-normalGray " />
                <div className="w-full ">
                  <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className="p-fluid"
                  >
                    <div className="mb-3 w-full">
                      <SelectInput
                        // type="year"
                        name="is_active"
                        label="Is active"
                        placeholder="Select "
                        options={IsActiveOptions}
                        loading={loadingDefault}
                      />
                    </div>
                    <div className="mb-3 w-full">
                      <NumberInput
                        // type="year"
                        name="EUC_year"
                        label="Gregorian  Calender"
                        placeholder="ex 2024"
                        min={1900}
                        max={2030}
                      />
                    </div>
                    <div className="mb-3 w-full">
                      <NumberInput
                        name="ETH_year"
                        label="Ethiopian Calender"
                        placeholder="ex 2016"
                        min={1900}
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

export default EditYear;
