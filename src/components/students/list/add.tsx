"use client";
import React, { useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { t } from "@/utils/translation";

import toast from "react-hot-toast";
import {
  InputString,
  CommonButton,
  SelectInput,
  InputNumber,
} from "@/common/formElements";
import { useRouter } from "next/navigation";
import { RootState, AppDispatch } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  updateStudents,
  getStudentsById,
  createStudents,
} from "@/store/features/students/studentsSlice";
import { STUDENT_CREATE } from "@/store/features/students/type";
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

interface AddStudentProps {
  toggleDrawer: (open: boolean) => void; // Accepting toggleDrawer function as a prop
}

const AddStudent: React.FC<AddStudentProps> = ({ toggleDrawer }) => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const methods = useForm<STUDENT_CREATE>({
    resolver: zodResolver(formSchema),
  });

  const { createStudentsLoading, createStudentsError } = useSelector(
    (state: RootState) => state.students,
  );
  const onSubmit: SubmitHandler<STUDENT_CREATE> = (data) => {
    const newData = {
      ...data,
      age: parseInt(data.age.toString()),
      houseNo: data.houseNo.toString(),
      kebele: data.kebele.toString(),
    };

    dispatch(createStudents({ studentsData: newData })).then((data) => {
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
                  {t("students.addStudents")}
                </h6>

                <hr className="mb-4 mt-4 w-full text-lg font-normal text-normalGray " />
                <div className="w-full">
                  <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className="p-fluid"
                  >
                    <div className="mb-3 w-full">
                      <InputString
                        type="text"
                        name="first_name"
                        label={t("students.firstName")}
                        placeholder={t("ex Firaol")}
                      />
                    </div>
                    <div className="mb-3 w-full">
                      <InputString
                        type="text"
                        name="middle_name"
                        label={t("students.middleName")}
                        placeholder={t("ex Getachew")}
                      />
                    </div>
                    <div className="mb-3 w-full">
                      <InputString
                        type="text"
                        name="last_name"
                        label={t("students.lastName")}
                        placeholder={t("ex bogale")}
                      />
                    </div>

                    <div className="mb-3 w-full">
                      <InputString
                        type="text"
                        name="phone_number"
                        label={t("students.phoneNumber")}
                        placeholder={t("ex 0912345678")}
                      />
                    </div>

                    <div className="mb-3 w-full">
                      <InputString
                        type="text"
                        name="father_name"
                        label={t("students.fatherName")}
                        placeholder={t("ex Getachew")}
                      />
                    </div>
                    <div className="mb-3 w-full">
                      <InputString
                        type="text"
                        name="father_phone"
                        label={t("students.fatherPhone")}
                        placeholder={t("ex 0912345678")}
                      />
                    </div>

                    <div className="flex flex-row gap-5">
                      <div className="mb-3 w-full">
                        <InputNumber
                          name="houseNo"
                          label={t("students.houseNo")}
                          placeholder={t("ex 123")}
                        />
                      </div>
                      <div className="mb-3 w-full">
                        <InputNumber
                          name="kebele"
                          label={t("students.kebele")}
                          placeholder={t("ex 123")}
                        />
                      </div>
                    </div>
                    <div className="flex flex-row gap-5">
                      <div className="mb-3 w-full">
                        <InputNumber
                          name="age"
                          label={t("students.age")}
                          placeholder={t("ex 123")}
                        />
                      </div>
                      <div className="mb-3 w-full">
                        <InputString
                          type="text"
                          name="nationality"
                          label={t("students.nationality")}
                          placeholder={t("ex Ethiopian")}
                        />
                      </div>
                    </div>

                    <div className="mb-3 w-full">
                      <InputString
                        type="text"
                        name="subcity"
                        label={t("students.subcity")}
                        placeholder={t("ex Addis Ababa")}
                      />
                    </div>

                    <div className="mb-3 w-full">
                      <InputString
                        type="text"
                        name="prev_school"
                        label={t("students.prevSchool")}
                        placeholder={t("ex Addis Ababa")}
                      />
                    </div>
                    <div className="flex flex-row gap-5">
                      <div className="mb-3 w-full">
                        <SelectInput
                          name="sex"
                          label={t("students.sex")}
                          placeholder={t("students.sexPlaceholder")}
                          options={[
                            { value: "Male", label: t("common.male") },
                            {
                              value: "Female",
                              label: t("common.female"),
                            },
                          ]}
                        />
                      </div>
                      <div className="mb-3 w-full">
                        <SelectInput
                          name="status"
                          label={t("students.status")}
                          placeholder={t("students.statusPlaceholder")}
                          options={[
                            { value: "Active", label: t("common.active") },
                            {
                              value: "Inactive",
                              label: t("common.inactive"),
                            },
                          ]}
                        />
                      </div>
                    </div>
                    <div className="mb-3 w-full">
                      <InputString
                        type="text"
                        name="department"
                        label={t("students.department")}
                        placeholder={t("ex computer science")}
                      />
                    </div>
                    <div className="mb-4">
                      <CommonButton
                        loading={createStudentsLoading}
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

export default AddStudent;
