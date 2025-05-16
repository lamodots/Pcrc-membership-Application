import { Handshake } from "lucide-react";
import React from "react";
import { monthdayyearFormater } from "../../util/monthdayyearFormater";

interface HonorraryMemberCardProps {
  cardTitle: string;
  subScriptionInfo?: string | undefined;
  status?: string;
  start?: string;
  end?: string;
  children?: React.ReactNode;
}
function HonorraryMemberCard({
  children,
  cardTitle,
  subScriptionInfo,
}: HonorraryMemberCardProps) {
  return (
    <div className="bg-white rounded-lg border border-[#C4DCF3] w-full p-8 space-y-6">
      <div className="flex space-x-3  items-center">
        <div className="rounded-full bg-[#F4F6F7] h-10 w-10 flex items-center justify-center">
          {children ? (
            <span className=" text-[#A5BCD4]">{children}</span>
          ) : (
            <Handshake size={24} color="#A5BCD4" />
          )}
        </div>
        <div>
          <h2 className="text-[#1A4F83] mb-6 text-sm font-bold">{cardTitle}</h2>
          {subScriptionInfo && (
            <small className="text-[#7598BB] text-2xl bg-green-100 p-1 rounded">
              {subScriptionInfo}
            </small>
          )}
        </div>
      </div>
    </div>
  );
}

export default HonorraryMemberCard;
