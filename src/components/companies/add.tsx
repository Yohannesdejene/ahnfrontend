"use client";
import React, { useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";

import {
  InputString,
  CommonButton,
  SelectInput,
  EthiopianNumberInput,
} from "@/common/formElements";
import {
  createCompany,
  fetchAllCompanies,
} from "@/store/features/company/companiesSlice";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { useGetAllBranches } from "@/hooks/useGetAllBranches";

// Updated form schema for company
const addCompanySchema = z.object({
  name: z.string().max(255, "Name must not exceed 255 characters."),
  phone: z
    .string()
    .regex(/^\d{9,12}$/, "Phone number must be between 9 and 12 digits."),
  email: z
    .string()
    .email("Invalid email address.")
    .max(255, "Email must not exceed 255 characters."),
  tin: z.any().optional(),
  licenseFile: z.any().optional(), // Accepts any file type
  otherDocumentsFile: z.any().optional(), // Accepts any file type
  branchId: z.string().min(1, { message: "Branch is required" }),
});

type FormData = z.infer<typeof addCompanySchema>;

const AddCompany: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { loadingBranch, optionsBranch } = useGetAllBranches(); // Fetch branches
  const [loading, setLoading] = useState<boolean>(false);
  const [licenseFile, setLicenseFile] = useState<File | null>(null);
  const [otherDocumentsFile, setOtherDocumentsFile] = useState<File | null>(
    null,
  );

  const methods = useForm<FormData>({
    resolver: zodResolver(addCompanySchema),
  });

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
  ) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const addCompanyFun = async (values: FormData) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phone", `251${values.phone}`); // Add country code
    if (values.tin) formData.append("tin", values.tin);
    if (licenseFile) formData.append("licenseFile", licenseFile);
    if (otherDocumentsFile)
      formData.append("otherDocumentsFile", otherDocumentsFile);
    formData.append("branchId", values.branchId);

    // dispatch(createCompany({ companyData: formData }))
    //   .then((data) => {
    //     if (data?.payload?.status === 201) {
    //       setLoading(false);
    //       dispatch(fetchAllCompanies());
    //       toast.success("Company created successfully");
    //     } else {
    //       setLoading(false);
    //       toast.error("Failed to create company");
    //     }
    //   })
    //   .catch((error) => {
    //     setLoading(false);
    //     toast.error(error.message || "Failed to create company");
    //   });
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    addCompanyFun(data);
  };

  return (
    <div className="  container mx-auto overflow-x-hidden p-4">
      <div className="flex w-full bg-white text-black dark:bg-boxdark dark:text-white">
        <FormProvider {...methods}>
          <div className=" mt-10">
            <div className="w-full">
              <div className="p-0">
                <h6 className="text-gray-700 w-full text-lg font-normal">
                  Add Company
                </h6>

                <hr className="mb-4 mt-4 w-full text-lg font-normal text-normalGray" />
                <div className="w-full">
                  <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className="p-fluid"
                  >
                    <div className="mb-3 w-full">
                      <input
                        type="text"
                        {...methods.register("name")}
                        placeholder="Company Name"
                        className="border-gray-300 w-full rounded-lg border p-2"
                      />
                    </div>
                    <div className="mb-3 w-full">
                      <input
                        type="email"
                        {...methods.register("email")}
                        placeholder="Email"
                        className="border-gray-300 w-full rounded-lg border p-2"
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
                      <input
                        type="text"
                        {...methods.register("tin")}
                        placeholder="TIN (Tax Identification Number)"
                        className="border-gray-300 w-full rounded-lg border p-2"
                      />
                    </div>
                    <div className="mb-3 w-full">
                      <label className="text-gray-700 block text-sm font-medium">
                        License File
                      </label>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileChange(e, setLicenseFile)}
                        className="border-gray-300 w-full rounded-lg border p-2"
                      />
                    </div>
                    <div className="mb-3 w-full">
                      <label className="text-gray-700 block text-sm font-medium">
                        Other Documents File
                      </label>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) =>
                          handleFileChange(e, setOtherDocumentsFile)
                        }
                        className="border-gray-300 w-full rounded-lg border p-2"
                      />
                    </div>
                    <div className="mb-3 w-full">
                      <SelectInput
                        name="branchId"
                        label="Branch"
                        placeholder="Select Branch"
                        options={optionsBranch}
                        loading={loadingBranch}
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
    </div>
  );
};

export default AddCompany;
