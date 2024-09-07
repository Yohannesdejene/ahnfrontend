"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { InputString, Button } from "@/common/formElements";
import DarkModeSwitcher from "@/components/Header/DarkModeSwitcher";

// Define the form schema with Zod
const formSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
type FormData = z.infer<typeof formSchema>;

const Signup: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("data", data);
  };
  return (
    <>
      <div
        className=" flex  h-screen items-center justify-center  bg-white text-black   dark:bg-boxdark             dark:text-white 
"
      >
        <div className="flex h-full w-full">
          <div className="hidden h-full xl:block xl:w-1/2">
            <div className="flex h-full flex-col justify-center  px-26 py-0 text-center">
              <Link className="mb-5.5 inline-block" href="#">
                <Image
                  className="dark:block"
                  src={"/images/logo.png"}
                  alt="Logo"
                  width={400}
                  height={300}
                />
              </Link>
              <p className="text-xlg 2xl:px-20">
                HudHud Express is a leading provider of courier, logistics,
                supply chain management, and freight transportation solutions.
              </p>
            </div>
          </div>

          <div className=" h-screen w-full items-center justify-center border-l-2 border-stroke dark:border-strokedark xl:w-1/2">
            <div className=" float-right mr-10 mt-5">
              <DarkModeSwitcher />
            </div>
            <div className=" mt-20 w-full   max-w-lg p-2 md:ml-10">
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Sign up to HudHud Express
              </h2>

              <FormProvider {...methods}>
                <form
                  onSubmit={methods.handleSubmit(onSubmit)}
                  className="p-fluid max-w-full overflow-x-hidden"
                >
                  <div className="-mx-2 flex flex-wrap">
                    {/* Left Column */}
                    <div className="w-full px-2 md:w-1/2">
                      <div className="mb-3">
                        <InputString type="email" name="email" label="Email" />
                      </div>
                      <div className="mb-3">
                        <InputString
                          type="number"
                          name="phoneNumber"
                          label="Phone Number"
                        />
                      </div>
                      <div className="mb-3">
                        <InputString type="text" name="otp" label="Otp" />
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="w-full px-2 md:w-1/2">
                      <div className="mb-3">
                        <InputString
                          type="password"
                          name="password"
                          label="Password"
                        />
                      </div>
                      <div className="mb-4">
                        <InputString
                          type="password"
                          name="confirmPassword"
                          label="Confirm Password"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <Button loading={loading} label="Submit" />
                  </div>
                </form>
              </FormProvider>

              <div className="mt-6 text-center">
                <p>
                  Already have an account?{" "}
                  <Link href="/auth/login" className="text-primary">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
