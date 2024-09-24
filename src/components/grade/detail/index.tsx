"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getGradeById } from "@/store/features/grades/gradeSlice";
import { IoIosMore } from "react-icons/io";
import { t } from "@/utils/translation";

interface GradeDetailProps {
  id: string | number | null;
}

const GradeDetail: React.FC<GradeDetailProps> = ({ id }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedGrade, createGradeLoading, createGradeError } = useSelector(
    (state: RootState) => state.grades,
  );

  useEffect(() => {
    dispatch(getGradeById(id));
  }, [dispatch, id]);

  if (createGradeLoading) {
    return <div>Loading...</div>;
  }

  if (createGradeError) {
    return <div>Error: {createGradeError}</div>;
  }

  if (!selectedGrade) {
    return <div>No grade found</div>;
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-gray-800 text-2xl font-bold">
          {selectedGrade.name}
        </h1>
        <button className="text-gray-500 hover:text-gray-700 transition-colors duration-200 focus:outline-none">
          <IoIosMore className="h-6 w-6" />
        </button>
      </div>

    </div>
  );
};

export default GradeDetail;
