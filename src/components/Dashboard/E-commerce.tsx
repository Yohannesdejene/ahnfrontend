"use client";
import dynamic from "next/dynamic";
import React from "react";
import ChartOne from "../Charts/ChartOne";
import ChartTwo from "../Charts/ChartTwo";
import ChatCard from "../Chat/ChatCard";
import TableOne from "../Tables/TableOne";
import CardDataStats from "../CardDataStats";
import { PiStudentBold } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import { SiVirustotal } from "react-icons/si";
import { GiDiceTarget } from "react-icons/gi";

import { useSearchParams } from "next/navigation";
import { t } from "@/utils/translation";

const MapOne = dynamic(() => import("@/components/Maps/MapOne"), {
  ssr: false,
});

const ChartThree = dynamic(() => import("@/components/Charts/ChartThree"), {
  ssr: false,
});

const ECommerce: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats
          title="Total Students "
          total="2.450"
          rate="2.59%"
          levelUp
        >
          <PiStudentBold className="text-primary" />
        </CardDataStats>
        <CardDataStats
          title="Total Teachers"
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
        <ChartThree />
        <MapOne />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard />
      </div>
    </>
  );
};

export default ECommerce;
