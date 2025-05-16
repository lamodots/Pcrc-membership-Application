import { ReactNode } from "react";

interface TopStatsProps {
  title?: string;
  stats?: string | number;
  icon?: ReactNode;
  metaStats?: { l: string | undefined; a: string | undefined };
}
function TopStats({ title, stats, icon, metaStats }: TopStatsProps) {
  return (
    <div className="w-full  flex gap-2 bg-white rounded-md border border-zinc-200  p-4">
      {icon}
      <div>
        <h3 className="text-[#1A4F83] text-sm">{title}</h3>
        <span className="text-[#$125,500] text-2xl text-[#7598BB]">
          ₦{stats}
        </span>

        {metaStats && (
          <div className="flex text-xs space-x-8 mt-2  ">
            <span>A: ₦ {metaStats.a}</span>
            <span>L: ₦ {metaStats.l}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default TopStats;
