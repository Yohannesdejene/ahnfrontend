import React from "react";
import { useState } from "react";

import { useFormContext } from "react-hook-form";
// import { Eye, EyeSlash } from "primeicons/primeicons";
import { Input } from "@mui/base/Input";
import { Button as BaseButton } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Select from "react-select";
import { useDropzone } from "react-dropzone";

// import { useNumberInput } from "@mui/base/unstable_useNumberInput";

interface InputProps {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  disabled?: boolean;
}

interface ButtonProps {
  label: string;
  loading: boolean;
  disabled?: boolean;
}
interface NumberInputProps {
  label: string;
  name: string;
  min?: number;
  max?: number;
  placeholder?: string;
}

interface SelectInputProps {
  name: string;
  label: string;
  options: { value: string | number; label: string }[];
  placeholder?: string;
}

interface Option {
  value: string;
  label: string;
}

interface ReactSelectInputProps {
  name: string;
  label: string;
  options: Option[];
  placeholder?: string;
  isLoading?: boolean;
}

export const ReactSelect: React.FC<ReactSelectInputProps> = ({
  name,
  label,
  options,
  placeholder,
  isLoading = false,
}) => {
  // const {
  //   register,
  //   formState: { errors },
  //   setValue,
  // } = useFormContext();
  const {
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useFormContext();

  // Handle value changes from react-select

  // Convert options to the format required by react-select
  const reactSelectOptions = options.map((option) => ({
    value: String(option.value), // Convert boolean to string
    label: option.label,
  }));

  // Handle value changes from react-select
  const handleChange = (selectedOption: any) => {
    if (selectedOption) {
      setValue(name, selectedOption.value === "true"); // Convert string back to boolean
    }
  };

  // Get the current value of the field and find the corresponding option
  const currentValue = getValues(name);
  const defaultValue = reactSelectOptions.find(
    (option) => option.value === String(currentValue), // Convert to string for comparison
  );

  return (
    <div className="card justify-content-center flex flex-col">
      <label className="mb-2 block text-sm font-medium text-black dark:text-white">
        {label}
      </label>
      <Select
        classNamePrefix="react-select"
        // className="react-select-container"
        options={reactSelectOptions}
        className="font-sans focus:shadow-outline-primary dark:focus:shadow-outline-primary w-full rounded-lg border border-solid border-slate-300 bg-white  text-sm font-normal leading-5 text-slate-900 shadow-md shadow-slate-100   focus:border-primary focus:shadow-lg focus-visible:outline-0 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-300 dark:shadow-slate-900 dark:focus:border-primary"
        placeholder={placeholder}
        isLoading={isLoading}
        onChange={handleChange}
        defaultValue={defaultValue}
        aria-label={label}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: "var(--primary-color)", // Customize your primary color here
          },
        })}
        styles={{
          control: (provided) => ({
            ...provided,
            borderRadius: "0.5rem",
            borderColor: "var(--border-color)", // Customize border color here
            backgroundColor: "var(--bg-color)",
            color: "var(--text-color)",
            boxShadow: "0 0 0 1px rgba(0,0,0,0.1)",
            "&:hover": {
              borderColor: "var(--primary-color)",
            },
          }),
          menu: (provided) => ({
            ...provided,
            borderRadius: "0.5rem",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }),
          option: (provided, state) => ({
            ...provided,
            // backgroundColor: state.isSelected
            //   ? "var(--primary-color)"
            //   : state.isFocused
            //     ? "var(--hover-bg-color)"
            //     : "var(--bg-color)",
            // color: state.isSelected
            //   ? "var(--selected-text-color)"
            //   : "var(--text-color)",
            // "&:active": {
            //   backgroundColor: "var(--primary-color)",
            // },
            backgroundColor: "D3D3D3",
            color: "#00000",
          }),
          placeholder: (provided) => ({
            ...provided,
            color: "var(--placeholder-color)",
          }),
          singleValue: (provided) => ({
            ...provided,
            color: "var(--text-color)",
          }),
        }}
      />

      {errors[name] && (
        <small className="text-danger">{errors[name]?.message as string}</small>
      )}
    </div>
  );
};

