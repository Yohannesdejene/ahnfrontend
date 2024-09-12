"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Alert from "@mui/material/Alert";
import { InputString, Button } from "@/common/formElements";
import { apiCreateCountry } from "@/services/ApiCountry";
import { useGetAllCountries } from "@/hooks/useGetAllCountries";
import * as URL from "@/route/index";
import { useRouter } from "next/navigation";

// import { toast } from "react-toastify";
import toast from "react-hot-toast";

import { PageHeader } from "@/common/pageHeader";
const formSchema = z.object({
  name: z.string().nonempty("Name is required"),
  isoCode: z
    .string()
    .min(2, "ISO code must be at least 2 characters")
    .max(3, "ISO code must be at most 3 characters"), // Example for ISO code validation
  countryCode: z
    .string()
    .startsWith("+", "Country code must start with '+'")
    .nonempty("Country code is required"),
  // addedBy: z.string().nullable(), // allows null values
});
type FormData = z.infer<typeof formSchema>;

const AddCountry: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const addCountry = async (values: any) => {
    setErrorMessage(null);
    setLoading(true);

    // Wrap the promise in toast.promise
    toast
      .promise(
        apiCreateCountry({
          ...values,
          addedBy: null,
        }),
        {
          // Messages for the different promise states
          loading: "Creating country...",
          success: <b>Country created successfully!</b>,
          // Dynamically set the error message
          error: (error) => (
            <b>
              {error.message || "An error occurred while creating the country."}
            </b>
          ),
        },
      )
      .then(() => {
        // If the API request is successful, redirect to the list page
        setLoading(false);
        setTimeout(() => {
          router.push(URL.LIST_COUNTRIES);
        }, 500);
      })
      .catch((error: any) => {
        // If an error occurs, handle it here by setting the error message
        const errorMessage =
          error.message || "An error occurred while creating the country.";

        // Set the custom error message for your component
        setErrorMessage(errorMessage);

        setLoading(false); // Stop loading after the error occurs
      });
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    addCountry(data);
  };

  return (
    <>
      <PageHeader
        title="Add country"
        url={URL.LIST_COUNTRIES}
        btnLabel="List Countries"
        showButton={true}
      />
      <div className=" flex h-screen  w-full bg-white text-black   dark:bg-boxdark   dark:text-white ">
        <FormProvider {...methods}>
          <div className="container mx-auto mt-0">
            <div className="w-full">
              {/* <div className="rounded-lg bg-white shadow"> */}
              <div className="p-8">
                <h6 className="text-gray-700 w-full text-lg font-normal md:w-1/2">
                  Add Country
                </h6>

                <hr className="mb-4 mt-4 w-full text-lg font-normal text-normalGray md:w-1/2" />
                <div className="w-full md:w-1/2">
                  {/* </div> */}
                  <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className="p-fluid" // PrimeReact class for fluid layout
                  >
                    <div className="mb-3 w-full ">
                      {/* "name" : "Ethiopia", "isoCode" : "ET", "countryCode" :
                    "+2519", "addedBy" : null */}

                      <InputString
                        type="text"
                        name="name"
                        label="Name"
                        placeholder=" ex Ethiopia"
                      />
                    </div>
                    <div className="mb-3 w-full">
                      <InputString
                        type="text"
                        name="isoCode"
                        label="Iso Code"
                        placeholder="ex ET"
                      />
                    </div>
                    <div className="mb-3 w-full">
                      <InputString
                        type="text"
                        name="countryCode"
                        label="Country Code"
                        placeholder="ex +2519"
                      />
                    </div>

                    <div className="mb-4">
                      <Button loading={loading} label="Submit" />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </FormProvider>
      </div>
    </>
  );
};

export default AddCountry;
