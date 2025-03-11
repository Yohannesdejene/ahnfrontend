"use client";
import dynamic from "next/dynamic";
import React, { useLayoutEffect } from "react";
import ChartOne from "../Charts/ChartOne";
import ChartTwo from "../Charts/ChartTwo";
import ChatCard from "../Chat/ChatCard";
import TableOne from "../Tables/TableOne";
import CardDataStats from "../CardDataStats";
import { PiStudentBold } from "react-icons/pi";
import { GiConsoleController, GiTeacher } from "react-icons/gi";
import { SiVirustotal } from "react-icons/si";
import { GiDiceTarget } from "react-icons/gi";
import { useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { useSearchParams } from "next/navigation";
import { t } from "@/utils/translation";
import { usePermission } from "@/context/PermissionContext";
import NowAllowedPage from "@/components/common/allowedPage";
const ECommerce: React.FC = () => {
  const auth = useSelector((state: any) => state?.auth?.permissions);
  const hasCreateUserPermission = auth.some(
    (permission: any) => permission.code === "CREATE_USER",
  );

  if (hasCreateUserPermission) {
    return (
      <>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          <CardDataStats
            title="Total Shipments "
            total="2.450"
            rate="2.59%"
            levelUp
          >
            <PiStudentBold className="text-primary" />
          </CardDataStats>
          <CardDataStats
            title="Total Branches"
            total="3.456"
            rate="0.95%"
            levelDown
          >
            <GiTeacher className="text-primary" />
          </CardDataStats>
          <CardDataStats
            title="Total Revenue"
            total="3.456"
            rate="0.95%"
            levelDown
          >
            <SiVirustotal className="text-primary" />
          </CardDataStats>
          <CardDataStats
            title="Total Profit"
            total="3.456"
            rate="0.95%"
            levelDown
          >
            <GiDiceTarget className="text-primary" />
          </CardDataStats>
        </div>

        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
          <ChartOne />
          <ChartTwo />
          {/* <ChartThree /> */}
        </div>
      </>
    );
  } else {
    return (
      <div>
        <NowAllowedPage />
      </div>
    );
  }
};

export default ECommerce;
