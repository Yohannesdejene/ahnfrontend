"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch } from "react-redux";
import Alert from "@mui/material/Alert";
import { FaCheck } from "react-icons/fa6";

import {
  InputString,
  CommonButton,
  EthiopianNumberInput,
} from "@/common/formElements";
import DarkModeSwitcher from "@/components/Header/DarkModeSwitcher";
// import { loginSuccess, saveUserInfo, logout } from "@/store/actions";
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
import { useRouter } from "next/navigation";
import { usePermission } from "@/context/PermissionContext";
// import { useAuth } from "@/context/AuthContext";
import {
  setUser,
  setToken,
  setPermissions,
  setLoggedIn,
  setAuthLoading,
} from "@/store/features/auth/authSlice";
function formatPermissions(permissions: any) {
  return permissions.map((permission: any) => ({
    name: permission.name,
    description: permission.description,
    code: permission.code,
    permissionType: permission.PermissionType.type,
  }));
}

const phoneRegex = /^[97]\d{8}$/; // Starts with 9 or 7 and has exactly 9 digits

// Define the form schema with Zod
const formSchema = z.discriminatedUnion("loginType", [
  z.object({
    loginType: z.literal("phone"),
    phone: z
      .string()
      .regex(
        phoneRegex,
        "Phone number must start with 9 or 7 and have exactly 9 digits",
      ),
    password: z.string().min(4, "Password must be at least 4 characters"),
  }),
  z.object({
    loginType: z.literal("email"),
    email: z.string().email("Invalid email"),
    password: z.string().min(4, "Password must be at least 4 characters"),
  }),
]);

type FormData = z.infer<typeof formSchema>;

