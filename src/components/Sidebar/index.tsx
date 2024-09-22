"use client";
import React, { useEffect, useRef, useState } from "react";
import { t } from "@/utils/translation";
import { useLocale } from "@/context/LanguageContext"; // Import locale context
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarItem from "@/components/Sidebar/SidebarItem";
import ClickOutside from "@/components/ClickOutside";
import useLocalStorage from "@/hooks/useLocalStorage";
import { IoIosAddCircle } from "react-icons/io";
import { MdDashboard } from "react-icons/md";

///icons
import { GrUserWorker } from "react-icons/gr";
import { PiStudentBold } from "react-icons/pi";
import { FcDepartment } from "react-icons/fc";
import { IoPeopleSharp } from "react-icons/io5";
import { MdOutlinePeople } from "react-icons/md";
import { RiMessage2Line } from "react-icons/ri";
import { MdPerson4 } from "react-icons/md";
import { BiSolidInstitution } from "react-icons/bi";
import { TbReport } from "react-icons/tb";
import { FaSchool } from "react-icons/fa";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { SiAnytype } from "react-icons/si";

import * as URL from "@/routes";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const menuGroupsList = [
    {
      menuItems: [
        {
          icon: <MdDashboard className="text-title-sm text-white" />,
          label: t("sideLayout.dashboards"), // Translated label
          route: "/",
        },
        {
          icon: <GrUserWorker className="text-title-sm text-white" />,
          label: t("sideLayout.employees"), // Translated label
          route: "#",
          children: [
            {
              icon: <IoIosAddCircle className="text-title-md text-white" />,
              label: t("sideLayout.addEmployee"), // Translated label
              route: "#",
            },
          ],
        },
        {
          icon: <PiStudentBold className="text-title-sm text-white" />,
          label: t("sideLayout.students"), // Translated label
          route: "#",
          children: [
            {
              icon: <IoIosAddCircle className="text-title-md text-white" />,
              label: t("sideLayout.addStudent"), // Translated label
              route: "#",
            },
          ],
        },
        {
          icon: <FcDepartment className="text-title-sm text-white" />,
          label: t("sideLayout.sections"), // Translated label
          route: "#",
          children: [
            {
              icon: <IoIosAddCircle className="text-title-md text-white" />,
              label: t("sideLayout.addSections"), // Translated label
              route: "#",
            },
          ],
        },
        {
          icon: <IoPeopleSharp className="text-title-sm text-white" />,
          label: t("sideLayout.grade"), // Translated label
          route: `${URL.LIST_GRADE}`,
          // children: [
          //   {
          //     icon: <IoIosAddCircle className="text-title-md text-white" />,
          //     label: t("sideLayout.addClasses"), // Translated label
          //     route: "#",
          //   },
          // ],
        },
      ],
    },
    {
      name: t("sideLayout.basic"), // Translated section name
      menuItems: [
        {
          icon: <MdOutlinePeople className="text-title-sm text-white" />,
          label: t("sideLayout.viewYear"), // Translated label
          route: `${URL.LIST_YEARS}`,
        },
        {
          icon: <FaSchool className="text-title-sm text-white" />,
          label: t("sideLayout.viewSchools"), // Translated label
          route: `${URL.LIST_SCHOOLS}`,
        },
        {
          icon: (
            <LiaChalkboardTeacherSolid className="text-title-sm text-white" />
          ),
          label: t("sideLayout.viewCourse"), // Translated label
          route: `${URL.LIST_COURSE}`,
        },
        {
          icon: <SiAnytype className="text-title-sm text-white" />,
          label: t("sideLayout.viewSemester"), // Translated label
          route: `${URL.LIST_SEMESTER}`,
        },
      ],
    },
    {
      name: t("sideLayout.payment"), // Translated section name
      menuItems: [
        {
          icon: <MdOutlinePeople className="text-title-sm text-white" />,
          label: t("sideLayout.Free particulars"), // Translated label
          route: "#",
          children: [
            {
              icon: <IoIosAddCircle className="text-title-md text-white" />,
              label: t("sideLayout.addEmployee"), // Reuse existing translation if same
              route: "#",
            },
          ],
        },
      ],
    },
    {
      name: t("sideLayout.announcements"), // Translated section name
      menuItems: [
        {
          icon: <RiMessage2Line className="text-title-sm text-white" />,
          label: t("sideLayout.smsService"), // Translated label
          route: "#",
        },
      ],
    },
    {
      name: t("sideLayout.settings"), // Translated section name
      menuItems: [
        {
          icon: <MdPerson4 className="text-title-sm text-white" />,
          label: t("sideLayout.personalProfile"), // Translated label
          route: "#",
        },
        {
          icon: <BiSolidInstitution className="text-title-sm text-white" />,
          label: t("sideLayout.institutionalProfile"), // Translated label
          route: "#",
        },
      ],
    },
    {
      name: t("sideLayout.ReportAndAnalysis"), // Translated section name
      menuItems: [
        {
          icon: <TbReport className="text-title-sm text-white" />,
          label: t("sideLayout.report"), // Translated label
          route: "#",
        },
      ],
    },
  ];
  const [menuGroups, setMenuGroups] = useState<any>([]);
  const pathname = usePathname();
  const [pageName, setPageName] = useLocalStorage("selectedMenu", "dashboard");
  const { locale, setLocale } = useLocale();
  useEffect(() => {
    setMenuGroups(menuGroupsList);
  }, [locale]);
  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`fixed left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-boxdark duration-300 ease-linear lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* <!-- SIDEBAR HEADER --> */}
        <div className="flex items-center justify-between gap-1 px-6 py-5.5 lg:py-3">
          <Link href="/" className="flex items-center text-center">
            <Image
              width={60}
              height={60}
              src={"/images/logo.png"}
              alt="Logo"
              priority
              // style={{ backgroundColor: "red" }}
            />
            <h1 className="ml text-title-md font-bold text-primary">
              {" "}
              {t("sideLayout.dashboards")}
            </h1>
            {/* <hr className="border-gray-100 text- my-2 font-medium " /> */}
          </Link>

          <button
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
          </button>
        </div>
        {/* <!-- SIDEBAR HEADER --> */}

        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          {/* <!-- Sidebar Menu --> */}
          <nav className="mt-1 px-4 py-1 lg:mt-1 lg:px-6">
            {menuGroups.map((group: any, groupIndex: any) => (
              <div key={groupIndex}>
                <h3 className="text-md  mb-3 ml-4 text-greyishWhite ">
                  {group.name}
                </h3>

                <ul className="mb-6 flex flex-col gap-1.5">
                  {group.menuItems.map((menuItem: any, menuIndex: any) => (
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
