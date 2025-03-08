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

// Define the form schema with Zod
const formSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
type FormData = z.infer<typeof formSchema>;

const ResetPassword: React.FC = () => {
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
    <>
      <div
        className=" flex  h-screen items-center justify-center  bg-white text-black   dark:bg-boxdark             dark:text-white 
"
      >
        <div className="flex h-screen w-full ">
          <div
            className="flex  h-screen items-center justify-center bg-whitishPrimary dark:bg-boxdark xl:block xl:w-1/2"
            // style={{
            //   background: "linear-gradient(to top, #0097B2, #ffffff)", // Replace with your colors
            // }}
          >
            <div className="flex flex-col items-center justify-center px-26 py-0 text-center">
              <Link className="mb-5.5 mt-8  inline-block" href="#">
                <Image
                  className="dark:block"
                  src={"/images/auth-images/reset.png"}
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
                    Reset Password
                  </h2>

                  <FaLock className="text-goldon" />
                </div>
                <h2 className="mb-4 text-title-xsm1  text-black dark:text-white">
                  for yohannesdejene23@Gmail.com
                </h2>

                <FormProvider {...methods}>
                  {errorMessage ? (
                    <div className="mb-5 mt-2">
                      <Alert severity="error">{errorMessage}</Alert>
                    </div>
                  ) : (
                    ""
                  )}

                  <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className="p-fluid" // PrimeReact class for fluid layout
                  >
                    <div className="mb-3">
                      <InputString
                        type="password"
                        name="oldPassword"
                        label="Old Password"
                        placeholder="ex 1234"
                      />
                    </div>
                    <div className="mb-3">
                      <InputString
                        type="password"
                        name="newPassword"
                        label="New Password"
                        placeholder="ex 1234"
                      />
                    </div>

                    <div className="mb-4">
                      <CommonButton loading={loading} label="Submit" />
                    </div>
                  </form>
                </FormProvider>
                <div className="mt-6 w-full text-center ">
                  <div className="item-center flex justify-center gap-2">
                    <IoIosArrowBack className="mt-1 font-bold text-primary" />{" "}
                    <Link
                      href="/auth/login"
                      className="font-bold  text-primary"
                    >
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

export default ResetPassword;
