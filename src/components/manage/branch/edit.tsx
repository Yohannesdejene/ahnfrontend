"use client";
import React, { useState, useEffect } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import {
  InputString,
  InputNumber,
  CommonButton,
  EthiopianNumberInput,
} from "@/common/formElements";
import { RootState, AppDispatch } from "@/store/store"; // Import RootState and AppDispatch
import { useDispatch, useSelector } from "react-redux";
import {
  getBranchById,
  updateBranch,
  fetchBranchList,
} from "@/store/features/branches/branchesSlice";

// Form schema for branch
const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  phone: z
    .string()
    .min(9, { message: "Phone must be exactly 9 digits" })
    .max(9, { message: "Phone must be exactly 9 digits" })
    .regex(/^[7|9][0-9]{8}$/, {
      message: "Phone must be 9 digits and start with 7 or 9",
    }),
  email: z.string().optional(),
  location: z.string().min(1, { message: "Location is required" }),
  latitude: z
    .string()
    .regex(/^-?\d*\.?\d+$/, {
      message: "Latitude must be a number (can include decimal)",
    })
    .optional(),
  longitude: z
    .string()
    .regex(/^-?\d*\.?\d+$/, {
      message: "Longitude must be a number (can include decimal)",
    })
    .optional(),
  mapLink: z.string().optional(),
  LATA: z.string().optional(),
  description: z.string().min(1, { message: "Description is required" }),
  code: z.string().optional(),
});

interface EditBranchProps {
  id: number | string | null;
  toggleDrawer: (open: boolean) => void; // Accepting toggleDrawer function as a prop
  setId: (id: number | null | string) => void; // Setters don't return a value
}

type FormData = z.infer<typeof formSchema>;

const EditBranch: React.FC<EditBranchProps> = ({ toggleDrawer, setId, id }) => {
  const dispatch: AppDispatch = useDispatch(); // Use the AppDispatch type
  const { loadingBranch, errorBranch } = useSelector(
    (state: RootState) => state.branches,
  );
  const [loading, setLoading] = useState<boolean>(false);
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const editBranch = async (values: FormData) => {
    setLoading(true);
    const updatedBranch = {
      name: values?.name?.toString(),
      phone: `251${values?.phone?.toString()}`,
      email: values?.email?.toString(),
      location: values?.location?.toString(),
      latitude: values?.latitude?.toString(),
      longitude: values?.longitude?.toString(),
      mapLink: values?.mapLink?.toString(),
      LATA: values?.LATA?.toString(),
      description: values?.description?.toString(),
      code: values?.code?.toString(),
    };
    dispatch(updateBranch({ id, branchData: updatedBranch }))
      .then((data) => {
        if (data?.payload?.status === 200) {
          toggleDrawer(false);
          setLoading(false);
          dispatch(fetchBranchList());
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message || "Failed to update branch");
      });
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    editBranch(data);
  };

  useEffect(() => {
    if (id) {
      dispatch(getBranchById(id))
        .then((data: any) => {
          console.log("new data test", data?.payload?.data?.branch);
          methods.reset({
            name: data?.payload?.data?.branch?.name || "",
            phone: data?.payload?.data?.branch?.phone?.toString() || "",
            email: data?.payload?.data?.branch?.email || "",
            location: data?.payload?.data?.branch?.location || "",
            latitude: data?.payload?.data?.branch?.latitude?.toString() || "",
            longitude: data?.payload?.data?.branch?.longitude?.toString() || "",
            mapLink: data?.payload?.data?.branch?.mapLink || "",
            LATA: data?.payload?.data?.branch?.LATA || "",
            description: data?.payload?.data?.branch?.description || "",
            code: data?.payload?.data?.branch?.code || "",
          });
        })
        .catch((error) => {
          console.error("Error fetching branch:", error);
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
                  Edit Branch
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
                        name="name"
                        label="Name"
                        placeholder="e.g., Branch Name"
                      />
                    </div>
                    <div className="mb-3 w-full">
                      <EthiopianNumberInput
                        type="text"
                        name="phone"
                        label="Phone"
                        placeholder="e.g., 912345678"
                      />
                    </div>
                    <div className="mb-3 w-full">
                      <InputString
                        type="email"
                        name="email"
                        label="Email"
                        placeholder="e.g., branch@example.com"
                      />
                    </div>
                    <div className="mb-3 w-full">
                      <InputString
                        type="text"
                        name="location"
                        label="Location"
                        placeholder="e.g., Addis Ababa"
                      />
                    </div>
                    <div className="mb-3 w-full">
                      <InputString
                        type="text"
                        name="latitude"
                        label="Latitude"
                        placeholder="e.g., 9.145"
                      />
                    </div>
                    <div className="mb-3 w-full">
                      <InputString
                        type="text"
                        name="longitude"
                        label="Longitude"
                        placeholder="e.g., 38.763"
                      />
                    </div>
                    <div className="mb-3 w-full">
                      <InputString
                        type="text"
                        name="mapLink"
                        label="Map Link"
                        placeholder="e.g., https://maps.google.com/..."
                      />
                    </div>
                    <div className="mb-3 w-full">
                      <InputString
                        type="text"
                        name="LATA"
                        label="LATA"
                        placeholder="e.g., LATA Code"
                      />
                    </div>
                    <div className="mb-3 w-full">
                      <InputString
                        type="text"
                        name="description"
                        label="Description"
                        placeholder="e.g., Description of the branch"
                      />
                    </div>
                    {/* <div className="mb-3 w-full">
                      <InputString
                        type="text"
                        name="code"
                        label="Code"
                        placeholder="e.g., BR001"
                      />
                    </div> */}
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

export default EditBranch;
