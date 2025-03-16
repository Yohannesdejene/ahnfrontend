"use client";
import React, { useState, useEffect } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { InputString, InputNumber, CommonButton } from "@/common/formElements";
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
  phone: z.string().min(1, { message: "Phone is required" }),
  email: z.string().optional(),
  location: z.string().min(1, { message: "Location is required" }),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
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
      name: values.name,
      phone: values.phone,
      email: values.email,
      location: values.location,
      latitude: values.latitude,
      longitude: values.longitude,
      mapLink: values.mapLink,
      LATA: values.LATA,
      description: values.description,
      code: values.code,
    };
    dispatch(updateBranch({ id, branchData: updatedBranch }))
      .then((data) => {
        if (data?.payload?.status === 200) {
          toggleDrawer(false);
          setLoading(false);
          dispatch(fetchBranchList());
          toast.success("Branch updated successfully!");
        } else {
          setLoading(false);
          toast.error("Failed to update branch");
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
          methods.reset({
            name: data?.payload?.name || "",
            phone: data?.payload?.phone || "",
            email: data?.payload?.email || "",
            location: data?.payload?.location || "",
            latitude: data?.payload?.latitude || undefined,
            longitude: data?.payload?.longitude || undefined,
            mapLink: data?.payload?.mapLink || "",
            LATA: data?.payload?.LATA || "",
            description: data?.payload?.description || "",
            code: data?.payload?.code || "",
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
                      <InputString
                        type="text"
                        name="phone"
                        label="Phone"
                        placeholder="e.g., +251912345678"
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
                      <InputNumber
                        name="latitude"
                        label="Latitude"
                        placeholder="e.g., 9.145"
                      />
                    </div>
                    <div className="mb-3 w-full">
                      <InputNumber
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
                    <div className="mb-3 w-full">
                      <InputString
                        type="text"
                        name="code"
                        label="Code"
                        placeholder="e.g., BR001"
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

export default EditBranch;
