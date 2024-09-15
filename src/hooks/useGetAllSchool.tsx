"use client";
import { useState, useEffect, useCallback } from "react";
import { apiGetSchoolList } from "@/services/ApiBasic"; // Adjust the import path

type SCHOOL_TYPE = {
  id: number;
  name: string;
  sub_city: string;
  city: string;
  region: string;
  address: string;
  email: string;
  establish_date: string; // ISO date format
  created_date: string; // ISO date format
  updated_date: string; // ISO date format
};

type SCHOOLS_RESPONSE = {
  loadingSchools: boolean;
  errorSchools: string | null;
  optionsSchools: { label: string; value: number }[];
  dataSchools: SCHOOL_TYPE[] | null;
  reloadSchools: () => void; // Reload function type
};

export const useGetAllSchools = (): SCHOOLS_RESPONSE => {
  const [loadingSchools, setLoadingSchools] = useState<boolean>(true);
  const [errorSchools, setErrorSchools] = useState<string | null>(null);
  const [dataSchools, setDataSchools] = useState<SCHOOL_TYPE[] | null>(null);
  const [optionsSchools, setOptionsSchools] = useState<
    { label: string; value: number }[]
  >([]);
  const [reloadFlag, setReloadFlag] = useState<boolean>(false); // Flag for reloading

  const fetchData = useCallback(async () => {
    setLoadingSchools(true);
    setErrorSchools(null);

    try {
      const response = await apiGetSchoolList();
      console.log("response", response);

      const transformedOptions = response?.map((item: any) => ({
        label: `${item?.name} `,
        value: item?.id,
      }));
      setDataSchools(response);
      setOptionsSchools(transformedOptions);

      // } catch (err: any) {
    } finally {
      setLoadingSchools(false);
    }
  }, []);

  // Reload function to trigger data fetching
  const reloadSchools = () => {
    setReloadFlag((prev) => !prev); // Toggling the reloadFlag to trigger useEffect
  };

  useEffect(() => {
    fetchData();
  }, [fetchData, reloadFlag]); // Refetch on component mount and when reloadFlag changes

  return {
    loadingSchools,
    errorSchools,
    optionsSchools,
    dataSchools,
    reloadSchools,
  };
};
