import { Filter, UserPlus } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import TextInput from "../../../components/Input/TextInput";
import NewMemberCard from "../../../components/Admin-Components/NewMemberCard/NewMemberCard";

import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Modal from "../../../components/modal/Modal";
import toast from "react-hot-toast";
import { useCurrentUser } from "../../../context/AdminContext";
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
  interest: Interest;
  title: string;
}
function Members() {
  const { currentUser, fetchCurrentUser } = useCurrentUser();
  useEffect(() => {
    if (!currentUser) {
      fetchCurrentUser();
    }
  }, [currentUser, fetchCurrentUser]);

  const [secData, setSecData] = useState({
    firstname: "KSN ",
    lastname: "Secretary",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [userData, setUserData] = useState<UserProps[]>([]);
  const [showPopup, setShowPopUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [localLoading, setLocalLoading] = useState(true);
  const navigate = useNavigate();

  const itemsPerPage = 12;
  console.log("user data", userData);
  // Filter user base on search query
  const filterUser =
    userData?.filter(
      (user) =>
        user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.firstname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.memberId?.toLocaleLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  // pagination
  const totalItems = filterUser.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filterUser.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  console.log(paginatedUsers);
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

  // useEffect(() => {
  //   getAllUsers();
  // }, []);
  useEffect(() => {
    const initData = async () => {
      setLocalLoading(true);
      if (!currentUser) {
        await fetchCurrentUser();
      }
      await getAllUsers();
      setLocalLoading(false);
    };

    initData();
  }, [fetchCurrentUser]);

  const handleCreateAdminChangeForm = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const formName = e.target.name;
    const value = e.target.value;
    setSecData({ ...secData, [formName]: value });
  };
  const handleCreateAdminFormSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (secData.password !== secData.confirmPassword) {
      return toast.error("Seems password do not match!");
    }

    setSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 200));
      const res = await fetch(`${API_URL}/api/v1/secure/auth/add`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: secData.email,
          role: secData.role,
          password: secData.password,
          firstname: secData.firstname,
          lastname: secData.lastname,
          isOnboarded: true,
        }),
        credentials: "include",
      });
      if (res.ok) {
        // const { message } = await res.json();
        // toast.success(message);
        toast.success(`${secData.role} Created sucessfully`);
      } else {
        const errorData = await res.json();
        toast.error(errorData.msg || "An error occurred. Please try again.");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }

    setSecData({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
    });
  };

  if (loading || localLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Oval height="40" width="40" color="#4A90E2" />
      </div>
    );
  }
  return (
    <main>
      <header>
        <div className="relative flex gap-8 items-center h-14 px-4">
          {/* Container bottom border */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-200" />

          <NavLink
            to="/secure/members-register" // Update to your actual path
            className={({ isActive }) =>
              `relative h-full flex items-center px-1 transition-colors duration-200 group ${
                isActive ? "text-blue-700" : "text-gray-500 hover:text-blue-700"
              }`
            }
          >
            <span className="relative">
              Members Register
              {/* Hover/Active border */}
              <span className="absolute left-0 right-0 -bottom-[15px] h-[2px] bg-blue-700 origin-left scale-x-0 transition-transform duration-200 group-hover:scale-x-100 aria-[current=page]:scale-x-100" />
            </span>
          </NavLink>

          <NavLink
            to="/secure/honorary-members" // Update to your actual path
            className={({ isActive }) =>
              `relative h-full flex items-center px-1 transition-colors duration-200 group ${
                isActive ? "text-blue-700" : "text-gray-500 hover:text-blue-700"
              }`
            }
          >
            <span className="relative">
              Honorary Members
              {/* Hover/Active border */}
              <span className="absolute left-0 right-0 -bottom-[15px] h-[2px] bg-blue-700 origin-left scale-x-0 transition-transform duration-200 group-hover:scale-x-100 aria-[current=page]:scale-x-100" />
            </span>
          </NavLink>
        </div>
        {/* <h1 className="text-2xl text-[#212529] font-bold">Memebers List</h1> */}

        <div className="flex justify-between items-center mt-10">
          {currentUser && currentUser?.user?.role === "admin" && (
            <div>
              <button
                onClick={() => setShowPaymentModal(true)}
                className="bg-[#295474] px-2 py-1 h-10 rounded flex items-center gap-1 text-white"
              >
                <UserPlus className="text-gray-300" />
                <span>Create Secretary</span>
              </button>
            </div>
          )}

          <div className="flex  justify-between items-center gap-4 w-full max-w-[600px] ">
            <div className="left w-full">
              <TextInput
                className=" w-full"
                type="text"
                placeholderText="Search member"
                handleInputChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* <div>
              <select>
                <option>--Filter--</option>
                <option>Annual Membership</option>
                <option>Life Membership</option>
                <option>Honorary Mmebership</option>
              </select>
            </div> */}
          </div>
        </div>
      </header>
      <section className="py-8 space-y-24">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {paginatedUsers.length == 0 && <p>No registered member yet!</p>}
          {paginatedUsers.map((user) => {
            return (
              <Link
                to={`/secure/members/details/${user._id}`}
                key={user?._id}
                state={user}
              >
                <NewMemberCard
                  name={user.title + " " + user.firstname + " " + user.lastname}
                  image={user?.image}
                  email={user?.email}
                />
              </Link>
            );
          })}
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
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === totalPages
                ? "cursor-not-allowed text-gray-400"
                : "hover:bg-gray-200"
            }`}
          >
            Next
          </button>
        </div>
      </section>
      {showPaymentModal && (
        <Modal
          title="Create A Secretary"
          onClose={() => setShowPaymentModal(false)}
        >
          {/* <OfflinePaymentProcessing
            onCloseModal={setShowPaymentModal}
            userId={user?._id}
            userEmail={user?.email}
            first_name={user.firstname}
            last_name={user.lastname}
          /> */}
          <form
            className="flex flex-col"
            onSubmit={handleCreateAdminFormSubmit}
          >
            <div>
              <label>Email</label>
              <input
                name="email"
                value={secData.email}
                type="text"
                placeholder="Enter email"
                className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
                onChange={handleCreateAdminChangeForm}
              />
            </div>
            <div>
              <label>Password</label>
              <input
                name="password"
                value={secData.password}
                type="password"
                placeholder="Enter password"
                className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
                onChange={handleCreateAdminChangeForm}
              />
            </div>
            <div>
              <label>Confirm password</label>
              <input
                name="confirmPassword"
                value={secData.confirmPassword}
                type="password"
                placeholder="Enter confirm password"
                className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
                onChange={handleCreateAdminChangeForm}
              />
            </div>
            <div>
              <label>Select Role</label>
              <select
                className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
                name="role"
                value={secData.role}
                onChange={handleCreateAdminChangeForm}
              >
                <option>--Select Role--</option>
                <option value="admin">Admin</option>
                <option value="moderator">Moderator</option>
              </select>
            </div>
            <button
              type="submit"
              className=" bg-[#295474] px-2 py-1 h-10 rounded text-center text-white"
            >
              {submitting ? (
                <span>Creating secretary please wait ...</span>
              ) : (
                <span>Create new secretary</span>
              )}
            </button>
          </form>
        </Modal>
      )}
    </main>
  );
}

export default Members;
