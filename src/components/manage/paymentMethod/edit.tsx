"use client";
import React, { useState, useEffect } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { InputString, CommonButton } from "@/common/formElements";
import { RootState, AppDispatch } from "@/store/store"; // Import RootState and AppDispatch
import { useDispatch, useSelector } from "react-redux";
import { CREATE_PAYMENT_METHOD } from "@/store/features/paymentMethods/type";
import {
  getPaymentMethodById,
  updatePaymentMethod,
  fetchPaymentMethodList,
} from "@/store/features/paymentMethods/paymentMethodsSlice";

const formSchema = z.object({
  code: z.string().min(1, { message: "Code is required" }),
  description: z.string().min(1, { message: "Description is required" }),
});

interface EditPaymentMethodProps {
  id: number | string | null;
  toggleDrawer: (open: boolean) => void; // Accepting toggleDrawer function as a prop
  setId: (id: number | null | string) => void; // Setters don't return a value
}

type FormData = z.infer<typeof formSchema>;

const EditPaymentMethod: React.FC<EditPaymentMethodProps> = ({
  toggleDrawer,
  setId,
  id,
}) => {
  const dispatch: AppDispatch = useDispatch(); // Use the AppDispatch type
  const { loadingPaymentMethod, errorPaymentMethod } = useSelector(
    (state: RootState) => state.paymentMethod,
  );
  const [loading, setLoading] = useState<boolean>(false);
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const editPaymentMethod = async (values: any) => {
    setLoading(true);
    const updatedPaymentMethod: CREATE_PAYMENT_METHOD = {
      code: values?.code,
      description: values?.description,
    };
    dispatch(
      updatePaymentMethod({ paymentMethodData: updatedPaymentMethod, id }),
    )
      .then((data) => {
        if (data?.payload?.status === 200) {
          toggleDrawer(false);
          setLoading(false);
          dispatch(fetchPaymentMethodList());
          toast.success("Payment method updated successfully!");
        } else {
          setLoading(false);
          toast.error("Failed to update payment method");
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message || "Failed to update payment method");
      });
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    editPaymentMethod(data);
  };

  useEffect(() => {
    try {
      if (id) {
        dispatch(getPaymentMethodById(id))
          .then((data: any) => {
            console.log("data?.payload?.data", data?.payload?.data);
            methods.reset({
              code: data?.payload?.data?.paymentMethods?.code || "",
              description:
                data?.payload?.data?.paymentMethods?.description || "",
            });
          })
          .catch((error) => {
            console.error("Error fetching payment method:", error);
          });
      }
    } catch (err) {
      console.log("err", err);
    }
  }, [id, methods, dispatch]);

  return (
    <>
      <div
        className="m-0 flex  w-full max-w-full overflow-x-hidden bg-white
       p-0 text-black dark:bg-boxdark dark:text-white"
      >
        <FormProvider {...methods}>
          <div className="container mx-auto mt-0  ">
            <div className="w-full">
              <div className="p-0">
                <h6 className="text-gray-700 w-full text-lg font-normal">
                  Edit Payment Method
                </h6>

                <hr className="mb-4 mt-4 w-full text-lg font-normal text-normalGray" />
                <div className="w-full">
                  <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className="p-fluid"
                  >
                    <div className="mb-3 w-full">
                      <InputString
                        type="text"
                        name="code"
                        label="Code"
                        placeholder="e.g., online_payment"
                      />
                    </div>
                    <div className="mb-3 w-full">
                      <InputString
                        type="text"
                        name="description"
                        label="Description"
                        placeholder="e.g., Description of the payment method"
                      />
                    </div>
                    <div className="mb-4">
                      <CommonButton loading={loading} label="Update" />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </FormProvider>
      </div>
    </>
  );
};

export default EditPaymentMethod;
