"use client";
import React, { useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { t } from "@/utils/translation";
import { useDispatch, useSelector } from "react-redux";
import { InputString, CommonButton, SelectInput } from "@/common/formElements";
import {
  createSemester,
  fetchSemesterList,
} from "@/store/features/semesters/semesterSlice";
import { useGetAllYears } from "@/hooks/useGetAllBranches";
import { RootState, AppDispatch } from "@/store/store";

const formSchema = z.object({
  year_id: z.string().min(1, { message: "Year is required" }),
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
const semesterNameOptions = [
  {
    label: "One",
    value: "1",
  },
  {
    label: "Two",
    value: "2",
  },
];
interface AddSemesterProps {
  toggleDrawer: (open: boolean) => void; // Accepting toggleDrawer function as a prop
}

type FormData = z.infer<typeof formSchema>;

const AddSemester: React.FC<AddSemesterProps> = ({ toggleDrawer }) => {
  const dispatch: AppDispatch = useDispatch(); // Use the AppDispatch type
  const { loadingYears, errorYears, optionsYears, dataYears, reloadYears } =
    useGetAllYears();
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const { createSemesterLoading, createSemesterError, createSemesterSuccess } =
    useSelector((state: RootState) => state.semesters);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("data", data);
    dispatch(createSemester({ semesterData: data })).then((data) => {
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
                  {t("semester.addSemester")}
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
                        name="year_id"
                        label={t("semester.selectYear")}
                        placeholder={t("semester.yearIdPlaceholder")}
                        options={optionsYears}
                        loading={loadingYears}
                      />
                    </div>
                    <div className="mb-3 w-full">
                      <SelectInput
                        // type="year"
                        name="name"
                        label={t("semester.name")}
                        placeholder={t("semester.namePlaceholder")}
                        options={semesterNameOptions}
                        loading={false}
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
                        loading={createSemesterLoading}
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

export default AddSemester;
