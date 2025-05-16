import { ChangeEvent } from "react";
import Button from "../Button/Button";

interface FilterPopUpProps {
  valueStart?: string;
  handleStartChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  valueEnd?: string;
  handleEndChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  handleApply?: () => void;
}
function FilterPopUp({
  valueStart,
  handleStartChange,
  valueEnd,
  handleEndChange,
  handleApply,
}: FilterPopUpProps) {
  return (
    <div className=" relative z-50">
      <div className="absolute right-1 rounded-lg bg-white p-6  max-w-96 mt-1 flex flex-col gap-6">
        <label>Start Date:</label>
        <input
          type="date"
          value={valueStart}
          onChange={handleStartChange}
          className=" cursor-pointer"
        />
        <label>End Date:</label>
        <input
          type="date"
          value={valueEnd}
          onChange={handleEndChange}
          className=" cursor-pointer"
        />
        <Button
          text="Apply"
          handleClick={handleApply}
          className="px-1 py-4 h-6 text-xs"
        />
      </div>
    </div>
  );
}

export default FilterPopUp;
