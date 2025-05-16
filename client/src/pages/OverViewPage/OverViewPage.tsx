import { lazy, Suspense, useEffect, useState } from "react";

import { Link } from "react-router-dom";

import FallbackLoadingComponent from "../../components/FallbackLoadingComponent/FallbackLoadingComponent";
import { Calendar, InfoIcon, Trophy } from "lucide-react";
import MembershipTypeCard from "../../components/MembershipTypeCard/MembershipTypeCard";
import { formatDistanceToNowformat } from "../../util/dataAndTimeFormater";
import {
  useMembershipActive,
  useWelfareActive,
} from "../../hooks/useFetchPayment";
import { useCurrentUser } from "../../context/AdminContext";
import HonorraryMemberCard from "../../components/HonorrayMmeberCard/HonorraryMemberCard";
import Advertisment from "../../components/Advertisment/Advertisment";

const NewMemberCard = lazy(
  () => import("../../components/Admin-Components/NewMemberCard/NewMemberCard")
);

const API_URL = process.env.REACT_APP_CLIENT_URL;
interface AnnouncementProps {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  createdBy: {
    firstname: string;
    lastname: string;
  };
}

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
  title: string;
  membershipType: string;
  isHonouraryMember: boolean;
}

function OverViewPage() {
  const { currentUser } = useCurrentUser();
  const [membershipItem] = useMembershipActive();
  const [welfareItem] = useWelfareActive();
  const [announcement, setAnnouncementData] = useState<AnnouncementProps>();
  const [userData, setUserData] = useState<UserProps[]>([]);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const canViewMembers = currentUser?.user.isHonouraryMember
    ? welfareItem?.status === "active"
    : membershipItem?.status === "active" && welfareItem?.status === "active";
  /** Get all announcement */

  async function getAllAnnoucements() {
    try {
      setIsLoading(true);

      const res = await fetch(`${API_URL}/api/v1/secure/announcement`, {
        method: "GET",
        headers: {
          "Content-type": "appliacation/json",
        },

        credentials: "include",
      });

      if (!res.ok) {
        setError(true);
      }
      const { announcements } = await res.json();

      setAnnouncementData(announcements[0]);
    } catch (error) {
      console.log("Something went wrong:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getAllAnnoucements();
  }, []);

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
        {membershipItem?.status !== "active" &&
          welfareItem?.status !== "active" && <Alert />}
        <div className=" grid grid-cols-1 sm:grid-cols-2  gap-2 mt-8 md:grid-cols-2 md:gap-6 ">
          {currentUser?.user.isHonouraryMember ? (
            <HonorraryMemberCard
              cardTitle="MEMBERSHIP TYPE"
              subScriptionInfo={currentUser?.user.membershipType}
            >
              <Trophy />
            </HonorraryMemberCard>
          ) : (
            <MembershipTypeCard
              cardTitle="MEMBERSHIP TYPE"
              subScriptionInfo={membershipItem?.membershipType}
              status={membershipItem?.status}
              start={membershipItem?.startDate}
              end={membershipItem?.expiryDate}
            />
          )}

          <MembershipTypeCard
            cardTitle="ID Card"
            status={welfareItem?.status}
            start={welfareItem?.startDate}
            end={welfareItem?.expiryDate}
          >
            <Calendar />
          </MembershipTypeCard>
          {/* <MembershipTypeCard
        cardTitle="EXPIRES AT"
        subScriptionInfo={monthdayyearFormater(
          `${membershipItem?.expiryDate}`
        )}
      >
        <Clock />
      </MembershipTypeCard> */}
        </div>
        {/* <div className=" grid grid-cols-1 sm:grid-cols-2  gap-2 mt-8 md:grid-cols-3 md:gap-6 ">
          <MembershipTypeCard
            cardTitle="WELFARE DUES"
            subScriptionInfo={`₦${welfareItem?.amount.toString()} Annual`}
            status={welfareItem?.status}
          />
          <MembershipTypeCard
            cardTitle="START DATE "
            subScriptionInfo={monthdayyearFormater(`${welfareItem?.startDate}`)}
          >
            <Calendar />
          </MembershipTypeCard>
          <MembershipTypeCard
            cardTitle="EXPIRES AT"
            subScriptionInfo={monthdayyearFormater(
              `${welfareItem?.expiryDate}`
            )}
          >
            <Clock />
          </MembershipTypeCard>
        </div> */}
      </header>

      <section className="pt-8">
        <div className="flex justify-between items-center">
          <h2 className="text-lg text-[#1A4F83] font-bold capitalize ">
            Latest Announcements
          </h2>
          {!announcement ? (
            ""
          ) : (
            <Link
              to="/announcement"
              className="border border-[#A5BCD4] text-[#1A4F83] font-bold px-2 py-1 rounded-lg"
            >
              View All
            </Link>
          )}
        </div>
        {!announcement ? (
          <p className="my-6">No announcement yet</p>
        ) : error ? (
          <div className="bg-blue-50 px-4 py-2 w-full rounded-sm mt-4">
            <p className="text-xs">
              Something went wrong : Could not get Announcement
            </p>
          </div>
        ) : (
          <div className="w-full mt-6 bg-white p-6 rounded-lg space-y-2">
            <p>{announcement?.description.slice(0, 170)}...</p>
            <div className="flex justify-end">
              <Link
                to={`/announcement/details/${announcement?._id}`}
                className="text-[#FFAE80] font-bold"
              >
                Read more
              </Link>
            </div>
          </div>
        )}
      </section>
      {/* <section className="pt-8">
        {!canViewMembers ? (
          <div className="text-center p-6 bg-gray-50 rounded-lg shadow-sm my-8">
            <p className="text-lg font-medium text-red-600 mb-2">
              Access Restricted
            </p>
            <p className="text-gray-700">
              {currentUser?.user.isHonouraryMember
                ? "Honorary members need an active welfare subscription to view members."
                : "You need both active membership and welfare subscriptions to view members."}
            </p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center">
              <h2 className="text-lg text-[#1A4F83] font-bold capitalize ">
                New members
              </h2>

              {userData.length === 0 ? (
                ""
              ) : (
                <Link
                  to="/members"
                  className="border border-[#A5BCD4] text-[#1A4F83] font-bold px-2 py-1 rounded-lg"
                >
                  View All
                </Link>
              )}
            </div>

            {userData.length === 0 ? (
              <p className="my-6">No registered users yet</p>
            ) : (
              <div className="grid gap-6 grid-cols-1 md:grid-cols-3 mt-6">
                {userData &&
                  userData.map((user) => {
                    return (
                      <Suspense
                        fallback={<FallbackLoadingComponent />}
                        key={user._id}
                      >
                        <NewMemberCard
                          image={user.image}
                          name={
                            user.title +
                            " " +
                            user.firstname +
                            " " +
                            user.lastname
                          }
                          date={
                            "Joined" +
                            " " +
                            formatDistanceToNowformat(user.createdAt)
                          }
                        />
                      </Suspense>
                    );
                  })}
              </div>
            )}
          </>
        )}
      </section> */}
      <Advertisment />
    </main>
  );
}

export default OverViewPage;

function Alert() {
  return (
    <div className="flex items-center gap-2 bg-cyan-200 px-3 py-4 rounded border-l-4 border-l-cyan-700">
      <div>
        <InfoIcon height={22} width={22} />
      </div>
      <p className="text-sm">
        You are yet to pay for <strong>Membership </strong>and{" "}
        <strong>Welfare</strong> dues. You can pay to secretary/online. {""}
        <Link to="/subscription" className="text-cyan-900 underline font-bold">
          Get started
        </Link>
      </p>
    </div>
  );
}
