"use client";
import React, { useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { InputString, CommonButton, SelectInput } from "@/common/formElements";
import { t } from "@/utils/translation";
import { useDispatch, useSelector } from "react-redux";
import {
  createGrade,
  fetchGradeList,
} from "@/store/features/grades/gradeSlice";
import { RootState, AppDispatch } from "@/store/store";
const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
});

interface AddGradeProps {
  toggleDrawer: (open: boolean) => void; // Accepting toggleDrawer function as a prop
}

type FormData = z.infer<typeof formSchema>;

const AddGrade: React.FC<AddGradeProps> = ({ toggleDrawer }) => {
  const dispatch: AppDispatch = useDispatch(); // Use the AppDispatch type
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const { createGradeLoading, createGradeError, createGradeSuccess } =
    useSelector((state: RootState) => state.grades);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    dispatch(createGrade({ gradeData: data })).then((data) => {
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
                  {t("grade.addGrade")}
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
                        label={t("grade.name")}
                        placeholder={t("grade.namePlaceholder")}
                      />
                    </div>
                    <div className="mb-4">
                      <CommonButton
                        loading={createGradeLoading}
                        label={t("common.submit")}
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

export default AddGrade;
