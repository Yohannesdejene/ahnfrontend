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
  fetchYearList,
  createYear,
  updateYear,
  getYearById,
} from "@/store/features/years/yearsSlice";

const formSchema = z
  .object({
    EUC_year: z.string(),

    ETH_year: z.string(),
    start_date: z
      .string()
      .nonempty("Start date is required")
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format for Start Date",
      }),
    end_date: z
      .string()
      .nonempty("End date is required")
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format for End Date",
      }),
  })
  .refine(
    (data) => {
      const startDate = new Date(data.start_date);
      const endDate = new Date(data.end_date);
      return startDate <= endDate;
    },
    {
      message: "Start date must be before or the same as the end date",
      path: ["end_date"], // Error will be assigned to the end_date field
    },
  );

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
    const newValue = {
      ...data,
      EUC_year: parseInt(data.EUC_year),
      ETH_year: parseInt(data.ETH_year),
    };
    dispatch(createYear({ yearData: newValue })).then((data) => {
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
