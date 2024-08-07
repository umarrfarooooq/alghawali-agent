"use client";
import React, { useState, useEffect } from "react";
import InputField from "@/components/ui/Custom-Input";
import Select from "@/components/ui/Custom-Select";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axiosInstanse";
import { Checkbox } from "../ui/checkbox";
import { VerifyAgentToken } from "@/lib/VerifyAgentToken";

const UpdateMaid = ({ onCloseForm, maidId, maid }) => {
  const [errorMessage, setErrorMessage] = useState(false);
  const [spinningLoader, setSpinningLoader] = useState(false);
  const [maidImagePreview, setMaidImagePreview] = useState("");
  const [passportFrontPreview, setPassportFrontPreview] = useState("");
  const [passportBackPreview, setPassportBackPreview] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [otherLanguage, setOtherLanguage] = useState("");
  const [videoPreview, setVideoPreview] = useState("");
  const [showOtherLanguage, setShowOtherLanguage] = useState(false);
  const [showOtherReligion, setShowOtherReligion] = useState(false);
  const [isExperienced, setIsExperienced] = useState(false);

  const [formData, setFormData] = useState({
    maidName: "",
    maritalStatus: null,
    numberOfChildren: "",
    experienceYears: "",
    experienceCountry: "",
    religion: null,
    education: "",
    otherReligion: "",
    languages: [],
    maidImage: null,
    maidPassportFront: null,
    maidPassportBack: null,
    videoLink: null,
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (maid) {
      console.log(maid);
      setFormData({
        maidName: maid.maidName || "",
        maritalStatus: maid.maritalStatus
          ? { value: maid.maritalStatus, label: maid.maritalStatus }
          : null,
        numberOfChildren: maid.numberOfChildren
          ? { value: maid.numberOfChildren, label: maid.numberOfChildren }
          : null,
        experienceYears: maid.experience.years
          ? { value: maid.experience.years, label: maid.experience.years }
          : null,
        experienceCountry: maid.experience.country
          ? { value: maid.experience.country, label: maid.experience.country }
          : null,
        religion: maid.religion
          ? { value: maid.religion, label: maid.religion }
          : null,
        education: maid.education
          ? { value: maid.education, label: maid.education }
          : null,
        otherReligion: maid.otherReligion || "",
        languages: maid.languages || [],
        maidImage: maid.maidImage || null,
        maidPassportFront: maid.maidPassportFront || null,
        maidPassportBack: maid.maidPassportBack || null,
        videoLink: maid.maidVideo || null,
      });

      setIsExperienced(!!maid.experience.years);
      console.log(formData.experienceYears);

      setShowOtherReligion(maid.religion === "Other");
    }
  }, [maid]);

  useEffect(() => {
    if (formData.languages) {
      setSelectedLanguages(formData.languages);
      const otherLang = formData.languages.find(
        (lang) =>
          !["Arabic", "English", "Hindi", "Nepali", "Burmese"].includes(lang)
      );
      if (otherLang) {
        setOtherLanguage(otherLang);
        setShowOtherLanguage(true);
      }
    }
  }, [formData.languages]);

  const handleInputChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleSelectChange = (field) => (option) => {
    setFormData({ ...formData, [field]: option });
  };

  const handleLanguageChange = (event) => {
    const { value, checked } = event.target;
    setFormData((prevFormData) => {
      let updatedLanguages = [...prevFormData.languages];
      if (checked) {
        updatedLanguages.push(value);
      } else {
        updatedLanguages = updatedLanguages.filter((lang) => lang !== value);
      }
      return { ...prevFormData, languages: updatedLanguages };
    });
  };

  const handleOtherLanguageChange = (event) => {
    setShowOtherLanguage(event.target.checked);
    if (!event.target.checked) {
      setOtherLanguage("");
      setFormData((prevFormData) => ({
        ...prevFormData,
        languages: prevFormData.languages.filter((lang) =>
          ["Arabic", "English", "Hindi", "Nepali", "Burmese"].includes(lang)
        ),
      }));
    }
  };

  const handleOtherLanguageInput = (event) => {
    setOtherLanguage(event.target.value);
    setFormData((prevFormData) => {
      let updatedLanguages = [...prevFormData.languages];
      if (event.target.value) {
        if (!updatedLanguages.includes("Other")) {
          updatedLanguages.push("Other");
        }
      } else {
        updatedLanguages = updatedLanguages.filter((lang) => lang !== "Other");
      }
      return { ...prevFormData, languages: updatedLanguages };
    });
  };

  const handleFileChange = (event, setPreview, field) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (file.type.startsWith("image/")) {
          setPreview(reader.result);
        } else {
          console.error("Uploaded file is not an image.");
        }
      };
      setFormData((prevData) => ({ ...prevData, [field]: file }));
      reader.readAsDataURL(file);
    } else {
      setPreview("");
      setFormData((prevData) => ({ ...prevData, [field]: null }));
    }
  };

  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setVideoPreview(URL.createObjectURL(file));
      setFormData((prevData) => ({ ...prevData, videoLink: file }));
    } else {
      setVideoPreview("");
      setFormData((prevData) => ({ ...prevData, videoLink: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSpinningLoader(true);
    console.log(maid);
    
    const forSub = {
      maidName: formData.maidName,
      education: formData.education?.value,
      maritalStatus: formData.maritalStatus?.value,
      numberOfChildren: formData.numberOfChildren?.value,
      experience: {
        years: formData.experienceYears?.value,
        country: formData.experienceCountry?.value,
      },
      religion: formData.religion?.value,
    };
    console.log("Updating maid with data:", formData);
    console.log("Updating maid sub with data:", forSub);
    setSpinningLoader(false);
  };

  return (
    <>
      <div className="bg-[#F2F5FF] h-screen overflow-auto p-3 sm:p-8 rounded-2xl shadow-lg">
        <div className="flex items-center justify-between mb-8">
          <div className="text-2xl font-semibold">Update Maid</div>
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
            {Object.keys(formErrors).length > 0 && (
              <div
                className="p-4 mb-4 w-full md:w-[26rem] text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {Object.keys(formErrors).map((key) => (
                  <p key={key} className="font-medium">
                    {formErrors[key]}
                  </p>
                ))}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <InputField
                label="Maid Name"
                name="maidName"
                placeholder="Enter maid name"
                className="mb-4"
                value={formData.maidName}
                onChange={handleInputChange("maidName")}
                labelBg="bg-[#F2F5FF]"
              />
              <Select
                label="Marital Status"
                name="maritalStatus"
                options={[
                  { value: "Single", label: "Single" },
                  { value: "Married", label: "Married" },
                  { value: "Divorced", label: "Divorced" },
                  { value: "Widowed", label: "Widowed" },
                ]}
                value={formData.maritalStatus}
                onChange={handleSelectChange("maritalStatus")}
                placeholder="Select marital status"
                className="mb-4"
                labelBg="bg-[#F2F5FF]"
              />
              {formData.maritalStatus?.value !== "Single" && (
                <Select
                  label="Number of Children"
                  name="numberOfChildren"
                  options={[
                    { value: "0", label: "0" },
                    { value: "1", label: "1" },
                    { value: "2", label: "2" },
                    { value: "3", label: "3" },
                    { value: "4", label: "4" },
                    { value: "5", label: "5" },
                  ]}
                  value={formData.numberOfChildren}
                  onChange={handleSelectChange("numberOfChildren")}
                  placeholder="Select number of children"
                  className="mb-4"
                  labelBg="bg-[#F2F5FF]"
                />
              )}

              <Select
                label="Education"
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
                value={formData.education}
                onChange={handleSelectChange("education")}
                placeholder="Select Education"
                className="mb-4"
                labelBg="bg-[#F2F5FF]"
              />

              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Checkbox
                    id="experienced"
                    checked={isExperienced}
                    onCheckedChange={() => setIsExperienced(!isExperienced)}
                  />
                  <label
                    htmlFor="experienced"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Experienced?
                  </label>
                </div>
                {isExperienced && (
                  <div className="mb-4">
                    <Select
                      name="experienceYears"
                      label="Years of Experience"
                      options={[
                        { value: "2", label: "2 Years" },
                        { value: "4", label: "4 Years" },
                        { value: "6", label: "6 Years" },
                      ]}
                      value={formData.experienceYears}
                      onChange={handleSelectChange("experienceYears")}
                      placeholder="Select years of experience"
                      className="mb-2"
                      labelBg="bg-[#F2F5FF]"
                    />
                    <Select
                      name="experienceCountry"
                      label="Experience Country"
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
                      value={formData.experienceCountry}
                      onChange={handleSelectChange("experienceCountry")}
                      placeholder="Select country of experience"
                      labelBg="bg-[#F2F5FF]"
                    />
                  </div>
                )}
              </div>

              <Select
                label="Religion"
                name="religion"
                options={[
                  { value: "Muslim", label: "Muslim" },
                  { value: "Christian", label: "Christian" },
                  { value: "Other", label: "Other" },
                ]}
                value={formData.religion}
                onChange={(option) => {
                  handleSelectChange("religion")(option);
                  setShowOtherReligion(option.value === "Other");
                }}
                placeholder="Select religion"
                labelBg="bg-[#F2F5FF]"
                className="mb-4"
              />

              {showOtherReligion && (
                <InputField
                  label="Other Religion"
                  name="otherReligion"
                  value={formData.otherReligion}
                  onChange={handleInputChange("otherReligion")}
                  placeholder="Enter religion"
                  className="mb-4"
                  labelBg="bg-[#F2F5FF]"
                />
              )}

              <div>
                <div className="mb-4">
                  <label className="block text-xl">Languages</label>
                  <div className="w-full md:grid flex gap-2 items-center flex-wrap md:grid-cols-3  bg-[#E3E3E3] md:w-[26rem] h-[6rem] sm:h-[4rem] outline-none border-none rounded-lg px-2 py-2">
                    {[
                      "Arabic",
                      "English",
                      "Hindi",
                      "Nepali",
                      "Burmese",
                      "Other",
                    ].map((lang) => (
                      <div key={lang}>
                        <input
                          className="mr-2"
                          type="checkbox"
                          id={lang.toLowerCase()}
                          name="languages[]"
                          value={lang}
                          checked={
                            lang === "Other"
                              ? showOtherLanguage
                              : selectedLanguages.includes(lang)
                          }
                          onChange={
                            lang === "Other"
                              ? handleOtherLanguageChange
                              : handleLanguageChange
                          }
                        />
                        <label htmlFor={lang.toLowerCase()}>{lang}</label>
                      </div>
                    ))}
                  </div>
                  {showOtherLanguage && (
                    <InputField
                      label="Other Language"
                      name="otherLanguages"
                      placeholder="Enter other language"
                      value={otherLanguage}
                      onChange={handleOtherLanguageInput}
                      labelBg="bg-[#F2F5FF]"
                      className="my-4"
                    />
                  )}
                </div>
              </div>

              <label className="block text-xl">Primary Image</label>
              {maidImagePreview ? (
                <img
                  src={maidImagePreview}
                  alt="Maid Image Preview"
                  className="w-[8rem] h-[8rem] object-cover object-top outline-none border-none mb-2"
                />
              ) : (
                formData.maidImage && (
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}${formData.maidImage}`}
                    alt="Current Maid Image"
                    className="w-[8rem] h-[8rem] object-cover object-top outline-none border-none mb-2"
                  />
                )
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
                      <span className="font-semibold">
                        Click to upload new image
                      </span>
                    </p>
                  </div>
                  <input
                    onChange={(e) =>
                      handleFileChange(e, setMaidImagePreview, "maidImage")
                    }
                    id="maidImage"
                    type="file"
                    name="maidImage"
                    hidden
                  />
                </label>
              </div>

              <label className="block text-xl">Passport Front Copy</label>
              {passportFrontPreview ? (
                <img
                  src={passportFrontPreview}
                  alt="Passport Front Preview"
                  className="w-[8rem] h-[8rem] object-cover object-top outline-none border-none mb-2"
                />
              ) : (
                formData.maidPassportFront && (
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}${formData.maidPassportFront}`}
                    alt="Current Passport Front"
                    className="w-[8rem] h-[8rem] object-cover object-top outline-none border-none mb-2"
                  />
                )
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
                      <span className="font-semibold">
                        Click to upload new passport front
                      </span>
                    </p>
                  </div>
                  <input
                    onChange={(e) =>
                      handleFileChange(
                        e,
                        setPassportFrontPreview,
                        "maidPassportFront"
                      )
                    }
                    id="maidPassportFront"
                    type="file"
                    name="maidPassportFront"
                    hidden
                  />
                </label>
              </div>

              <label className="block text-xl">Passport Back Copy</label>
              {passportBackPreview ? (
                <img
                  src={passportBackPreview}
                  alt="Passport Back Preview"
                  className="w-[8rem] h-[8rem] object-cover object-top outline-none border-none mb-2"
                />
              ) : (
                formData.maidPassportBack && (
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}${formData.maidPassportBack}`}
                    alt="Current Passport Back"
                    className="w-[8rem] h-[8rem] object-cover object-top outline-none border-none mb-2"
                  />
                )
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
                      <span className="font-semibold">
                        Click to upload new passport back
                      </span>
                    </p>
                  </div>
                  <input
                    onChange={(e) =>
                      handleFileChange(
                        e,
                        setPassportBackPreview,
                        "maidPassportBack"
                      )
                    }
                    id="maidPassportBack"
                    type="file"
                    name="maidPassportBack"
                    hidden
                  />
                </label>
              </div>

              <label className="block text-xl">Video (Optional)</label>
              {videoPreview ? (
                <video
                  controls
                  src={videoPreview}
                  className="w-[8rem] h-[8rem] object-cover object-top outline-none border-none mb-2"
                />
              ) : (
                formData.maidVideo && (
                  <video
                    controls
                    src={`${process.env.NEXT_PUBLIC_API_URL}${maid.maidVideo}`}
                    className="w-[8rem] h-[8rem] object-cover object-top outline-none border-none mb-2"
                  />
                )
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
                      <span className="font-semibold">
                        Click to upload new video
                      </span>
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
                    Update Maid
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateMaid;
