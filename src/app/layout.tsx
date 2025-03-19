"use client";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";

// import "primereact/resources/primereact.min.css";
// import "primeicons/primeicons.css";

// import "primereact/resources/themes/bootstrap4-dark-blue/theme.css";

import React, { useEffect, useState } from "react";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import NextTopLoader from "nextjs-toploader";
import toast, { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css"; // Import CSS
import { AuthProvider } from "@/context/AuthContext"; // Adjust the path as necessary
import { LocaleProvider } from "@/context/LanguageContext";
import { PermissionProvider } from "@/context/PermissionContext"; // New permission provider
// import ProtectedRoute from "@/context/ProtectedRoute";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const pathname = usePathname();

  return (
    lsllslsl

    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          <Provider store={store}>
            {/* <ProtectedRoute> */}
            {/* <PermissionProvider> */}
            <LocaleProvider>
              <NextTopLoader
                color="#0097B2"
                initialPosition={0.08}
                crawlSpeed={200}
                height={5}
                crawl={true}
                showSpinner={true}
                easing="ease"
                speed={200}
                shadow="0 0 10px #2299DD,0 0 5px #2299DD"
              />
              {children}
              <Toaster position="top-center" reverseOrder={false} />
            </LocaleProvider>
            {/* </ProtectedRoute> */}
            {/* </PermissionProvider> */}
          </Provider>
        </div>
      </body>
    </html>
  );
}
