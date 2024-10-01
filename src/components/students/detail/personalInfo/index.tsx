"use client";
import React, { useState, useEffect } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { t } from "@/utils/translation";
import { LinearProgress, Chip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store"; // Import RootState and AppDispatch
import { useGetAllYears } from "@/hooks/useGetAllYears";
import Image from "next/image";
const statusShow = (status: boolean) => {
  if (status) {
    return (
      <div className="color-white flex w-full  justify-center bg-success pb-1 pt-1 text-white">
        Active{" "}
      </div>
    );
  } else {
    return (
      <div className="color-white  w-full justify-center bg-danger pb-1 pt-1 text-white">
        Not active
      </div>
    );
  }
};
const PersonalInfo: React.FC = () => {
  const dispatch: AppDispatch = useDispatch(); // Use the AppDispatch type
  const { loadingYears, errorYears, optionsYears, dataYears, reloadYears } =
    useGetAllYears();
  const { getSemesterByIdLoading, updateSemesterLoading } = useSelector(
    (state: RootState) => state.semesters,
  );

  return (
    <>
      <div className=" flex-column w-full bg-white text-black dark:bg-boxdark dark:text-white">
        <div className="d-xs-none flex justify-center">{statusShow(true)}</div>

        <div className="w-full  pb-2 pl-10 pr-10 pt-5">
          <div
            className="relative w-full bg-primary "
            style={{ height: "150px" }}
          >
            <Image
              src="/images/studentImage.png"
              alt="student image"
              layout="fill"
              objectFit="cover"
              className="w-full"
            />
          </div>
        </div>
        <div></div>
        <div className="flex justify-center">
          <h4 className="color-black text-title-md">Haile mikael teka</h4>
        </div>
        <div className="mb-3 mt-2 flex justify-center ">
          <Chip
            // color="info"
            label=" Student"
            sx={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: "#0097B220",
              color: "#0097B2",
              width: { xs: "80%", sm: "60%" },
            }}
          />
        </div>
        <hr className="ml-5 mr-5  pl-5" style={{ color: "#e7e7e7" }}></hr>
        <div className="mb-10 flex w-full flex-col space-y-3 p-5">
          <div className="flex-column bg-gray3 h-14 gap-1 p-2">
            <h6 className="text-title-xsm2 font-light">Admission Date</h6>
            <h6 className="text-title-xsm2 font-medium">24 may 2025</h6>
          </div>
          <div className="flex-column bg-gray3 h-14 gap-1 p-2">
            <h6 className="text-title-xsm2 font-light">Admission Date</h6>
            <h6 className="text-title-xsm2 font-medium">24 may 2025</h6>
          </div>
          <div className="flex-column bg-gray3 h-14 gap-1 p-2">
            <h6 className="text-title-xsm2 font-light">Admission Date</h6>
            <h6 className="text-title-xsm2 font-medium">24 may 2025</h6>
          </div>
          <div className="flex-column bg-gray3 h-14 gap-1 p-2">
            <h6 className="text-title-xsm2 font-light">Admission Date</h6>
            <h6 className="text-title-xsm2 font-medium">24 may 2025</h6>
          </div>
          <div className="flex-column bg-gray3 h-14 gap-1 p-2">
            <h6 className="text-title-xsm2 font-light">Admission Date</h6>
            <h6 className="text-title-xsm2 font-medium">24 may 2025</h6>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalInfo;