const Login: React.FC = () => {
  // const { user, loggedIn, setUser, setLoggedIn } = useAuth();
  const [value, setValue] = useState("phone");
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // const methods = useForm<FormData>({
  //   resolver: zodResolver(formSchema),
  // });
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      loginType: "phone",
    },
  });

  const onSignIn = async (values: any) => {
    setErrorMessage(null);
    setLoading(true);
    try {
      // const { email, password } = values;
      if (values.phone) {
        values.phone = `251${values.phone}`;
      }
      const res = await apiSignIn(values);
      if (res?.status == 200) {
        const { user, token } = res?.data;
        const permission = formatPermissions(user?.Role?.Permissions);
        if (user?.userType == 1) {
          setTemporaryToken(token || "");
          toast.success("Logged in successfully, set  new password");
          router.push("/set-password");

          // setTimeout(() => {
          //   window.location.replace("/set-password");
          // }, 500);
        } else {
          dispatch(setUser(user));
          dispatch(setToken(token));
          dispatch(setLoggedIn(true));
          dispatch(setPermissions(permission));
          dispatch(setAuthLoading(false));
          const res_0 = setSessionKey(token);
          const user_0 = setUserInfo(user);
          const perm_0 = setPermissionInfo(permission);

          // console.log("permission-", permission);

          if (res_0 && user_0) {
            toast.success("Logged in successfully, redirecting.. ");
            router.push("/");

            // setTimeout(() => {
            //   window.location.replace("/");
            // }, 200);
          } else {
            throw new Error("Failed to login, please try again");
          }
        }
      } else {
        setErrorMessage("something went wrong , try again ");
      }
    } catch (errors: any) {
      console.log("errors-errors-errors", errors);
      let errorMessage;

      // Check if the error response exists and has a message
      if (errors.response) {
        // If there's a specific message in the response (common with Axios)
        errorMessage =
          errors.response.data?.message ||
          errors.response.statusText ||
          "An error occurred in the response";
      }
      // Handle general errors, such as network issues or other exceptions
      else if (errors.message) {
        errorMessage = errors.message; // Standard error message
      } else {
        errorMessage = "An unexpected error occurred";
      }

      setErrorMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    onSignIn(data);
  };

  return (
    <>
      <div className="flex  h-screen items-center justify-center  bg-white text-black   dark:bg-boxdark   dark:text-white">
        <div className="flex h-screen w-full ">
          <div
            className=" hidden h-screen items-center justify-center  xl:block xl:w-1/2 "
            style={{
              background: "linear-gradient(to top, #109101, #ffffff)",
            }}
          >
            {/* <div className="flex h-full flex-col justify-center px-26 py-0 text-center">
              <Link className="mb-5.5 inline-block" href="#">
              
              <h5 className="fs-bold text-title-xxl">Ahununu Express </h5>
              </Link>
              <p className="text-xlg 2xl:px-20">
                Welcome to Ahununu Trading PLC, your trusted partner for
                exceptional delivery services. At Ahununu Trading, we specialize
                in providing reliable and efficient delivery solutions to meet
                your business and personal needs.{" "}
              </p>
            </div> */}
          </div>

          <div className="flex h-screen w-full flex-col border-l-2 border-stroke dark:border-strokedark xl:w-1/2">
            {/* <div className="mr-10 mt-4 self-end">
              <DarkModeSwitcher />
            </div> */}
            <div className="flex flex-grow items-center justify-center">
              <div className="w-full max-w-lg p-8">
                <div className=" flex  items-center justify-center  gap-2">
                  {/* <Image
                    className="dark:block"
                    src={"/images/logo/ahunlogo.jpg"}
                    alt="Logo"
                    // width={40}
                    // height={50}
                    width={200}
                    height={250}
                  /> */}
                  {/* <h6 className="text-lg font-bold text-black dark:text-white">
                    Ahunu Express
                  </h6> */}
                </div>
                <div className="mb-3 mt-3  flex  items-center gap-2">
                  <h2 className="item-center justify-center text-title-lg  font-bold text-black dark:text-white sm:text-title-sm">
                    Sign in to continue
                  </h2>
                  <FaLock className="text-goldon" />
                </div>
                <div className=" items-left mb-5  mt-5 flex">
                  {/* <button
                    className="flex items-center "
                    style={{
                      border: "none",
                      width: "120px",
                      height: "35px",
                      // padding: "10px",
                      paddingLeft: "20px",
                      paddingRight: "20px",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                      borderBottomLeftRadius: "20px",
                      borderTopLeftRadius: "20px",
                      backgroundColor: value == "phone" ? "#109101" : "#cecccc",
                      color: value == "phone" ? "#ffffff" : "#000000",
                    }}
                    onClick={() => setValue("phone")}
                  >
                    {value == "phone" && <FaCheck className="mr-2" />}
                    Phone
                  </button>
                  <button
                    className="flex items-center gap-1"
                    style={{
                      backgroundColor: value == "phone" ? "#cecccc" : "#109101",
                      color: value == "email" ? "#ffffff" : "#000000",
                      borderBottomRightRadius: "20px",
                      borderTopRightRadius: "20px",
                      width: "120px",
                      height: "35px",
                      paddingLeft: "20px",
                      paddingRight: "20px",
                      paddingTop: "5px",
                      paddingBottom: "5px",
                    }}
                    onClick={() => setValue("email")}
                  >
                    {" "}
                    {value == "email" && <FaCheck className="mr-2" />} Email
                  </button> */}

                  <button
                    className="flex items-center gap-1"
                    onClick={() => methods.setValue("loginType", "phone")}
                    style={{
                      border: "none",
                      width: "120px",
                      height: "35px",
                      // padding: "10px",
                      paddingLeft: "20px",
                      paddingRight: "20px",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                      borderBottomLeftRadius: "20px",
                      borderTopLeftRadius: "20px",
                      backgroundColor:
                        methods.watch("loginType") === "phone"
                          ? "#109101"
                          : "#cecccc",
                      color:
                        methods.watch("loginType") === "phone"
                          ? "#ffffff"
                          : "#000000",
                    }}
                  >
                    {methods.watch("loginType") === "phone" && (
                      <FaCheck className="mr-2" />
                    )}{" "}
                    Phone
                  </button>

                  <button
                    className="flex items-center gap-1"
                    onClick={() => methods.setValue("loginType", "email")}
                    style={{
                      // backgroundColor: value == "phone" ? "#cecccc" : "#109101",
                      // color: value == "email" ? "#ffffff" : "#000000",
                      backgroundColor:
                        methods.watch("loginType") === "email"
                          ? "#109101"
                          : "#cecccc",
                      color:
                        methods.watch("loginType") === "email"
                          ? "#ffffff"
                          : "#000000",
                      borderBottomRightRadius: "20px",
                      borderTopRightRadius: "20px",
                      width: "120px",
                      height: "35px",
                      paddingLeft: "20px",
                      paddingRight: "20px",
                      paddingTop: "5px",
                      paddingBottom: "5px",
                    }}
                  >
                    {methods.watch("loginType") === "email" && (
                      <FaCheck className="mr-2" />
                    )}{" "}
                    Email
                  </button>
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
                    {methods.watch("loginType") == "phone" ? (
                      <>
                        <EthiopianNumberInput
                          type="number"
                          name="phone"
                          label="Phone Number"
                          placeholder=" ex 912345678"
                        />
                      </>
                    ) : (
                      <InputString
                        type="email"
                        name="email"
                        label="Email"
                        placeholder=" ex smaple@gmail.com"
                      />
                    )}{" "}
                    <div className="mb-3 w-full">
                      <InputString
                        type="password"
                        name="password"
                        label="Password"
                        placeholder=" ex #12372525"
                      />
                    </div>
                    <div className="mb-3 mt-3 h-6 w-full">
                      <Link
                        href="/auth/forget-password"
                        className="float-right text-black dark:text-white "
                      >
                        Forgot password ?
                      </Link>
                    </div>
                    <div className="mb-4 w-full">
                      <CommonButton loading={loading} label="Submit" />
                    </div>
                  </form>
                </FormProvider>
                {/* <div className="mt-6 w-full text-center">
                  <p>
                    Don’t have any account?{" "}
                    <Link href="/auth/signup" className=" text-primary">
                      Sign Up
                    </Link>
                  </p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
