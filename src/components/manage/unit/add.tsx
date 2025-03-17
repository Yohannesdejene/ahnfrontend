"use client";
import React, { useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { CREATE_UNIT } from "@/store/features/unit/type";
import { InputString, CommonButton } from "@/common/formElements";
import { createUnit, fetchUnitList } from "@/store/features/unit/unitsSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store"; // Import AppDispatch

// Form schema for unit
const formSchema = z.object({
  code: z.string().min(1, { message: "Code is required" }),
});

interface AddUnitProps {
  toggleDrawer: (open: boolean) => void; // Accepting toggleDrawer function as a prop
}

type FormData = z.infer<typeof formSchema>;

const AddUnit: React.FC<AddUnitProps> = ({ toggleDrawer }) => {
  const dispatch: AppDispatch = useDispatch(); // Use the AppDispatch type

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const addUnit = async (values: FormData) => {
    setErrorMessage(null);
    setLoading(true);
    const create_unit: CREATE_UNIT = {
      code: values.code,
    };
    dispatch(createUnit({ unitData: create_unit }))
      .then((data) => {
        if (data?.payload?.status >= 200 && data?.payload?.status < 300) {
          setLoading(false);
          toggleDrawer(false);
          dispatch(fetchUnitList());
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        setErrorMessage(error.message || "Failed to add unit");
        toast.error("Failed to add unit");
      });
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    addUnit(data);
  };

  return (
    <>
      <div className="flex w-full bg-white text-black dark:bg-boxdark dark:text-white">
        <FormProvider {...methods}>
          <div className="container mx-auto mt-0">
            <div className="w-full">
              <div className="p-0">
                <h6 className="text-gray-700 w-full text-lg font-normal">
                  Add Unit
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
                        placeholder="e.g., KG"
                      />
                    </div>

                    <div className="mb-4">
                      <CommonButton loading={loading} label="Submit" />
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

export default AddUnit;
