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
import { updateStudents } from "@/store/features/students/studentsSlice";
import { STUDENT_CREATE } from "@/store/features/students/type";
const formSchema = z.object({
  father_name: z.string().min(1, "Father's name is required"),
  father_phone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
});

interface LoginHistoryProps {
  id: string | number | null;
}
const LoginHistory: React.FC<LoginHistoryProps> = ({ id }) => {
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
          // father_name: selectedStudents?.student?.father_name.toString(),
          // father_phone: selectedStudents?.student?.father_phone,
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
                        {t("students.loginHistory")}
                      </h6>
                      <div className="xs:flex xs:flex-column gap-5 sm:flex sm:flex-row">
                        <div className="mb-3 w-full">
                          <InputString
                            type="text"
                            name="username"
                            label={t("students.username")}
                            placeholder={t("ex Getachew")}
                          />
                        </div>
                        <div className="mb-3 w-full">
                          <InputString
                            type="password"
                            name="password"
                            label={t("students.password")}
                            placeholder={t("ex 123")}
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

export default LoginHistory;
