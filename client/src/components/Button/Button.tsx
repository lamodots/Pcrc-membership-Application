import { PropsWithChildren } from "react";
type ButtonProp = {
  text: string;
  disableBtn?: boolean;
  className?: string;
  type?: "submit" | "reset" | "button";
  isSubmitting?: boolean;
  handleClick?: () => void;
};

/*** isSubmitting will enable you set the loading spinner when form is submitting */
function Button({
  text,
  handleClick,
  className,
  disableBtn,
  type,
  children,
  isSubmitting,
}: PropsWithChildren<ButtonProp>) {
  return (
    <button
      type={type}
      className={` cursor-pointer rounded-lg h-12 flex justify-center items-center bg-[#e97126] text-center text-sm font-bold text-[#3f150b] ${className}`}
      disabled={disableBtn}
      onClick={handleClick}
    >
      {isSubmitting ? children : text}
    </button>
  );
}

export default Button;
