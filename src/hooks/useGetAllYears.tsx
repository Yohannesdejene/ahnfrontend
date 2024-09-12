"use client";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { apiGetYearList } from "@/services/ApiBasic"; // Adjust the import path

type YEARS_TYPE = {
  is_active: Boolean;
  id: number;
  EUC_year: string;
  ETH_year: string;
  created_by: string;
  start_date: string;
  end_date: string;
  updated_date: string;
  created_date: string;
};

type YEARS_RESPONSE = {
  loadingYears: boolean;
  errorYears: string | null;
  optionsYears: { label: string; value: number }[];
  dataYears: YEARS_TYPE[] | null;
  reloadYears: () => void; // Reload function type
};

export const useGetAllYears = (): YEARS_RESPONSE => {
  const [loadingYears, setLoadingYears] = useState<boolean>(true);
  const [errorYears, setErrorYears] = useState<string | null>(null);
  const [dataYears, setDataYears] = useState<YEARS_TYPE[] | null>(null);
  const [optionsYears, setOptionsYears] = useState<
    { label: string; value: number }[]
  >([]);
  const [reloadFlag, setReloadFlag] = useState<boolean>(false); // Flag for reloading

  const fetchData = useCallback(async () => {
    setLoadingYears(true);
    setErrorYears(null);

    try {
      const response = await apiGetYearList();
      console.log("response", response);

      const transformedOptions = response?.map((item: any) => ({
        label: `${item?.ETH_year} + OR +${item?.EUC_year} `,
        value: item?.id,
      }));
      setDataYears(response);
      setOptionsYears(transformedOptions);

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
