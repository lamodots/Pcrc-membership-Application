import { CircleUser } from "lucide-react";

interface ValuesProps {
  _id: string;
  name: string;
  interval: string;
  amount: string;
  description: string;
}
function SubscriptionCard(props: ValuesProps) {
  return (
    <div className="compoenet w-full bg-white rounded-lg p-6 shadow-sm ">
      <h3 className="text-sm font-bold text-[#1A4F83] uppercase">
        {props.name}
      </h3>
      <div className="flex justify-between items-center mt-8">
        <small className="text-xl text-[#7598BB]">
          {props.name && "₦"}
          {props.amount}
        </small>
        <span className=" flex justify-between items-center space-x-2">
          {props.name && <CircleUser color="#A5BCD4" />}
        </span>
      </div>
    </div>
  );
}

export default SubscriptionCard;
