"use client";
import React, { useState, useEffect } from "react";
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
import { RootState, AppDispatch } from "@/store/store"; // Import RootState and AppDispatch
import { useDispatch, useSelector } from "react-redux";
import {
  getUserById,
  updateUser,
  fetchUserList,
} from "@/store/features/user/usersThunk";
import { useGetAllRoles } from "@/hooks/useGetAllRoles"; // Import the hook for roles
import { useGetAllBranches } from "@/hooks/useGetAllBranches";

// Form schema for user
const formSchema = z.object({
  firstName: z.string().min(1, { message: "First Name is required" }),
  lastName: z.string().min(1, { message: "Last Name is required" }),
  email: z.string().optional(),
  phone: z.string().optional(),
  roleId: z.string().min(1, { message: "Role is required" }),
  branchId: z.string().min(1, { message: "Branch is required" }),
});

interface EditUserProps {
  id: number | string | null;
  toggleDrawer: (open: boolean) => void; // Accepting toggleDrawer function as a prop
  setId: (id: number | null | string) => void; // Setters don't return a value
}

type FormData = z.infer<typeof formSchema>;

const EditUser: React.FC<EditUserProps> = ({ toggleDrawer, setId, id }) => {
  const dispatch: AppDispatch = useDispatch(); // Use the AppDispatch type
  const { loadingUser, errorUser } = useSelector(
    (state: RootState) => state.user,
  );
  const { loadingBranch, errorBranch, optionsBranch, dataBranch, reloadYears } =
    useGetAllBranches();
  const { branches } = useSelector((state: RootState) => state.branches); // Assuming branches are fetched elsewhere
  const { loadingRole, errorRole, optionsRole, reloadRoles } = useGetAllRoles(); // Use the hook for roles

  const [loading, setLoading] = useState<boolean>(false);
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const editUser = async (values: FormData) => {
    setLoading(true);
    const updatedUser = {
      firstName: values.firstName,
      lastName: values.lastName,
      // email: values.email,
      // phone: `251${values.phone}`,
      roleId: parseInt(values.roleId),
      branchId: parseInt(values.branchId),
    };
    dispatch(updateUser({ id, userData: updatedUser }))
      .then((data) => {
        if (data?.payload?.status === 200) {
          toggleDrawer(false);
          setLoading(false);
          dispatch(fetchUserList());
          // toast.success("User updated successfully");
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message || "Failed to update user");
      });
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    editUser(data);
  };

  useEffect(() => {
    if (id) {
      dispatch(getUserById(id))
        .then((data: any) => {
          methods.reset({
            firstName: data?.payload?.data?.user?.firstName || "",
            lastName: data?.payload?.data?.user?.lastName || "",
            email: data?.payload?.data?.user?.email || "",
            phone: data?.payload?.data?.user?.phone?.slice(3) || "", // Remove country code
            roleId: data?.payload?.data?.user?.roleId || 0,
            branchId: data?.payload?.data?.user?.branchId || 0,
          });
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
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
                  Edit User
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
                        disabled={true}
                      />
                    </div>
                    <div className="mb-3 w-full">
                      <EthiopianNumberInput
                        type="text"
                        name="phone"
                        label="Phone"
                        placeholder="e.g., 912345678"
                        disabled={true}
                      />
                    </div>
                    <div className="mb-3 w-full">
                      {loadingRole ? (
                        <p>Loading roles...</p>
                      ) : errorRole ? (
                        <p className="text-red-500">{errorRole}</p>
                      ) : (
                        <SelectInput
                          name="roleId"
                          label="Role"
                          placeholder="Select Role"
                          options={optionsRole} // Use options from the hook
                          loading={loadingRole}
                        />
                      )}
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

export default EditUser;
