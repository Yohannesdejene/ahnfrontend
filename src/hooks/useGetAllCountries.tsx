"use client";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { apiGetCountriesList } from "@/services/ApiCountry"; // Adjust the import path

type AddedBy = {
  id: number;
  firstName: string;
  secondName: string;
  lastName: string;
  email: string;
  phone: string;
  branch: {
    id: number;
    name: string;
    code: string;
    currency: {
      id: number;
      code: string;
      description: string;
    };
    country: {
      id: number;
      name: string;
      isoCode: string;
      countryCode: string;
    };
  };
};

type PaymentMethod = {
  id: number;
  method: string;
  description: string;
  addedBy: AddedBy;
  createdAt: string;
};

type UsePaymentMethodsResult = {
  loadingCountries: boolean;
  errorCountries: string | null;
  optionsCountries: { label: string; value: number }[];
  dataCountries: PaymentMethod[] | null;
  reloadCountries: () => void; // Reload function type
};

export const useGetAllCountries = (): UsePaymentMethodsResult => {
  const [loadingCountries, setLoadingCountries] = useState<boolean>(true);
  const [errorCountries, setErrorCountries] = useState<string | null>(null);
  const [dataCountries, setDataCountries] = useState<PaymentMethod[] | null>(
    null,
  );
  const [optionsCountries, setOptionsCountries] = useState<
    { label: string; value: number }[]
  >([]);
  const [reloadFlag, setReloadFlag] = useState<boolean>(false); // Flag for reloading

  const fetchData = useCallback(async () => {
    setLoadingCountries(true);
    setErrorCountries(null);

    try {
      const response = await apiGetCountriesList();
      console.log("response", response);
      if (response.status === 200) {
        const transformedOptions = response.data.map((item: any) => ({
          label: item.name,
          value: item.id,
        }));
        setDataCountries(response.data);
        setOptionsCountries(transformedOptions);
      } else {
        throw new Error(response.message);
      }
    } catch (err: any) {
      console.log("err", err);
      setErrorCountries(err.message || "An error occurred");
    } finally {
      setLoadingCountries(false);
    }
  }, []);

  // Reload function to trigger data fetching
  const reloadCountries = () => {
    setReloadFlag((prev) => !prev); // Toggling the reloadFlag to trigger useEffect
  };

  useEffect(() => {
    fetchData();
  }, [fetchData, reloadFlag]); // Refetch on component mount and when reloadFlag changes

  return {
    loadingCountries,
    errorCountries,
    optionsCountries,
    dataCountries,
    reloadCountries,
  };
};
