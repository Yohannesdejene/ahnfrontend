import {
  InputString,
  CommonButton,
  SelectInput,
  InputNumber,
  FileDropzone,
} from "@/common/formElements";
import { t } from "@/utils/translation";
import { useGetAllSections } from "@/hooks/useGetAllSections";

const StudentInfoForm = () => {
  const { optionsSections } = useGetAllSections();
  return (
    <div>
      <h6 className="text-gray-700 w-full text-lg font-normal">
        {t("students.studentInfo")}
      </h6>
      <hr className="mb-4 mt-4 w-full text-lg font-normal text-normalGray" />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <div className="xs:w-full mb-3 sm:w-1/2 ">
          <FileDropzone name="student_photo" label="Student Photo" />
        </div>
        <div className="mb-3 w-full">
          <InputString
            type="text"
            name="first_name"
            label={t("students.firstName")}
            placeholder={t("ex Firaol")}
          />
        </div>
        <div className="mb-3 w-full">
          <InputString
            type="text"
            name="middle_name"
            label={t("students.middleName")}
            placeholder={t("ex Getachew")}
          />
        </div>

        <div className="mb-3 w-full">
          <InputString
            type="text"
            name="last_name"
            label={t("students.lastName")}
            placeholder={t("ex bogale")}
          />
        </div>
        <div className="mb-3 w-full">
          <InputString
            type="text"
            name="phone_number"
            label={t("students.phoneNumber")}
            placeholder={t("ex 0912345678")}
          />
        </div>

        <div className="mb-3 w-full">
          <InputNumber
            name="houseNo"
            label={t("students.houseNo")}
            placeholder={t("ex 123")}
          />
        </div>
        <div className="mb-3 w-full">
          <InputNumber
            name="kebele"
            label={t("students.kebele")}
            placeholder={t("ex 123")}
          />
        </div>

        <div className="mb-3 w-full">
          <InputNumber
            name="age"
            label={t("students.age")}
            placeholder={t("ex 123")}
          />
        </div>
        <div className="mb-3 w-full">
          <InputString
            type="text"
            name="nationality"
            label={t("students.nationality")}
            placeholder={t("ex Ethiopian")}
          />
        </div>

        <div className="mb-3 w-full">
          <InputString
            type="text"
            name="subcity"
            label={t("students.subcity")}
            placeholder={t("ex Addis Ababa")}
          />
        </div>
        <div className="mb-3 w-full">
          <InputString
            type="text"
            name="prev_school"
            label={t("students.prevSchool")}
            placeholder={t("ex Addis Ababa")}
          />
        </div>

        <div className="mb-3 w-full">
          <SelectInput
            name="sex"
            label={t("students.sex")}
            placeholder={t("students.sexPlaceholder")}
            options={[
              { value: "Male", label: t("common.male") },
              { value: "Female", label: t("common.female") },
            ]}
          />
        </div>

        <div className="mb-3 w-full">
          <InputString
            type="text"
            name="department"
            label={t("students.department")}
            placeholder={t("ex computer science")}
          />
        </div>
        <div className="mb-3 w-full">
          <SelectInput
            name="section_id"
            label={t("section.section")}
            placeholder={t("section.sectionPlaceholder")}
            options={optionsSections}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentInfoForm;
