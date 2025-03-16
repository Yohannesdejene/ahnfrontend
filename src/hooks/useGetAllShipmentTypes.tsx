"use client";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { SHIPMENT_TYPES } from "@/store/features/shipmentTypes/type";
import {
  fetchShipmentTypeList,
  createShipmentType,
  updateShipmentType,
} from "@/store/features/shipmentTypes/shipmentTypeSlice";
type SHIPMENT_TYPE_RESPONSE = {
  loadingShipmentType: boolean;
  errorShipmentType: string | null;
  optionsShipmentType: { label: string; value: number }[];
  dataShipmentType: SHIPMENT_TYPES[] | null;
  reloadShipmentTypes: () => void; // Reload function type
};

export const useGetAllShipmentTypes = (): SHIPMENT_TYPE_RESPONSE => {
  const dispatch: AppDispatch = useDispatch(); // Use the AppDispatch type
  const [loadingShipmentType, setLoadingShipmentType] = useState<boolean>(true);
  const [errorShipmentType, setErrorShipmentType] = useState<string | null>(
    null,
  );
  const [dataShipmentType, setDataShipmentType] = useState<
    SHIPMENT_TYPES[] | null
  >(null);
  const [optionsShipmentType, setOptionsShipmentType] = useState<
    { label: string; value: number }[]
  >([]);
  const [reloadFlag, setReloadFlag] = useState<boolean>(false); // Flag for reloading

  const fetchData = useCallback(async () => {
    setLoadingShipmentType(true);
    setErrorShipmentType(null);

    try {
      dispatch(fetchShipmentTypeList())
        .then((data: any) => {
          const transformedOptions = data?.payload?.data?.shipmentTypes?.map(
            (item: any) => ({
              label: `${item?.description}`,
              value: item?.id,
            }),
          );
          setDataShipmentType(data?.payload?.data?.shipmentTypes);
          setOptionsShipmentType(transformedOptions);
        })
        .catch((err) => {
          console.log("err", err);
        });
    } finally {
      setLoadingShipmentType(false);
    }
  }, [dispatch]);

  // Reload function to trigger data fetching
  const reloadShipmentTypes = () => {
    setReloadFlag((prev) => !prev); // Toggling the reloadFlag to trigger useEffect
  };

  useEffect(() => {
    fetchData();
  }, [fetchData, reloadFlag]); // Refetch on component mount and when reloadFlag changes

  return {
    loadingShipmentType,
    errorShipmentType,
    optionsShipmentType,
    dataShipmentType,
    reloadShipmentTypes,
  };
};
