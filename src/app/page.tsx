import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
// import ProtectedRoute from "@/context/ProtectedRoute";
import { AuthProvider } from "@/context/AuthContext"; // Adjust the path as necessary
import { store } from "@/store/store";
import { Provider } from "react-redux";
import { PermissionProvider } from "@/context/PermissionContext"; // New permission provider

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Ahununu Express",
};

export default function Home() {
  return (
    <>
      {/* <ProtectedRoute> */}
      {/* <PermissionProvider> */}
      <AuthProvider>
        <DefaultLayout>
          <ECommerce />
        </DefaultLayout>
      </AuthProvider>

      {/* </PermissionProvider> */}
      {/* </ProtectedRoute> */}
    </>
  );
}
