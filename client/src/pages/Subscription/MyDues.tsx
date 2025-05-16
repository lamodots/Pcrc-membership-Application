import { ChevronLeft, Table } from "lucide-react";
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

import { monthdayyearFormater } from "../../util/monthdayyearFormater";
import { useMembershipActive } from "../../hooks/useFetchPayment";

const API_URL = process.env.REACT_APP_CLIENT_URL;
interface WelfareProps {
  _id: string;
  userId: string;
  amount: number;
  startDate: string;
  expiryDate: string;
  status: string;
  isWelfareDuePaid?: boolean;
  isMemberShipDuePaid?: boolean;
  membershipType?: string;
  paymentMethod: string;
  paymentReference: string;
  paymentDate: string;
  channel: string;
  account_name: null | string;
  bank: string;
}

function MyDues() {
  const [welfare, setWelfare] = useState<WelfareProps[]>([]);
  const [membership, setMembership] = useState<WelfareProps[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [membershipItem] = useMembershipActive();
  const handleGetAllWelfareDuesByMember = async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      const response = await fetch(
        `${API_URL}/api/v1/users/membershipdues/welfare`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.ok) {
        const { userWelfareDues } = await response.json();
        setWelfare(userWelfareDues);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleGetAllMembershipDuesByMember = async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      const response = await fetch(
        `${API_URL}/api/v1/users/membershipdues/membership-dues`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.ok) {
        const { userMembershipDues } = await response.json();
        setMembership(userMembershipDues);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleGetAllWelfareDuesByMember();
    handleGetAllMembershipDuesByMember();
  }, []);
  return (
    <div>
      <header>
        <button className="flex space-x-2" onClick={() => navigate(-1)}>
          <ChevronLeft className=" cursor-pointer" size={24} />
          <span>Back</span>
        </button>
      </header>
      <main className="py-10">
        <h1 className=" text-2xl">My Payments</h1>
        <div className="space-y-6 mt-8">
          {/* Welfare Table */}
          {loading ? (
            <div className="flex justify-center py-10">
              <Oval height={24} width={24} />
            </div>
          ) : (
            <div>
              <h2 className="text-lg font-semibold mb-4">ID Card</h2>
              <div className="bg-white rounded-md border border-stone-200">
                <div className="overflow-x-auto p-4">
                  <table className="w-full min-w-[800px]">
                    <thead className="text-[#A6B4BA] text-sm">
                      <tr className="border-b border-stone-200">
                        {[
                          "Name of Dues",
                          "Amount",

                          "Status",
                          "Payment Method",
                          "Payment Date",
                          "Start Date",
                          "End Date",
                        ].map((header) => (
                          <th
                            key={header}
                            className="text-left py-3 px-2 font-medium whitespace-nowrap"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="text-sm text-[#515F69]">
                      {welfare?.map((welfarePayment) => {
                        return (
                          <tr
                            className="border-b border-stone-200"
                            key={welfarePayment._id}
                          >
                            <td className="py-3 px-2 whitespace-nowrap">
                              Welfare
                            </td>
                            <td className="py-3 px-2">
                              ₦{welfarePayment.amount}
                            </td>

                            <td className="py-3 px-2 text-green-600 capitalize">
                              {welfarePayment.status}
                            </td>
                            <td className="py-3 px-2">
                              {welfarePayment.paymentMethod}
                            </td>
                            <td className="py-3 px-2">
                              {monthdayyearFormater(welfarePayment.paymentDate)}
                            </td>
                            <td className="py-3 px-2">
                              {monthdayyearFormater(welfarePayment.startDate)}
                            </td>
                            <td className="py-3 px-2">
                              {monthdayyearFormater(welfarePayment.expiryDate)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Membership Dues Table */}
          {(membershipItem?.membershipType === undefined ||
            (membershipItem?.membershipType !== "Corporate membership" &&
              membershipItem?.membershipType !== "Honorary member")) &&
          loading ? (
            <Oval height={24} width={24} />
          ) : (
            <div>
              <h2 className="text-lg font-semibold mb-4">Membership Dues</h2>

              <div className="bg-white rounded-md border border-stone-200">
                <div className="overflow-x-auto p-4">
                  <table className="w-full min-w-[800px]">
                    <thead className="text-[#A6B4BA] text-sm">
                      <tr className="border-b border-stone-200">
                        {[
                          "Name of Dues",
                          "Amount",

                          "Status",
                          "Payment Method",
                          "Payment Date",
                          "Start Date",
                          "End Date",
                        ].map((header) => (
                          <th
                            key={header}
                            className="text-left py-3 px-2 font-medium whitespace-nowrap"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="text-sm text-[#515F69]">
                      {membership.map((membershipPay) => {
                        return (
                          <tr className="border-b border-stone-200">
                            <td className="py-3 px-2 whitespace-nowrap">
                              {membershipPay.membershipType}
                            </td>
                            <td className="py-3 px-2">
                              ₦{membershipPay.amount}
                            </td>
                            {/* <td className="py-3 px-2">2025</td> */}
                            <td className="py-3 px-2 text-green-600">
                              {membershipPay.status}
                            </td>
                            <td className="py-3 px-2">
                              {membershipPay.paymentMethod}
                            </td>
                            <td className="py-3 px-2">
                              {monthdayyearFormater(membershipPay.paymentDate)}
                            </td>
                            <td className="py-3 px-2">
                              {monthdayyearFormater(membershipPay.startDate)}
                            </td>
                            <td className="py-3 px-2">
                              {monthdayyearFormater(membershipPay.expiryDate)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default MyDues;
