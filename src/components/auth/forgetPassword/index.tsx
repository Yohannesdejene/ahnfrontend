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
import { useRouter } from "next/navigation";
import DarkModeSwitcher from "@/components/Header/DarkModeSwitcher";
import { loginSuccess, logout } from "@/store/actions";
import { RootState } from "@/store/store";
import { apiSignIn, forgetPassword } from "@/services/AuthService";
import {
  getSessionKey,
  setSessionKey,
  setTemporaryToken,
  setEmailInfo,
} from "@/utils/sessionManager";
import { toast } from "react-hot-toast";
import { FaLock } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";

// Define the form schema with Zod
const formSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
});
type FormData = z.infer<typeof formSchema>;

const ForgetPassword: React.FC = () => {
  const router = useRouter();

  // Perform the redirect
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const onForget = async (values: any) => {
    setErrorMessage(null);
    setLoading(true);
    try {
      // const { email, password } = values;
      const res = await forgetPassword(values);
      console.log("res", res);
      if (res?.status == 200) {
        toast.success(res?.data?.message);
        console.log("values?.email", values?.email);
        setEmailInfo(values?.email);
        setTimeout(() => {
          router.push("/auth/verify-otp-code");
          // window.location.replace("/auth/change-password");
        }, 200);
      } else {
        setErrorMessage("something went wrong , try again ");
      }
    } catch (errors) {
      console.log("errors", errors);
      setErrorMessage("something went wrong , try again ");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    onForget(data);
  };

  return (
    <>
      <div
        className=" flex  h-screen items-center justify-center  bg-white text-black   dark:bg-boxdark             dark:text-white 
"
      >
        <div className="flex h-screen w-full ">
          <div
            className="hidden   h-screen items-center justify-center bg-whitishPrimary dark:bg-boxdark xl:block xl:w-1/2"
            style={{
              background: "linear-gradient(to top, #109101, #ffffff)", // Replace with your colors
            }}
            // background: "linear-gradient(to top, #109101, #ffffff)",
          >
            <div className="flex flex-col items-center justify-center px-26 py-0 text-center">
              <Link className="mb-5.5 mt-8 inline-block" href="#">
                <Image
                  className="dark:block"
                  src={"/images/auth-images/forgot.png"}
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
                <div className="mb-2 flex  items-center justify-center gap-2">
                  <Image
                    className="dark:block"
                    src={"/images/logo/ahunlogo.jpg"}
                    alt="Logo"
                    width={200}
                    height={250}
                    // width={40}
                    // height={50}
                  />
                  {/* <h6 className="text-lg font-bold text-primary">
                    Ahununu Express{" "}
                  </h6> */}
                </div>
                <div className="mb-2  flex  items-center gap-2">
                  <h2 className=" text-title-lg  font-bold text-black dark:text-white sm:text-title-sm">
                    Forgot Password
                  </h2>

                  <FaLock className="text-goldon" />
                </div>
                <h2 className="mb-4 text-title-xsm1  text-black dark:text-white">
                  Enter your email, and we will send you one time password to
                  reset your password
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
                        type="email"
                        name="email"
                        label="Email"
                        placeholder="ex test@gmail.com"
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

export default ForgetPassword;
