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
import {
  Button as BaseButton,
  CircularProgress,
  Alert,
  Tooltip,
} from "@mui/material";
import { createUser, fetchUserList } from "@/store/features/user/usersThunk";
import { fetchRoles } from "@/store/features/roles/rolesThunk";
import { AppDispatch } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { createRole } from "@/store/features/roles/rolesThunk";
import { RootState } from "@/store/store";
import { useGetAllRoles } from "@/hooks/useGetAllRoles"; // Import the hook for fetching roles
import { useGetAllBranches } from "@/hooks/useGetAllBranches";
import { apiGetAllPermission } from "@/store/features/permissions/permissionApi";
import { CiCircleInfo } from "react-icons/ci";

interface Permission {
  id: number;
  name: string;
  code: string;
}
// Define the permissions array with the Permission type
const permissions: Permission[] = [
  {
    id: 1,
    name: "Create User",
    code: "CREATE_USER",
  },
  {
    id: 2,
    name: "Update User",
    code: "UPDATE_USER",
  },
  {
    id: 3,
    name: "Delete User",
    code: "DELETE_USER",
  },
  {
    id: 5,
    name: "View users",
    code: "VIEW_USERS",
  },
  {
    id: 6,
    name: "View roles",
    code: "VIEW_ROLES",
  },
  {
    id: 7,
    name: "Add role",
    code: "ADD_ROLE",
  },
  {
    id: 8,
    name: "Update role",
    code: "UPDATE_ROLE",
  },
  {
    id: 9,
    name: "Delete role",
    code: "DELETE_ROLE",
  },
  {
    id: 10,
    name: "View companies",
    code: "VIEW_COMPANIES",
  },
  {
    id: 11,
    name: "Add company",
    code: "ADD_COMPAny",
  },
  {
    id: 12,
    name: "Update company",
    code: "UPDATE_COMPANY",
  },
  {
    id: 13,
    name: "Delete company",
    code: "DELETE_COMPANY",
  },
  {
    id: 14,
    name: "View branches",
    code: "VIEW_BRANCHES",
  },
  {
    id: 15,
    name: "Add branch",
    code: "Add_BRANCH",
  },
  {
    id: 16,
    name: "Update branch",
    code: "UPDATE_BRANCH",
  },
  {
    id: 17,
    name: "Delete branch",
    code: "DELETE_BRANCH",
  },
  {
    id: 19,
    name: "View shipment rate",
    code: "VIEW_SHIPMENT_RATE",
  },
  {
    id: 20,
    name: "Add shipment rate",
    code: "ADD_SHIPMENT_RATE",
  },
  {
    id: 21,
    name: "Update shipment rate",
    code: "UPDATE_SHIPMENT_RATE",
  },
  {
    id: 22,
    name: "Delete shipment rate",
    code: "DELETE_SHIPMENT_RATE",
  },
  {
    id: 23,
    name: "View shipment type",
    code: "VIEW_SHIPMENT_TYPE",
  },
  {
    id: 24,
    name: "Add shipment type",
    code: "ADD_SHIPMENT_TYPE",
  },
  {
    id: 25,
    name: "Update shipment type",
    code: "UPDATE_SHIPMENT_TYPE",
  },
  {
    id: 26,
    name: "Delete shipment type",
    code: "DELETE_SHIPMENT_TYPE",
  },
  {
    id: 27,
    name: "View payment methods",
    code: "VIEW_PAYMENT_METHODS",
  },
  {
    id: 28,
    name: "Add payment method",
    code: "ADD_PAYMENT_METHOD",
  },
  {
    id: 29,
    name: "Update payment method",
    code: "UPDATE_PAYMENT_METHOD",
  },
  {
    id: 30,
    name: "Delete payment method",
    code: "DELETE_PAYMENT_METHOD",
  },
  {
    id: 31,
    name: "Add air shipment",
    code: "ADD_AIR_SHIPMENT",
  },
  {
    id: 33,
    name: "Arriving air shipment",
    code: "ARRIVING_AIR_SHIPMENT",
  },
  {
    id: 59,
    name: "Branch shipment ground report",
    code: "BRANCH_SHIPMENT_GROUND_REPORT",
  },
  {
    id: 32,
    name: "Accepted air Shipments",
    code: "ACCEPTED_AIR_SHIPMENTS",
  },
  {
    id: 34,
    name: "Arrived air shipment",
    code: "ARRIVED_AIR_SHIPMENT",
  },
  {
    id: 35,
    name: "Delivered air shipment",
    code: "DELIVERED_AIR_SHIPMENT",
  },
  {
    id: 36,
    name: "Credit air shipment",
    code: "CREDIT_AIR_SHIPMENT",
  },
  {
    id: 37,
    name: "All air shipments",
    code: "ALL_AIR_SHIPMENTS",
  },
  {
    id: 38,
    name: "Change air shipment status",
    code: "CHANGE_AIR_SHIPMENT_STATUS",
  },
  {
    id: 40,
    name: "Track air shipment",
    code: "TRACK_AIR_SHIPMENT",
  },
  {
    id: 41,
    name: "Add ground shipment",
    code: "ADD_GROUND_SHIPMENT",
  },
  {
    id: 42,
    name: "Arriving ground shipment",
    code: "ARRIVING_GROUND_SHIPMENT",
  },
  {
    id: 43,
    name: "Accepted ground Shipments",
    code: "ACCEPTED_GROUND_SHIPMENTS",
  },
  {
    id: 44,
    name: "Arrived ground Shipments",
    code: "ARRIVED_GROUND_SHIPMENTS",
  },
  {
    id: 45,
    name: "Delivered ground shipment",
    code: "DELIVERED_GROUND_SHIPMENT",
  },
  {
    id: 46,
    name: "Credit ground shipment",
    code: "CREDIT_GROUND_SHIPMENT",
  },
  {
    id: 47,
    name: "All ground shipments",
    code: "ALL_GROUND_SHIPMENTS",
  },
  {
    id: 48,
    name: "Change ground shipment status",
    code: "CHANGE_GROUND_SHIPMENT_STATUS",
  },
  {
    id: 39,
    name: "Bulk Change air shipment status",
    code: "BULK_CHANGE_BULK_AIR_SHIPMENT_STATUS",
  },
  {
    id: 49,
    name: "Bulk Change ground shipment status",
    code: "BULK_CHANGE_BULK_GROUND_SHIPMENT_STATUS",
  },
  {
    id: 51,
    name: "Update ground shipment",
    code: "UPDATE_GROUND_SHIPMENT",
  },
  {
    id: 52,
    name: "Update air shipment",
    code: "UPDATE_AIR_SHIPMENT",
  },
  {
    id: 53,
    name: "Generate invoice air shipment",
    code: "GENERATE_INVOICE_AIR_SHIPMENT",
  },
  {
    id: 54,
    name: "Generate invoice ground shipment",
    code: "GENERATE_INVOICE_GROUND_SHIPMENT",
  },
  {
    id: 50,
    name: "Track ground shipment",
    code: "TRACK_ground_SHIPMENT",
  },
  {
    id: 60,
    name: "All branch ground report",
    code: "ALL_BRANCH_GROUND_REPORT",
  },
  {
    id: 56,
    name: "Branch shipment air report",
    code: "BRANCH_SHIPMENT_AIR_REPORT",
  },
  {
    id: 57,
    name: "All branch air report",
    code: "ALL_BRANCH_AIR_REPORT",
  },
  {
    id: 55,
    name: "Branch credit air report",
    code: "BRANCH_CREDIT_AIR_REPORT",
  },
  {
    id: 58,
    name: "Branch credit ground report",
    code: "BRANCH_CREDIT_GROUND_REPORT",
  },
  {
    id: 61,
    name: "Admin shipment report",
    code: "ADMIN_SHIPMENT_REPORT",
  },
  {
    id: 62,
    name: "View detail air shipment ",
    code: "VIEW_DETAIL_AIR_SHIPMENT",
  },
  {
    id: 63,
    name: "View detail ground shipment",
    code: "VIEW_DETAIL_GROUND_SHIPMENT",
  },
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
  Ground_Shipment: Permission[];
  Air_Shipment_Report: Permission[];
  Ground_Shipment_Report: Permission[];
  Admin_Shipment_Report: Permission[];
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
    Ground_Shipment: [],
    Air_Shipment_Report: [],
    Ground_Shipment_Report: [],
    Admin_Shipment_Report: [],
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
    } else if (nameLower.includes("shipment rate")) {
      categories.Shipment_Rate.push(perm);
    } else if (nameLower.includes("shipment type")) {
      categories.Shipment_Type.push(perm);
    } else if (nameLower.includes("payment method")) {
      categories.Payment_Method.push(perm);
    } else if (nameLower.includes("air shipment")) {
      categories.Air_Shipment.push(perm);
    } else if (nameLower.includes("ground shipment")) {
      categories.Ground_Shipment.push(perm);
    } else if (nameLower.includes("air report")) {
      categories.Air_Shipment_Report.push(perm);
    } else if (nameLower.includes("ground report")) {
      categories.Ground_Shipment_Report.push(perm);
    } else if (nameLower.includes("Admin shipment report")) {
      categories.Admin_Shipment_Report.push(perm);
    } else if (nameLower.includes("branches") || nameLower.includes("branch")) {
      categories.Branch.push(perm);
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

interface AddUserProps {
  setIsDialogOpen: (open: boolean) => void; // Accepting toggleDrawer function as a prop
}

type FormData = z.infer<typeof formSchema>;

const AddRole: React.FC<AddUserProps> = ({ setIsDialogOpen }) => {
  ////permission
  const categorizedPermissions = categorizePermissions(permissions);
  const [selectedPermissions, setSelectedPermissions] = useState<Set<string>>(
    new Set(),
  );
  const [allPermissions, setAllPermissions] = useState([]);
  const handleCheckboxChange = (code: string) => {
    setSelectedPermissions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(code)) {
        newSet.delete(code);
      } else {
        newSet.add(code);
      }
      return newSet;
    });
  };
  console.log("allPermissions", allPermissions);
  console.log("selectedPermissions", selectedPermissions);

  const handleAllCheckboxChange = () => {
    console.log("selectedPermissions?.size", selectedPermissions?.size);
    console.log("allPermissions?.length", allPermissions?.length);
    setSelectedPermissions((prev: any) => {
      if (prev.size === allPermissions.length) {
        console.log("yes size ");
        // If all are already selected, deselect all
        return new Set();
      } else {
        console.log("no size ");
        // Select all permissions
        return new Set(allPermissions.map((perm: any) => perm.code));
      }
    });
  };
  const dispatch: AppDispatch = useDispatch(); // Use the AppDispatch type
  // console.log("optionsRole-optionsRole", optionsRole);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorResponse, setErrorResponse] = useState(null);
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const { errors } = methods?.formState;
  const addUser = async (values: FormData) => {
    let selectedPermissionArray = [...selectedPermissions];
    if (selectedPermissionArray?.length < 1) {
      toast.error("Please check at least one permission");
      return;
    }
    setLoading(true);
    const permissions = getPermissionIds(
      allPermissions,
      selectedPermissionArray,
    );

    const request_body = {
      name: values?.name,
      description: values?.description,
      permissionIds: permissions,
    };

    dispatch(createRole({ roleData: request_body }))
      .then((data: any) => {
        console.log("data", data);
        if (data?.payload?.status === 201) {
          setLoading(false);
          setIsDialogOpen(false);
          dispatch(fetchRoles());
        } else {
          setErrorResponse(data?.payload || "Something went wrong try again");
          setLoading(false);
        }
      })
      .catch((error) => {
        setErrorResponse(
          error?.response?.data?.payload || "Something went wrong try again",
        );

        console.log("error", error);
        setLoading(false);
        toast.error(error.message || "Failed to create user");
      });
  };
  useEffect(() => {
    const fetchPermissions = async () => {
      let permissions: any = await apiGetAllPermission();
      if (permissions?.status === 200) {
        setAllPermissions(permissions?.data?.permissions);
      }
      console.log("allPermission", permissions);
    };

    fetchPermissions();
  }, []);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setErrorResponse(null);
    setLoading(true);
    console.log("test sending data....");
    addUser(data);
  };

  return (
    <>
      <div
        className=" m-0 flex w-full bg-white   p-5 text-black dark:bg-boxdark dark:text-white"
        style={{ minHeight: "50vh" }}
      >
        <FormProvider {...methods}>
          <div className="container mx-auto mt-0">
            <div className="w-full">
              {errorResponse && <Alert severity="error">{errorResponse}</Alert>}
              <div className="w-full">
                <form
                  onSubmit={methods.handleSubmit(onSubmit)}
                  className="p-fluid"
                >
                  <div className="container mx-auto p-4">
                    <div className="grid w-full grid-cols-1  gap-4 p-5 md:grid-cols-2 ">
                      <div className="">
                        <InputString
                          name="name"
                          label="Role name"
                          type="text"
                          placeholder="ex .Admin"
                          disabled={false}
                        />
                      </div>
                      <div>
                        <InputString
                          name="description"
                          label="Description"
                          type="text"
                          placeholder="ex .Admin of the system"
                          disabled={false}
                        />
                      </div>
                    </div>
                    <h2 className="text-gray-800 mb-6 mt-5 text-2xl font-semibold dark:text-white">
                      Permissions
                    </h2>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        margin: "8px 0 24px 0",
                      }}
                    >
                      <h3>Administrator Access</h3>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "16px",
                        }}
                      >
                        {/* Tooltip Wrapper */}
                        <div style={{ position: "relative" }}>
                          {/* Tooltip Content */}
                          <span
                            style={{
                              position: "absolute",
                              backgroundColor: "#1f2937",
                              color: "white",
                              fontSize: "14px",
                              fontWeight: "bold",
                              padding: "4px 8px",
                              borderRadius: "4px",
                              bottom: "100%",
                              left: "50%",
                              transform: "translateX(-50%)",
                              marginBottom: "8px",
                              whiteSpace: "nowrap",
                              visibility: "hidden",
                              opacity: 0,
                              transition: "opacity 0.2s",
                              zIndex: 10,
                            }}
                            className="tooltip"
                          >
                            Grant full access to the system
                            {/* Arrow */}
                            <span
                              style={{
                                position: "absolute",
                                width: 0,
                                height: 0,
                                borderTop: "6px solid #1f2937",
                                borderLeft: "6px solid transparent",
                                borderRight: "6px solid transparent",
                                top: "100%",
                                left: "50%",
                                transform: "translateX(-50%)",
                              }}
                            ></span>
                          </span>
                          {/* Icon */}
                          <CiCircleInfo
                            style={{ fontSize: "20px", cursor: "pointer" }}
                            onMouseEnter={(e: any) =>
                              (e.currentTarget.previousSibling.style.visibility =
                                "visible") &&
                              (e.currentTarget.previousSibling.style.opacity = 1)
                            }
                            onMouseLeave={(e: any) =>
                              (e.currentTarget.previousSibling.style.visibility =
                                "hidden") &&
                              (e.currentTarget.previousSibling.style.opacity = 0)
                            }
                          />
                        </div>

                        {/* Checkbox */}
                        <input
                          type="checkbox"
                          id="perm-select-all"
                          checked={
                            selectedPermissions?.size === allPermissions?.length
                          } // Checked if all permissions are selected                          onChange={() => handleCheckboxChange(perm.code)}
                          onChange={handleAllCheckboxChange} // Toggle all permissions
                          style={{
                            height: "16px",
                            width: "16px",
                            border: "1px solid #d1d5db",
                            borderRadius: "4px",
                          }}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {Object.entries(categorizedPermissions).map(
                        ([category, perms], index: number) =>
                          perms.length > 0 && (
                            <div
                              key={index}
                              className="dark:bg-gray-800 rounded-lg bg-white p-4 shadow-md dark:bg-boxdark"
                            >
                              <h3 className="text-gray-700 dark:text-gray-200 mb-3 text-lg font-medium">
                                {category}
                              </h3>
                              <ul className="space-y-2">
                                {perms.map((perm: any, index: number) => (
                                  <li key={index} className="flex items-center">
                                    <input
                                      type="checkbox"
                                      id={`perm-${perm.id}`}
                                      checked={selectedPermissions.has(
                                        perm.code,
                                      )}
                                      onChange={() =>
                                        handleCheckboxChange(perm.code)
                                      }
                                      className="border-gray-300 h-4 w-4 rounded text-blue-600 focus:ring-blue-500"
                                    />
                                    <label
                                      htmlFor={`perm-${perm.id}`}
                                      className="text-gray-600 dark:text-gray-300 ml-2 text-sm"
                                    >
                                      {perm.name}
                                    </label>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ),
                      )}
                    </div>
                  </div>
                  {errorResponse && (
                    <Alert severity="error">{errorResponse}</Alert>
                  )}
                  <div className="mb-5 mt-4  flex  justify-center gap-4">
                    <BaseButton
                      variant="outlined"
                      style={{
                        textTransform: "none",
                        // backgroundColor: "#0f6f03",
                        color: "gray",
                        fontWeight: "bold",
                        // marginLeft: "auto",
                        display: "flex",
                        margin: "0px",
                        padding: "0px",
                        border: "1px solid gray",
                        paddingLeft: "20px",
                        paddingRight: "20px",
                      }}
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Cancel{" "}
                    </BaseButton>

                    <BaseButton
                      disabled={loading}
                      type="submit"
                      variant="outlined"
                      style={{
                        textTransform: "none",
                        backgroundColor: "#0f6f03",
                        // color: "white",
                        color: "white",
                        fontWeight: "bold",
                        // marginLeft: "auto",
                        display: "flex",
                        margin: "0px",
                        paddingLeft: "20px",
                        paddingRight: "20px",

                        border: "1px solid gray",
                      }}
                    >
                      {loading ? (
                        <div className="flex items-center justify-center text-white ">
                          <CircularProgress
                            size={20}
                            className="mr-2 text-white"
                            sx={{ color: "#ffffff" }}
                          />
                          Loading...
                        </div>
                      ) : (
                        <span>Submit</span>
                      )}{" "}
                    </BaseButton>
                    {/* <CommonButton loading={loading} label="Submit" /> */}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </FormProvider>
      </div>
    </>
  );
};

export default AddRole;
