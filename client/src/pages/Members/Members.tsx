import { Filter } from "lucide-react";
import { useEffect, useState } from "react";
import TextInput from "../../components/Input/TextInput";
import NewMemberCard from "../../components/Admin-Components/NewMemberCard/NewMemberCard";

import { Link, useNavigate } from "react-router-dom";
import Advertisment from "../../components/Advertisment/Advertisment";
import { useCurrentUser } from "../../context/AdminContext";
import {
  useMembershipActive,
  useWelfareActive,
} from "../../hooks/useFetchPayment";
import { Oval } from "react-loader-spinner";

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
  memberId: string;
  aboutuser: string;
  social: SocialLink[];
  title: string;
  interest: Interest;
}
function Members() {
  // const [userData, setUserData] = useState(FAKE_MEMBERS);
  const { currentUser } = useCurrentUser();
  const [membershipItem] = useMembershipActive();
  const [welfareItem] = useWelfareActive();
  const [userData, setUserData] = useState<UserProps[]>([]);
  const [text, setText] = useState("");
  const [showPopup, setShowPopUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // For regular members: Need both active membership AND active welfare
  // For honorary members: Need ONLY active welfare
  const canViewMembers = currentUser?.user.isHonouraryMember
    ? welfareItem?.status === "active"
    : membershipItem?.status === "active" && welfareItem?.status === "active";

  const itemsPerPage = 12;

  // Filter user base on search query
  const filterUser = userData.filter(
    (user) =>
      (user.email?.toLowerCase() ?? "").includes(searchQuery.toLowerCase()) ||
      (user.firstname?.toLowerCase() ?? "").includes(
        searchQuery.toLowerCase()
      ) ||
      user.memberId?.toLocaleLowerCase().includes(searchQuery.toLowerCase())
  );

  // pagination
  const totalItems = filterUser.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filterUser.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const getAllUsers = async () => {
    setLoading(true);
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

      setUserData(users);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <Oval height={24} width={24} />
      </div>
    );
  }
  // If they CAN'T view members, show restriction message
  if (!canViewMembers) {
    return (
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
    );
  }

  return (
    <main>
      <header>
        <h1 className="text-2xl text-[#212529] font-bold">Members List</h1>
        <div className="flex justify-end items-center mt-10">
          <div className="flex justify-between items-center gap-4 w-full max-w-[600px] mt-8">
            <div className="left w-full">
              <TextInput
                className="w-full"
                type="text"
                name="searchQuery"
                value={searchQuery}
                placeholderText="Search member"
                handleInputChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {/* Filter popup removed for clarity */}
          </div>
        </div>
      </header>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : paginatedUsers.length === 0 ? (
        <p className="my-6">No registered members yet</p>
      ) : (
        <section className="py-8 space-y-24">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {paginatedUsers.map((user) => (
              <Link
                to={`/members/details/${user._id}`}
                key={user._id}
                state={user}
              >
                <NewMemberCard
                  name={user.title + " " + user.firstname + " " + user.lastname}
                  image={user.image}
                />
              </Link>
            ))}
          </div>
          {/* Pagination */}
          <div className="flex justify-center items-center space-x-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === 1
                  ? "cursor-not-allowed text-gray-400"
                  : "hover:bg-gray-200"
              }`}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages || 1}
            </span>
            <button
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === totalPages || totalPages === 0
                  ? "cursor-not-allowed text-gray-400"
                  : "hover:bg-gray-200"
              }`}
            >
              Next
            </button>
          </div>
        </section>
      )}

      <Advertisment />
    </main>
  );
}

export default Members;
