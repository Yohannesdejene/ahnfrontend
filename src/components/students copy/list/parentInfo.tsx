import {
  InputString,
  CommonButton,
  SelectInput,
  InputNumber,
  FileDropzone,
} from "@/common/formElements";
import { t } from "@/utils/translation";

const ParentInfoFrom = () => {
  return (
    <div>
      {/* <hr className="mb-4 mt-4 w-full text-lg font-normal text-normalGray" /> */}
      <div>
        <div className="mb-5 flex items-center">
          <h6 className="text-gray-700 mr-4 text-lg font-normal">
            {t("students.fatherInfo")}
          </h6>
          <hr className="flex-grow text-normalGray" />
        </div>
        <div className="xs:w-full mb-3 sm:w-1/2">
          <FileDropzone name="father_photo" label="Father Photo" />
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <div className="mb-3 w-full">
            <InputString
              type="text"
              name="father_name"
              label={t("students.father_name")}
              placeholder={t("ex Getachew Bogale")}
            />
          </div>

          <div className="mb-3 w-full">
            <InputString
              type="text"
              name="father_phone"
              label={t("students.fatherPhone")}
              placeholder={t("ex 0912345678")}
            />
          </div>
          <div className="mb-3 w-full">
            <InputString
              type="text"
              name="father_occupation"
              label={t("students.fatherOccupation")}
              placeholder={t("ex Teacher")}
            />
          </div>

          <div className="mb-3 w-full">
            <SelectInput
              name="father_literacy_level"
              label={t("students.fatherLiteracyLevel")}
              placeholder={t("students.selectLiteracyLevel")}
              options={[
                { value: "Primary", label: t("common.primary") },
                { value: "Secondary", label: t("common.secondary") },
                { value: "Tertiary", label: t("common.tertiary") },
              ]}
            />
          </div>
        </div>
      </div>

      <div>
        <div className="mb-5 flex items-center">
          <h6 className="text-gray-700 mr-4 text-lg font-normal">
            {t("students.motherInfo")}
          </h6>
          <hr className="flex-grow text-normalGray" />
        </div>
        <div className="xs:w-full mb-3 sm:w-1/2">
          <FileDropzone name="mother_photo" label="Mother Photo" />
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <div className="mb-3 w-full">
            <InputString
              type="text"
              name="mother_name"
              label={t("students.motherName")}
              placeholder={t("ex Getachew")}
            />
          </div>
          <div className="mb-3 w-full">
            <InputString
              type="text"
              name="mother_phone"
              label={t("students.motherPhone")}
              placeholder={t("ex 0912345678")}
            />
          </div>

          <div className="mb-3 w-full">
            <InputString
              type="text"
              name="mother_occupation"
              label={t("students.occupation")}
              placeholder={t("ex Teacher")}
            />
          </div>

          <div className="mb-3 w-full">
            <SelectInput
              name="mother_literacy_level"
              label={t("students.motherLiteracyLevel")}
              placeholder={t("students.selectLiteracyLevel")}
              options={[
                { value: "Primary", label: t("common.primary") },
                { value: "Secondary", label: t("common.secondary") },
                { value: "Tertiary", label: t("common.tertiary") },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentInfoFrom;
