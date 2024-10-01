"use client";
import React, { useState, useEffect } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { t } from "@/utils/translation";
import { LinearProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store"; // Import RootState and AppDispatch
import {
  getSemesterById,
  updateSemester,
} from "@/store/features/semesters/semesterSlice";
import { InputString, CommonButton, SelectInput } from "@/common/formElements";
import { useGetAllYears } from "@/hooks/useGetAllYears";

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

const OverView: React.FC = () => {
  const dispatch: AppDispatch = useDispatch(); // Use the AppDispatch type
  const { loadingYears, errorYears, optionsYears, dataYears, reloadYears } =
    useGetAllYears();
  const { getSemesterByIdLoading, updateSemesterLoading } = useSelector(
    (state: RootState) => state.semesters,
  );

  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  return (
    <>
      <div className="flex  w-full bg-white text-black dark:bg-boxdark dark:text-white">
        <div className="container mx-auto mt-0">
          {getSemesterByIdLoading && <LinearProgress />}
          <div className="w-full">
            <div className="p-0">
              <h6 className="text-gray-700 w-full text-lg font-normal ">
                {t("semester.editSemester")}
              </h6>

              <hr className="mb-4 mt-4 w-full text-lg font-normal text-normalGray " />
              <div className="w-full ">
                <div className="mb-3 w-full">
                  <input />
                </div>
                <div className="mb-3 w-full">
                  <input />
                </div>
                <div className="mb-3 w-full">
                  <input />
                </div>
                <div className="mb-3 w-full">
                  <input />
                </div>
                <div className="mb-3 w-full">
                  <input />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OverView;
