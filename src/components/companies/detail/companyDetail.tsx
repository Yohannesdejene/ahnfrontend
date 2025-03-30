"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getCompanyById } from "@/store/features/company/companiesThunk";
import { CircularProgress, Alert } from "@mui/material";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button as BaseButton } from "@mui/material";
import {
  InputString,
  CommonButton,
  SelectInput,
  EthiopianNumberInput,
} from "@/common/formElements";
import { useGetAllBranches } from "@/hooks/useGetAllBranches";
import { CiEdit } from "react-icons/ci";
import { MdCancel } from "react-icons/md";
import { updateCompany } from "@/store/features/company/companiesSlice";
import { IoMdArrowBack } from "react-icons/io";

import { useRouter } from "next/navigation";

interface CompanyDetailProps {
  id: string | number;
}
const addCompanySchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().optional(),
  email: z.string().optional(),
  tin: z.string().min(1, "Tin number is required"),
  licenseFile: z.any().optional(), // Accepts any file type
  otherDocumentsFile: z.any().optional(), // Accepts any file type
  branchId: z.string().min(1, { message: "Branch is required" }),
});

type FormData = z.infer<typeof addCompanySchema>;

const Detail: React.FC<CompanyDetailProps> = ({ id }) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [disabled, setDisabled] = useState(true);
  const { currentCompany, getCompanyByIdLoading, getCompanyByIdError } =
    useSelector((state: RootState) => state.company);
  const [loading, setLoading] = useState<boolean>(false);
  const { loadingBranch, optionsBranch } = useGetAllBranches(); // Fetch branches
  const [licensePreview, setLicensePreview] = useState<string | null>(null);
  const [otherDocsPreview, setOtherDocsPreview] = useState<string | null>(null);
  const [licenseFile, setLicenseFile] = useState<any>(null);
  const [otherDocumentsFile, setOtherDocsFile] = useState<any>(null);
  const methods = useForm<FormData>({
    resolver: zodResolver(addCompanySchema),
  });

  useEffect(() => {
    methods.reset({
      name: currentCompany?.name || "",
      email: currentCompany?.email || "",
      phone: currentCompany?.phone?.slice(3) || "", // Remove country code
      tin: currentCompany?.tin || "",
      branchId: currentCompany?.branchId?.toString() || "",
      // Set initial previews if files exist in currentCompany
    });
    if (currentCompany?.licenseLink) {
      setLicensePreview(currentCompany.licenseLink); // Assuming this is a URL
    }
    if (currentCompany?.otherDocumentsLink) {
      setOtherDocsPreview(currentCompany.otherDocumentsLink); // Assuming this is a URL
    }
  }, [id, methods, dispatch, getCompanyByIdLoading]);
  console.log("licenseFile", licenseFile);
  const addCompanyFun = async (values: FormData) => {
    setLoading(true);
    const formData = new FormData();
    // formData.append("name", values.name);
    // formData.append("email", values.email);
    formData.append("phone", `251${values.phone}`); // Add country code
    formData.append("tin", values.tin);
    if (licenseFile) formData.append("licenseLink", licenseFile);
    if (otherDocumentsFile)
      formData.append("otherDocumentsLink", otherDocumentsFile);
    formData.append("branchId", values.branchId);

    dispatch(updateCompany({ id: id, companyData: formData })).then(
      (data: any) => {
        if (data?.type == "companies/updateCompany/fulfilled")
          router.push(`/companies/list`);
      },
    );
    setLoading(false);
  };
  const onSubmit: SubmitHandler<FormData> = (data) => {
    addCompanyFun(data);
  };
  if (getCompanyByIdLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  if (getCompanyByIdError) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Alert severity="error">Failed to fetch company details.</Alert>
      </div>
    );
  }
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setLicenseFile(file);
  };

  const handleFileChangeOther = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setOtherDocsFile(file);
  };

  return (
    <div
      className="container mx-auto p-1"
      //  style={{ backgroundColor: "red" }}
    >
      <BaseButton
        className="bg-danger"
        // style={{
        //   textTransform: "none",
        //   backgroundColor: "#00",
        //   color: "white",

        //   // marginLeft: "auto",
        //   display: "flex",
        // }}
        onClick={() => router.back()} // Goes back one step in the history stack}
      >
        <IoMdArrowBack className="mr-3 " /> Back
      </BaseButton>
      <div className=" mb-3 mt-3 flex  justify-between px-1 align-middle  md:px-4  ">
        <h5 className="text-gray-700  text-title-md   font-semibold  dark:text-white  ">
          Company Details{" "}
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
          onClick={() => setDisabled(!disabled)}
        >
          {disabled ? (
            <CiEdit className="mr-3" />
          ) : (
            <MdCancel className="mr-3" />
          )}
          {disabled ? "Edit" : "Cancel"}
        </BaseButton>
      </div>
      <hr className="my-4" />

      <div className=" w-full  gap-4 bg-white  text-black dark:bg-boxdark dark:text-white ">
        {/* Company Information */}
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="grid w-full grid-cols-1  gap-4 p-5 md:grid-cols-2 ">
              <div className="mb-3 ">
                <InputString
                  type="text"
                  name="name"
                  label="Company Name"
                  placeholder="e.g., ABC Corp"
                  disabled={disabled}
                />
              </div>
              <div className="mb-3 ">
                <InputString
                  type="email"
                  name="email"
                  label="Email"
                  placeholder="e.g., company@example.com"
                  disabled={disabled}
                />
              </div>
              <div className="mb-3 w-full">
                <EthiopianNumberInput
                  type="text"
                  name="phone"
                  label="Phone"
                  placeholder="e.g., 912345678"
                  disabled={disabled}
                />
              </div>
              <div className="mb-3 w-full">
                <InputString
                  type="text"
                  name="tin"
                  label="TIN (Tax Identification Number) optional"
                  placeholder="e.g., 123456789"
                  disabled={disabled}
                />
              </div>
              <div className="mb-3 flex w-full flex-col gap-4">
                <label className="text-gray-700 block text-sm font-medium">
                  License file{" "}
                </label>
                {licensePreview ? (
                  <Link
                    target="_blank"
                    style={{ color: "blue" }}
                    href={licensePreview}
                  >
                    File link
                  </Link>
                ) : (
                  <h6>No file uploaded yet</h6>
                )}
                <input
                  disabled={disabled}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange(e)}
                  // className="absolute mt-2 w-full opacity-0"
                  // className=" mt-2 w-full opacity-0"
                />
              </div>

              <div className="mb-3 flex w-full  flex-col gap-2">
                <label className="text-gray-700 block text-sm font-medium">
                  Other Documents File (Optional)
                </label>
                <div>
                  {otherDocsPreview ? (
                    <Link
                      target="_blank"
                      style={{ color: "blue" }}
                      href={otherDocsPreview}
                    >
                      File link
                    </Link>
                  ) : (
                    <h6>No file uploaded yet</h6>
                  )}
                </div>
                <input
                  disabled={disabled}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChangeOther(e)}
                  // className="absolute mt-2 w-full opacity-0"
                />
              </div>
              <div className="mb-3 w-full">
                <SelectInput
                  // disabled={disabled}
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
                <CommonButton
                  disabled={disabled}
                  loading={loading}
                  label="Update"
                />
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default Detail;
