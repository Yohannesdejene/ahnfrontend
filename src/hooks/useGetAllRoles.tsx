"use client";
import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { fetchRoles } from "@/store/features/roles/rolesThunk";
import { ROLE } from "@/store/features/roles/type";

type ROLE_RESPONSE = {
  loadingRole: boolean;
  errorRole: string | null;
  optionsRole: { label: string; value: number }[]; // Options with id and name
  dataRole: ROLE[] | null;
  reloadRoles: () => void; // Reload function type
};

export const useGetAllRoles = (): ROLE_RESPONSE => {
  const dispatch: AppDispatch = useDispatch(); // Use the AppDispatch type
  const [loadingRole, setLoadingRole] = useState<boolean>(true);
  const [errorRole, setErrorRole] = useState<string | null>(null);
  const [dataRole, setDataRole] = useState<ROLE[] | null>(null);
  const [optionsRole, setOptionsRole] = useState<
    { label: string; value: number }[]
  >([]);
  const [reloadFlag, setReloadFlag] = useState<boolean>(false); // Flag for reloading

  const fetchData = useCallback(async () => {
    setLoadingRole(true);
    setErrorRole(null);

    try {
      dispatch(fetchRoles())
        .then((data: any) => {
          console.log("data-d", data);
          const transformedOptions = data?.payload?.roles?.map(
            (item: ROLE) => ({
              label: item.name, // Use the role name as the label
              value: item.id, // Use the role ID as the value
            }),
          );
          console.log("transformedOptions");
          setDataRole(data?.payload);
          setOptionsRole(transformedOptions);
        })
        .catch((err) => {
          console.error("Error fetching roles:", err);
          setErrorRole("Failed to fetch roles");
        });
    } finally {
      setLoadingRole(false);
    }
  }, [dispatch]);

  // Reload function to trigger data fetching
  const reloadRoles = () => {
    setReloadFlag((prev) => !prev); // Toggling the reloadFlag to trigger useEffect
  };

  useEffect(() => {
    fetchData();
  }, [fetchData, reloadFlag]); // Refetch on component mount and when reloadFlag changes

  return {
    loadingRole,
    errorRole,
    optionsRole,
    dataRole,
    reloadRoles,
  };
};
