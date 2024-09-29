import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import StudentDetail from "@/components/students/detail/index";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/context/ProtectedRoute";

export const metadata: Metadata = {
  title: "Students  Detail",
  description: "School Management System -students Detail",
};

interface PageProps {
  params: {
    id: string | number | null;
  };
}

const Detail: React.FC<PageProps> = ({ params }) => {
  return (
    <ProtectedRoute>
      <DefaultLayout>
        <StudentDetail id={params.id} />
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default Detail;
