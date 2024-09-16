"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch } from "react-redux";
import Alert from "@mui/material/Alert";
import { InputString, CommonButton } from "@/common/formElements";
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
import { FaLock } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { MuiOtpInput } from "mui-one-time-password-input";
import { RiMessage2Line } from "react-icons/ri";

// Define the form schema with Zod

const schema = z.object({
  otp: z.string().length(6, "OTP must be exactly 6 characters long"),
});

// Define the form data type
type FormData = {
  otp: string;
};
const TwoStepVerification: React.FC = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [value, setValue] = React.useState<string>("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (otpValue: string) => {
    setValue(otpValue);
    const nextInputIndex = otpValue.length; // Get the next input index
    if (inputRefs.current[nextInputIndex]) {
      inputRefs.current[nextInputIndex]?.focus(); // Focus on the next input
    }
  };



  const handleComplete = (finalValue: string) => {
    fetch("...");
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
    if (value.length < 6) {
      return alert("fill 6 digit value ");
    }
    if (value.length === 6) {
      // Ensure all fields are filled
      setLoading(true);
      console.log("Submitted OTP: ", value);
      // Add your submission logic here (e.g., API call)
      // After submission, reset loading state
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className=" flex  h-screen items-center justify-center  bg-white text-black   dark:bg-boxdark             dark:text-white 
"
      >
        <div className="flex h-screen w-full ">
          <div
            className="hidden h-screen  items-center justify-center bg-whitishPrimary dark:bg-boxdark    xl:block xl:w-1/2"
            // style={{
            //   background: "linear-gradient(to top, #0097B2, #ffffff)", // Replace with your colors
            // }}
          >
            <div className="flex flex-col items-center justify-center px-26 py-0 text-center">
              <Link className="mb-5.5 mt-10 inline-block" href="#">
                <Image
                  className="dark:block"
                  src={"/images/auth-images/twostepverification.png"}
                  alt="Logo"
                  width={350}
                  height={300}
                />
              </Link>
            </div>
          </div>

          <div className="flex h-screen w-full flex-col border-l-2 border-stroke dark:border-strokedark xl:w-1/2">
            <div className="mr-10 mt-4 self-end">
              <DarkModeSwitcher />
            </div>
            <div className="flex flex-grow items-center justify-center">
              <div className="w-full max-w-lg p-8">
                <div className="mb-6 flex  items-center gap-2">
                  <Image
                    className="dark:block"
                    src={"/images/logo.png"}
                    alt="Logo"
                    width={40}
                    height={50}
                  />
                  <h6 className="text-lg font-bold text-primary">Alphatech</h6>
                </div>
                <div className="mb-2  flex  items-center gap-2">
                  <h2 className=" text-title-lg  font-bold text-black dark:text-white sm:text-title-sm">
                    Two step verification{" "}
                  </h2>

                  <RiMessage2Line className="text-goldon" />
                </div>
                <h2 className="mb-4 text-title-xsm1  text-black dark:text-white">
                  We have sent verification code to your mobile , Enter the code
                  from your mobile to the field below
                </h2>

                <form onSubmit={handleSubmit}>
                  <div className="mb-5 mt-2">
                    {/* <MuiOtpInput
                      value={value}
                      onChange={handleChange}
                      onComplete={handleComplete}
                      length={6}
                      autoFocus
                      validateChar={(character, index) => true}
                      inputRef={(el) => (inputRefs.current[index] = el)} // Set ref for each input
                    /> */}
                    <MuiOtpInput
                      value={value}
                      onChange={handleChange}
                      onComplete={handleComplete}
                      length={6}
                      autoFocus
                      validateChar={(character: string, index: number) => true}
                    />
                  </div>
                  <div className="mb-4">
                    <CommonButton
                      loading={loading}
                      label="Submit"
                      // disabled={value.length < 6}
                    />
                  </div>
                </form>
                <div className="mt-6 w-full text-center ">
                  <div className="item-center flex justify-center gap-2">
                    <IoIosArrowBack className="mt-1  text-primary" />{" "}
                    <Link href="/auth/login" className="  text-primary">
                      Back to login{" "}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TwoStepVerification;