// export const SelectInput: React.FC<SelectInputProps> = ({
//   name,
//   label,
//   options,
//   placeholder,
// }) => {
//   const {
//     register,
//     formState: { errors },
//   } = useFormContext();

//   return (
//     <div className="card justify-content-center flex flex-col">
//       <label className="mb-2 block text-sm font-medium text-black dark:text-white">
//         {label}
//       </label>
//       <select
//         className="font-sans focus:shadow-outline-primary dark:focus:shadow-outline-primary w-full rounded-lg border border-solid border-slate-300 bg-white px-3 py-2 text-sm font-normal leading-5 text-slate-900 shadow-md shadow-slate-100 focus:border-primary focus:shadow-lg focus-visible:outline-0 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-300 dark:shadow-slate-900 dark:focus:border-primary"
//         aria-label={label}
//         {...register(name)}
//         defaultValue="" // Ensure a default value is set
//       >
//         {placeholder && (
//           <option value="" disabled>
//             {placeholder}
//           </option>
//         )}
//         {options.map((option) => (
//           <option key={option.value} value={option.value}>
//             {option.label}
//           </option>
//         ))}
//       </select>

//       {errors[name] && (
//         <small className="text-red-500">
//           {errors[name]?.message as string}
//         </small>
//       )}
//     </div>
//   );
// };

// interface opt {
//   options: { value: string | number; label: string };
// }
interface SelectInputProps {
  name: string;
  label: string;
  options: { value: string | number; label: string }[];
  placeholder?: string;
  loading?: boolean; // New loading prop
  disabled?: boolean;
}

