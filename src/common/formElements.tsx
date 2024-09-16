import React from "react";
import { useState } from "react";

import { useFormContext } from "react-hook-form";
// import { Eye, EyeSlash } from "primeicons/primeicons";
import { Input } from "@mui/base/Input";
import { Button as BaseButton } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Select from "react-select";

// import { useNumberInput } from "@mui/base/unstable_useNumberInput";

interface InputProps {
  name: string;
  label: string;
  type: string;
  placeholder: string;
}

interface ButtonProps {
  label: string;
  loading: boolean;
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
}

export const SelectInput: React.FC<SelectInputProps> = ({
  name,
  label,
  options,
  placeholder,
  loading = false, // Default to false if not provided
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
          options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>

      {errors[name] && (
        <small className="text-red-500">
          {errors[name]?.message as string}
        </small>
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

export const InputString: React.FC<InputProps> = ({
  name,
  label,
  type,
  placeholder,
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

export const CommonButton: React.FC<ButtonProps> = ({ label, loading }) => {
  return (
    <div className="card justify-content-center flex flex-col ">
      <BaseButton
        type="submit"
        className="w-full cursor-pointer rounded-lg border border-solid border-primary bg-primary px-4 py-2 text-sm  leading-normal text-white"
        // onClick={handleClick}
        disabled={loading} // Disable button when loading
        style={{ textTransform: "none" }}
      >
        {loading ? (
          <div className="flex items-center justify-center text-white ">
            <CircularProgress size={20} className="mr-2 text-white" />
            Loading...
          </div>
        ) : (
          label
        )}
      </BaseButton>
    </div>
  );
};

 
