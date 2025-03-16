"use client";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { SHIPMENT_MODES } from "@/store/features/shipmentModes/type";
import {
  fetchShipmentModeList,
  createShipmentMode,
  updateShipmentMode,
} from "@/store/features/shipmentModes/shipmentModesSlice";
type SHIPMENT_MODE_RESPONSE = {
  loadingShipmentMode: boolean;
  errorShipmentMode: string | null;
  optionsShipmentMode: { label: string; value: number }[];
  dataShipmentMode: SHIPMENT_MODES[] | null;
  reloadShipmentModes: () => void; // Reload function type
};
export const useGetAllShipmentModes = (): SHIPMENT_MODE_RESPONSE => {
  const dispatch: AppDispatch = useDispatch(); // Use the AppDispatch type
  const [loadingShipmentMode, setLoadingShipmentMode] = useState<boolean>(true);
  const [errorShipmentMode, setErrorShipmentMode] = useState<string | null>(
    null,
  );
  const [dataShipmentMode, setDataShipmentMode] = useState<
    SHIPMENT_MODES[] | null
  >(null);
  const [optionsShipmentMode, setOptionsShipmentMode] = useState<
    { label: string; value: number }[]
  >([]);
  const [reloadFlag, setReloadFlag] = useState<boolean>(false); // Flag for reloading

  const fetchData = useCallback(async () => {
    setLoadingShipmentMode(true);
    setErrorShipmentMode(null);

    try {
      dispatch(fetchShipmentModeList())
        .then((data: any) => {
          const transformedOptions = data?.payload?.data?.shipmentModes?.map(
            (item: any) => ({
              label: `${item?.description}`,
              value: item?.id,
            }),
          );
          setDataShipmentMode(data?.payload?.data?.shipmentModes);
          setOptionsShipmentMode(transformedOptions);
        })
        .catch((err) => {
          console.log("err", err);
        });
    } finally {
      setLoadingShipmentMode(false);
    }
  }, [dispatch]);

  // Reload function to trigger data fetching
  const reloadShipmentModes = () => {
    setReloadFlag((prev) => !prev); // Toggling the reloadFlag to trigger useEffect
  };

  useEffect(() => {
    fetchData();
  }, [fetchData, reloadFlag]); // Refetch on component mount and when reloadFlag changes

  return {
    loadingShipmentMode,
    errorShipmentMode,
    optionsShipmentMode,
    dataShipmentMode,
    reloadShipmentModes,
  };
};
