import React, { lazy, useEffect, useState } from "react";

import TopStats from "../../../components/Admin-Components/TopStats/TopStats";
import { CircleDollarSign, Pen, RefreshCw, RotateCcw } from "lucide-react";
import MemberStats from "../../../components/Admin-Components/MemberStats/MemberStats";
import Chart from "../../../components/Admin-Components/MemberStats/Chart";
import { Suspense } from "react";
import FallbackLoadingComponent from "../../../components/FallbackLoadingComponent/FallbackLoadingComponent";

import { Link, useNavigate } from "react-router-dom";

import { formatDistanceToNowformat } from "../../../util/dataAndTimeFormater";
import { useFetch } from "../../../hooks/useFetch";
import { useCurrentUser } from "../../../context/AdminContext";

const NewMemberCard = lazy(
  () =>
    import("../../../components/Admin-Components/NewMemberCard/NewMemberCard")
);

const API_URL = process.env.REACT_APP_CLIENT_URL;

type SocialLink = {
  facebook?: string;
  linkedIn?: string;
};
type Interest = string[];
interface UserProps {
  _id: string;
  image: string;
  firstname: string;
  lastname: string;
  email: string;
  Dob: string;
  phone: string;
  location: string;
  address: string;
  aboutuser: string;
  social: SocialLink[];
  interest: Interest;
  createdAt: string;
}

interface OverviewStats {
  totalRevenue: number;
  membershipDuesPaid: number;
  lifetimeMembershipPaid: number;
  annualMembershipPaid: number;
  welfareDuesPaid: number;
  maleUsers: number;
  femaleUsers: number;
  totalMembers: number;
  totalFamilyMembers: number;
  totalUsersWithFamily: number;
}

function OverViewPage() {
  const { currentUser, fetchCurrentUser } = useCurrentUser();
  const [userData, setUserData] = useState<UserProps[]>([]);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState({ year: "" });
  const query = new URLSearchParams({ year: filter.year }).toString();
  const navigate = useNavigate();
  const { data: overviewData } = useFetch<OverviewStats>(
    `${API_URL}/api/v1/secure/overview?${query}`
  );

  /** Get all members 3 only */
  const getAllUsers = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/v1/secure/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Error fetching data");
      }

      const { users } = await res.json();

      setUserData(users.slice(0, 3));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <main>
      <header>
        <div className="flex justify-end">
          <div className="flex gap-4 items-center">
            <small className="text-[#537BA2]">View stats</small>
            <div className=" cursor-pointer border border-[#A6B4BA] bg-[#F4F6F7] px-3 py-2 rounded-lg">
              <select
                name="year"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setFilter({ year: e.target.value })
                }
                value={filter.year}
                className=" w-full cursor-pointer  border-0 outline-0 bg-[#F4F6F7]"
              >
                <option>--Filter-By-Year</option>
                <option>2025</option>
                <option>2026</option>
              </select>
            </div>
          </div>
        </div>

        <div className=" grid grid-cols-2  gap-y-6 mt-8 md:grid-cols-3 md:gap-2 ">
          <TopStats
            title="REVENUE"
            stats={overviewData?.totalRevenue.toLocaleString()}
            icon={<CircleDollarSign color="#A5BCD4" />}
          />
          {/* <TopStats
            title="REGISTRATIONS"
            stats={"600"}
            icon={<Pen color="#A5BCD4" />}
          /> */}

          <TopStats
            title="MEMBERSHIP PAYMENT"
            stats={overviewData?.membershipDuesPaid.toLocaleString()}
            icon={<RotateCcw color="#A5BCD4" />}
            metaStats={{
              l: overviewData?.lifetimeMembershipPaid.toLocaleString(),
              a: overviewData?.annualMembershipPaid.toLocaleString(),
            }}
          />

          <TopStats
            title="WELFARE PAYMENT"
            stats={overviewData?.welfareDuesPaid.toLocaleString()}
            icon={<RefreshCw color="#A5BCD4" />}
          />
        </div>
      </header>
      <section>
        <div className="bg-white rounded-lg mt-8 w-full">
          <div className="border-b border-[#A6B4BA] p-6">
            <h3 className="text-[#3E454C] text-lg">Member statistics</h3>
          </div>

          <Suspense fallback={<FallbackLoadingComponent />}>
            <div className="member-type-stats p-6 grid grid-cols-1 md:grid-cols-[9fr,3fr] gap-7">
              <div className="left grid grid-cols-2 w-full gap-6">
                <MemberStats
                  title="Total Members"
                  stats={overviewData?.totalMembers.toLocaleString()}
                  familyStatus={overviewData?.totalFamilyMembers.toLocaleString()}
                />
                <MemberStats
                  title="Welfare Transactions"
                  stats={`₦${overviewData?.welfareDuesPaid.toLocaleString()}`}
                />
                <MemberStats
                  title="Annual Transactions"
                  stats={`₦${overviewData?.annualMembershipPaid.toLocaleString()}`}
                />
                <MemberStats
                  title="Life Time Transactions"
                  stats={`₦${overviewData?.lifetimeMembershipPaid.toLocaleString()}`}
                />
              </div>
              <div className="right bg-[#F5F7FA] px-4 py-8 rounded-lg w-full">
                <Chart
                  male={overviewData?.maleUsers}
                  female={overviewData?.femaleUsers}
                />
              </div>
            </div>
          </Suspense>
        </div>
      </section>
      <section className="pt-8">
        <div className="flex justify-between items-center">
          <h2 className="text-lg text-[#1A4F83] font-bold capitalize ">
            New members
          </h2>
          <Link
            to="/secure/members"
            className="border border-[#A5BCD4] text-[#1A4F83] font-bold px-2 py-1 rounded-lg"
          >
            View All
          </Link>
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-3 mt-6">
          {/* {FAKE_MEMBERS.map((user) => {
            return (
              <Suspense fallback={<FallbackLoadingComponent />} key={user.id}>
                <NewMemberCard
                  image={user.photo}
                  name={user.name}
                  date={user.date}
                />
              </Suspense>
            );
          })} */}
          {userData &&
            userData.map((user) => {
              return (
                <Suspense
                  fallback={<FallbackLoadingComponent />}
                  key={user._id}
                >
                  <NewMemberCard
                    image={user.image}
                    name={user.firstname + " " + user.lastname}
                    date={
                      "Joined" + " " + formatDistanceToNowformat(user.createdAt)
                    }
                  />
                </Suspense>
              );
            })}
        </div>
      </section>
    </main>
  );
}

export default OverViewPage;
