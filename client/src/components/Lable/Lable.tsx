import React from "react";
type LableProp = React.LabelHTMLAttributes<HTMLLabelElement> & {
  label: string;
  className?: string;
};

function Lable({ label, className, ...props }: LableProp) {
  return (
    <label className={` ${className} text-[#3f150b] `} {...props}>
      {label}
    </label>
  );
}

export default Lable;
