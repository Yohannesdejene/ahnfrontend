"use client";
import React, { useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { InputString, CommonButton, NumberInput } from "@/common/formElements";
import { apiCreateCourse } from "@/services/ApiBasic";
import { t } from "@/utils/translation";
import { useDispatch, useSelector } from "react-redux";
import {
  createCourse,
  fetchCourseList,
} from "@/store/features/courses/courseSlice";
import { RootState, AppDispatch } from "@/store/store";
const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }), // Ensures name is a non-empty string
  code: z.string().min(1, { message: "Code is required" }), // Ensures code is a non-empty string
  department: z.string().min(1, { message: "Department is required" }), // Ensures department is a non-empty string
});
interface AddYearProps {
  toggleDrawer: (open: boolean) => void; // Accepting toggleDrawer function as a prop
}

type FormData = z.infer<typeof formSchema>;

const AddCourse: React.FC<AddYearProps> = ({ toggleDrawer }) => {
  const dispatch: AppDispatch = useDispatch(); // Use the AppDispatch type
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const { createLoading } = useSelector((state: RootState) => state.courses);
  const onSubmit: SubmitHandler<FormData> = (data) => {
    dispatch(createCourse({ courseData: data })).then((data) => {
      toggleDrawer(false);
    });
  };

  return (
    <>
      <div className="flex  w-full bg-white text-black dark:bg-boxdark dark:text-white">
        <FormProvider {...methods}>
          <div className="container mx-auto mt-0">
            <div className="w-full">
              <div className="p-0">
                <h6 className="text-gray-700 w-full text-lg font-normal ">
                  {t("course.addCourse")}
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
                        loading={createLoading}
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

export default AddCourse;
