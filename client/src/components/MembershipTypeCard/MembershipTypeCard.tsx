import { Handshake } from "lucide-react";
import React from "react";
import { monthdayyearFormater } from "../../util/monthdayyearFormater";
import { Link } from "react-router-dom";

interface MembershipTypeCardProps {
  cardTitle: string;
  subScriptionInfo?: string | undefined;
  status?: string;
  start?: string;
  end?: string;
  children?: React.ReactNode;
}
function MembershipTypeCard({
  children,
  cardTitle,
  subScriptionInfo,
  status,
  start,
  end,
}: MembershipTypeCardProps) {
  console.log(status);
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
          <h2 className="text-[#1A4F83] text-sm font-bold">{cardTitle}</h2>
          {subScriptionInfo && (
            <small className="text-[#7598BB] text-sm bg-green-200 p-1 rounded">
              {subScriptionInfo}
            </small>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between">
        {status !== "active" ? (
          <p className="text-red-400">
            <Link to="/subscription">Requires payment</Link>
          </p>
        ) : (
          status
        )}
        {status && (
          <div className="flex justify-end relative">
            <small className="bg-green-200 text-sm font-bold rounded p-1">
              {status}
            </small>
          </div>
        )}
        {start && end && (
          <>
            <span className="text-xs">
              Start Date:<br></br>
              {monthdayyearFormater(`${start}`)}
            </span>
            <span className="text-xs">
              End Date:<br></br>
              {monthdayyearFormater(`${end}`)}
            </span>
          </>
        )}
      </div>
    </div>
  );
}

export default MembershipTypeCard;
