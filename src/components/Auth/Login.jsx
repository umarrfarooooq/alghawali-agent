"use client";
import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Logo from "@public/logo.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import InputField from "@/components/ui/Custom-Input";
import InputError from "@/components/Input-Error/Input-Error";
import { GoogleLogin } from "@react-oauth/google";
import axiosInstance from "@/lib/axiosInstanse";
import { useTranslations } from "next-intl";
import { LanguagePicker } from "../Header/Language-Picker";
import Link from "next/link";

const LoginComponent = () => {
  const t = useTranslations("login");
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1];
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
  const href = pathname.includes(`/${currentLocale}/register`)
    ? pathname
    : `/${currentLocale}/register`;
  return (
    <div className="bg-[#F2F2F2] min-h-screen flex items-center justify-center lg:py-20 lg:px-20">
      <div>
        <div class="whatsapp fixed bottom-[25px] left-[25px] z-50">
          <a rel="noreferrer" target="_blank" href="https://wa.me/96877447718">
            <div className="bg-[#222222] p-2 rounded-3xl whatsApp">
              <svg
                className="w-10 h-10"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22C10.2328 22.0029 8.49667 21.5352 6.97001 20.645L2.00401 22L3.35601 17.032C2.46511 15.5049 1.99706 13.768 2.00001 12C2.00001 6.477 6.47701 2 12 2ZM8.59201 7.3L8.39201 7.308C8.26254 7.31589 8.13599 7.3499 8.02001 7.408C7.91153 7.46943 7.81251 7.54622 7.72601 7.636C7.60601 7.749 7.53801 7.847 7.46501 7.942C7.09514 8.4229 6.89599 9.01331 6.89901 9.62C6.90101 10.11 7.02901 10.587 7.22901 11.033C7.63801 11.935 8.31101 12.89 9.19901 13.775C9.41301 13.988 9.62301 14.202 9.84901 14.401C10.9524 15.3725 12.2673 16.073 13.689 16.447L14.257 16.534C14.442 16.544 14.627 16.53 14.813 16.521C15.1043 16.506 15.3886 16.4271 15.646 16.29C15.777 16.2225 15.9048 16.1491 16.029 16.07C16.029 16.07 16.072 16.042 16.154 15.98C16.289 15.88 16.372 15.809 16.484 15.692C16.567 15.606 16.639 15.505 16.694 15.39C16.772 15.227 16.85 14.916 16.882 14.657C16.906 14.459 16.899 14.351 16.896 14.284C16.892 14.177 16.803 14.066 16.706 14.019L16.124 13.758C16.124 13.758 15.254 13.379 14.722 13.137C14.6663 13.1127 14.6067 13.0988 14.546 13.096C14.4776 13.089 14.4085 13.0967 14.3433 13.1186C14.2781 13.1405 14.2183 13.1761 14.168 13.223C14.163 13.221 14.096 13.278 13.373 14.154C13.3315 14.2098 13.2744 14.2519 13.2088 14.2751C13.1433 14.2982 13.0723 14.3013 13.005 14.284C12.9399 14.2665 12.876 14.2445 12.814 14.218C12.69 14.166 12.647 14.146 12.562 14.11C11.9881 13.8595 11.4567 13.5211 10.987 13.107C10.861 12.997 10.744 12.877 10.624 12.761C10.2306 12.3842 9.88774 11.958 9.60401 11.493L9.54501 11.398C9.50264 11.3342 9.46837 11.2653 9.44301 11.193C9.40501 11.046 9.50401 10.928 9.50401 10.928C9.50401 10.928 9.74701 10.662 9.86001 10.518C9.97001 10.378 10.063 10.242 10.123 10.145C10.241 9.955 10.278 9.76 10.216 9.609C9.93601 8.925 9.64601 8.244 9.34801 7.568C9.28901 7.434 9.11401 7.338 8.95501 7.319C8.90101 7.313 8.84701 7.307 8.79301 7.303C8.65872 7.29633 8.52415 7.29766 8.39001 7.307L8.59101 7.299L8.59201 7.3Z"
                  fill="#25D366"
                />
              </svg>
            </div>
          </a>
        </div>
      </div>
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
                    {/* <div className="text-base font-normal">
                      {t("loginSubtitle")}
                    </div> */}
                  </div>
                </div>
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
                  <span className="text-sm w-fit text-nowrap">OR</span>
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
                <Link href={href} className="w-full">
                  <Button
                    disabled={loading}
                    className="w-full bg-[#107243] shadow-md"
                  >
                    {loading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Register as Agent
                  </Button>
                </Link>
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
