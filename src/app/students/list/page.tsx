import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import StudentsList from "@/components/students/list/index";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/context/ProtectedRoute";

export const metadata: Metadata = {
  title: "Students List",
  description: "School Management System - Students List",
};

const List: React.FC = () => {
  return (
    <ProtectedRoute>
      <DefaultLayout>
        <StudentsList />
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default List;
