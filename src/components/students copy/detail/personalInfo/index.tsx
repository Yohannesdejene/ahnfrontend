"use client";
import React, { useState, useEffect } from "react";
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
  middle_name: z.string().min(1, "Middle name is required"),
  last_name: z.string().min(1, "Last name is required"),
  phone_number: z.string().min(1, "Phone number is required"),
  department: z.string().min(1, "Department is required"),
  // father_name: z.string().min(1, "Father's name is required"),
  // father_phone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
  sex: z.enum(["Male", "Female", "Other"]),
  nationality: z.string().min(1, "Nationality is required"),
  status: z.enum(["Active", "Inactive"]),
  houseNo: z.number().int().positive(),
  kebele: z.number().int().positive(),
  subcity: z.string().min(1, "Subcity is required"),
  prev_school: z.string().min(1, "Previous school is required"),
  age: z
    .number()
    .int()
    .positive()
    .max(120, "Age must be less than or equal to 120"),
});

interface PersonalInfoProps {
  id: string | number | null;
}
const PersonalInfo: React.FC<PersonalInfoProps> = ({ id }) => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const methods = useForm<STUDENT_CREATE>({
    resolver: zodResolver(formSchema),
  });
  const { updateStudentsLoading, updateStudentsError } = useSelector(
    (state: RootState) => state.students,
  );
  const { selectedStudents, getStudentsByIdLoading, getStudentsByIdError } =
    useSelector((state: RootState) => state.students);
  const onSubmit: SubmitHandler<STUDENT_CREATE> = (data) => {
    const newData = {
      ...data,
      age: parseInt(data.age.toString()),
      houseNo: data.houseNo.toString(),
      kebele: data.kebele.toString(),
    };

    dispatch(updateStudents({ id: id, studentsData: newData })).then(
      (data) => {},
    );
  };
  useEffect(() => {
    try {
      if (!getStudentsByIdLoading) {
        methods.reset({
          first_name: selectedStudents?.student?.first_name.toString(),
          middle_name: selectedStudents?.student?.middle_name.toString(),
          last_name: selectedStudents?.student?.last_name.toString(),
          phone_number: selectedStudents?.student?.phone_number.toString(),
          department: selectedStudents?.student?.department.toString(),
          // father_name: data.payload?.student?.father_name.toString(),
          // father_phone: data.payload?.student?.father_phone.toString(),
          sex: selectedStudents?.student?.sex.toString(),
          age: selectedStudents?.student?.age,

          nationality: selectedStudents?.student?.nationality.toString(),
          subcity: selectedStudents?.student?.subcity.toString(),
          houseNo: selectedStudents?.student?.houseNo.toString(),
          kebele: selectedStudents?.student?.kebele.toString(),
          prev_school: selectedStudents?.student?.prev_school.toString(),
          // status: data.payload?.student?.status.toString(),
        });
      }
    } catch (err: any) {
      console.log("err", err);
    }
  }, [id, methods, getStudentsByIdLoading]);
  return (
    <>
      {/* <div className="flex w-full  bg-white p-5 text-black dark:bg-boxdark dark:text-white"> */}
      <div>
        <FormProvider {...methods}>
          <div className="container mx-auto mt-0">
            <div className="w-full">
              <div className="p-0">
                {/* <hr className="mb-4 mt-4 w-full text-lg font-normal text-normalGray " /> */}
                <div className="w-full">
                  <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className="p-fluid"
                  >
                    <div className="w-full  bg-white p-5 text-black dark:bg-boxdark dark:text-white">
                      <h6 className="text-gray-700 mb-5 w-full text-lg font-normal ">
                        {t("students.personalInformation")}
                      </h6>
                      <div className="xs:flex xs:flex-column gap-5 sm:flex sm:flex-row">
                        <div className="mb-3 w-full ">
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
                      </div>
                      <div className="xs:flex xs:flex-column gap-5 sm:flex sm:flex-row">
                        <div className="mb-3 w-full">
                          <InputString
                            type="text"
                            name="last_name"
                            label={t("students.lastName")}
                            placeholder={t("ex bogale")}
                          />
                        </div>

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
                      </div>
                      <div className="xs:flex xs:flex-column gap-5 sm:flex sm:flex-row">
                        {/* <div className="mb-3 w-full">
                        <InputString
                          type="text"
                          name="father_name"
                          label={t("students.fatherName")}
                          placeholder={t("ex Getachew")}
                        />
                      </div> */}
                        {/* <div className="mb-3 w-full">
                        <InputString
                          type="text"
                          name="father_phone"
                          label={t("students.fatherPhone")}
                          placeholder={t("ex 0912345678")}
                        />
                      </div> */}
                      </div>
                      <div className="xs:flex xs:flex-column gap-5 sm:flex sm:flex-row">
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
                    </div>

                    <div className="mt-7 w-full  bg-white p-5 text-black dark:bg-boxdark dark:text-white">
                      <h6 className="text-gray-700 mb-5 w-full text-lg font-normal ">
                        {t("students.contact")}
                      </h6>

                      <div className="xs:flex xs:flex-column gap-5 sm:flex sm:flex-row">
                        <div className="mb-3 w-full">
                          <InputString
                            type="text"
                            name="phone_number"
                            label={t("students.phoneNumber")}
                            placeholder={t("ex 0912345678")}
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

                      <div className="xs:flex xs:flex-column gap-5 sm:flex sm:flex-row">
                        <div className="mb-3 w-full">
                          <InputString
                            type="text"
                            name="subcity"
                            label={t("students.subcity")}
                            placeholder={t("ex Addis Ababa")}
                          />
                        </div>

                        <div className="mb-3 w-full">
                          <InputNumber
                            name="houseNo"
                            label={t("students.houseNo")}
                            placeholder={t("ex 123")}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-7 w-full  bg-white p-5 text-black dark:bg-boxdark dark:text-white">
                      <h6 className="text-gray-700 mb-5 w-full text-lg font-normal ">
                        {t("students.schoolInfo")}
                      </h6>
                      <div className="xs:flex xs:flex-column gap-5 sm:flex sm:flex-row">
                        <div className="mb-3 w-full">
                          <InputString
                            type="text"
                            name="prev_school"
                            label={t("students.prevSchool")}
                            placeholder={t("ex Addis Ababa")}
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
                      <div className="xs:flex xs:flex-column gap-5 sm:flex sm:flex-row">
                        <div className="mb-3 w-full">
                          <InputString
                            type="text"
                            name="department"
                            label={t("students.department")}
                            placeholder={t("ex computer science")}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <CommonButton
                        loading={updateStudentsLoading}
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

export default PersonalInfo;
