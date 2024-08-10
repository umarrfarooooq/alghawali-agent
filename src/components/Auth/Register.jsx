"use client";
import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Logo from "@public/logo.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import InputField from "@/components/ui/Custom-Input";
import InputError from "@/components/Input-Error/Input-Error";
import { useTranslations } from "next-intl";
import axiosInstance from "@/lib/axiosInstanse";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import Link from "next/link";

const RegisterComponent = () => {
  const { toast } = useToast();
  const t = useTranslations("SignUp");
  const router = useRouter();
  const [idFrontPreview, setIdFrontPreview] = useState("");
  const [idBackPreview, setIdBackPreview] = useState("");
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1];
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [nationality, setNationality] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (event, setPreview) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview("");
    }
  };
  const href = pathname.includes(`/${currentLocale}/login`)
  ? pathname
  : `/${currentLocale}/login`;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!name || !email || !number || !nationality) {
      setLoading(false);
      setError("Please fill in all the required fields.");
      toast({
        variant: "destructive",
        title: "Please fill in all the required fields.",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setLoading(false);
      setError("Please enter a valid email address.");
      toast({
        variant: "destructive",
        title: "Please enter a valid email address.",
      });
      return;
    }

    if (!e.target.idCardFront.files[0] || !e.target.idCardBack.files[0]) {
      setLoading(false);
      setError("Please upload both the front and back of your ID card.");
      toast({
        variant: "destructive",
        title: "Please upload both the front and back of your ID card.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("number", number);
    formData.append("nationality", nationality);
    formData.append("idCardFront", e.target.idCardFront.files[0]);
    formData.append("idCardBack", e.target.idCardBack.files[0]);

    try {
      await axiosInstance.post(`api/v1/agentRegister/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setLoading(false);
      
      toast({
        title: "Agent registration request submitted successfully.",
        action: <ToastAction altText="Login"><Link href={href}>Login</Link></ToastAction>,
      });
    } catch (error) {
      setLoading(false);
      if (error.response) {
        toast({
          title:
            error.response.data.error ||
            "An error occurred during registration",
        });
        setError(
          error.response.data.error || "An error occurred during registration"
        );
      } else if (error.request) {
        toast({
          title: "No response from server. Please try again.",
        });
        setError("No response from server. Please try again.");
      } else {
        toast({
          title: "An unexpected error occurred. Please try again.",
        });
        setError("An unexpected error occurred. Please try again.");
      }
      console.error("Registration error:", error);
    }
  };
  return (
    <div className="bg-[#F2F2F2] min-h-screen flex items-center justify-center lg:py-20 lg:px-20">
      <div className="container w-full mx-auto px-2 flex items-center justify-center my-2">
        <div
          style={{ boxShadow: "0px 4px 12px 0px rgba(3, 12, 50, 0.16)" }}
          className="flex item-center w-full md:w-1/2 justify-between p-4 sm:p-8 gap-4 rounded-2xl bg-[#FFFBFA]"
        >
          <div className="w-full bg-[#F2F2F2] rounded-lg border-[#F4F1EB]">
            <div className="p-4 md:p-6 flex flex-col gap-12">
              <div className="flex flex-col items-center text-center gap-4">
                <div>
                  <Image src={Logo} className="w-20 h-20" alt="logo" />
                </div>
                <div>
                  <div>
                    <div className="text-xl md:text-2xl font-semibold">
                      Enter Your Info
                    </div>
                  </div>
                </div>
              </div>

              <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit}
                autoComplete="false"
              >
                {error && <InputError errorMessage={error} />}
                <div className="flex flex-col gap-6">
                  <InputField
                    label="Enter Name"
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <InputField
                    label="Enter Phone Number"
                    type="number"
                    placeholder="+1234567890"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                  />
                  <InputField
                    label="Enter Email"
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputField
                    label="Enter Nationality"
                    type="text"
                    placeholder="Enter Nationality"
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                  />
                  <label className="block text-xl">ID Front Copy</label>
                  {idFrontPreview && (
                    <img
                      src={idFrontPreview}
                      alt="ID Front Preview"
                      className="w-[8rem] h-[8rem] object-cover object-top outline-none border-none mb-2"
                    />
                  )}
                  <div className="flex items-center mb-4 justify-center w-full">
                    <label
                      htmlFor="idCardFront"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-transparent dark:hover:bg-bray-800 dark:bg-transparent hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click To Upload</span>
                        </p>
                      </div>
                      <input
                        onChange={(e) => handleFileChange(e, setIdFrontPreview)}
                        id="idCardFront"
                        type="file"
                        name="idCardFront"
                        hidden
                      />
                    </label>
                  </div>

                  <label className="block text-xl">ID Back Copy</label>
                  {idBackPreview && (
                    <img
                      src={idBackPreview}
                      alt="ID Back Preview"
                      className="w-[8rem] h-[8rem] object-cover object-top outline-none border-none mb-2"
                    />
                  )}
                  <div className="flex items-center mb-4 justify-center w-full">
                    <label
                      htmlFor="idCardBack"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-transparent dark:hover:bg-bray-800 dark:bg-transparent hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click To Upload</span>
                        </p>
                      </div>
                      <input
                        onChange={(e) => handleFileChange(e, setIdBackPreview)}
                        id="idCardBack"
                        type="file"
                        name="idCardBack"
                        hidden
                      />
                    </label>
                  </div>
                </div>
                <div>
                  <Button
                    disabled={loading}
                    className="w-full bg-[#107243] shadow-md"
                  >
                    {loading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Register
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
