"use client";
import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const Select = ({
  label,
  options,
  value,
  onChange,
  className,
  labelBg,
  optionClasses,
  placeholder = "Select an option",
  icon,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value);

  useEffect(() => {
    setSelectedOption(value);
  }, [value]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div
        className={`border relative border-[#A9A9A9] px-4 rounded-lg flex items-center justify-between gap-2 cursor-pointer ${className}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {label && (
          <div
            className={`px-2 absolute text-xs top-[-.5rem] ${
              labelBg ? labelBg : "bg-[#FFFDFA]"
            }`}
          >
            {label}
          </div>
        )}
        <div className="flex items-center gap-2 w-full">
          {icon && <span>{icon}</span>}
          <div className="py-[0.88rem] w-full">
            {selectedOption ? (
              selectedOption.label
            ) : (
              <span className="text-gray-400">{placeholder}</span>
            )}
          </div>
        </div>
        <span className="text-gray-400">
          <ChevronDown />
        </span>
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-[#A9A9A9] rounded-lg shadow-lg">
          {options.map((option, index) => (
            <div
              key={index}
              className={`px-2 mx-2 py-2 my-1 rounded hover:bg-gray-100 cursor-pointer overflow-hidden ${optionClasses}`}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
