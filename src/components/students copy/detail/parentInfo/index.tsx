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
  FileDropzone,
} from "@/common/formElements";
import { useRouter } from "next/navigation";
import { RootState, AppDispatch } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { updateStudents } from "@/store/features/students/studentsSlice";
import { STUDENT_CREATE } from "@/store/features/students/type";
const formSchema = z.object({
  father_name: z.string().min(1, "Father's name is required"),
  father_phone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
});

interface ParentInfoProps {
  id: string | number | null;
}
const ParentInfo: React.FC<ParentInfoProps> = ({ id }) => {
  const router = useRouter();

  const dispatch: AppDispatch = useDispatch();
  const methods = useForm<STUDENT_CREATE>({
    resolver: zodResolver(formSchema),
  });

  const { createStudentsLoading, createStudentsError } = useSelector(
    (state: RootState) => state.students,
  );
  const { selectedStudents, getStudentsByIdLoading, getStudentsByIdError } =
    useSelector((state: RootState) => state.students);

  const onSubmit: SubmitHandler<STUDENT_CREATE> = (data) => {
    dispatch(updateStudents({ id: id, studentsData: data })).then((data) => {});
  };
  useEffect(() => {
    try {
      if (!getStudentsByIdLoading) {
        methods.reset({
          father_name: selectedStudents?.parent?.father_name,
          father_phone: selectedStudents?.parent?.father_phone,
          father_literacy_level:
            selectedStudents?.parent?.father_literacy_level,
          father_occupation: selectedStudents?.parent?.father_occupation,
          father_photo: selectedStudents?.parent?.father_photo,
          mother_name: selectedStudents?.parent?.mother_name,
          mother_phone: selectedStudents?.parent?.mother_phone,
          mother_occupation: selectedStudents?.parent?.mother_occupation,
          mother_photo: selectedStudents?.parent?.mother_photo,
          mother_literacy_level:
            selectedStudents?.parent?.mother_literacy_level,
        });
      }
    } catch (err: any) {
      console.log("err", err);
    }
  }, [id, methods]);
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
                        {t("students.fatherInfo")}
                      </h6>

                      <div className="xs:w-full mb-3 sm:w-1/2">
                        <FileDropzone
                          name="father_photo"
                          label={t("students.fatherPhoto")}
                        />
                      </div>
                      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                        <div className="mb-3 w-full">
                          <InputString
                            type="text"
                            name="father_name"
                            label={t("students.father_name")}
                            placeholder={t("ex Getachew Bogale")}
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
                        <div className="mb-3 w-full">
                          <InputString
                            type="text"
                            name="father_occupation"
                            label={t("students.fatherOccupation")}
                            placeholder={t("ex Teacher")}
                          />
                        </div>

                        <div className="mb-3 w-full">
                          <SelectInput
                            name="father_literacy_level"
                            label={t("students.fatherLiteracyLevel")}
                            placeholder={t("students.selectLiteracyLevel")}
                            options={[
                              { value: "Primary", label: t("common.primary") },
                              {
                                value: "Secondary",
                                label: t("common.secondary"),
                              },
                              {
                                value: "Tertiary",
                                label: t("common.tertiary"),
                              },
                            ]}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="w-full  bg-white p-5 text-black dark:bg-boxdark dark:text-white">
                      <div className="mb-5 flex items-center">
                        <h6 className="text-gray-700 mr-4 text-lg font-normal">
                          {t("students.motherInfo")}
                        </h6>
                        <hr className="flex-grow text-normalGray" />
                      </div>
                      <div className="xs:w-full mb-3 sm:w-1/2">
                        <FileDropzone
                          name="mother_photo"
                          label="Mother Photo"
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                        <div className="mb-3 w-full">
                          <InputString
                            type="text"
                            name="mother_name"
                            label={t("students.motherName")}
                            placeholder={t("ex Getachew")}
                          />
                        </div>
                        <div className="mb-3 w-full">
                          <InputString
                            type="text"
                            name="mother_phone"
                            label={t("students.motherPhone")}
                            placeholder={t("ex 0912345678")}
                          />
                        </div>

                        <div className="mb-3 w-full">
                          <InputString
                            type="text"
                            name="mother_occupation"
                            label={t("students.occupation")}
                            placeholder={t("ex Teacher")}
                          />
                        </div>

                        <div className="mb-3 w-full">
                          <SelectInput
                            name="mother_literacy_level"
                            label={t("students.motherLiteracyLevel")}
                            placeholder={t("students.selectLiteracyLevel")}
                            options={[
                              { value: "Primary", label: t("common.primary") },
                              {
                                value: "Secondary",
                                label: t("common.secondary"),
                              },
                              {
                                value: "Tertiary",
                                label: t("common.tertiary"),
                              },
                            ]}
                          />
                        </div>
                      </div>
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

export default ParentInfo;
