import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SidebarDropdown = ({ item }: any) => {
  const pathname = usePathname();


  return (
    <>
      <ul className="mb-5.5 mt-2 flex list-disc flex-col gap-2.5 pl-6">
        {item.map((item: any, index: number) => (
          <li
            key={index}
            className={`${pathname === item.route ? "bg-primary  text-white hover:bg-primary hover:text-white" : " text-white  hover:bg-hoverBg hover:bg-primary hover:text-white"}  flex cursor-pointer items-center rounded-md   p-2  text-white `}
          >
            {" "}
            {/* <span
              style={{ width: "8px", height: "8px", marginLeft: "5px" }}
              className={`mr-2  rounded-full  ${pathname === item.route ? " bg-white text-typeBlackLight  dark:bg-white " : " bg-typeBlackLight dark:bg-white "} `}
            ></span> */}
            {item.icon}
            <Link href={item.route} className="ml-2 text-sm">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SidebarDropdown;
