"use client";
import React, { useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { CREATE_PAYMENT_METHOD } from "@/store/features/paymentMethods/type";
import { InputString, CommonButton } from "@/common/formElements";
import {
  createPaymentMethod,
  fetchPaymentMethodList,
} from "@/store/features/paymentMethods/paymentMethodsSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store"; // Import AppDispatch

const formSchema = z.object({
  code: z.string().min(1, { message: "Code is required" }),
  description: z.string().min(1, { message: "Description is required" }),
});

interface AddPaymentMethodProps {
  toggleDrawer: (open: boolean) => void; // Accepting toggleDrawer function as a prop
}

type FormData = z.infer<typeof formSchema>;

const AddPaymentMethod: React.FC<AddPaymentMethodProps> = ({
  toggleDrawer,
}) => {
  const dispatch: AppDispatch = useDispatch(); // Use the AppDispatch type

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const addPaymentMethod = async (values: any) => {
    setErrorMessage(null);
    setLoading(true);
    const create_payment_method: CREATE_PAYMENT_METHOD = {
      code: values?.code,
      description: values?.description,
    };
    dispatch(createPaymentMethod({ paymentMethodData: create_payment_method }))
      .then((data) => {
        if (data?.payload?.status >= 200 && data?.payload?.status < 300) {
          setLoading(false);
          toggleDrawer(false);
          dispatch(fetchPaymentMethodList());
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        setErrorMessage(error.message || "Failed to add payment method");
        toast.error("Failed to add payment method");
      });
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    addPaymentMethod(data);
  };

  return (
    <>
      <div className="flex w-full bg-white text-black dark:bg-boxdark dark:text-white">
        <FormProvider {...methods}>
          <div className="container  mt-0 px-4">
            <div className="p-0">
              <h6 className="text-gray-700 w-full text-lg font-normal">
                Add Payment Method
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
                    <CommonButton loading={loading} label="Submit" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </FormProvider>
      </div>
    </>
  );
};

export default AddPaymentMethod;
