"use client";
import { useState, useEffect, useCallback } from "react";
import { apiGetYearList } from "@/services/ApiBasic";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { BRANCHES } from "@/store/features/branches/type";
import {
  fetchBranchList,
  createBranch,
  updateBranch,
} from "@/store/features/branches/branchesSlice";
type BRANCH_RESPONSE = {
  loadingBranch: boolean;
  errorBranch: string | null;
  optionsBranch: { label: string; value: number }[];
  dataBranch: BRANCHES[] | null;
  reloadYears: () => void; // Reload function type
};

export const useGetAllBranches = (): BRANCH_RESPONSE => {
  const dispatch: AppDispatch = useDispatch(); // Use the AppDispatch type
  const [loadingBranch, setLoadingBranch] = useState<boolean>(true);
  const [errorBranch, setErrorBranch] = useState<string | null>(null);
  const [dataBranch, setDataBranch] = useState<BRANCHES[] | null>(null);
  const [optionsBranch, setOptionsBranch] = useState<
    { label: string; value: number }[]
  >([]);
  const [reloadFlag, setReloadFlag] = useState<boolean>(false); // Flag for reloading
  const fetchData = useCallback(async () => {
    setLoadingBranch(true);
    setErrorBranch(null);

    try {
      dispatch(fetchBranchList())
        .then((data: any) => {
          const transformedOptions = data?.payload?.data?.branches?.map(
            (item: any) => ({
              label: `${item?.name}( ${item?.location} )`,
              value: item?.id,
            }),
          );
          setDataBranch(data?.payload?.data?.branches);
          setOptionsBranch(transformedOptions);
        })
        .catch((err) => {
          console.log("err", err);
        });

      // } catch (err: any) {
    } finally {
      setLoadingBranch(false);
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
    loadingBranch,
    errorBranch,
    optionsBranch,
    dataBranch,
    reloadYears,
  };
};
