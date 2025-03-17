"use client";
import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { COMPANY } from "@/store/features/company/type";
import { fetchCompanyList } from "@/store/features/company/companiesThunk";

type COMPANY_RESPONSE = {
  loadingCompany: boolean;
  errorCompany: string | null;
  optionsCompany: { label: string; value: number }[];
  dataCompany: COMPANY[] | null;
  reloadCompanies: () => void; // Reload function type
};

export const useGetAllCompanies = (): COMPANY_RESPONSE => {
  const dispatch: AppDispatch = useDispatch(); // Use the AppDispatch type
  const [loadingCompany, setLoadingCompany] = useState<boolean>(true);
  const [errorCompany, setErrorCompany] = useState<string | null>(null);
  const [dataCompany, setDataCompany] = useState<COMPANY[] | null>(null);
  const [optionsCompany, setOptionsCompany] = useState<
    { label: string; value: number }[]
  >([]);
  const [reloadFlag, setReloadFlag] = useState<boolean>(false); // Flag for reloading

  const fetchData = useCallback(async () => {
    setLoadingCompany(true);
    setErrorCompany(null);

    try {
      dispatch(fetchCompanyList())
        .then((data: any) => {
          const transformedOptions = data?.payload?.data?.companies?.map(
            (item: any) => ({
              label: item?.name, // Use the company name as the label
              value: item?.id, // Use the company ID as the value
            }),
          );
          setDataCompany(data?.payload?.data?.companies);
          setOptionsCompany(transformedOptions);
        })
        .catch((err) => {
          console.error("Error fetching companies:", err);
          setErrorCompany("Failed to fetch companies");
        });
    } finally {
      setLoadingCompany(false);
    }
  }, [dispatch]);

  // Reload function to trigger data fetching
  const reloadCompanies = () => {
    setReloadFlag((prev) => !prev); // Toggling the reloadFlag to trigger useEffect
  };

  useEffect(() => {
    fetchData();
  }, [fetchData, reloadFlag]); // Refetch on component mount and when reloadFlag changes

  return {
    loadingCompany,
    errorCompany,
    optionsCompany,
    dataCompany,
    reloadCompanies,
  };
};
