"use client";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { SECTION } from "@/store/features/sections/type";
import { fetchSectionList } from "@/store/features/sections/sectionsSlice";

type SECTION_RESPONSE = {
  loadingSections: boolean;
  errorSections: string | null;
  optionsSections: { label: string; value: number }[];
  dataSections: SECTION[] | null;
  reloadSections: () => void; // Reload function type
};
export const useGetAllSections = (): SECTION_RESPONSE => {
  const dispatch: AppDispatch = useDispatch(); // Use the AppDispatch type
  const [loadingSections, setLoadingSections] = useState<boolean>(true);
  const [errorSections, setErrorSections] = useState<string | null>(null);
  const [dataSections, setDataSections] = useState<SECTION[] | null>(null);
  const [optionsSections, setOptionsSections] = useState<
    { label: string; value: number }[]
  >([]);
  const [reloadFlag, setReloadFlag] = useState<boolean>(false); // Flag for reloading

  const fetchData = useCallback(async () => {
    setLoadingSections(true);
    setErrorSections(null);

    try {
      const data = { size: 10, currentPage: 1 };
      dispatch(fetchSectionList(data))
        .then((data: any) => {
          const transformedOptions = data?.payload?.map((item: any) => ({
            label: `${item?.name}`,
            value: item?.id,
          }));
          setDataSections(data?.payload?.data);
          setOptionsSections(transformedOptions);
        })
        .catch((err) => {
          console.log("err", err);
        });

      // } catch (err: any) {
    } finally {
      setLoadingSections(false);
    }
  }, []);

  // Reload function to trigger data fetching
  const reloadSections = () => {
    setReloadFlag((prev) => !prev); // Toggling the reloadFlag to trigger useEffect
  };

  useEffect(() => {
    fetchData();
  }, [fetchData, reloadFlag]); // Refetch on component mount and when reloadFlag changes

  return {
    loadingSections,
    errorSections,
    optionsSections,
    dataSections,
    reloadSections,
  };
};
