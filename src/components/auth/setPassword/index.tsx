"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { InputString, CommonButton } from "@/common/formElements";
import DarkModeSwitcher from "@/components/Header/DarkModeSwitcher";
import { useDispatch } from "react-redux";
import { loginSuccess, logout } from "@/store/actions";
import { RootState } from "@/store/store";
import { apiChangePasswordRequest } from "@/services/AuthService";
import { getTemporaryToken, setSessionKey } from "@/utils/sessionManager";
import { toast } from "react-toastify";
import Alert from "@mui/material/Alert";

// Define the form schema with Zod
const formSchema = z.object({
  oldPassword: z.string().min(6, "Password must be at least 6 characters"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
});
type FormData = z.infer<typeof formSchema>;

const SetPassword: React.FC = () => {
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
      const tempToken = getTemporaryToken();

      const res = await apiChangePasswordRequest(
        values,
        tempToken ? tempToken : "",
      );

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
          }
        } else {
          toast.success("Logged in successfully,change password");
          // showToast("Logged in successfully,change password", "success");
          // setTemporaryToken({ userToken: token });
          setTimeout(() => {
            window.location.replace("/");
          }, 300);
        }
      } else {
        setErrorMessage("Old password or new password invalid try again ");
      }
    } catch (errors) {
      console.log("errors", errors);
      setErrorMessage("Old password or new password invalid try again  ");
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
        className=" flex h-screen items-center justify-center  bg-white text-black   dark:bg-boxdark             dark:text-white 
"
      >
        <div className=" flex h-full w-full justify-center ">
          <div
            className="hidden   h-screen items-center justify-center bg-whitishPrimary dark:bg-boxdark xl:block xl:w-1/2"
            // style={{
            //   background: "linear-gradient(to top, #0097B2, #ffffff)", // Replace with your colors
            // }}
          >
            <div className="flex flex-col items-center justify-center px-26 py-0 text-center">
              <Link className="mb-5.5 mt-8 inline-block" href="#">
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
          <div className=" hidden  h-full w-full items-center justify-center xl:block  xl:w-1/2">
            <div className=" float-right mr-10 mt-5">
              <DarkModeSwitcher />
            </div>
            <div className=" mt-20 w-full max-w-lg  p-8 ">
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Set password
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
                      type="text"
                      name="newPassword"
                      label="New Password"
                      placeholder="ex type here"
                    />
                  </div>
                  <div className="mb-3">
                    <InputString
                      type="text"
                      name="confirmPassword"
                      label="Confirm Password"
                      placeholder="ex type here "
                    />
                  </div>
                  <div className="mb-4">
                    <CommonButton loading={loading} label="Submit" />
                  </div>
                </form>
              </FormProvider>
              <div className=" mt-6 w-full text-center">
                <p>
                  Back to sign in?{" "}
                  <Link href="/auth/login" className="text-primary">
                    Sign in
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

export default SetPassword;
