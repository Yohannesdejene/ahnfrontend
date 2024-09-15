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
  setUserInfo,
  setPermissionInfo,
} from "@/utils/sessionManager";
import toast from "react-hot-toast";
import { FaLock } from "react-icons/fa6";

// Define the form schema with Zod
const formSchema = z.object({
  username: z.string().min(1, "Username  is required"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});
type FormData = z.infer<typeof formSchema>;

const Login: React.FC = () => {
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
      const { user, permissions, token } = res;
      dispatch(loginSuccess(token));
      const res_0 = setSessionKey({
        userToken: token,
      });
      const user_0 = setUserInfo({
        user: user,
      });
      const perm_0 = setPermissionInfo({
        permission: permissions,
      });
      if (res_0 && user_0 && perm_0) {
        toast.success("Logged in successfully, redirecting.. ");
        setTimeout(() => {
          window.location.replace("/");
        }, 500);
      } else {
        throw new Error("Failed to login, please try again");
      }
    } catch (errors) {

      setErrorMessage(errors?.message);
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
            className="  hidden h-screen items-center justify-center  xl:block xl:w-1/2 "
            style={{
              background: "linear-gradient(to top, #0097B2, #ffffff)",
            }}
          >
            <div className="flex flex-col items-center justify-center px-26 py-0 text-center">
              <Link className="mb-5.5 mt-10 inline-block" href="#">
                <Image
                  className="dark:block"
                  src={"/images/auth-images/dashboard.png"}
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
                <div className="mb-3  flex  items-center gap-2">
                  <h2 className=" text-title-lg  font-bold text-black dark:text-white sm:text-title-sm">
                    Sign in
                  </h2>
                  <FaLock className="text-goldon" />
                </div>

                <FormProvider {...methods}>
                  {errorMessage ? (
                    <div className="mb-5 mt-2">
                      <Alert severity="error" className="rounded-lg ">
                        {errorMessage}
                      </Alert>
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
                        type="text"
                        name="username"
                        label="User Name"
                        placeholder=" ex johnabi"
                      />
                    </div>
                    <div className="mt-3 h-6 w-full">
                      <Link
                        href="/auth/forget-password"
                        className="float-right  text-primary"
                      >
                        Forgot password ?
                      </Link>
                    </div>
                    <div className="mb-3 w-full">
                      <InputString
                        type="password"
                        name="password"
                        label="Password"
                        placeholder=" ex #12372525"
                      />
                    </div>

                    <div className="mb-4 w-full">
                      <CommonButton loading={loading} label="Submit" />
                    </div>
                  </form>
                </FormProvider>
                <div className="mt-6 w-full text-center">
                  <p>
                    Don’t have any account?{" "}
                    <Link href="/auth/signup" className=" text-primary">
                      Sign Up
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

export default Login;
