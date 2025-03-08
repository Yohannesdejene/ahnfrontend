import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/context/ProtectedRoute";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Ahununu Express",
};

export default function Home() {
  return (
    <>
      <ProtectedRoute>
        <DefaultLayout>
          <ECommerce />
        </DefaultLayout>
      </ProtectedRoute>
    </>
  );
}
