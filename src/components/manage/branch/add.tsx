"use client";
import React, { useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { CREATE_BRANCH } from "@/store/features/branches/type";
import { InputString, InputNumber, CommonButton } from "@/common/formElements";
import {
  createBranch,
  fetchBranchList,
} from "@/store/features/branches/branchesSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store"; 

// Form schema for branch
const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  phone: z.string().min(1, { message: "Phone is required" }),
  email: z.string().optional(),
  location: z.string().min(1, { message: "Location is required" }),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  mapLink: z.string().optional(),
  LATA: z.string().optional(),
  description: z.string().min(1, { message: "Description is required" }),
  code: z.string().optional(),
});

interface AddBranchProps {
  toggleDrawer: (open: boolean) => void; // Accepting toggleDrawer function as a prop
}

type FormData = z.infer<typeof formSchema>;

const AddBranch: React.FC<AddBranchProps> = ({ toggleDrawer }) => {
  const dispatch: AppDispatch = useDispatch(); // Use the AppDispatch type

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const addBranch = async (values: FormData) => {
    setErrorMessage(null);
    setLoading(true);
    const create_branch: CREATE_BRANCH = {
      name: values.name,
      phone: values.phone,
      email: values.email,
      location: values.location,
      latitude: values.latitude||0,
      longitude: values.longitude,
      mapLink: values.mapLink,
      LATA: values.LATA,
      description: values.description,
      code: values.code,
    };
    dispatch(createBranch({ branchData: create_branch }))
      .then((data) => {
        if (data?.payload?.status >= 200 && data?.payload?.status < 300) {
          setLoading(false);
          toggleDrawer(false);
          dispatch(fetchBranchList());
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        setErrorMessage(error.message || "Failed to add branch");
        toast.error("Failed to add branch");
      });
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    addBranch(data);
  };

  return (
    <>
      <div className="flex w-full bg-white text-black dark:bg-boxdark dark:text-white">
        <FormProvider {...methods}>
          <div className="container mx-auto mt-0">
            <div className="w-full">
              <div className="p-0">
                <h6 className="text-gray-700 w-full text-lg font-normal">
                  Add Branch
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

export default AddBranch;
