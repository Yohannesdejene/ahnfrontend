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
import { createUser, fetchUserList } from "@/store/features/user/usersThunk";
import { AppDispatch } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useGetAllRoles } from "@/hooks/useGetAllRoles"; // Import the hook for fetching roles
import { useGetAllBranches } from "@/hooks/useGetAllBranches";

// Form schema for user
const formSchema = z.object({
  firstName: z.string().min(1, { message: "First Name is required" }),
  lastName: z.string().min(1, { message: "Last Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z
    .string()
    .min(9, { message: "Phone must be exactly 9 digits" })
    .max(9, { message: "Phone must be exactly 9 digits" }),
  roleId: z.string().min(1, { message: "Role is required" }),
  branchId: z.string().min(1, { message: "Branch is required" }),
});

interface AddUserProps {
  toggleDrawer: (open: boolean) => void; // Accepting toggleDrawer function as a prop
}

type FormData = z.infer<typeof formSchema>;

const AddUser: React.FC<AddUserProps> = ({ toggleDrawer }) => {
  const dispatch: AppDispatch = useDispatch(); // Use the AppDispatch type
  const { branches } = useSelector((state: RootState) => state.branches); // Assuming branches are fetched elsewhere
  const { loadingRole, errorRole, optionsRole, reloadRoles } = useGetAllRoles(); // Use the hook for roles
  const { loadingBranch, errorBranch, optionsBranch, dataBranch, reloadYears } =
    useGetAllBranches();

  console.log("optionsRole-optionsRole", optionsRole);
  const [loading, setLoading] = useState<boolean>(false);
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const addUser = async (values: FormData) => {
    setLoading(true);
    const newUser = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: `251${values.phone}`, // Add country code
      roleId: parseInt(values.roleId),
      branchId: parseInt(values.branchId),
    };
    dispatch(createUser({ userData: newUser }))
      .then((data) => {
        if (data?.payload?.status === 201) {
          setLoading(false);
          toggleDrawer(false);
          dispatch(fetchUserList());
          // toast.success("User created successfully");
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message || "Failed to create user");
      });
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    addUser(data);
  };

  return (
    <>
      <div className="flex w-full bg-white text-black dark:bg-boxdark dark:text-white">
        <FormProvider {...methods}>
          <div className="container mx-auto mt-0">
            <div className="w-full">
              <div className="p-0">
                <h6 className="text-gray-700 w-full text-lg font-normal">
                  Add User
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
                        name="firstName"
                        label="First Name"
                        placeholder="e.g., John"
                      />
                    </div>
                    <div className="mb-3 w-full">
                      <InputString
                        type="text"
                        name="lastName"
                        label="Last Name"
                        placeholder="e.g., Doe"
                      />
                    </div>
                    <div className="mb-3 w-full">
                      <InputString
                        type="email"
                        name="email"
                        label="Email"
                        placeholder="e.g., user@example.com"
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
                      <SelectInput
                        name="roleId"
                        label="Role"
                        placeholder="Select Role"
                        options={optionsRole} // Use options from the hook
                        loading={loadingRole}
                      />
                    </div>
                    <div className="mb-3 w-full">
                      <SelectInput
                        name="branchId"
                        label="Branch"
                        placeholder="Select Branch"
                        options={optionsBranch}
                        loading={loadingBranch} // Default to false if not provided
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

export default AddUser;
