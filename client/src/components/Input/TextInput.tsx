import React from "react";
type InputProp = React.InputHTMLAttributes<HTMLInputElement> & {
  type: string;
  placeholderText?: string;
  name?: string;
  accept?: string;
  value?: string;
  className?: string;
  error?: unknown;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  props?: React.HTMLInputTypeAttribute;
};
function TextInput({
  type,
  accept,
  placeholderText,
  name,
  value,
  handleInputChange,
  className,
  ...props
}: InputProp) {
  return (
    <input
      {...props}
      accept={accept}
      type={type}
      placeholder={placeholderText}
      name={name}
      value={value}
      onChange={handleInputChange}
      className={` px-3  h-12 outline-[#90BFE9] rounded-lg border border-[#515F69] bg-[#F4F6F7] font-[#A6B4BA]  ${className}`}
    />
  );
}

export default TextInput;
