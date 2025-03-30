"use client";
import React, { useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import {
  Button as BaseButton,
 
} from "@mui/material";
import {
  InputString,
  CommonButton,
  SelectInput,
  EthiopianNumberInput,
} from "@/common/formElements";
import { GrView } from "react-icons/gr";
import { AppDispatch } from "@/store/store";
import { useGetAllBranches } from "@/hooks/useGetAllBranches";
import { createCompany } from "@/store/features/company/companiesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { apiCreateCompany } from "@/store/features/company/companiesApi";
// Form schema for company
const addCompanySchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z
    .string()
    .regex(/^\d{9,12}$/, "Phone number must be between 9 and 12 digits."),
  email: z
    .string()
    .email("Invalid email address.")
    .max(255, "Email must not exceed 255 characters."),
  tin: z.string().min(1, "Tin number is required"),
  licenseFile: z.any().optional(), // Accepts any file type
  otherDocumentsFile: z.any().optional(), // Accepts any file type
  branchId: z.string().min(1, { message: "Branch is required" }),
});

type FormData = z.infer<typeof addCompanySchema>;

const AddCompany: React.FC = () => {
  const router = useRouter();
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
    // setLoading(true);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phone", `251${values.phone}`); // Add country code
    formData.append("tin", values.tin ? values.tin : "");
    if (licenseFile) formData.append("licenseFile", licenseFile);
    if (otherDocumentsFile)
      formData.append("otherDocumentsFile", otherDocumentsFile);
    formData.append("branchId", values.branchId);

    dispatch(createCompany({ companyData: formData })).then((data: any) => {
      if (data?.type == "companies/createCompany/fulfilled")
        router.push(`/companies/list`);
    });
    setLoading(false);
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    addCompanyFun(data);
  };

  return (
    <div className="container mx-auto overflow-x-hidden p-4">
      <div className="flex w-full bg-white text-black dark:bg-boxdark dark:text-white">
        <FormProvider {...methods}>
          <div className="mt-10 w-full">
            <div className=" flex  justify-between px-5  align-middle  ">
              <h5 className="text-gray-700   text-title-md  font-semibold  ">
                Add Company
              </h5>
              <BaseButton
                style={{
                  textTransform: "none",
                  backgroundColor: "#0f6f03",
                  color: "white",
                  marginBottom: "10px",
                  paddingLeft: "10px",
                  paddingRight: "10px",

                  // marginLeft: "auto",
                  display: "flex",
                }}
                onClick={() => router.push(`/companies/list`)}
              >
                <GrView className="mr-3" />
                View companies
              </BaseButton>
            </div>
            <hr className=" mb-4 mt-4 grid w-full  text-lg font-normal text-normalGray" />
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <div className="grid w-full grid-cols-1  gap-4 p-5 md:grid-cols-2 ">
                <div className="mb-3 ">
                  <InputString
                    type="text"
                    name="name"
                    label="Company Name"
                    placeholder="e.g., ABC Corp"
                  />
                </div>
                <div className="mb-3 ">
                  <InputString
                    type="email"
                    name="email"
                    label="Email"
                    placeholder="e.g., company@example.com"
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
                    type="text"
                    name="tin"
                    label="TIN (Tax Identification Number) optional"
                    placeholder="e.g., 123456789"
                  />
                </div>
                <div className="mb-3 w-full">
                  <label className="text-gray-700 block text-sm font-medium">
                    License File(Optional)
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e, setLicenseFile)}
                    className="border-gray-300 focus:shadow-outline-primary dark:focus:shadow-outline-primary  w-full rounded-lg border border-solid border-slate-300 bg-white p-2 text-slate-900 shadow-md shadow-slate-100   focus:border-primary focus:shadow-lg focus-visible:outline-0 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-300 dark:shadow-slate-900 dark:focus:border-primary"
                  />
                </div>
                <div className="mb-3 w-full">
                  <label className="text-gray-700 block text-sm font-medium">
                    Other Documents File(Optional)
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e, setOtherDocumentsFile)}
                    className="border-gray-300 focus:shadow-outline-primary dark:focus:shadow-outline-primary  w-full rounded-lg border border-solid border-slate-300 bg-white p-2 text-slate-900 shadow-md shadow-slate-100   focus:border-primary focus:shadow-lg focus-visible:outline-0 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-300 dark:shadow-slate-900 dark:focus:border-primary"
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
              </div>
              <div className="md:grid-flow-cols-2 mb-4 grid w-full grid-cols-1  justify-center  gap-4 px-5 align-middle  ">
                <div className="mb-3 w-full">
                  <CommonButton loading={loading} label="Submit" />
                </div>
              </div>
            </form>
          </div>
        </FormProvider>
      </div>
    </div>
  );
};

export default AddCompany;
