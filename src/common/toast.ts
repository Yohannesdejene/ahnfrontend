// toast.ts
import { toast } from "react-toastify";

export const showToast = (
  message: string,
  type: "success" | "error" | "info" | "warning",
) => {
  toast[type](message);
};
