import Image from "next/image";
import { IoIosMore } from "react-icons/io";
import { t } from "@/utils/translation";

interface GradeCardProps {
  id: string | number | null;
  label: string;
  handleToggle: (id: number | string | null) => void;
}
const GradeCard = ({ id, handleToggle, label }: GradeCardProps) => {
  return (
    <div className="overflow-hidden rounded-lg bg-white p-4  shadow-md transition-shadow duration-300 hover:shadow-lg dark:bg-black">
      <div className="flex items-center justify-between">
        <div className="">
          <Image
            src="/images/grade.jpg"
            alt="grade image"
            width={55}
            height={20}
          />
        </div>
        <h1 className="text-lg font-semibold">{label}</h1>
        <button
          className="mt-0 border-none bg-transparent p-0 focus:outline-none"
          onClick={() => {
            handleToggle(id);
          }}
        >
          <IoIosMore className="text-gray-600 hover:text-gray-800" />
        </button>
      </div>
      <div className="mt-3 flex items-center justify-between gap-3">
        <div>
          <h6 className="text-sm font-semibold">12</h6>
          <h3 className="text-sm ">{t("grade.sections")}</h3>
        </div>
        <div>
          <h6 className="text-sm font-semibold">12</h6>
          <h3 className="text-sm ">{t("grade.subjects")}</h3>
        </div>
        <div>
          <h6 className="text-sm font-semibold">12</h6>
          <h3 className="text-sm ">{t("grade.students")}</h3>
        </div>
      </div>
    </div>
  );
};

export default GradeCard;
