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

import Image from "next/image";
const statusShow = (status: string | undefined) => {
  if (status == "1") {
    return (
      <div className="color-white flex w-full  justify-center bg-success pb-1 pt-1 text-white">
        Active{" "}
      </div>
    );
  } else {
    return (
      <div className="color-white w-full justify-center bg-danger pb-1 pt-1 text-white">
        Not active
      </div>
    );
  }
};
const OverView: React.FC = () => {
  const dispatch: AppDispatch = useDispatch(); // Use the AppDispatch type
  const { selectedStudents, getStudentsByIdLoading, getStudentsByIdError } =
    useSelector((state: RootState) => state.students);

  return (
    <>
      <div className=" flex-column h-auto w-full  text-black dark:text-white">
        <div className="d-xs-none flex justify-center">
          {statusShow(selectedStudents?.user?.is_active)}
        </div>

        <div className="w-full  pb-2 pl-3 pr-3 pt-5">
          <div
            className="relative w-full bg-primary "
            style={{ height: "300px" }}
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
        <div className="mb-10 flex w-full flex-col space-y-5 p-5">
          <div className="flex-column h-auto gap-1 bg-gray3 p-2 dark:bg-graydark">
            <h6 className="text-title-xsm2 font-light">Admission Date</h6>
            <h6 className="text-title-xsm2 font-medium">
              {convertISOToNormalDate(selectedStudents?.user?.created_date)}
            </h6>
          </div>
          <div className="flex-column h-auto gap-1 bg-gray3 p-2 dark:bg-graydark">
            <h6 className="text-title-xsm2 font-light">Registration Id</h6>
            <h6 className="text-title-xsm2 font-medium">
              {" "}
              {selectedStudents?.user?.id}
            </h6>
          </div>
          <div className="flex-column h-auto gap-1 bg-gray3 p-2 dark:bg-graydark">
            <h6 className="text-title-xsm2 font-light">Grade</h6>
            <h6 className="text-title-xsm2 font-medium">9</h6>
          </div>
          <div className="flex-column h-auto gap-1 bg-gray3 p-2 dark:bg-graydark">
            <h6 className="text-title-xsm2 font-light">Section</h6>
            <h6 className="text-title-xsm2 font-medium">C</h6>
          </div>
        </div>
      </div>
    </>
  );
};

export default OverView;
