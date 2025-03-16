"use client";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { PAYMENT_MODES } from "@/store/features/paymentModes/type";
import {
  fetchPaymentModeList,
  createPaymentMode,
  updatePaymentMode,
} from "@/store/features/paymentModes/paymentModesSlice";

type PAYMENT_MODE_RESPONSE = {
  loadingPaymentMode: boolean;
  errorPaymentMode: string | null;
  optionsPaymentMode: { label: string; value: number }[];
  dataPaymentMode: PAYMENT_MODES[] | null;
  reloadPaymentModes: () => void; // Reload function type
};

export const useGetAllPaymentModes = (): PAYMENT_MODE_RESPONSE => {
  const dispatch: AppDispatch = useDispatch(); // Use the AppDispatch type
  const [loadingPaymentMode, setLoadingPaymentMode] = useState<boolean>(true);
  const [errorPaymentMode, setErrorPaymentMode] = useState<string | null>(null);
  const [dataPaymentMode, setDataPaymentMode] = useState<
    PAYMENT_MODES[] | null
  >(null);
  const [optionsPaymentMode, setOptionsPaymentMode] = useState<
    { label: string; value: number }[]
  >([]);
  const [reloadFlag, setReloadFlag] = useState<boolean>(false); // Flag for reloading

  const fetchData = useCallback(async () => {
    setLoadingPaymentMode(true);
    setErrorPaymentMode(null);

    try {
      dispatch(fetchPaymentModeList())
        .then((data: any) => {
          const transformedOptions = data?.payload?.data?.paymentModes?.map(
            (item: any) => ({
              label: `${item?.description}`,
              value: item?.id,
            }),
          );
          setDataPaymentMode(data?.payload?.data?.paymentModes);
          setOptionsPaymentMode(transformedOptions);
        })
        .catch((err: any) => {
          console.log("err", err);
        });
    } finally {
      setLoadingPaymentMode(false);
    }
  }, [dispatch]);

  // Reload function to trigger data fetching
  const reloadPaymentModes = () => {
    setReloadFlag((prev) => !prev); // Toggling the reloadFlag to trigger useEffect
  };

  useEffect(() => {
    fetchData();
  }, [fetchData, reloadFlag]); // Refetch on component mount and when reloadFlag changes

  return {
    loadingPaymentMode,
    errorPaymentMode,
    optionsPaymentMode,
    dataPaymentMode,
    reloadPaymentModes,
  };
};
