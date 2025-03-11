"use client"; // Mark as client component

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { apiGetMyPermissions } from "@/services/AuthService";
import {
  getSessionKey,
  setSessionKey,
  setTemporaryToken,
  setUserInfo,
  setPermissionInfo,
} from "@/utils/sessionManager";

// Define the shape of a single permission object
interface Permission {
  name: string;
  description: string;
  code: string;
  permissionType: string; // Adjust based on PermissionType.type from your API
}

// Format permissions from the API response
function formatPermissions(permissions: any[]): Permission[] {
  return permissions.map((permission) => ({
    name: permission.name,
    description: permission.description,
    code: permission.code,
    permissionType: permission.PermissionType.type, // Ensure this matches your API structure
  }));
}

// Define the context type
interface PermissionContextType {
  permission: Permission[] | null;
  loading: boolean;
  error: string | null;
  setPermission: (permissions: Permission[] | null) => void; // Properly typed setPermission
}

// Create the context with an undefined default value
const PermissionContext = createContext<PermissionContextType | undefined>(
  undefined,
);

// Props for the provider
interface PermissionProviderProps {
  children: ReactNode;
}

// Permission Provider Component
export const PermissionProvider: React.FC<PermissionProviderProps> = ({
  children,
}) => {
  const [permission, setPermission] = useState<Permission[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch permissions from the backend
  const fetchPermissions = async () => {
    try {
      setLoading(true); // Set loading before the request
      setError(null); // Clear previous errors

      const res: any = await apiGetMyPermissions(); // Type the response

      if (res?.status === 200) {
        const { role } = res.data;
        const formattedPermissions = formatPermissions(role?.Permissions || []);
        setPermission(formattedPermissions);
        setPermissionInfo(formattedPermissions); // Store in session manager
      } else {
        setError("Something went wrong");
        console.log("else");
      }
    } catch (errors: any) {
      setError(errors.message || "Something went wrong");
      console.log("errors", errors);
    } finally {
      setLoading(false); // Ensure loading is false after the request
    }
  };

  // Fetch permissions on mount and every 5 minutes
  useEffect(() => {
    // Initial fetch
    fetchPermissions();

    // Set up interval to fetch every 5 minutes (300,000 ms)
    const intervalId = setInterval(
      () => {
        fetchPermissions();
      },
      5 * 60 * 1000,
    ); // 5 minutes in milliseconds

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run only on mount

  return (
    <PermissionContext.Provider
      value={{ permission, loading, error, setPermission }}
    >
      {children}
    </PermissionContext.Provider>
  );
};

// Custom hook to use the PermissionContext
export const usePermission = (): PermissionContextType => {
  const context = useContext(PermissionContext);
  if (context === undefined) {
    throw new Error("usePermission must be used within a PermissionProvider");
  }
  return context;
};
