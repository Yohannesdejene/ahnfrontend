"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputString, CommonButton } from "@/common/formElements";
import DarkModeSwitcher from "@/components/Header/DarkModeSwitcher";
import { useDispatch } from "react-redux";
import { loginSuccess, saveUserInfo, logout } from "@/store/actions";
import { RootState } from "@/store/store";
import { apiChangePasswordRequest } from "@/services/AuthService";
import {
  getTemporaryToken,
  setSessionKey,
  setUserInfo,
  deleteTempSession,
  setPermissionInfo,
} from "@/utils/sessionManager";
import { toast } from "react-hot-toast";
import Alert from "@mui/material/Alert";
import { useRouter } from "next/navigation";
function formatPermissions(permissions: any) {
  return permissions.map((permission: any) => ({
    name: permission.name,
    description: permission.description,
    code: permission.code,
    permissionType: permission.PermissionType.type,
  }));
}

// Define the form schema with Zod
import { z } from "zod";

const formSchema = z
  .object({
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"], // This ensures the error is shown on the confirmPassword field
  });

export { formSchema };

type FormData = z.infer<typeof formSchema>;

const SetPassword: React.FC = () => {
  const router = useRouter();
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

      const request_body = {
        password: values?.newPassword,
        token: tempToken ? tempToken : "",
      };
      const res = await apiChangePasswordRequest(request_body);

      const { token, user } = res?.data;
      // const permission = formatPermissions(user?.Role?.Permissions);

      if (res?.status == 200) {
        dispatch(saveUserInfo(user));
        dispatch(loginSuccess(token));
        const res_0 = setSessionKey(token);
        const user_0 = setUserInfo(user);
        // const perm_0 = setPermissionInfo(permission);

        deleteTempSession();

        if (res_0 && user_0) {
          toast.success("Password setted successfully, redirecting... ");
          setTimeout(() => {
            router.push("/");
          }, 200);
        }
      } else {
        setErrorMessage("Invalid password  try again ");
      }
    } catch (errors: any) {
      console.log("errors", errors);
      setErrorMessage(
        errors?.response?.data?.message ||
          "Old password or new password invalid try again  ",
      );
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
        <div className=" flex h-screen w-full justify-center ">
          <div
            className=" hidden h-screen items-center justify-center  xl:block xl:w-1/2 "
            style={{
              background: "linear-gradient(to top, #109101, #ffffff)", // Replace with your colors
            }}
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
          <div className="flex h-screen w-full flex-col border-l-2 border-stroke dark:border-strokedark xl:w-1/2">
            {/* <div className=" float-right mr-10 mt-5">
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
                    Set up new password{" "}
                  </h2>
                </div>

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
      </div>
    </>
  );
};

export default SetPassword;
