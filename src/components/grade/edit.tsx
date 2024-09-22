"use client";
import React, { useState, useEffect } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { t } from "@/utils/translation";
import { LinearProgress } from "@mui/material";
import { InputString, CommonButton, SelectInput } from "@/common/formElements";
import { useDispatch, useSelector } from "react-redux";

import {
  createGrade,
  fetchGradeList,
  getGradeById,
  updateGrade,
} from "@/store/features/grades/gradeSlice";
import { RootState, AppDispatch } from "@/store/store"; // Import RootState and AppDispatch

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
});

interface AddYearProps {
  // reloadCourse: () => void; // Add reloadCourse as a prop
  id: number | string | null;
  toggleDrawer: (open: boolean) => void; // Accepting toggleDrawer function as a prop
  setId: (id: number | string | null) => void; // Setters don't return a value
}

type FormData = z.infer<typeof formSchema>;

const EditGrade: React.FC<AddYearProps> = ({ toggleDrawer, setId, id }) => {
  const dispatch: AppDispatch = useDispatch(); // Use the AppDispatch type
  const { getGradeByIdLoading, updateGradeLoading } = useSelector(
    (state: RootState) => state.grades,
  );

  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    dispatch(updateGrade({ id, gradeData: data })).then((data) => {
      toggleDrawer(false);
    });
  };

  useEffect(() => {
    try {
      dispatch(getGradeById({ id }))
        .then((data: any) => {
          methods.reset({
            name: data?.payload?.name,
          });
        })
        .catch((error) => {
          console.error("Error fetching grade:", error);
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
            {getGradeByIdLoading && <LinearProgress />}
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
                        label={t("semester.name")}
                        placeholder={t("semester.namePlaceholder")}
                      />
                    </div>

                    <div className="mb-4">
                      <CommonButton
                        loading={updateGradeLoading}
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

export default EditGrade;
