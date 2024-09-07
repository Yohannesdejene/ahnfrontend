"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch } from "react-redux";
import Alert from "@mui/material/Alert";
import { InputString, Button } from "@/common/formElements";
import DarkModeSwitcher from "@/components/Header/DarkModeSwitcher";

import { loginSuccess, logout } from "@/store/actions";
import { RootState } from "@/store/store";
import { apiSignIn } from "@/services/AuthService";
import {
  getSessionKey,
  setSessionKey,
  setTemporaryToken,
} from "@/utils/sessionManager";
import { showToast } from "@/common/toast";
import { toast } from "react-toastify";

// Define the form schema with Zod
const formSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
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

      const { status, message, email, isPasswordChanged, token } = res?.data;
      if (status == 200) {
        if (isPasswordChanged === true) {
          dispatch(loginSuccess(token));
          const res_0 = setSessionKey({
            userToken: token,
          });
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
          setTemporaryToken( {userToken: token});
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
        <div className="flex h-full w-full ">
          <div className="hidden h-full xl:block xl:w-1/2">
            <div className="flex h-full flex-col justify-center px-26 py-0 text-center">
              <Link className="mb-5.5 inline-block" href="#">
                <Image
                  className="dark:block"
                  src={"/images/logo.png"}
                  alt="Logo"
                  width={400}
                  height={300}
                />
              </Link>
              <p className="text-xlg 2xl:px-20">
                HudHud Express is a leading provider of courier, logistics,
                supply chain management, and freight transportation solutions.
              </p>
            </div>
          </div>

          <div className=" h-full w-full items-center justify-center border-l-2 border-stroke dark:border-strokedark xl:w-1/2">
            <div className=" float-right mr-10 mt-5">
              <DarkModeSwitcher />
            </div>
            <div className=" mt-20 w-full max-w-lg  p-8 ">
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Sign In to HudHud Express
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
                    <InputString type="email" name="email" label="Email" />
                  </div>
                  <div className="mb-3">
                    <InputString
                      type="password"
                      name="password"
                      label="Password"
                    />
                  </div>

                  <div className="mb-4">
                    <Button loading={loading} label="Submit" />
                  </div>
                </form>
              </FormProvider>
              <div className=" mt-6 w-full text-center">
                <p>
                  Don’t have any account?{" "}
                  <Link href="/auth/signup" className="text-primary">
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
