import React from 'react';
import InputField from "@/components/ui/Custom-Input";
import Select from "@/components/ui/Custom-Select";

const PhoneInput = ({ label, phoneValue, phoneOnChange, codeValue, codeOnChange }) => {
    const countryCodes = [
        { value: '+1', label: '+1' },
        { value: '+44', label: '+44' },
        { value: '+91', label: '+91' },
      ];
  return (
    <div className="flex gap-2 border-[#A9A9A9] border rounded-lg">
      <div className="w-1/6">
        <Select
          label="Phone"
          options={countryCodes}
          value={codeValue}
          onChange={(selectedOption) => codeOnChange(selectedOption)}
          optionClasses="text-xs"
          placeholder="+92"
          className="border-none placeholder:text-sm"
        />
      </div>
      <div className="w-5/6">
        <InputField
          type="tel"
          placeholder="Mobile number"
          value={phoneValue}
          onChange={phoneOnChange}
          className="border-none"
        />
      </div>
    </div>
  );
};

export default PhoneInput;