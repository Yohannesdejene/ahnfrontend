"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch } from "react-redux";
import Alert from "@mui/material/Alert";
import { InputString, CommonButton, SelectInput } from "@/common/formElements";
import DarkModeSwitcher from "@/components/Header/DarkModeSwitcher";

import { loginSuccess, logout } from "@/store/actions";
import { RootState } from "@/store/store";
import { apiSignIn } from "@/services/AuthService";
import {
  getSessionKey,
  setSessionKey,
  setTemporaryToken,
} from "@/utils/sessionManager";

import { toast } from "react-toastify";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

import { Button } from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
//icons
import { FaLock } from "react-icons/fa6";
import { FaSchool } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";
import { FaChevronRight } from "react-icons/fa";

const departmentOptions = [
  { value: "Maths ", label: "Maths" },
  { value: "English", label: "English" },
  { value: "Amharic", label: "Amharic" },
  { value: "Physics", label: "Physics" },
];
const regionOption = [
  { value: "Amhara  ", label: "Amhara" },
  { value: "Oromia", label: "Oromia" },
  { value: "Tigray", label: "Tigray" },
  { value: "Addis Ababa", label: "Addis Ababa" },
];
// Define the form schema with Zod
const formSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
type FormData = z.infer<typeof formSchema>;
const AdminFrom = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const onSignIn = async (values: any) => {
    setErrorMessage(null);
    setLoading(true);
    try {
      // const { email, password } = values;
      const res = await apiSignIn(values);

      const { status, message, email, isPasswordChanged, token } = res?.data;
      if (status == 200) {
        if (isPasswordChanged === true) {
          dispatch(loginSuccess(token));
          const res_0 = setSessionKey(token);
          if (res_0) {
            toast.success("Logged in successfully ");
            setTimeout(() => {
              window.location.replace("/");
            }, 500);
          } else {
            throw new Error("Failed to login, please try again");
          }
        } else {
          toast.success("Logged in successfully,change password");
          // showToast("Logged in successfully,change password", "success");
          setTemporaryToken({ userToken: token });
          setTimeout(() => {
            window.location.replace("/auth/change-password");
          }, 300);
        }
      } else {
        setErrorMessage("Email or password invalid try again ");
      }
    } catch (errors) {
      console.log("errors", errors);
      setErrorMessage("Email or password invalid try again ");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    onSignIn(data);
  };
  return (
    <FormProvider {...methods}>
      {errorMessage ? (
        <div className="mb-5 mt-2">
          <Alert severity="error">{errorMessage}</Alert>
        </div>
      ) : (
        ""
      )}
      <div>
        {" "}
        <h2 className="mb-2 text-title-lg  font-bold text-black dark:text-white sm:text-title-sm">
          Super Admin Information
        </h2>
        {/* <FaLock className="text-goldon" /> */}
        <h2 className="mb-5 text-title-xsm1  text-black dark:text-white">
          Enter your Super Admin details
        </h2>
      </div>
      <div className="mb-2    items-center gap-0">
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="p-fluid" // PrimeReact class for fluid layout
        >
          <div className="column lg:row gap-5 lg:flex ">
            <div className="w-full">
              <div className="mb-2 ">
                <InputString
                  type="text"
                  name="firstName"
                  label="First Name"
                  placeholder="ex abebe"
                />
              </div>

              <div className="mb-2 ">
                <InputString
                  type="text"
                  name="lastName"
                  label="Last Name"
                  placeholder="ex kebede"
                />
              </div>
              <div className="mb-2 ">
                <InputString
                  type="text"
                  name="nationality"
                  label="Nationality"
                  placeholder="ex Ethiopian"
                />
              </div>
            </div>
            <div className="w-full">
              <div className="mb-2">
                <InputString
                  type="text"
                  name="middleName"
                  label="Middle Name"
                  placeholder="ex chala"
                />
              </div>

              <div className="mb-2 ">
                <SelectInput
                  options={departmentOptions}
                  name="department"
                  label="Department"
                  loading={false}
                  placeholder="Select"
                />
              </div>

              <div className="mb-2 ">
                <InputString
                  type="text"
                  name="educationalLevel"
                  label="Educational Level"
                  placeholder="Degree"
                />
              </div>
            </div>
          </div>
          <div className="mb-0 w-full">
            <CommonButton loading={loading} label="Submit" />
          </div>
        </form>
      </div>
    </FormProvider>
  );
};
const SchoolFrom = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const onSignIn = async (values: any) => {
    setErrorMessage(null);
    setLoading(true);
    try {
      // const { email, password } = values;
      const res = await apiSignIn(values);

      const { status, message, email, isPasswordChanged, token } = res?.data;
      if (status == 200) {
        if (isPasswordChanged === true) {
          dispatch(loginSuccess(token));
          const res_0 = setSessionKey(token);
          if (res_0) {
            toast.success("Logged in successfully ");
            setTimeout(() => {
              window.location.replace("/");
            }, 500);
          } else {
            throw new Error("Failed to login, please try again");
          }
        } else {
          toast.success("Logged in successfully,change password");
          // showToast("Logged in successfully,change password", "success");
          setTemporaryToken({ userToken: token });
          setTimeout(() => {
            window.location.replace("/auth/change-password");
          }, 300);
        }
      } else {
        setErrorMessage("Email or password invalid try again ");
      }
    } catch (errors) {
      console.log("errors", errors);
      setErrorMessage("Email or password invalid try again ");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    onSignIn(data);
  };
  return (
    <FormProvider {...methods}>
      {errorMessage ? (
        <div className="mb-5 mt-2">
          <Alert severity="error">{errorMessage}</Alert>
        </div>
      ) : (
        ""
      )}
      <div>
        {" "}
        <h2 className="mb-2 text-title-lg  font-bold text-black dark:text-white sm:text-title-sm">
          School Information
        </h2>
        {/* <FaLock className="text-goldon" /> */}
        <h2 className="mb-5 text-title-xsm1  text-black dark:text-white">
          Enter your school detail
        </h2>
      </div>
      <div className="mb-2    items-center gap-0">
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="p-fluid" // PrimeReact class for fluid layout
        >
          <div className="column lg:row gap-5 lg:flex ">
            <div className="w-full">
              <div className="mb-2 ">
                <InputString
                  type="text"
                  name="name"
                  label="Name"
                  placeholder="ex Sanete"
                />
              </div>

              <div className="mb-2 ">
                <SelectInput
                  options={regionOption}
                  name="region"
                  label="Region"
                  loading={false}
                  placeholder="select"
                />
              </div>
              <div className="mb-2 ">
                <InputString
                  type="text"
                  name="address"
                  label="Address"
                  placeholder="ex addis ababa"
                />
              </div>
              <div className="mb-2 ">
                <InputString
                  type="date"
                  name="establishedDate"
                  label="Established Date"
                  placeholder="ex 2024"
                />
              </div>
            </div>
            <div className="w-full">
              <div className="mb-2 ">
                <InputString
                  type="text"
                  name="city"
                  label="City"
                  placeholder="ex Addis ababa"
                />
              </div>

              <div className="mb-2 ">
                <InputString
                  type="text"
                  name="email"
                  label="Email"
                  placeholder="ex test@gmail.com"
                />
              </div>
            </div>
          </div>
          <div className="mb-0 w-full">
            <CommonButton loading={loading} label="Submit" />
          </div>
        </form>
      </div>
    </FormProvider>
  );
};
const Signup: React.FC = () => {
  const theme = useTheme();
  const steps = [
    {
      label: (
        <div>
          {" "}
          <h2 className="mb-3 text-title-lg  font-bold text-black dark:text-white sm:text-title-sm">
            School Information
          </h2>
          {/* <FaLock className="text-goldon" /> */}
          <h2 className="mb-7 text-title-xsm1  text-black dark:text-white">
            Enter your school detail
          </h2>
        </div>
      ),
      value: <SchoolFrom />,
      description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
    },
    {
      label: (
        <div>
          {" "}
          <h2 className="mb-3 text-title-lg  font-bold text-black dark:text-white sm:text-title-sm">
            Super Admin Information
          </h2>
          {/* <FaLock className="text-goldon" /> */}
          <h2 className="mb-7 text-title-xsm1  text-black dark:text-white">
            Enter your super admin details
          </h2>
        </div>
      ),
      value: <AdminFrom />,
      description:
        "An ad group contains one or more ads which target a shared set of keywords.",
    },
  ];

  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = steps.length;
  const [school, setSchool] = useState(false);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <div
        className=" flex  items-center justify-center bg-white text-black  dark:bg-boxdark dark:text-white   sm:h-full             md:h-screen 
"
      >
        <div className="md-h-screen flex w-full sm:h-full ">
          <div
            className="  hidden h-screen items-center justify-center  xl:block xl:w-1/3 "
            style={{
              background: "linear-gradient(to top, #0097B2, #ffffff)", // Replace with your colors
            }}
          >
            <div className="flex flex-col items-center justify-center px-26 py-0 text-center">
              <Link className="mb-5.5 mt-10 inline-block" href="#">
                <Image
                  className="dark:block"
                  src={"/images/auth-images/show.png"}
                  alt="Logo"
                  width={350}
                  height={300}
                />
              </Link>
            </div>
          </div>

          <div className="flex h-screen w-full flex-col border-l-2 border-stroke dark:border-strokedark xl:w-3/4">
            <div className="mr-10 mt-0 self-end">
              <DarkModeSwitcher />
            </div>
            <div className="flex flex-grow items-center justify-center">
              <div className="max-w-xlg w-full pl-3 pr-5 lg:pl-36 lg:pr-36">
                <div className="lg:row column  block justify-between lg:flex">
                  <div className="mb-6 mr-12 flex w-1/2 items-center justify-between">
                    <div className="flex gap-3">
                      <FaSchool className="h-10 w-10 text-primary" />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                        }}
                      >
                        <h6
                          style={{ fontSize: "13px" }}
                          className="text-title-xsm font-bold text-black dark:text-white"
                        >
                          School Data
                        </h6>
                        <p
                          style={{ fontSize: "10px" }}
                          className="text-title-xxxs text-black dark:text-white"
                        >
                          School details
                        </p>
                      </div>
                    </div>
                    <button
                      className="ml-auto"
                      onClick={() => {
                        setSchool(true);
                      }}
                    >
                      <FaChevronRight />
                    </button>
                  </div>
                  <div className="mb-4 flex w-1/2 items-center justify-between">
                    <div className="flex gap-3">
                      <RiAdminLine className="h-10 w-10 text-primary" />{" "}
                      <div>
                        <h6
                          style={{ fontSize: "13px" }}
                          className="text-xsm font-bold text-black dark:text-white"
                        >
                          Super admin data
                        </h6>
                        <h6
                          style={{ fontSize: "11px" }}
                          className="text-xsm1  text-black dark:text-white"
                        >
                          Enter super admin data
                        </h6>
                      </div>
                    </div>
                    <button
                      className="ml-auto"
                      onClick={() => {
                        setSchool(false);
                      }}
                    >
                      <FaChevronRight />
                    </button>
                  </div>
                </div>
                {school ? <SchoolFrom /> : <AdminFrom />}

                {/* 
                <div className="mt-0 w-full ">
                  <h1>{steps[activeStep].label}</h1>

                  <Box sx={{ height: "auto", width: "100%", p: 0 }}>
                    {steps[activeStep].value}
                  </Box>
                  <MobileStepper
                    variant="text"
                    steps={maxSteps}
                    position="static"
                    activeStep={activeStep}
                    nextButton={
                      <Button
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === maxSteps - 1}
                      >
                        Next
                        {theme.direction === "rtl" ? (
                          <KeyboardArrowLeft />
                        ) : (
                          <KeyboardArrowRight />
                        )}
                      </Button>
                    }
                    backButton={
                      <Button
                        size="small"
                        onClick={handleBack}
                        disabled={activeStep === 0}
                      >
                        {theme.direction === "rtl" ? (
                          <KeyboardArrowRight />
                        ) : (
                          <KeyboardArrowLeft />
                        )}
                        Back
                      </Button>
                    }
                  />
                </div> */}
                <div className="mt-6 w-full text-center">
                  <p>
                    Already have account?{" "}
                    <Link href="/auth/login" className=" text-primary">
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
