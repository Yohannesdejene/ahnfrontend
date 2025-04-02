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

interface Permission {
  id: number;
  name: string;
  code: string;
}
// Define the permissions array with the Permission type
const permissions: Permission[] = [
  { id: 1, name: "Create User", code: "CREATE_USER" },
  { id: 2, name: "Update User", code: "UPDATE_USER" },
  { id: 3, name: "Delete User", code: "DELETE_USER" },
  { id: 5, name: "View users", code: "VIEW_USERS" },
  { id: 6, name: "View roles", code: "VIEW_ROLES" },
  { id: 7, name: "Add role", code: "ADD_ROLE" },
  { id: 8, name: "Update role", code: "UPDATE_ROLE" },
  { id: 9, name: "Delete role", code: "DELETE_ROLE" },
  { id: 10, name: "View companies", code: "VIEW_COMPANIES" },
  { id: 11, name: "Add company", code: "ADD_COMPANY" },
  { id: 12, name: "Update company", code: "UPDATE_COMPANY" },
  { id: 13, name: "Delete company", code: "DELETE_COMPANY" },
  { id: 14, name: "View branches", code: "VIEW_BRANCHES" },
  { id: 15, name: "Add branch", code: "ADD_BRANCH" },
  { id: 16, name: "Update branch", code: "UPDATE_BRANCH" },
  { id: 17, name: "Delete branch", code: "DELETE_BRANCH" },
  { id: 19, name: "View shipment rate", code: "VIEW_SHIPMENT_RATE" },
  { id: 20, name: "Add shipment rate", code: "ADD_SHIPMENT_RATE" },
  { id: 21, name: "Update shipment rate", code: "UPDATE_SHIPMENT_RATE" },
  { id: 22, name: "Delete shipment rate", code: "DELETE_SHIPMENT_RATE" },
  { id: 23, name: "View shipment type", code: "VIEW_SHIPMENT_TYPE" },
  { id: 24, name: "Add shipment type", code: "ADD_SHIPMENT_TYPE" },
  { id: 25, name: "Update shipment type", code: "UPDATE_SHIPMENT_TYPE" },
  { id: 26, name: "Delete shipment type", code: "DELETE_SHIPMENT_TYPE" },
  { id: 27, name: "View payment methods", code: "VIEW_PAYMENT_METHODS" },
  { id: 28, name: "Add payment method", code: "ADD_PAYMENT_METHOD" },
  { id: 29, name: "Update payment method", code: "UPDATE_PAYMENT_METHOD" },
  { id: 30, name: "Delete payment method", code: "DELETE_PAYMENT_METHOD" },
  { id: 31, name: "Add air shipment", code: "ADD_AIR_SHIPMENT" },
  {
    id: 32,
    name: "Ready for pickup air shipment",
    code: "READY_FOR_PICKUP_AIR_SHIPMENT",
  },
  { id: 33, name: "Arriving air shipment", code: "ARRIVING_AIR_SHIPMENT" },
];

// Define the categories type
interface PermissionCategories {
  User: Permission[];
  Role: Permission[];
  Company: Permission[];
  Branch: Permission[];
  Shipment_Rate: Permission[];
  Shipment_Type: Permission[];
  Payment_Method: Permission[];
  Air_Shipment: Permission[];
}
// Function to categorize permissions
const categorizePermissions = (
  permissions: Permission[],
): PermissionCategories => {
  const categories: PermissionCategories = {
    User: [],
    Role: [],
    Company: [],
    Branch: [],
    Shipment_Rate: [],
    Shipment_Type: [],
    Payment_Method: [],
    Air_Shipment: [],
  };

  permissions.forEach((perm: Permission) => {
    const nameLower = perm.name.toLowerCase();
    if (nameLower.includes("user")) {
      categories.User.push(perm);
    } else if (nameLower.includes("role")) {
      categories.Role.push(perm);
    } else if (
      nameLower.includes("company") ||
      nameLower.includes("companies")
    ) {
      categories.Company.push(perm);
    } else if (nameLower.includes("branch")) {
      categories.Branch.push(perm);
    } else if (nameLower.includes("shipment rate")) {
      categories.Shipment_Rate.push(perm);
    } else if (nameLower.includes("shipment type")) {
      categories.Shipment_Type.push(perm);
    } else if (nameLower.includes("payment method")) {
      categories.Payment_Method.push(perm);
    } else if (nameLower.includes("air shipment")) {
      categories.Air_Shipment.push(perm);
    }
  });

  return categories;
};
function getPermissionIds(
  permissionObjects: Permission[],
  permissionCodes: any,
) {
  console.log("permissionCodes", permissionCodes);
  // Map through permissionCodes and find matching id from permissionObjects
  return permissionCodes
    .map((code: any) => {
      const permission = permissionObjects.find((obj) => obj.code === code);
      return permission ? permission.id : null; // Return null if no match found
    })
    .filter((id: any) => id !== null); // Optional: filter out null values if you want only valid IDs
}

// Form schema for user
const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
});

interface EditUserProps {
  id: number | string | null;
  setIsDialogOpen: (open: boolean) => void; // Accepting toggleDrawer function as a prop
  setId: (id: number | null | string) => void; // Setters don't return a value
}

type FormData = z.infer<typeof formSchema>;

const EditRole: React.FC<EditUserProps> = ({ setIsDialogOpen, setId, id }) => {
  const dispatch: AppDispatch = useDispatch(); // Use the AppDispatch type
  const { loadingUser, errorUser } = useSelector(
    (state: RootState) => state.user,
  );
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
          setIsDialogOpen(false);
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
      <div
        className="flex w-full bg-white text-black dark:bg-boxdark dark:text-white"
        style={{ minHeight: "50vh" }}
      >
        <FormProvider {...methods}>
          <div className="container mx-auto mt-0">
            <div className="w-full">
              <div className="p-0">
                <hr className="mb-4 mt-4 w-full text-lg font-normal text-normalGray" />
                <div className="w-full">
                  <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className="p-fluid"
                  >
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

export default EditRole;
