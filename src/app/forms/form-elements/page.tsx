import React from "react";
import FormElements from "@/components/FormElements";
import { Metadata } from "next";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/context/ProtectedRoute";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "This is Next.js Form Elements page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const FormElementsPage = () => {
  return (
    <>
      {" "}
      <ProtectedRoute>
        <DefaultLayout>
          <FormElements />
        </DefaultLayout>
      </ProtectedRoute>
    </>
  );
};

export default FormElementsPage;
