"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarItem from "@/components/Sidebar/SidebarItem";
import ClickOutside from "@/components/ClickOutside";
import useLocalStorage from "@/hooks/useLocalStorage";
import { MdCastForEducation } from "react-icons/md";
import { PiStudent } from "react-icons/pi";
import { FaShippingFast } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import { GiPackedPlanks } from "react-icons/gi";
import { IoIosAddCircle } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { GiAirplaneArrival } from "react-icons/gi";
import { FaPlaneArrival } from "react-icons/fa";
import { TbHomeCheck } from "react-icons/tb";
import { FaExchangeAlt } from "react-icons/fa";
import { FaBarsProgress } from "react-icons/fa6";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { BsFillFileEarmarkSpreadsheetFill } from "react-icons/bs";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { SiVirustotal } from "react-icons/si";
import { MdCreditCard } from "react-icons/md";

import { RiEdit2Fill } from "react-icons/ri";
import { MdOutlinePostAdd } from "react-icons/md";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { FaCodeBranch } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { FaPercent } from "react-icons/fa";
import { MdOutlineRule } from "react-icons/md";
import { RiExchangeDollarFill } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { BsFillCreditCardFill } from "react-icons/bs";
import { RiGlobalLine } from "react-icons/ri";
import { FaMagento } from "react-icons/fa";
import { MdSummarize } from "react-icons/md";
import { FaListUl } from "react-icons/fa";
import { MdFormatListBulleted } from "react-icons/md";
import { FaMapMarkedAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { GiAirplaneDeparture } from "react-icons/gi";
import { FiType } from "react-icons/fi";
import { MdAttachMoney } from "react-icons/md";
import { FaUnity } from "react-icons/fa";

import * as URL from "@/route";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const menuGroups = [
  {
    name: "Shipments",
    menuItems: [
      {
        icon: <MdDashboard className="text-title-sm text-white" />,
        label: "Dashboard",
        route: "/",
        // children: [{ label: "eCommerce", route: "/" }],
      },
      {
        icon: <GiAirplaneDeparture className="text-title-sm text-white" />,
        label: "Air Shipment",
        route: "#",
        children: [
          {
            icon: <IoIosAddCircle className="text-title-md text-white" />,
            label: "Add Shipment",
            route: "/shipment/air/add-shipment",
          },
          {
            icon: <GiPackedPlanks className="text-title-sm text-white" />,
            label: "Ready to Pick",
            route: "/shipment/air/ready-for-pickup",
          },
          {
            icon: <FaPlaneArrival className="text-title-sm text-white" />,
            label: "Arriving Shipment",
            route: "/shipment/air/arriving",
          },
          {
            icon: (
              <TbHomeCheck className="text-bold text-title-sm text-white" />
            ),
            label: "Arrived Shipment",
            route: "/shipment/air/arrived",
          },
          {
            icon: (
              <IoCheckmarkDoneCircleSharp className="text-title-sm text-white" />
            ),
            label: "Delivered Shipments",
            route: "/shipment/air/delivered",
          },
          {
            icon: <MdCreditCard className="text-title-sm text-white" />,
            label: " Credit shipments",
            route: "/shipment/air/credit-shipmnents",
          },
          {
            icon: <SiVirustotal className="text-title-sm text-white" />,
            label: "All Air Shipments",
            route: "/shipment/air/all-air-shipments",
          },

          {
            icon: <FaExchangeAlt className="text-title-sm text-white" />,
            label: "Change Status",
            route: "/shipment/air/change-status",
          },
          {
            icon: <FaBarsProgress className="text-title-sm text-white" />,
            label: "Track Shipment",
            route: "/shipment/air/tracking",
          },
          {
            icon: <FaFileInvoiceDollar className="text-title-sm text-white" />,
            label: "Shipment Invoice",
            route: "/shipment/air/invoice",
          },
        ],
      },
      {
        icon: <FaShippingFast className="text-title-sm text-white" />,
        label: "Ground Shipment",
        route: "#",
        children: [
          {
            icon: <IoIosAddCircle className="text-title-md text-white" />,
            label: "Add Shipment",
            route: "/shipment/ground/add-shipment",
          },
          {
            icon: <GiPackedPlanks className="text-title-sm text-white" />,
            label: "Ready to Pick",
            route: "/shipment/ground/ready-for-pickup",
          },
          {
            icon: <FaPlaneArrival className="text-title-sm text-white" />,
            label: "Arriving Shipment",
            route: "/shipment/griund/arriving",
          },

          {
            icon: (
              <TbHomeCheck className="text-bold text-title-sm text-white" />
            ),
            label: "Arrived Shipment",
            route: "/shipment/ground/arrived",
          },
          {
            icon: (
              <IoCheckmarkDoneCircleSharp className="text-title-sm text-white" />
            ),
            label: "Delivered Shipments",
            route: "/shipment/ground/delivered",
          },
          {
            icon: <SiVirustotal className="text-title-sm text-white" />,
            label: "All ground Shipments",
            route: "/shipment/ground/all",
          },
          {
            icon: <MdCreditCard className="text-title-sm text-white" />,
            label: "Ground  Credit shipments",
            route: "/shipment/credit/all",
          },
          {
            icon: <FaExchangeAlt className="text-title-sm text-white" />,
            label: "Change Status",
            route: "/shipment/ground/change-status",
          },
          {
            icon: <FaBarsProgress className="text-title-sm text-white" />,
            label: "Track Shipment",
            route: "/shipment/ground/tracking",
          },
          {
            icon: <FaFileInvoiceDollar className="text-title-sm text-white" />,
            label: "Shipment Invoice",
            route: "/shipment/ground/invoice",
          },
        ],
      },

      {
        icon: <TbReportAnalytics className="text-title-sm text-white" />,
        label: "Reports",
        route: "#",
        children: [
          {
            icon: (
              <>
                <BsFillCreditCardFill className="text-title-sm text-white" />
              </>
            ),
            label: "Credi Shipments",
            route: "#",
          },
          {
            icon: <FaCodeBranch className="text-title-sm text-white" />,
            label: "Branch Report",
            route: "#",
          },
          {
            icon: <FaCodeBranch className="text-title-sm text-white" />,
            label: "Admin Branch Report",
            route: "#",
          },
          {
            icon: (
              <>
                <MdSummarize className="text-title-sm text-white" />
              </>
            ),
            label: "Net Branch Report ",
            route: "#",
          },

          {
            icon: (
              <>
                <MdSummarize className="text-title-sm text-white" />
              </>
            ),
            label: "Net Admin Branch Report ",
            route: "#",
          },
          {
            icon: (
              <>
                <MdSummarize className="text-title-sm text-white" />
              </>
            ),
            label: "Net All Branch Report ",
            route: "#",
          },
          {
            icon: <FaMoneyCheckDollar className="text-title-sm text-white" />,
            label: "Admin Expense Report ",
            route: "#",
          },
          {
            icon: <FaMagento className="text-title-sm text-white" />,
            label: "Agent Report ",
            route: "#",
          },

          ,
        ],
      },
      {
        icon: <FaMoneyCheckDollar className="text-title-sm text-white" />,
        label: "Expenses",
        route: "#",
        children: [
          {
            icon: <IoIosAddCircle className="text-title-md text-white" />,
            label: "Add Expenses",
            route: "#",
          },
        ],
      },
    ],
  },
  {
    name: "Manage",
    menuItems: [
      {
        icon: <FaCodeBranch className="text-title-sm text-white" />,
        label: " Branches",
        route: "/manage/branch",
      },
      {
        icon: <FaPercent className="text-title-sm text-white" />,
        label: "Shipment Rates",
        route: "/manage/shipment-rate",
      },
      {
        icon: <FiType className="text-title-sm text-white" />,
        label: "Shipment Type",
        route: "/manage/shipment-type",
      },
      {
        icon: <div>M</div>,
        label: "Shipment Mode",
        route: "/manage/shipment-mode",
      },
      {
        icon: <MdAttachMoney />,
        label: "Payment Methods",
        route: "/manage/payment-method",
      },
      {
        icon: <FaUnity />,
        label: "Unit ",
        route: "/manage/unit",
      },
    ],
  },
  {
    name: "Authorization",
    menuItems: [
      {
        icon: <MdOutlineRule className="text-title-sm text-white" />,
        label: "Role",
        route: "#",
        // children: [
        //   {
        //     icon: (
        //       <FaCodeBranch className="text-title-sm text-white" />
        //     ),
        //     label: "Branches",
        //     route: "#",
        //   },
        // ],
      },
      {
        icon: <FaUser className="text-title-sm text-white" />,
        label: "User ",
        route: "#",
        // children: [
        //   {
        //     icon: (
        //       <FaCodeBranch className="text-title-sm text-white" />
        //     ),
        //     label: "Branches",
        //     route: "#",
        //   },
        // ],
      },
      ,
    ],
  },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();
  const [pageName, setPageName] = useLocalStorage("selectedMenu", "dashboard");

  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`fixed left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-boxdark duration-300 ease-linear lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* <!-- SIDEBAR HEADER --> */}
        <div className="flex items-center justify-between gap-1 px-6 py-5.5 lg:py-3">
          <Link
            href="/"
            className="ml-5 flex  items-center  justify-center text-center"
          >
            {/* <Image
              width={250}
              height={200}
              src={"/images/logo.png"}
              alt="Logo"
              priority
              // style={{ backgroundColor: "red" }}
            /> */}
            <h1 className=" mb-5 mt-3 flex  items-center justify-center text-title-md font-bold text-white">
              {" "}
              {/* Ahununu Express */}
            </h1>
            <hr className="border-gray-100 text- my-2 font-medium " />
          </Link>

          {/* <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            className="block lg:hidden"
          >
            <svg
              className="fill-current"
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                fill=""
              />
            </svg>
          </button> */}
        </div>
        {/* <!-- SIDEBAR HEADER --> */}

        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          {/* <!-- Sidebar Menu --> */}
          <nav className="mt-1 px-4 py-1 lg:mt-1 lg:px-6">
            {menuGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h3
                  className="mb-4 ml-4"
                  style={{
                    color: "#aeb1ad",
                    fontSize: "15px",
                    textTransform: "uppercase",
                  }}
                >
                  {group.name}
                </h3>
                <ul className="mb-5 flex flex-col gap-1.5">
                  {group.menuItems.map((menuItem, menuIndex) => (
                    <SidebarItem
                      key={menuIndex}
                      item={menuItem}
                      pageName={pageName}
                      setPageName={setPageName}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          {/* <!-- Sidebar Menu --> */}
        </div>
      </aside>
    </ClickOutside>
  );
};

export default Sidebar;
