"use client";
import React, { useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { t } from "@/utils/translation";
import { Stepper, Step, StepLabel, Button } from "@mui/material";
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
import StudentInfoForm from "./studentInfoForm";
import ParentInfoFrom from "./parentInfo";
import { STUDENT_CREATE } from "@/store/features/students/type";

const studentInfoSchema = z.object({
  student_photo: z.any(),
  first_name: z.string().min(1, "First name is required"),
  middle_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  phone_number: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
  // houseNo: z.string().min(1, "House number is required"),
  houseNo: z
    .number()
    .int()
    .positive()
    .max(100000000, "House number must be less than or equal to 100000000"),
  kebele: z
    .number()
    .int()
    .positive()
    .max(120, "Age must be less than or equal to 120"),
  department: z.string().min(1, "First name is required"),
  sex: z.enum(["Male", "Female", "Other"]),
  nationality: z.string().min(1, "Nationality is required"),
  prev_school: z.string().min(1, "Previous school is required"),
  subcity: z.string().min(1, "Sub city is required"),
  age: z
    .number()
    .int()
    .positive()
    .max(120, "Age must be less than or equal to 120"),
  section_id: z.string().min(1, "Section is required"),
});
const parentInfoSchema = z.object({
  father_name: z.string().min(1, "Father's name is required"),
  father_phone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
  father_occupation: z.string().min(1, "Father's occupation is required"),
  father_literacy_level: z
    .string()
    .min(1, "Father's literacy level is required"),
  mother_name: z.string().min(1, "Mother's name is required"),
  mother_phone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
  mother_occupation: z.string().min(1, "Mother's occupation is required"),
  mother_literacy_level: z
    .string()
    .min(1, "Mother's literacy level is required"),
});


const formSchema = studentInfoSchema.merge(parentInfoSchema);

const AddStudent = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { createStudentsLoading, createStudentsError } = useSelector(
    (state: RootState) => state.students,
  );
  const [activeStep, setActiveStep] = useState(0);
  const methods = useForm<STUDENT_CREATE>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });
  console.log("methods", methods.formState.errors);
  const steps = ["Student Information", "Parent Information"];
  const stepSchemas = [studentInfoSchema, parentInfoSchema];

  const handleNext = async () => {
    const isValid = await methods.trigger(
      Object.keys(stepSchemas[activeStep].shape) as any,
    );
    if (isValid) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onSubmit: SubmitHandler<STUDENT_CREATE> = (data) => {
    const newData = {
      ...data,
      age: parseInt(data.age.toString()),
      houseNo: data.houseNo.toString(),
      kebele: data.kebele.toString(),
    };

    dispatch(createStudents({ studentsData: newData })).then((data) => {
      // toggleDrawer(false);
    });
  };

  return (
    <>
      <div className="flex w-full bg-white p-10 text-black dark:bg-boxdark dark:text-white">
        <FormProvider {...methods}>
          <div className="container mx-auto mt-0">
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel>
                    <h6
                      className={`text-sm ${activeStep === index ? "text-primary-500 font-semibold dark:text-white" : "text-gray-500 dark:text-gray-400 dark:text-normalGray"}`}
                    >
                      {label}
                    </h6>{" "}
                    {/* {label} */}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
            <div className="mt-8">
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="p-fluid"
              >
                {activeStep === 0 && <StudentInfoForm />}
                {activeStep === 1 && <ParentInfoFrom />}

                <div className="mt-4 flex justify-between">
                  <Button disabled={activeStep === 0} onClick={handleBack}>
                    Back
                  </Button>
                  {activeStep === steps.length - 1 ? (
                    <CommonButton
                      loading={createStudentsLoading}
                      label={t("year.submit")}
                      // type="submit"
                    />
                  ) : (
                    <Button onClick={handleNext}>Next</Button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </FormProvider>
      </div>
    </>
  );
};

export default AddStudent;
