"use client";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { PAYMENT_METHODS } from "@/store/features/paymentMethods/type";
import {
  fetchPaymentMethodList,
  createPaymentMethod,
  updatePaymentMethod,
} from "@/store/features/paymentMethods/paymentMethodsSlice";
type PAYMENT_METHOD_RESPONSE = {
  loadingPaymentMethod: boolean;
  errorPaymentMethod: string | null;
  optionsPaymentMethod: { label: string; value: number }[];
  dataPaymentMethod: PAYMENT_METHODS[] | null;
  reloadPaymentMethods: () => void; // Reload function type
};
export const useGetAllPaymentMethods = (): PAYMENT_METHOD_RESPONSE => {
  const dispatch: AppDispatch = useDispatch(); // Use the AppDispatch type
  const [loadingPaymentMethod, setLoadingPaymentMethod] =
    useState<boolean>(true);
  const [errorPaymentMethod, setErrorPaymentMethod] = useState<string | null>(
    null,
  );
  const [dataPaymentMethod, setDataPaymentMethod] = useState<
    PAYMENT_METHODS[] | null
  >(null);
  const [optionsPaymentMethod, setOptionsPaymentMethod] = useState<
    { label: string; value: number }[]
  >([]);
  const [reloadFlag, setReloadFlag] = useState<boolean>(false); // Flag for reloading

  const fetchData = useCallback(async () => {
    setLoadingPaymentMethod(true);
    setErrorPaymentMethod(null);

    try {
      dispatch(fetchPaymentMethodList())
        .then((data: any) => {
          const transformedOptions = data?.payload?.data?.paymentMethods?.map(
            (item: any) => ({
              label: `${item?.description}`,
              value: item?.id,
            }),
          );
          setDataPaymentMethod(data?.payload?.data?.paymentMethods);
          setOptionsPaymentMethod(transformedOptions);
        })
        .catch((err) => {
          console.log("err", err);
        });
    } finally {
      setLoadingPaymentMethod(false);
    }
  }, [dispatch]);

  // Reload function to trigger data fetching
  const reloadPaymentMethods = () => {
    setReloadFlag((prev) => !prev); // Toggling the reloadFlag to trigger useEffect
  };

  useEffect(() => {
    fetchData();
  }, [fetchData, reloadFlag]); // Refetch on

  return {
    loadingPaymentMethod,
    errorPaymentMethod,
    optionsPaymentMethod,
    dataPaymentMethod,
    reloadPaymentMethods,
  };
};
