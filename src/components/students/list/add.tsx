"use client";
import React, { useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { t } from "@/utils/translation";

import toast from "react-hot-toast";
import { InputString, CommonButton, NumberInput } from "@/common/formElements";
import { useRouter } from "next/navigation";
import { RootState, AppDispatch } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  updateStudents,
  getStudentsById,
  createStudents,
} from "@/store/features/students/studentsSlice";

const formSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  middle_name: z.string(),
  last_name: z.string().min(1, "Last name is required"),
  phone_number: z.string(),
  department: z.string(),
  father_name: z.string().min(1, "Father's name is required"),
  father_phone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
  sex: z.enum(["Male", "Female", "Other"]),
  nationality: z.string().min(1, "Nationality is required"),
  status: z.enum(["Active", "Inactive"]),
  houseNo: z.number().int().positive(),
  kebele: z.number().int().positive(),
  subcity: z.string(),
  prev_school: z.string(),
  age: z
    .number()
    .int()
    .positive()
    .max(120, "Age must be less than or equal to 120"),
});

interface AddYearProps {
  toggleDrawer: (open: boolean) => void; // Accepting toggleDrawer function as a prop
}

type FormData = z.infer<typeof formSchema>;

const AddYear: React.FC<AddYearProps> = ({ toggleDrawer }) => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const { createYearLoading, createYearError } = useSelector(
    (state: RootState) => state.years,
  );
  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("data", data);

    dispatch(createStudents({ studentsData: data })).then((data) => {
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
                  {t("year.addYear")}
                </h6>

                <hr className="mb-4 mt-4 w-full text-lg font-normal text-normalGray " />
                <div className="w-full">
                  <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className="p-fluid"
                  >
                    <div className="mb-3 w-full">
                      <NumberInput
                        name="EUC_year"
                        label={t("year.gregorianCalendar")}
                        placeholder={t("year.ex2024")}
                        min={2000}
                        max={2030}
                      />
                    </div>
                    <div className="mb-3 w-full">
                      <NumberInput
                        name="ETH_year"
                        label={t("year.ethiopianCalendar")}
                        placeholder={t("year.ex2016")}
                        min={2000}
                        max={2030}
                      />
                    </div>
                    <div className="mb-3 w-full">
                      <InputString
                        type="date"
                        name="start_date"
                        label={t("year.startDate")}
                        placeholder={t("year.ex20240104")}
                      />
                    </div>
                    <div className="mb-3 w-full">
                      <InputString
                        type="date"
                        name="end_date"
                        label={t("year.endDate")}
                        placeholder={t("year.ex20240804")}
                      />
                    </div>
                    <div className="mb-4">
                      <CommonButton
                        loading={createYearLoading}
                        label={t("year.submit")}
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

export default AddYear;
