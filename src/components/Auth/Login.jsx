"use client";
import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Logo from "@public/logo.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import InputField from "@/components/ui/Custom-Input";
import InputError from "@/components/Input-Error/Input-Error";
import { GoogleLogin } from "@react-oauth/google";
import axiosInstance from "@/lib/axiosInstanse";
import { useTranslations } from "next-intl";
import { LanguagePicker } from "../Header/Language-Picker";

const LoginComponent = () => {
  const t = useTranslations("login");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    if (!email || !password) {
      setError("Please provide both email and password");
      setLoading(false);
      return;
    }
    console.log("Login request data:", { email, password });
    try {
      const response = await axiosInstance.post("api/v1/agents/login", {
        email,
        password,
      });

      console.log("Response from API:", response.data);
      setLoading(false);

      if (response.data.success) {
        localStorage.setItem("agentToken", response.data.token);
        router.push("/");
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        setError(error.response.data.error || "An error occurred");
      } else {
        setError("An error occurred. Please try again.");
      }
      console.error("Error submitting form:", error);
    }
  };
  const handleGoogleLogin = async (credentialResponse) => {
    setLoading(true);
    setError("");
    try {
      const response = await axiosInstance.post("api/v1/agents/google-login", {
        token: credentialResponse.credential,
      });
      localStorage.setItem("agentToken", response.data.token);
      setLoading(false);
      router.push("/");
    } catch (error) {
      setLoading(false);
      setError(
        error.response?.data?.error || "An error occurred during Google login"
      );
      console.error("Google login error:", error);
    }
  };

  return (
    <div className="bg-[#F2F2F2] min-h-screen flex items-center justify-center lg:py-20 lg:px-20">
      <div className="container mx-auto px-2">
      <div className="flex items-center justify-center">
        <LanguagePicker />
      </div>
        <div
          style={{ boxShadow: "0px 4px 12px 0px rgba(3, 12, 50, 0.16)" }}
          className="flex item-center justify-between p-4 sm:p-8 gap-4 rounded-2xl bg-[#FFFBFA]"
        >
          <div className="w-full lg:max-h-[43rem] bg-[#F2F2F2] rounded-lg border-[#F4F1EB]">
            <div className="p-4 md:p-6 flex flex-col gap-12">
              <div className="flex flex-col items-center text-center gap-4">
                <div>
                  <Image src={Logo} className="w-20 h-20" alt={t("logoAlt")} />
                </div>
                <div>
                  <div>
                    <div className="text-xl md:text-2xl font-semibold">
                      {t("loginTitle")}
                    </div>
                    <div className="text-base font-normal">
                      {t("loginSubtitle")}
                    </div>
                  </div>
                </div>
              </div>

              <form
                className="flex flex-col gap-4"
                onSubmit={handleLoginSubmit}
                autoComplete="false"
              >
                {error && <InputError errorMessage={error} />}
                <div className="flex flex-col gap-6">
                  <InputField
                    label={t("emailPlaceholder")}
                    type="email"
                    placeholder={t("emailPlaceholder")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="border relative border-[#A9A9A9] px-4 rounded-lg flex items-center justify-start gap-2">
                    <div className="px-2 absolute text-xs top-[-.5rem] bg-[#F2F2F2]">
                      {t("passwordPlaceholder")}
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder={t("passwordPlaceholder")}
                      className="border-none w-full py-[0.88rem] outline-none bg-transparent"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                      onClick={togglePasswordVisibility}
                      className="cursor-pointer"
                    >
                      {showPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M11.6944 10.6953C11.4439 10.9288 11.2429 11.2103 11.1036 11.5231C10.9642 11.8359 10.8893 12.1735 10.8832 12.5159C10.8772 12.8583 10.9402 13.1984 11.0684 13.5159C11.1967 13.8335 11.3876 14.1219 11.6297 14.364C11.8719 14.6062 12.1603 14.7971 12.4778 14.9253C12.7954 15.0536 13.1355 15.1166 13.4779 15.1105C13.8203 15.1045 14.1579 15.0295 14.4707 14.8902C14.7835 14.7508 15.0651 14.5498 15.2985 14.2993"
                            stroke="#434146"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12.418 6.62269C12.7761 6.57807 13.1366 6.55536 13.4975 6.55469C19.4476 6.55469 21.9977 12.5047 21.9977 12.5047C21.6177 13.3182 21.1411 14.0831 20.5782 14.7827"
                            stroke="#434146"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M8.91859 7.91797C7.22812 9.0694 5.87541 10.6509 5 12.4995C5 12.4995 7.55006 18.4495 13.5002 18.4495C15.1288 18.4538 16.7224 17.9778 18.0818 17.081"
                            stroke="#434146"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M5 4L22.0004 21"
                            stroke="#434146"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="16"
                          viewBox="0 0 22 16"
                          fill="none"
                        >
                          <path
                            d="M8.77832 7.99993C8.77832 8.5893 9.01245 9.15453 9.42919 9.57128C9.84594 9.98803 10.4112 10.2222 11.0005 10.2222C11.5899 10.2222 12.1551 9.98803 12.5719 9.57128C12.9886 9.15453 13.2228 8.5893 13.2228 7.99993C13.2228 7.41056 12.9886 6.84533 12.5719 6.42858C12.1551 6.01184 11.5899 5.77771 11.0005 5.77771C10.4112 5.77771 9.84594 6.01184 9.42919 6.42858C9.01245 6.84533 8.77832 7.41056 8.77832 7.99993Z"
                            stroke="#333333"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M21 8C18.3333 12.4444 15 14.6667 11 14.6667C7 14.6667 3.66667 12.4444 1 8C3.66667 3.55556 7 1.33333 11 1.33333C15 1.33333 18.3333 3.55556 21 8Z"
                            stroke="#333333"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </span>
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
                    {t("loginButton")}
                  </Button>
                </div>
              </form>
              <div className="flex flex-col gap-8">
                <div className="flex items-center justify-between gap-4">
                  <span className="w-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full"
                      height="2"
                      viewBox="0 0 194 2"
                      fill="none"
                    >
                      <path
                        d="M1 1L193 1.00002"
                        stroke="#696969"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  <span className="text-sm w-fit text-nowrap">
                    {t("continueWith")}
                  </span>
                  <span className="w-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full"
                      height="2"
                      viewBox="0 0 194 2"
                      fill="none"
                    >
                      <path
                        d="M1 1L193 1.00002"
                        stroke="#696969"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <GoogleLogin
                    className="w-full"
                    onSuccess={handleGoogleLogin}
                    onError={() => {
                      setError(
                        "Google Sign-In was unsuccessful. Please try again."
                      );
                    }}
                    render={({ onClick }) => (
                      <button
                        onClick={onClick}
                        className="flex items-center justify-center border gap-2 w-full px-6 py-3 rounded-lg"
                        disabled={loading}
                      >
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M9.99974 3.86667C11.8775 3.86667 13.1442 4.67778 13.8664 5.35556L16.6886 2.6C14.9553 0.988889 12.6997 0 9.99974 0C6.08863 0 2.71085 2.24444 1.06641 5.51111L4.29974 8.02222C5.11085 5.61111 7.3553 3.86667 9.99974 3.86667Z"
                              fill="#EA4335"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M19.6 10.2224C19.6 9.4002 19.5333 8.8002 19.3889 8.17798H10V11.8891H15.5111C15.4 12.8113 14.8 14.2002 13.4667 15.1335L16.6222 17.578C18.5111 15.8335 19.6 13.2669 19.6 10.2224Z"
                              fill="#4285F4"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M4.31111 11.9779C4.1 11.3556 3.97778 10.689 3.97778 10.0001C3.97778 9.3112 4.1 8.64453 4.3 8.02231L1.06667 5.5112C0.388889 6.86676 0 8.38898 0 10.0001C0 11.6112 0.388889 13.1334 1.06667 14.489L4.31111 11.9779Z"
                              fill="#FBBC05"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M10.0003 20.0001C12.7003 20.0001 14.967 19.1112 16.6226 17.5779L13.467 15.1335C12.6226 15.7224 11.4892 16.1335 10.0003 16.1335C7.3559 16.1335 5.11146 14.389 4.31146 11.9779L1.07812 14.489C2.72257 17.7557 6.08924 20.0001 10.0003 20.0001Z"
                              fill="#34A853"
                            />
                          </svg>
                        </span>
                        {loading ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : null}
                        <span>{t("googleButton")}</span>
                      </button>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="hidden w-full lg:max-h-[43rem] loginImage rounded-lg overflow-hidden p-4 xl:flex flex-col justify-between">
            <div className="w-full flex items-center justify-center"></div>
            <div className="w-full text-base lg:text-3xl font-normal mb-6 text-[#FFFDFA]">
              {t("quote")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
