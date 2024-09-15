"use client";
import { useState, useEffect, useCallback } from "react";
import { apiGetCourseList } from "@/services/ApiBasic"; // Adjust the import path

type COURSE_TYPE = {
  id: number;
  name: string;
  code: string;
  department: string;
  created_date: string; // ISO date format
  updated_date: string; // ISO date format
};
type COURSE_RESPONSE = {
  loadingCourse: boolean;
  errorCourse: string | null;
  optionsCourse: { label: string; value: number }[];
  dataCourse: COURSE_TYPE[] | null;
  reloadCourse: () => void; // Reload function type
};

export const useGetAllCourses = (): COURSE_RESPONSE => {
  const [loadingCourse, setLoadingCourse] = useState<boolean>(true);
  const [errorCourse, setErrorCourse] = useState<string | null>(null);
  const [dataCourse, setDataCourse] = useState<COURSE_TYPE[] | null>(null);
  const [optionsCourse, setOptionsCourse] = useState<
    { label: string; value: number }[]
  >([]);
  const [reloadFlag, setReloadFlag] = useState<boolean>(false); // Flag for reloading

  const fetchData = useCallback(async () => {
    setLoadingCourse(true);
    setErrorCourse(null);

    try {
      const response = await apiGetCourseList();
      console.log("response", response);

      const transformedOptions = response?.map((item: any) => ({
        label: `${item?.name} `,
        value: item?.id,
      }));
      setDataCourse(response);
      setOptionsCourse(transformedOptions);

      // } catch (err: any) {
    } finally {
      setLoadingCourse(false);
    }
  }, []);

  // Reload function to trigger data fetching
  const reloadCourse = () => {
    setReloadFlag((prev) => !prev); // Toggling the reloadFlag to trigger useEffect
  };

  useEffect(() => {
    fetchData();
  }, [fetchData, reloadFlag]); // Refetch on component mount and when reloadFlag changes

  return {
    loadingCourse,
    errorCourse,
    optionsCourse,
    dataCourse,
    reloadCourse,
  };
};
