import {
  InputString,
  CommonButton,
  SelectInput,
  InputNumber,
  FileDropzone,
} from "@/common/formElements";
import { t } from "@/utils/translation";

const DocumentForm = () => {
  return (
    <div>
      <h6 className="text-gray-700 w-full text-lg font-normal">
        {t("students.studentInfo")}
      </h6>
      <hr className="mb-4 mt-4 w-full text-lg font-normal text-normalGray" />

      <div className="xs:w-full mb-3 sm:w-1/2">
        <FileDropzone name="student_photo" label="Student Photo" />
      </div>
    </div>
  );
};

export default DocumentForm;
