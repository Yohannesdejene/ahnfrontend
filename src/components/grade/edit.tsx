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
  createSemester,
  fetchSemesterList,
  getSemesterById,
  updateSemester,
} from "@/store/features/semesters/semesterSlice";
import { RootState, AppDispatch } from "@/store/store"; // Import RootState and AppDispatch

const formSchema = z.object({
  year_id: z.string().min(1, { message: "Year ID is required" }),
  name: z.string().min(1, { message: "Name is required" }),
  starting_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "Invalid date format. Use YYYY-MM-DD",
  }),
  end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "Invalid date format. Use YYYY-MM-DD",
  }),
  status: z.enum(["Active", "NotActive"], {
    message: "Status must be either 'Active' or 'NotActive'",
  }),
});

interface AddYearProps {
  // reloadCourse: () => void; // Add reloadCourse as a prop
  id: number | string | null;
  toggleDrawer: (open: boolean) => void; // Accepting toggleDrawer function as a prop
  setId: (id: number | string | null) => void; // Setters don't return a value
}

type FormData = z.infer<typeof formSchema>;

const EditSemester: React.FC<AddYearProps> = ({ toggleDrawer, setId, id }) => {
  const dispatch: AppDispatch = useDispatch(); // Use the AppDispatch type
  const { getSemesterByIdLoading, updateSemesterLoading } = useSelector(
    (state: RootState) => state.semesters,
  );

  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    dispatch(updateSemester({ id, semesterData: data })).then((data) => {
      toggleDrawer(false);
    });
  };

  useEffect(() => {
    try {
      dispatch(getSemesterById({ id }))
        .then((data: any) => {
          methods.reset({
            year_id: data?.payload?.year_id.toString(),
            name: data?.payload?.name,
            starting_date: data?.payload?.starting_date,
            end_date: data?.payload?.end_date,
            status: data?.payload?.status as "Active" | "NotActive",
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
            {getSemesterByIdLoading && <LinearProgress />}
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
                        name="year_id"
                        label={t("semester.yearId")}
                        placeholder={t("semester.yearIdPlaceholder")}
                      />
                    </div>
                    <div className="mb-3 w-full">
                      <InputString
                        type="text"
                        name="name"
                        label={t("semester.name")}
                        placeholder={t("semester.namePlaceholder")}
                      />
                    </div>
                    <div className="mb-3 w-full">
                      <InputString
                        type="date"
                        name="starting_date"
                        label={t("semester.startingDate")}
                        placeholder={t("semester.startingDatePlaceholder")}
                      />
                    </div>
                    <div className="mb-3 w-full">
                      <InputString
                        type="date"
                        name="end_date"
                        label={t("semester.endDate")}
                        placeholder={t("semester.endDatePlaceholder")}
                      />
                    </div>
                    <div className="mb-3 w-full">
                      <SelectInput
                        name="status"
                        label={t("semester.status")}
                        placeholder={t("semester.statusPlaceholder")}
                        options={[
                          { value: "Active", label: t("semester.active") },
                          {
                            value: "NotActive",
                            label: t("semester.notActive"),
                          },
                        ]}
                      />
                    </div>
                    <div className="mb-4">
                      <CommonButton
                        loading={updateSemesterLoading}
                        label={t("semester.submit")}
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

export default EditSemester;
