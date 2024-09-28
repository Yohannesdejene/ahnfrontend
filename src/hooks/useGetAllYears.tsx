"use client";
import { useState, useEffect, useCallback } from "react";
import { apiGetYearList } from "@/services/ApiBasic";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { YEAR } from "@/store/features/years/type";
import {
  fetchYearList,
  createYear,
  updateYear,
  getYearById,
} from "@/store/features/years/yearsSlice";
type YEARS_RESPONSE = {
  loadingYears: boolean;
  errorYears: string | null;
  optionsYears: { label: string; value: number }[];
  dataYears: YEAR[] | null;
  reloadYears: () => void; // Reload function type
};

export const useGetAllYears = (): YEARS_RESPONSE => {
  const dispatch: AppDispatch = useDispatch(); // Use the AppDispatch type
  const [loadingYears, setLoadingYears] = useState<boolean>(true);
  const [errorYears, setErrorYears] = useState<string | null>(null);
  const [dataYears, setDataYears] = useState<YEAR[] | null>(null);
  const [optionsYears, setOptionsYears] = useState<
    { label: string; value: number }[]
  >([]);
  const [reloadFlag, setReloadFlag] = useState<boolean>(false); // Flag for reloading

  const fetchData = useCallback(async () => {
    setLoadingYears(true);
    setErrorYears(null);

    try {
      const data = { size: 10, currentPage: 1 };
      dispatch(fetchYearList(data))
        .then((data: any) => {
          const transformedOptions = data?.payload?.data.map((item: any) => ({
            label: `${item?.ETH_year} ETH  or  ${item?.EUC_year} EUC`,
            value: item?.id,
          }));
          setDataYears(data?.payload?.data);
          setOptionsYears(transformedOptions);
        })
        .catch((err) => {
          console.log("err", err);
        });

      // } catch (err: any) {
    } finally {
      setLoadingYears(false);
    }
  }, []);

  // Reload function to trigger data fetching
  const reloadYears = () => {
    setReloadFlag((prev) => !prev); // Toggling the reloadFlag to trigger useEffect
  };

  useEffect(() => {
    fetchData();
  }, [fetchData, reloadFlag]); // Refetch on component mount and when reloadFlag changes

  return {
    loadingYears,
    errorYears,
    optionsYears,
    dataYears,
    reloadYears,
  };
};
