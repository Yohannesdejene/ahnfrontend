import { useDispatch, useSelector } from "react-redux";
import { setSessionKey, deleteSessionKeys } from "@/utils/sessionManager";
import { onUserLoginSuccess, onUserLoginFailed } from "@/store/auth/authSlice";
import { apiSignIn } from "@/services/AuthService";
import { SIGN_IN_DATA, SIGN_UP_DATA, CHANGE_PASSWORD_DATA } from "@/types/auth";

function useAuth() {
  const { accessToken } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  const getUserEmail = (): string => {
    return "";
  };

  // const onUpdateFirstTimeLoginPassword = async ({
  //   data,
  //   resetPasswordToken,
  // }: {
  //   data: any;
  //   resetPasswordToken: string;
  // }): Promise<ChangePasswordResponse> => {
  //   try {
  //     const res = await apiUpdateFirstTimeLoginPassword({
  //       data,
  //       resetPasswordToken,
  //     });
  //     const { Status, Message } = res.data;
  //     if (Status === "00") {
  //       return {
  //         status: "000",
  //         message: "",
  //       };
  //     } else {
  //       return {
  //         status: "999",
  //         message: Message,
  //       };
  //     }
  //   } catch (errors) {
  //     return {
  //       status: "failed",
  //       message: errors?.response?.data?.Message || errors.toString(),
  //     };
  //   }
  // };

  // const onUpdatePassword = async (
  //   values: CHANGE_PASSWORD_DATA,
  // ): Promise<ChangePasswordResponse> => {
  //   try {
  //     const res = await apiUpdateUserPassword(values);
  //     const { Status, Message } = res.data;
  //     if (Status === "00") {
  //       return {
  //         status: "000",
  //         message: "",
  //       };
  //     } else {
  //       return {
  //         status: "999",
  //         message: Message,
  //       };
  //     }
  //   } catch (errors) {
  //     return {
  //       status: "failed",
  //       message: errors?.response?.data?.Message || errors.toString(),
  //     };
  //   }
  // };

  // const onChangePasswordFinal = async ({
  //   password,
  //   resetPasswordToken,
  // }: ChangePasswordRequest): Promise<ChangePasswordResponse> => {
  //   try {
  //     const res = await apiResetPasswordFinal({
  //       resetPasswordToken: resetPasswordToken,
  //       password: password,
  //     });
  //     const { Status, Message } = res.data;
  //     if (Status === "00") {
  //       return {
  //         status: "000",
  //         message: "",
  //       };
  //     } else {
  //       return {
  //         status: "999",
  //         message: Message,
  //       };
  //     }
  //   } catch (errors) {
  //     return {
  //       status: "failed",
  //       message: errors?.response?.data?.Message || errors.toString(),
  //     };
  //   }
  // };

  // const onVerifyResetPasswordCode = async ({
  //   otpCode,
  //   userEmail,
  // }: VerifyResetPasswordCode): Promise<{
  //   status: string;
  //   message: string;
  //   userToken?: string;
  // }> => {
  //   try {
  //     const res = await apiVerifyChangePasswordOTP({
  //       userEmail: userEmail,
  //       code: otpCode,
  //     });
  //     const { Status, Message, userToken } = res.data;
  //     if (Status === "00") {
  //       return {
  //         status: "000",
  //         message: "",
  //         userToken,
  //       };
  //     } else {
  //       return {
  //         status: "999",
  //         message: Message,
  //       };
  //     }
  //   } catch (errors) {
  //     return {
  //       status: "failed",
  //       message: errors?.response?.data?.Message || errors.toString(),
  //     };
  //   }
  // };

  // const onRequestChangePassword = async (
  //   userEmail: string,
  // ): Promise<ChangePasswordResponse> => {
  //   try {
  //     const res = await apiChangePasswordRequest({ email: userEmail });
  //     const { Status, Message } = res.data;
  //     if (Status === "00") {
  //       return {
  //         status: "000",
  //         message: "",
  //       };
  //     } else {
  //       return {
  //         status: "999",
  //         message: Message,
  //       };
  //     }
  //   } catch (errors) {
  //     return {
  //       status: "failed",
  //       message: errors?.response?.data?.Message || errors.toString(),
  //     };
  //   }
  // };

  const signIn = async (
    values: SIGN_IN_DATA,
  ): Promise<{ status: string; message: string }> => {
    try {
      const res = await apiSignIn(values);
      console.log("res", res);

      const { status, message, email, isPasswordChanged, token } = res?.data;

      if (status === "111") {
        if (isPasswordChanged === true) {
          const res_0 = setSessionKey({
            userToken: token,
            // permissions: permissions,
          });
          if (res_0) {
            dispatch(onUserLoginSuccess({ accessToken: token }));
            window.location.replace("/");
          } else {
            throw new Error("Failed to login, please try again");
          }
          return {
            status: "success",
            message: "",
          };
        } else {
          // const permissions = [...permissionsName, "dashboard"];
          return {
            status: "failed",
            message: "Login failed check you email and password",
          };
        }
      } else {
        dispatch(onUserLoginFailed());
        // const { statusDescription } = res.data;
        return {
          status: "failed",
          message: "Email or password invalid try again",
        };
      }
    } catch (errors) {
      console.log("errors", errors);
      dispatch(onUserLoginFailed());
      return {
        status: "failed",
        message: "Something  went wrong try again later",
      };
    }
  };

  const signOut = async (): Promise<void> => {
    deleteSessionKeys();
    window.location.replace("/login");
  };

  return {
    authenticated: accessToken,
    signIn,
    signOut,
    // onRequestChangePassword,
    // onVerifyResetPasswordCode,
    // onChangePasswordFinal,
    // onUpdateFirstTimeLoginPassword,
    // onUpdatePassword,
    getUserEmail,
  };
}

export default useAuth;
