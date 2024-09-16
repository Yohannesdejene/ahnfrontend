"use client";
import React, { useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { InputString, CommonButton, NumberInput } from "@/common/formElements";
import { apiCreateCourse } from "@/services/ApiBasic";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/common/pageHeader";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }), // Ensures name is a non-empty string
  code: z.string().min(1, { message: "Code is required" }), // Ensures code is a non-empty string
  department: z.string().min(1, { message: "Department is required" }), // Ensures department is a non-empty string
});
interface AddYearProps {
  reloadCourse: () => void; // Add reloadCourse as a prop

  toggleDrawer: (open: boolean) => void; // Accepting toggleDrawer function as a prop
}

type FormData = z.infer<typeof formSchema>;

const AddCourse: React.FC<AddYearProps> = ({ toggleDrawer, reloadCourse }) => {
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
        apiCreateCourse({
          ...values,
        }),
        {
          loading: "Creating course...",
          success: <b>Course created successfully!</b>,
          error: (error) => (
            <b>{error.message || "An error occurred while creating course."}</b>
          ),
        },
      )
      .then(() => {
        setLoading(false);
        reloadCourse();
      })
      .catch((error: any) => {
        const errorMessage =
          error.message || "An error occurred while creating the course.";
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
                  Add Course
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

export default AddCourse;
