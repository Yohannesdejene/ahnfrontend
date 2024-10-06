"use client";
import React, { useState, useEffect } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { t } from "@/utils/translation";
import { LinearProgress, Chip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store"; // Import RootState and AppDispatch
import convertISOToNormalDate from "@/utils/formatDate";

const OverView: React.FC = () => {
  const dispatch: AppDispatch = useDispatch(); // Use the AppDispatch type
  const { selectedGrade, getGradeByIdLoading, getGradeByIdError } = useSelector(
    (state: RootState) => state.grades,
  );

  console.log("selectedGrade", selectedGrade);
  return (
    <>
      <div className=" flex-column h-auto w-full  text-black dark:text-white">
        <div className="w-full  pb-2 pl-3 pr-3 pt-5">
          <div
            // className="relative w-full bg-primary "
            style={{ height: "190px" }}
            className="flex items-center justify-center"
          >
            <h1
              className="text-title-xxl4  font-bold tracking-wide"
              style={{ fontWeight: 900 }}
            >
              G-{selectedGrade?.grade?.name}
            </h1>
          </div>
        </div>
        <div></div>

        <hr className="ml-5 mr-5  pl-5" style={{ color: "#e7e7e7" }}></hr>
        <div className="mb-10 flex w-full flex-col space-y-5 p-5">
          <div className="flex-column h-auto gap-1 bg-gray3 p-2 dark:bg-graydark">
            <h6 className="text-title-xsm2 font-light">Total Sections</h6>
            <h6 className="text-title-xsm2 font-medium">
              {selectedGrade?.total_section}
            </h6>
          </div>
          <div className="flex-column h-auto gap-1 bg-gray3 p-2 dark:bg-graydark">
            <h6 className="text-title-xsm2 font-light">Total Students</h6>
            <h6 className="text-title-xsm2 font-medium">
              {" "}
              {selectedGrade?.total_students}
            </h6>
          </div>
          <div className="flex-column h-auto gap-1 bg-gray3 p-2 dark:bg-graydark">
            <h6 className="text-title-xsm2 font-light">Total Subjects</h6>
            <h6 className="text-title-xsm2 font-medium">
              {selectedGrade?.total_subjects}
            </h6>
          </div>
          <div className="flex-column h-auto gap-1 bg-gray3 p-2 dark:bg-graydark">
            <h6 className="text-title-xsm2 font-light">Total Teachers</h6>
            <h6 className="text-title-xsm2 font-medium">
              {selectedGrade?.total_teachers}
            </h6>
          </div>
        </div>
      </div>
    </>
  );
};

export default OverView;