export const SelectInput: React.FC<SelectInputProps> = ({
  name,
  label,
  options,
  placeholder,
  loading = false, // Default to false if not provided
  disabled,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="card justify-content-center flex flex-col">
      <label className="mb-2 block text-sm font-medium text-black dark:text-white">
        {label}
      </label>
      <select
        disabled={disabled ? disabled : false}
        className="font-sans focus:shadow-outline-primary dark:focus:shadow-outline-primary w-full rounded-lg border border-solid border-slate-300 bg-white px-3 py-2 text-sm font-normal leading-5 text-slate-900 shadow-md shadow-slate-100 focus:border-primary focus:shadow-lg focus-visible:outline-0 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-300 dark:shadow-slate-900 dark:focus:border-primary"
        aria-label={label}
        {...register(name)}
        defaultValue="" // Ensure a default value is set
      >
        {loading ? (
          <option value="" disabled>
            Loading...
          </option>
        ) : (
          placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )
        )}
        {!loading &&
          options &&
          options.map((option) => (
            <option
              disabled={disabled ? disabled : false}
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
      </select>

      {errors[name] && (
        <small className="text-danger">{errors[name]?.message as string}</small>
      )}
    </div>
  );
};

export const NumberInput: React.FC<NumberInputProps> = ({
  name,
  label,
  placeholder,
  min,
  max,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="card justify-content-center flex flex-col">
      <label className="mb-2 block text-sm font-medium text-black dark:text-white">
        {label}
      </label>
      <input
        className="font-sans focus:shadow-outline-primary dark:focus:shadow-outline-primary w-full rounded-lg border border-solid border-slate-300 bg-white px-3 py-2 text-sm font-normal leading-5 text-slate-900 shadow-md shadow-slate-100 focus:border-primary focus:shadow-lg focus-visible:outline-0 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-300 dark:shadow-slate-900 dark:focus:border-primary"
        aria-label={label}
        min={min}
        max={max}
        placeholder={placeholder ? placeholder : "Type something…"}
        {...register(name)}
        type="number"
      />

      {errors[name] && (
        <small className="text-danger">{errors[name]?.message as string}</small>
      )}
    </div>
  );
};

interface EthiopianInputProps {
  name: string;
  label: string;
  placeholder?: string;
}

// export const EthiopianNumberInput: React.FC<NumberInputProps> = ({
//   name,
//   label,
//   placeholder,
// }) => {
//   const {
//     register,
//     formState: { errors },
//   } = useFormContext();

//   return (
//     <div className="flex w-full flex-col" style={{ backgroundColor: "redF" }}>
//       <label className="mb-2 block text-sm font-medium text-black dark:text-white">
//         {label}
//       </label>
//       <div
//         className=" flex w-full  items-center "
//         style={{ backgroundColor: "yellow" }}
//       >
//         <span
//           style={{
//             borderBottomLeftRadius: "10px",
//             borderTopLeftRadius: "10px",
//           }}
//           className="text-gray-600 dark:text-gray-300  font-sans focus:shadow-outline-primary dark:focus:shadow-outline-primary left-3 border border-solid border-slate-300 bg-white py-2 pl-5 pr-5 leading-5 text-slate-900 shadow-md shadow-slate-100 focus:border-primary focus:shadow-lg focus-visible:outline-0 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-300 dark:shadow-slate-900 dark:focus:border-primary"
//         >
//           +251
//         </span>
//         <Input
//           style={{
//             borderBottomRightRadius: "10px",
//             borderTopRightRadius: "10px",
//           }}
//           slotProps={{
//             input: {
//               className:
//                 " rounded-r-lg w-full   text-sm font-sans font-normal leading-5 pl-14 pr-3 py-2  shadow-md shadow-slate-100 dark:shadow-slate-900 focus:shadow-outline-primary dark:focus:shadow-outline-primary focus:shadow-lg border border-solid border-slate-300 focus:border-primary dark:focus:border-primary dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-300 focus-visible:outline-0",
//             },
//           }}
//           aria-label="Phone number input"
//           placeholder={placeholder ? placeholder : "912345678"} // Ethiopian phone format
//           {...register(name)}
//           type="tel"
//         />
//       </div>
//       {errors[name] && (
//         <small className="text-danger">{errors[name]?.message as string}</small>
//       )}
//     </div>
//   );
// };

export const EthiopianNumberInput: React.FC<InputProps> = ({
  name,
  label,
  type = "text",
  placeholder,
  disabled,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col">
      <label className="mb-2 block text-sm font-medium text-black dark:text-white">
        {label}
      </label>
      <div className="flex">
        <span
          className="text-gray-600 dark:text-gray-300 font-sans border border-solid border-slate-300 bg-white py-2 pl-5 pr-5 leading-5 text-slate-900 shadow-md dark:border-slate-600 dark:bg-slate-900 dark:text-slate-300 dark:shadow-slate-900"
          style={{
            borderBottomLeftRadius: "10px",
            borderTopLeftRadius: "10px",
          }}
        >
          +251
        </span>
        <input
          disabled={disabled ? disabled : false}
          style={{
            borderBottomRightRadius: "10px",
            borderTopRightRadius: "10px",
          }}
          className="font-sans w-full rounded-r-lg border border-solid border-slate-300 bg-white px-3 py-2 text-sm leading-5 text-slate-900 shadow-md focus:border-primary focus-visible:outline-0 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-300 dark:focus:border-primary"
          aria-label="Ethiopian phone number input"
          placeholder={placeholder ? placeholder : "912345678"}
          {...register(name)}
          type={type}
        />
      </div>
      {errors[name] && (
        <small className="text-danger">{errors[name]?.message as string}</small>
      )}
    </div>
  );
};
export const InputString: React.FC<InputProps> = ({
  name,
  label,
  type,
  placeholder,
  disabled,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="card justify-content-center flex flex-col ">
      <label className="mb-2 block text-sm  font-medium text-black dark:text-white">
        {label}
      </label>
      {/* <InputText
        id={`email_for_${label.toLowerCase()}`}
        {...register(name)}
        type={type ? type : "text"}
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      /> */}
      <Input
        disabled={disabled}
        slotProps={{
          input: {
            className:
              " w-full text-sm font-sans font-normal leading-5 px-3 py-2 rounded-lg shadow-md shadow-slate-100 dark:shadow-slate-900 focus:shadow-outline-primary dark:focus:shadow-outline-primary focus:shadow-lg border border-solid border-slate-300   focus:border-primary dark:focus:border-primary dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-300 focus-visible:outline-0",
          },
        }}
        aria-label="Demo input"
        placeholder={placeholder ? placeholder : "Type something…"}
        {...register(name)}
        type={type ? type : "text"}
      />

      {errors[name] && (
        <small className=" text-danger">
          {errors[name]?.message as string}
        </small>
      )}
    </div>
  );
};

export const CommonButton: React.FC<ButtonProps> = ({
  label,
  loading,
  disabled,
}) => {
  return (
    <div className="card justify-content-center flex flex-col ">
      <BaseButton
        type="submit"
        // className="w-full cursor-pointer rounded-lg border border-solid border-primary bg-primary px-4 py-2 text-sm  leading-normal text-white"
        // onClick={handleClick}

        disabled={loading || disabled} // Disable button when loading
        style={{
          textTransform: "none",
          backgroundColor: "#0f6f03",
          color: "white",
        }}
      >
        {loading ? (
          <div className="flex items-center justify-center text-white ">
            <CircularProgress
              size={20}
              className="mr-2 text-white"
              sx={{ color: "#ffffff" }}
            />
            Loading...
          </div>
        ) : (
          label
        )}
      </BaseButton>
    </div>
  );
};
interface InputNumberProps {
  name: string;
  label: string;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number | "any";
}

export const InputNumber: React.FC<InputNumberProps> = ({
  name,
  label,
  placeholder,
  // min =,
  max,
  step = "any",
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="card justify-content-center flex flex-col">
      <label className="mb-2 block text-sm font-medium text-black dark:text-white">
        {label}
      </label>
      <Input
        slotProps={{
          input: {
            className:
              "w-full text-sm font-sans font-normal leading-5 px-3 py-2 rounded-lg shadow-md shadow-slate-100 dark:shadow-slate-900 focus:shadow-outline-primary dark:focus:shadow-outline-primary focus:shadow-lg border border-solid border-slate-300 focus:border-primary dark:focus:border-primary dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-300 focus-visible:outline-0",
            type: "number",
            step: step,
            // min: min,
            max: max,
          },
        }}
        aria-label={label}
        placeholder={placeholder || "Enter a number..."}
        {...register(name, {
          valueAsNumber: true,
          setValueAs: (value) => (value === "" ? undefined : Number(value)),
        })}
      />
      {errors[name] && (
        <small className="text-danger">{errors[name]?.message as string}</small>
      )}
    </div>
  );
};

interface FileDropzoneProps {
  name: string;
  label: string;
  multiple?: boolean;
  accept?: string;
}

export const FileDropzone: React.FC<FileDropzoneProps> = ({
  name,
  label,
  multiple = true,
  accept = "image/*",
}) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const files = watch(name) || [];

  const onDrop = (acceptedFiles: File[]) => {
    setValue(name, acceptedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg"] },
    multiple,
  });

  return (
    <div className="dropzone-container flex flex-col">
      <label className="mb-2 block text-sm font-medium text-black dark:text-white">
        {label}
      </label>
      <div
        {...getRootProps()}
        className="dropzone cursor-pointer border border-dashed p-4"
      >
        <input {...getInputProps()} />
        <p>Drag and drop some files here, or click to select files</p>
      </div>
      <ul className="mt-2">
        {files.map((file: File, idx: number) => (
          <li key={idx}>
            {file.name} - {Math.round(file.size / 1024)} KB
          </li>
        ))}
      </ul>
      {errors[name] && (
        <small className="text-danger">{errors[name]?.message as string}</small>
      )}
    </div>
  );
};
