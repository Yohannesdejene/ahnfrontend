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
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { FaLock } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { MuiOtpInput } from "mui-one-time-password-input";
import { RiMessage2Line } from "react-icons/ri";
import { apiSignIn, forgetPassword, verifyOtp } from "@/services/AuthService";
import {
  getEmailInfo,
  setTemporaryToken,
  deleteTempEmailSession,
} from "@/utils/sessionManager";
// Define the form schema with Zod

const schema = z.object({
  otp: z.string().length(6, "OTP must be exactly 6 characters long"),
});

// Define the form data type
type FormData = {
  otp: string;
};
const VerifyOptCode: React.FC = () => {
  const router = useRouter();

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
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setErrorMessage("");
    event.preventDefault(); // Prevent default form submission
    if (value.length < 8) {
      alert("fill 8 digit value ");
      return;
    }
    setLoading(true);
    if (value.length === 8) {
      try {
        const email = getEmailInfo();
        // const { email, password } = values;
        const requestBody = {
          email: email ? email : "",
          otp: value,
        };
        const res = await verifyOtp(requestBody);
        console.log("res", res);
        if (res?.status == 200) {
          const userToken = res?.data?.token || "";
          setTemporaryToken(userToken);
          deleteTempEmailSession();
          toast.success(res?.data?.message || "Otp  verified successfully ");
          setTimeout(() => {
            router.push("/auth/set-password");
            // window.location.replace("/auth/change-password");
          }, 200);
        } else {
          console.log("else ");
          setErrorMessage(
            res?.data?.message || "something went wrong  nn, try again ",
          );
        }
      } catch (errors: any) {
        console.log("error", errors);
        setErrorMessage(
          errors?.response?.data?.message ||
            "something went wrong , try again ",
        );
      } finally {
        setLoading(false);
      }
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
            style={{
              background: "linear-gradient(to top, #109101, #ffffff)", // Replace with your colors
            }}
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
            {/* <div className="mr-10 mt-4 self-end">
              <DarkModeSwitcher />
            </div> */}
            <div className="flex flex-grow items-center justify-center">
              <div className="w-full max-w-lg p-8">
                <div className="mb-6 flex  items-center justify-center gap-2">
                  <Image
                    className="dark:block"
                    src={"/images/logo/ahunlogo.jpg"}
                    alt="Logo"
                    // width={40}
                    // height={50}
                    width={200}
                    height={250}
                  />
                  {/* <h6 className="text-lg font-bold text-primary">Alphatech</h6> */}
                </div>
                <div className="mb-2  flex  items-center gap-2">
                  <h2 className=" text-title-lg  font-bold text-black dark:text-white sm:text-title-sm">
                    Verify OTP code
                  </h2>

                  <RiMessage2Line className="text-goldon" />
                </div>
                <h2 className="mb-4 text-title-xsm1  text-black dark:text-white">
                  We have sent 8 digit verification code to your email , Enter
                  the code in to the field below
                </h2>
                {errorMessage ? (
                  <div className="mb-5 mt-2">
                    <Alert severity="error">{errorMessage}</Alert>
                  </div>
                ) : (
                  ""
                )}
                <form onSubmit={handleSubmit}>
                  <div className="mb-5 mt-2">
                    <MuiOtpInput
                      value={value}
                      onChange={handleChange}
                      onComplete={handleComplete}
                      length={8}
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

export default VerifyOptCode;
