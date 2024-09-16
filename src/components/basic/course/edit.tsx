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
import StringToBoolean from "@/utils/stringToBoolean";
import { apiPutCourse, apiGetCourseById } from "@/services/ApiBasic";
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
  name: z.string().min(1, { message: "Name is required" }), // Ensures name is a non-empty string
  code: z.string().min(1, { message: "Code is required" }), // Ensures code is a non-empty string
  department: z.string().min(1, { message: "Department is required" }), // Ensures department is a non-empty string
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
      .promise(apiPutCourse(id, values), {
        loading: "Updating course...",
        success: <b>Course updated successfully!</b>,
        error: (error) => (
          <b>{error.message || "An error occurred while updating  course."}</b>
        ),
      })
      .then(() => {
        setLoading(false);
        reloadCourse();
      })
      .catch((error: any) => {
        const errorMessage =
          error.message || "An error occurred while updating course.";
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
        const data = await apiGetCourseById(id);
        // Reset the form with fetched data
        methods.reset({
          name: data.name.toString(),
          code: data.code.toString(),
          department: data.department.toString(),
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
            {loadingDefault && <LinearProgress />}
            <div className="w-full">
              <div className="p-0">
                <h6 className="text-gray-700 w-full text-lg font-normal ">
                  Edit Course
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
                        placeholder="ex Physics"
                      />
                    </div>
                    <div className="mb-3 w-full">
                      <InputString
                        type="text"
                        name="code"
                        label="code"
                        placeholder="ex Math_001"
                      />
                    </div>

                    <div className="mb-3 w-full">
                      <InputString
                        type="text"
                        name="department"
                        label="Department"
                        placeholder="ex Social Science"
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
