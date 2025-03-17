"use client";
import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { RATE } from "@/store/features/rates/type";
import { fetchRateList } from "@/store/features/rates/ratesSlice";

type RATE_RESPONSE = {
  loadingRate: boolean;
  errorRate: string | null;
  optionsRate: { label: string; value: number }[];
  dataRate: RATE[] | null;
  reloadRates: () => void; // Reload function type
};

export const useGetAllRates = (): RATE_RESPONSE => {
  const dispatch: AppDispatch = useDispatch(); // Use the AppDispatch type
  const [loadingRate, setLoadingRate] = useState<boolean>(true);
  const [errorRate, setErrorRate] = useState<string | null>(null);
  const [dataRate, setDataRate] = useState<RATE[] | null>(null);
  const [optionsRate, setOptionsRate] = useState<
    { label: string; value: number }[]
  >([]);
  const [reloadFlag, setReloadFlag] = useState<boolean>(false); // Flag for reloading

  const fetchData = useCallback(async () => {
    setLoadingRate(true);
    setErrorRate(null);

    try {
      dispatch(fetchRateList())
        .then((data: any) => {
          const transformedOptions = data?.payload?.data?.rates?.map(
            (item: any) => ({
              label: `${item?.rate} - ${item?.sourceBranchId} to ${item?.destinationBranchId}`,
              value: item?.id,
            }),
          );
          setDataRate(data?.payload?.data?.rates);
          setOptionsRate(transformedOptions);
        })
        .catch((err) => {
          console.error("Error fetching rates:", err);
          setErrorRate("Failed to fetch rates");
        });
    } finally {
      setLoadingRate(false);
    }
  }, [dispatch]);

  // Reload function to trigger data fetching
  const reloadRates = () => {
    setReloadFlag((prev) => !prev); // Toggling the reloadFlag to trigger useEffect
  };

  useEffect(() => {
    fetchData();
  }, [fetchData, reloadFlag]); // Refetch on component mount and when reloadFlag changes

  return {
    loadingRate,
    errorRate,
    optionsRate,
    dataRate,
    reloadRates,
  };
};
