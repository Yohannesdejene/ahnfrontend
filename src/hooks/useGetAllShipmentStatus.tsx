"use client";
import { useState, useEffect, useCallback } from "react";
import { apiGetStatuses } from "@/store/features/shipments/shipmentsApi"; // Import the API function

type STATUS = {
  id: number;
  code: string;
  displayText: string;
  description: string;
  entityType: string;
  who: string;
  createdAt: string;
  updatedAt: string;
};

type STATUS_RESPONSE = {
  loadingStatus: boolean;
  errorStatus: string | null;
  optionsStatus: { label: string; value: number }[];
  dataStatus: STATUS[] | null;
  reloadStatuses: () => void; // Reload function type
};

export const useGetAllShipmentStatuses = (type: string): STATUS_RESPONSE => {
  const [loadingStatus, setLoadingStatus] = useState<boolean>(true);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  const [dataStatus, setDataStatus] = useState<STATUS[] | null>(null);
  const [optionsStatus, setOptionsStatus] = useState<
    { label: string; value: number }[]
  >([]);
  const [reloadFlag, setReloadFlag] = useState<boolean>(false); // Flag for reloading

  const fetchData = useCallback(async () => {
    setLoadingStatus(true);
    setErrorStatus(null);

    try {
      const response = await apiGetStatuses(type);
      const transformedOptions = response?.data?.statuses?.map(
        (item: STATUS) => ({
          label: item.displayText,
          value: item.id,
        }),
      );
      setDataStatus(response?.data?.statuses);
      setOptionsStatus(transformedOptions);
    } catch (err) {
      console.error("Error fetching statuses:", err);
      setErrorStatus("Failed to fetch statuses");
    } finally {
      setLoadingStatus(false);
    }
  }, [type]);

  // Reload function to trigger data fetching
  const reloadStatuses = () => {
    setReloadFlag((prev) => !prev); // Toggling the reloadFlag to trigger useEffect
  };

  useEffect(() => {
    fetchData();
  }, [fetchData, reloadFlag]); // Refetch on component mount and when reloadFlag changes

  return {
    loadingStatus,
    errorStatus,
    optionsStatus,
    dataStatus,
    reloadStatuses,
  };
};
