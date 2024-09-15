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
const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  city: z.string().min(1, { message: "City is required" }),
  region: z.string().min(1, { message: "Region is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  sub_city: z.string().min(1, { message: "Subcity is required" }),
  establish_date: z.string().refine(
    (date) => {
      return !isNaN(Date.parse(date));
    },
    { message: "Invalid establish date" },
  ),
});

interface AddYearProps {
  reloadCourse: () => void; // Add reloadCourse as a prop
  id: number | string | null;
  toggleDrawer: (open: boolean) => void; // Accepting toggleDrawer function as a prop
  setId: (id: number | null | string) => void; // Setters don't return a value
}

type FormData = z.infer<typeof formSchema>;

const EditCourse: React.FC<AddYearProps> = ({
  toggleDrawer,
  setId,
  reloadCourse,
  id,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingDefault, setLoadingDefaults] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null | string>(
    null,
  );
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const editYear = async (values: any) => {
    setErrorMessage(null);
    setLoading(true);

    toast
      .promise(apiPutSchool(id, values), {
        loading: "Updeting school...",
        success: <b>School `updated successfully!</b>,
        error: (error) => (
          <b>
            {error.message || "An error occurred while updating  the school."}
          </b>
        ),
      })
      .then(() => {
        setLoading(false);
        reloadCourse();
      })
      .catch((error: any) => {
        const errorMessage =
          error.message || "An error occurred while updating the school.";
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
        const data = await apiGetSchoolById(id);
        console.log("data", data);
        // Reset the form with fetched data
        methods.reset({
          name: data.name.toString(),
          region: data.region.toString(),
          city: data.city,
          sub_city: data.sub_city,
          address: data.address,
          email: data.email,
          establish_date: data.establish_date.slice(0, 10),
        });
        setLoadingDefaults(false);
      } catch (error) {
        setLoadingDefaults(false);
        console.error("Failed to fetch data", error);
      }
    };

    fetchData();
  }, [id, methods]);
  return (
    <>
      <div className="flex  w-full bg-white text-black dark:bg-boxdark dark:text-white">
        <FormProvider {...methods}>
          <div className="container mx-auto mt-0">
            <div className="w-full">
              <div className="p-0">
                <h6 className="text-gray-700 w-full text-lg font-normal ">
                  Edit School
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
                        name="sub_city"
                        label="Sub city"
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

export default EditCourse;
