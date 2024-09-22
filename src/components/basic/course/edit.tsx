"use client";
import React, { useState, useEffect } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { t } from "@/utils/translation";
import { LinearProgress } from "@mui/material";
import { InputString, CommonButton } from "@/common/formElements";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCourse,
  getCourseById,
} from "@/store/features/courses/courseSlice";
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
const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }), // Ensures name is a non-empty string
  code: z.string().min(1, { message: "Code is required" }), // Ensures code is a non-empty string
  department: z.string().min(1, { message: "Department is required" }), // Ensures department is a non-empty string
});

interface AddYearProps {
  // reloadCourse: () => void; // Add reloadCourse as a prop
  id: number | string | null;
  toggleDrawer: (open: boolean) => void; // Accepting toggleDrawer function as a prop
  setId: (id: number | string | null) => void; // Setters don't return a value
}

type FormData = z.infer<typeof formSchema>;

const EditCourse: React.FC<AddYearProps> = ({ toggleDrawer, setId, id }) => {
  const dispatch: AppDispatch = useDispatch(); // Use the AppDispatch type
  const {
    updateError,
    updateSuccess,
    updateLoading,
    getCourseByIdLoading,
    getCourseByIdError,
  } = useSelector((state: RootState) => state.courses);

  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    dispatch(updateCourse({ id, courseData: data })).then((data) => {
      toggleDrawer(false);
    });
  };

  useEffect(() => {
    try {
      dispatch(getCourseById({ id }))
        .then((data: any) => {
          methods.reset({
            name: data?.payload?.name.toString(),
            code: data?.payload.code.toString(),
            department: data?.payload?.department.toString(),
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
            {getCourseByIdLoading && <LinearProgress />}
            <div className="w-full">
              <div className="p-0">
                <h6 className="text-gray-700 w-full text-lg font-normal ">
                  {t("course.editCourse")}
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
                        label={t("course.name")}
                        placeholder="ex Physics"
                      />
                    </div>
                    <div className="mb-3 w-full">
                      <InputString
                        type="text"
                        name="code"
                        label={t("course.code")}
                        placeholder="ex Math_001"
                      />
                    </div>

                    <div className="mb-3 w-full">
                      <InputString
                        type="text"
                        name="department"
                        label={t("course.department")}
                        placeholder="ex Social Science"
                      />
                    </div>

                    <div className="mb-4">
                      <CommonButton
                        loading={updateLoading}
                        label={t("course.submit")}
                      />
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
