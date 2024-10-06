import Image from "next/image";
import Link from "next/link";
import { IoIosMore } from "react-icons/io";
import { t } from "@/utils/translation";

interface GradeCardProps {
  data: any;
  id: string | number | null;
  label: string;
}
const GradeCard = ({ id, label, data }: GradeCardProps) => {
  return (
    <div className="hover:shadow-gray-300 overflow-hidden rounded-lg bg-white p-4  shadow-md transition-shadow duration-300 hover:scale-105  dark:bg-black">
      <Link href={`/grade/detail/${id}`}>
        <div className="flex items-center justify-between">
          <div className="pt-0">
            <Image
              src="/images/grade.jpg"
              alt="grade image"
              width={55}
              height={20}
            />
          </div>
          <h1 className="text-md pt-0 font-semibold dark:text-white">
            Section {label}
          </h1>
          <button className=" border-none bg-transparent p-0 focus:outline-none">
            <IoIosMore className="text-gray-600 hover:text-gray-800" />
          </button>
        </div>
        <div className="mt-3 flex items-center justify-between gap-5">
          <div className="flex flex-col">
            <h6 className="text-dark text-xs  dark:text-white ">H.R.Teacher</h6>
            <h3 className="text-sm font-semibold dark:text-white">
              {"Firaol getachew"}
            </h3>
          </div>
          <div className="flex flex-col">
            <h6 className="text-sm  dark:text-white">T.Student</h6>
            <h3 className="text-sm font-semibold dark:text-white">{"120"}</h3>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default GradeCard;
