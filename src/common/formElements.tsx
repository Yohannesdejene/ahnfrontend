import React from "react";
import { useState } from "react";

import { useFormContext } from "react-hook-form";
// import { Eye, EyeSlash } from "primeicons/primeicons";
import { Input } from "@mui/base/Input";
import { Button as BaseButton } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

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

interface InputPropsWithoutType {
  name: string;
  label: string;
}

interface InputPropsNumber {
  name: string;
  label: string;
}

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

export const Button: React.FC<ButtonProps> = ({ label, loading }) => {
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

 
