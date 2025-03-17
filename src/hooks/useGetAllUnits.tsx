"use client";
import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { UNIT } from "@/store/features/unit/type";
import { fetchUnitList } from "@/store/features/unit/unitsSlice";

type UNIT_RESPONSE = {
  loadingUnit: boolean;
  errorUnit: string | null;
  optionsUnit: { label: string; value: number }[];
  dataUnit: UNIT[] | null;
  reloadUnits: () => void; // Reload function type
};

export const useGetAllUnits = (): UNIT_RESPONSE => {
  const dispatch: AppDispatch = useDispatch(); // Use the AppDispatch type
  const [loadingUnit, setLoadingUnit] = useState<boolean>(true);
  const [errorUnit, setErrorUnit] = useState<string | null>(null);
  const [dataUnit, setDataUnit] = useState<UNIT[] | null>(null);
  const [optionsUnit, setOptionsUnit] = useState<
    { label: string; value: number }[]
  >([]);
  const [reloadFlag, setReloadFlag] = useState<boolean>(false); // Flag for reloading

  const fetchData = useCallback(async () => {
    setLoadingUnit(true);
    setErrorUnit(null);

    try {
      dispatch(fetchUnitList())
        .then((data: any) => {
          const transformedOptions = data?.payload?.data?.units?.map(
            (item: any) => ({
              label: `${item?.code}`,
              value: item?.id,
            }),
          );
          setDataUnit(data?.payload?.data?.units);
          setOptionsUnit(transformedOptions);
        })
        .catch((err) => {
          console.error("Error fetching units:", err);
          setErrorUnit("Failed to fetch units");
        });
    } finally {
      setLoadingUnit(false);
    }
  }, [dispatch]);

  // Reload function to trigger data fetching
  const reloadUnits = () => {
    setReloadFlag((prev) => !prev); // Toggling the reloadFlag to trigger useEffect
  };

  useEffect(() => {
    fetchData();
  }, [fetchData, reloadFlag]); // Refetch on component mount and when reloadFlag changes

  return {
    loadingUnit,
    errorUnit,
    optionsUnit,
    dataUnit,
    reloadUnits,
  };
};
