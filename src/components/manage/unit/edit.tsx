"use client";
import React, { useState, useEffect } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { InputString, CommonButton } from "@/common/formElements";
import { RootState, AppDispatch } from "@/store/store"; // Import RootState and AppDispatch
import { useDispatch, useSelector } from "react-redux";
import {
  getUnitById,
  updateUnit,
  fetchUnitList,
} from "@/store/features/unit/unitsSlice";

// Form schema for unit
const formSchema = z.object({
  code: z.string().min(1, { message: "Code is required" }),
});

interface EditUnitProps {
  id: number | string | null;
  toggleDrawer: (open: boolean) => void; // Accepting toggleDrawer function as a prop
  setId: (id: number | null | string) => void; // Setter for resetting the ID
}

type FormData = z.infer<typeof formSchema>;

const EditUnit: React.FC<EditUnitProps> = ({ toggleDrawer, setId, id }) => {
  const dispatch: AppDispatch = useDispatch(); // Use the AppDispatch type
  const { loadingUnit, errorUnit } = useSelector(
    (state: RootState) => state.unit,
  );
  const [loading, setLoading] = useState<boolean>(false);
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const editUnit = async (values: FormData) => {
    setLoading(true);
    const updatedUnit = {
      code: values.code,
    };
    dispatch(updateUnit({ id, unitData: updatedUnit }))
      .then((data) => {
        if (data?.payload?.status === 200) {
          toggleDrawer(false);
          setLoading(false);
          dispatch(fetchUnitList());
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message || "Failed to update unit");
      });
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    editUnit(data);
  };

  useEffect(() => {
    if (id) {
      dispatch(getUnitById(id))
        .then((data: any) => {
          methods.reset({
            code: data?.payload?.data?.unit?.code || "",
          });
        })
        .catch((error) => {
          console.error("Error fetching unit:", error);
        });
    }
  }, [id, methods, dispatch]);

  return (
    <>
      <div className="flex w-full bg-white text-black dark:bg-boxdark dark:text-white">
        <FormProvider {...methods}>
          <div className="container mx-auto mt-0">
            <div className="w-full">
              <div className="p-0">
                <h6 className="text-gray-700 w-full text-lg font-normal">
                  Edit Unit
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

export default EditUnit;
