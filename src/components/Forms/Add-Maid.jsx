"use client";
import React, { useState } from "react";
import axios from "axios";
import InputField from "@/components/ui/Custom-Input";
import Select from "@/components/ui/Custom-Select";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "../ui/checkbox";
import { useTranslations } from "next-intl";
import { useToast } from "@/components/ui/use-toast";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const AddMaidForm = ({ onCloseForm }) => {
  const { toast } = useToast();
  const t = useTranslations("MaidForm");
  const [isExperienced, setIsExperienced] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [spinningLoader, setSpinningLoader] = useState(false);
  const [maidImagePreview, setMaidImagePreview] = useState("");
  const [passportFrontPreview, setPassportFrontPreview] = useState("");
  const [passportBackPreview, setPassportBackPreview] = useState("");
  const [videoPreview, setVideoPreview] = useState("");
  const [showOtherLanguage, setShowOtherLanguage] = useState(false);
  const [maritalStatus, setMaritalStatus] = useState(null);
  const [education, setEducation] = useState(null);
  const [numberOfChildren, setNumberOfChildren] = useState(null);
  const [experienceYears, setExperienceYears] = useState(null);
  const [experienceCountry, setExperienceCountry] = useState(null);
  const [religion, setReligion] = useState(null);
  const [otherReligion, setOtherReligion] = useState("");
  const [showOtherReligion, setShowOtherReligion] = useState(false);
  const handleOtherReligionChange = (event) => {
    setOtherReligion(event.target.value);
  };
  const handleOtherLanguageChange = (event) => {
    setShowOtherLanguage(event.target.checked);
  };

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

  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setVideoPreview(URL.createObjectURL(file));
    } else {
      setVideoPreview("");
    }
  };

  const handleMaidFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const validateForm = () => {
      if (!e.target.maidName.value.trim()) {
        setErrorMessage("Maid name is required.");
        return false;
      }
      if (!maritalStatus.value) {
        setErrorMessage("Marital status is required.");
        return false;
      }
      if (maritalStatus && maritalStatus.value !== "Single") {
        if (!numberOfChildren?.value) {
          setErrorMessage("Number of Children is required (min 0)");
          return false;
        }
      }
      if (!education.value) {
        setErrorMessage("Education is required.");
        return false;
      }

      if (isExperienced) {
        if (!experienceYears || !experienceYears.value) {
          setErrorMessage("Please select years of experience.");
          return false;
        }
        if (!experienceCountry || !experienceCountry.value) {
          setErrorMessage("Please select country of experience.");
          return false;
        }
      }
      if (!religion.value) {
        setErrorMessage("Religion is required.");
        return false;
      }
      if (religion.value === "Other" && !otherReligion.trim()) {
        setErrorMessage("Please specify the other religion.");
        return false;
      }
      const selectedLanguages = document.querySelectorAll(
        'input[name="languages[]"]:checked'
      );
      if (selectedLanguages.length === 0) {
        setErrorMessage("Please select at least one language.");
        return false;
      }
      if (!e.target.maidImage.files[0]) {
        setErrorMessage("Maid image is required.");
        return false;
      }
      if (!e.target.maidPassportFront.files[0]) {
        setErrorMessage("Passport front copy is required.");
        return false;
      }
      return true;
    };

    if (!validateForm()) {
      return;
    }

    setSpinningLoader(true);
    const formData = new FormData();

    formData.append("maidName", e.target.maidName.value.trim());
    if (maritalStatus) {
      formData.append("maritalStatus", maritalStatus.value);
    }
    if (education) {
      formData.append("education", education.value);
    }
    if (numberOfChildren && numberOfChildren.value) {
      formData.append("numberOfChildren", numberOfChildren.value);
    }
    if (isExperienced) {
      if (experienceYears && experienceYears.value) {
        formData.append("experienceYears", experienceYears.value);
      }

      if (experienceCountry) {
        formData.append("experienceCountry", experienceCountry.value);
      }
    }

    if (religion || otherReligion) {
      formData.append(
        "religion",
        religion.value === "Other" ? otherReligion.trim() : religion.value
      );
    }

    const selectedLanguages = [];
    document
    .querySelectorAll('input[name="languages[]"]:checked')
    .forEach((checkbox) => {
      if (checkbox.value !== "Other") {
        selectedLanguages.push(checkbox.value);
      }
    });
    selectedLanguages.forEach((lang) => formData.append("languages[]", lang));

    if (showOtherLanguage && e.target.otherLanguages.value.trim()) {
      formData.append("otherLanguages", e.target.otherLanguages.value.trim());
    }

    formData.append("maidImage", e.target.maidImage.files[0]);
    formData.append("maidPassportFront", e.target.maidPassportFront.files[0]);
    if(e.target.maidPassportBack.files[0]){
      formData.append("maidPassportBack", e.target.maidPassportBack.files[0]);      
    }

    if (e.target.videoLink.files[0]) {
      formData.append("videoLink", e.target.videoLink.files[0]);
    }

    const token = localStorage.getItem("agentToken");

    try {
      const response = await axiosInstance.post(
        "api/v1/agentMaids/create-maid-request",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.success) {
        console.log("Maid request created successfully:", response.data.data);
        onCloseForm();
      }
    } catch (error) {
      console.error("Error creating maid request:", error);
      let errorMessage = "An unexpected error occurred. Please try again.";
      if (error.response) {
        if (error.response.data && error.response.data.error) {
          errorMessage = error.response.data.error;
          toast({
            title: error.response.data.error,
          });
        } else if (error.response.status === 400) {
          toast({
            title: "Invalid form data. Please check your inputs.",
          });
          errorMessage = "Invalid form data. Please check your inputs.";
        } else if (error.response.status === 401) {
          toast({
            title: "Unauthorized. Please log in again.",
          });
          errorMessage = "Unauthorized. Please log in again.";
        } else if (error.response.status === 404) {
          toast({
            title: "Maid request endpoint not found.",
          });
          errorMessage = "Maid request endpoint not found.";
        } else if (error.response.status >= 500) {
          toast({
            title: "Server error. Please try again later.",
          });
          errorMessage = "Server error. Please try again later.";
        }
      } else if (error.request) {
        toast({
          title:
            "No response from server. Please check your internet connection.",
        });
        errorMessage =
          "No response from server. Please check your internet connection.";
      }
      toast({
        title: errorMessage,
      });
      setErrorMessage(errorMessage);
    } finally {
      setSpinningLoader(false);
    }
  };

  return (
    <div className="bg-[#F2F5FF] max-h-screen overflow-auto p-3 sm:p-8 rounded-2xl shadow-lg">
      <div className="flex items-center justify-between mb-8">
        <div className="text-2xl font-semibold">{t("addNewMaidTitle")}</div>
        <div
          className="p-3 rounded-md bg-[#EBEBEB] cursor-pointer"
          onClick={onCloseForm}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M18 18L6 6"
              stroke="#CD2424"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 18L18 6"
              stroke="#CD2424"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className="bg-[#EBEBEB] p-3 sm:p-8 rounded-xl shadow-lg">
        <div className="bg-[#F2F5FF] rounded-lg p-3 sm:p-8">
          {errorMessage && (
            <div
              className="p-4 mb-4 w-full md:w-[26rem] text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleMaidFormSubmit}>
            <InputField
              label={t("maidName")}
              name="maidName"
              placeholder={t("enterMaidName")}
              className="mb-4"
              labelBg="bg-[#F2F5FF]"
            />

            <Select
              label={t("maritalStatus")}
              name="maritalStatus"
              options={[
                { value: "Single", label: "Single" },
                { value: "Married", label: "Married" },
                { value: "Divorced", label: "Divorced" },
                { value: "Widowed", label: "Widowed" },
              ]}
              value={maritalStatus}
              onChange={setMaritalStatus}
              placeholder={t("selectMaritalStatus")}
              className="mb-4"
              labelBg="bg-[#F2F5FF]"
            />

            {maritalStatus && maritalStatus.value !== "Single" && (
              <Select
                label={t("numberOfChildren")}
                name="numberOfChildren"
                options={[
                  { value: "0", label: "0" },
                  { value: "1", label: "1" },
                  { value: "2", label: "2" },
                  { value: "3", label: "3" },
                  { value: "4", label: "4" },
                  { value: "5", label: "5" },
                ]}
                value={numberOfChildren}
                onChange={setNumberOfChildren}
                placeholder={t("selectNumberOfChildren")}
                className="mb-4"
                labelBg="bg-[#F2F5FF]"
              />
            )}

            <Select
              label={t("education")}
              name="education"
              options={[
                { value: "Class 5th", label: "Class 5th" },
                { value: "Class 6th", label: "Class 6th" },
                { value: "Class 7th", label: "Class 7th" },
                { value: "Class 8th", label: "Class 8th" },
                { value: "Matric", label: "Matric" },
                { value: "Intermediate", label: "Intermediate" },
                { value: "Graduate", label: "Graduate" },
              ]}
              value={education}
              onChange={setEducation}
              placeholder={t("selectEducation")}
              className="mb-4"
              labelBg="bg-[#F2F5FF]"
            />
            <div className="flex items-center space-x-2 mb-4">
              <Checkbox
                id="experienced"
                checked={isExperienced}
                onCheckedChange={setIsExperienced}
              />
              <label
                htmlFor="experienced"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {t("experienced")}
              </label>
            </div>
            {isExperienced && (
              <div className="mb-4">
                <Select
                  name="experienceYears"
                  label={t("yearsOfExperience")}
                  options={[
                    { value: "2", label: "2 Years" },
                    { value: "4", label: "4 Years" },
                    { value: "6", label: "6 Years" },
                  ]}
                  value={experienceYears}
                  onChange={setExperienceYears}
                  placeholder={t("selectYearsOfExperience")}
                  className="mb-2"
                  labelBg="bg-[#F2F5FF]"
                />
                <Select
                  name="experienceCountry"
                  label={t("experienceCountry")}
                  options={[
                    { value: "Bahrain", label: "Bahrain" },
                    { value: "Kuwait", label: "Kuwait" },
                    { value: "Oman", label: "Oman" },
                    { value: "Qatar", label: "Qatar" },
                    { value: "Saudi Arabia", label: "Saudi Arabia" },
                    {
                      value: "United Arab Emirates",
                      label: "United Arab Emirates",
                    },
                    { value: "Jordan", label: "Jordan" },
                    { value: "Malaysia", label: "Malaysia" },
                  ]}
                  value={experienceCountry}
                  onChange={setExperienceCountry}
                  placeholder={t("selectCountryOfExperience")}
                  labelBg="bg-[#F2F5FF]"
                />
              </div>
            )}

            <Select
              label={t("religion")}
              name="religion"
              options={[
                { value: "Muslim", label: "Muslim" },
                { value: "Christian", label: "Christian" },
                { value: "Other", label: "Other" },
              ]}
              value={religion}
              onChange={(option) => {
                setReligion(option);
                setShowOtherReligion(option.value === "Other");
              }}
              placeholder={t("selectReligion")}
              labelBg="bg-[#F2F5FF]"
              className="mb-4"
            />
            {showOtherReligion && (
              <InputField
                label={t("otherReligion")}
                name="otherReligion"
                value={otherReligion}
                onChange={handleOtherReligionChange}
                placeholder={t("enterReligion")}
                className="mb-4"
                labelBg="bg-[#F2F5FF]"
              />
            )}

            <div>
              <div className="mb-4">
                <label className="block text-xl">{t("languages")}</label>
                <div className="w-full md:grid flex gap-2 items-center flex-wrap md:grid-cols-3  bg-[#E3E3E3] md:w-[26rem] h-[6rem] sm:h-[4rem] outline-none border-none rounded-lg px-2 py-2">
                  <div>
                    <input
                      className="mr-2"
                      type="checkbox"
                      id="Arabic"
                      name="languages[]"
                      value="Arabic"
                    />
                    <label for="Arabic">Arabic</label>
                  </div>
                  <div>
                    <input
                      className="mr-2"
                      type="checkbox"
                      id="english"
                      name="languages[]"
                      value="English"
                    />
                    <label for="english">English</label>
                  </div>
                  <div>
                    <input
                      className="mr-2"
                      type="checkbox"
                      id="hindi"
                      name="languages[]"
                      value="Hindi"
                    />
                    <label for="hindi">Hindi</label>
                  </div>
                  <div>
                    <input
                      className="mr-2"
                      type="checkbox"
                      id="nepali"
                      name="languages[]"
                      value="Nepali"
                    />
                    <label for="nepali">Nepali</label>
                  </div>
                  <div>
                    <input
                      className="mr-2"
                      type="checkbox"
                      id="Burmese"
                      name="languages[]"
                      value="Burmese"
                    />
                    <label for="Burmese">Burmese</label>
                  </div>
                  <div>
                    <input
                      className="mr-2"
                      type="checkbox"
                      id="Other"
                      value="Other"
                      name="languages[]"
                      onChange={handleOtherLanguageChange}
                    />
                    <label for="Other">Other</label>
                  </div>
                </div>
                {showOtherLanguage && (
                  <InputField
                    label={t("otherLanguage")}
                    name="otherLanguages"
                    placeholder={t("enterOtherLanguage")}
                    labelBg="bg-[#F2F5FF]"
                    className="my-4"
                  />
                )}
              </div>
            </div>

            <label className="block text-xl">{t("primaryImage")}</label>
            {maidImagePreview && (
              <img
                src={maidImagePreview}
                alt="Maid Image Preview"
                className="w-[8rem] h-[8rem] object-cover object-top outline-none border-none mb-2"
              />
            )}
            <div className="flex items-center mb-4 justify-center w-full">
              <label
                htmlFor="maidImage"
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
                    <span className="font-semibold">{t("clickToUpload")}</span>
                  </p>
                </div>
                <input
                  onChange={(e) => handleFileChange(e, setMaidImagePreview)}
                  id="maidImage"
                  type="file"
                  name="maidImage"
                  hidden
                />
              </label>
            </div>

            <label className="block text-xl">{t("passportFrontCopy")}</label>
            {passportFrontPreview && (
              <img
                src={passportFrontPreview}
                alt="Passport Front Preview"
                className="w-[8rem] h-[8rem] object-cover object-top outline-none border-none mb-2"
              />
            )}
            <div className="flex items-center mb-4 justify-center w-full">
              <label
                htmlFor="maidPassportFront"
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
                    <span className="font-semibold">{t("clickToUpload")}</span>
                  </p>
                </div>
                <input
                  onChange={(e) => handleFileChange(e, setPassportFrontPreview)}
                  id="maidPassportFront"
                  type="file"
                  name="maidPassportFront"
                  hidden
                />
              </label>
            </div>

            <label className="block text-xl">{t("passportBackCopy")}</label>
            {passportBackPreview && (
              <img
                src={passportBackPreview}
                alt="Passport Back Preview"
                className="w-[8rem] h-[8rem] object-cover object-top outline-none border-none mb-2"
              />
            )}
            <div className="flex items-center mb-4 justify-center w-full">
              <label
                htmlFor="maidPassportBack"
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
                    <span className="font-semibold">{t("clickToUpload")}</span>
                  </p>
                </div>
                <input
                  onChange={(e) => handleFileChange(e, setPassportBackPreview)}
                  id="maidPassportBack"
                  type="file"
                  name="maidPassportBack"
                  hidden
                />
              </label>
            </div>

            <label className="block text-xl">{t("videoOptional")}</label>
            {videoPreview && (
              <video
                controls
                src={videoPreview}
                className="w-[8rem] h-[8rem] object-cover object-top outline-none border-none mb-2"
              />
            )}
            <div className="flex items-center mb-4 justify-center w-full">
              <label
                htmlFor="videoLink"
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
                    <span className="font-semibold">{t("clickToUpload")}</span>
                  </p>
                </div>
                <input
                  onChange={handleVideoChange}
                  id="videoLink"
                  accept="video/*"
                  type="file"
                  name="videoLink"
                  hidden
                />
              </label>
            </div>

            <div>
              <div className="mb-4">
                <Button
                  disabled={spinningLoader}
                  className="w-full bg-[#107243] shadow-md"
                >
                  {spinningLoader && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {t("addMaid")}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMaidForm;
