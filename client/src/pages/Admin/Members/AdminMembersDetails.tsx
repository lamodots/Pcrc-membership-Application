import { useState } from "react";
import { Trash, MonitorPause, Wallet, Award } from "lucide-react";
import Badge from "../../../components/Badge/Badge";
import Avatar from "../../../components/Avatar/Avatar";
import { useLocation } from "react-router-dom";
import { dateFormater } from "../../../util/DateFormater";

import Modal from "../../../components/modal/Modal";

import OfflinePaymentProcessing from "../../../components/OfflinePaymentProcessing/OfflinePaymentProcessing";
import ConfirmationModal from "../../../components/ConfirmationModal/ConfirmationModal";
import toast from "react-hot-toast";
import useFetchMembershipDues from "../../../hooks/useFetchMembershipDues";
import { Oval } from "react-loader-spinner";

const API_URL = process.env.REACT_APP_CLIENT_URL;
type SocialLink = {
  facebook?: string;
  linkedIn?: string;
};
type Interest = string[];
// interface UserProps {
//   _id: string;
//   image: string;
//   firstname: string;
//   lastname: string;
//   email: string;
//   Dob: string;
//   phone: string;
//   location: string;
//   address: string;
//   aboutuser: string;
//   social: SocialLink[];
//   interest: Interest;
//   membershipType: string;
//   isHonouraryMember: boolean;
//   title: string;
// }
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
  membershipType: string;
  isHonouraryMember: boolean;
  title: string;
  // Additional properties from user data
  isVerified: boolean;
  isOnboarded: boolean;
  familyMembers: {
    firstName: string;
    lastName: string;
    title: string;
    dateOfEntry: string;
    emailId: string;
    whatsappId: string;
    relationship: string;
    dateOfBirth: string;
    bloodgroup: string;
    image: string;
    _id: string;
  }[];
  addressInIndia: string;
  dateOfEntry: string;
  districtInIndia: string;
  emergencyContactInIndia: string;
  familyInLagos: boolean;
  memberId: string;
  whatsappId: string;
  bloodgroup: string;
  statesInIndia: string;
  profession: string;
}

function AdminMembersDetails() {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const location = useLocation();
  const user: UserProps = location?.state;
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  console.log(user);
  const {
    loading: loadingDues,
    error: dueError,
    membershipDues,
  } = useFetchMembershipDues(user._id);

  console.log("DUES", membershipDues);
  console.log("DUES USER ID", user._id);
  const handleGrandHonouraryMember = async () => {
    setShowConfirmationModal(true);
  };

  const handleConfirm = async () => {
    // setShowConfirmationModal(false);
    // setIsSubmitting(true);
    // MAKE USER HONORARY MEMBER
    // Send the request
    const response = await fetch(
      `${API_URL}/api/v1/users/profile/${user._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          isHonouraryMember: true,
          membershipType: "Honourary membership",
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to save changes.");
    }

    toast.success("Honourary membership granted!");
    setShowConfirmationModal(false);
  };

  return (
    <div>
      <header>
        <div className="flex items-center space-x-10">
          <div className="flex gap-2 items-center">
            <Avatar className="w-32 h-32 rounded" image={user?.image} />
            <div>
              <h3 className="font-semibold capitalize">
                {user.title} {user.firstname + " " + user.lastname}
              </h3>
              <small className="text-sm text-[#A6B4BA]">{user.email}</small>
            </div>
          </div>
          {/* <div className="flex items-center space-x-2">
            <Badge />
            <span className="font-bold">Member</span>
          </div> */}
        </div>
      </header>
      <main className="pt-8">
        <div className="bg-white p-8 rounded-lg shadow-sm">
          {/* <table className="table-auto w-full border border-slate-400  border-collapse ">
            <tr>
              <th className="border border-slate-300 py-2 bg-[#eaf1f4] px-3">
                <td>Date of Birth:</td>
              </th>
              <td className="border pl-4 border-slate-300">
                {dateFormater(user.Dob)}
              </td>
            </tr>
            <tr>
              <th className="border border-slate-300 py-2   px-3 bg-[#eaf1f4]">
                <td>Area:</td>
              </th>
              <td className="border pl-4 border-slate-300">{user.location}</td>
            </tr>
            <tr>
              <th className="border border-slate-300 py-2  px-3 bg-[#eaf1f4]">
                <td>Address:</td>
              </th>
              <td className="border pl-4 border-slate-300">{user.address}</td>
            </tr>
            <tr>
              <th className="border border-slate-300 py-2  px-3 bg-[#eaf1f4]">
                <td>Subscription Type:</td>
              </th>
              <td className="border pl-4 border-slate-300">Normal memebers</td>
            </tr>
          </table> */}
          <table className="table-auto w-full border border-slate-400 border-collapse">
            <tbody>
              <tr>
                <th className="border border-slate-300 py-2 bg-gray-100 px-3">
                  <td>Member ID:</td>
                </th>
                <td className="border pl-4 border-slate-300">
                  {user.memberId}
                </td>
              </tr>
              <tr>
                <th className="border border-slate-300 py-2 bg-gray-100 px-3">
                  <td>Full Name:</td>
                </th>
                <td className="border pl-4 border-slate-300">
                  {user.title} {user.firstname} {user.lastname}
                </td>
              </tr>
              <tr>
                <th className="border border-slate-300 py-2 bg-gray-100 px-3">
                  <td>Email:</td>
                </th>
                <td className="border pl-4 border-slate-300">{user.email}</td>
              </tr>
              <tr>
                <th className="border border-slate-300 py-2 bg-gray-100 px-3">
                  <td>Subscription Type:</td>
                </th>
                <td className="border pl-4 border-slate-300">
                  {loadingDues ? (
                    <Oval width={12} height={12} />
                  ) : user.isHonouraryMember ? (
                    "Honorary Member"
                  ) : membershipDues?.membershipDues &&
                    membershipDues.membershipDues.length > 0 ? (
                    membershipDues.membershipDues[0].membershipType
                  ) : (
                    <span className="text-red-600">Requires Payment</span>
                  )}
                </td>
              </tr>
              <tr>
                <th className="border border-slate-300 py-2 bg-gray-100 px-3">
                  <td>Industry/Profession:</td>
                </th>
                <td className="border pl-4 border-slate-300">
                  {user.profession}
                </td>
              </tr>
              <tr>
                <th className="border border-slate-300 py-2 bg-gray-100 px-3">
                  <td>Date of Birth:</td>
                </th>
                <td className="border pl-4 border-slate-300">
                  {dateFormater(user.Dob)}
                </td>
              </tr>
              <tr>
                <th className="border border-slate-300 py-2 bg-gray-100 px-3">
                  <td>Area:</td>
                </th>
                <td className="border pl-4 border-slate-300">
                  {user.location}
                </td>
              </tr>
              <tr>
                <th className="border border-slate-300 py-2 bg-gray-100 px-3">
                  <td>Address:</td>
                </th>
                <td className="border pl-4 border-slate-300">{user.address}</td>
              </tr>
              <tr>
                <th className="border border-slate-300 py-2 bg-gray-100 px-3">
                  <td>WhatsApp:</td>
                </th>
                <td className="border pl-4 border-slate-300">
                  {user.whatsappId}
                </td>
              </tr>
              <tr>
                <th className="border border-slate-300 py-2 bg-gray-100 px-3">
                  <td>Blood Group:</td>
                </th>
                <td className="border pl-4 border-slate-300">
                  {user.bloodgroup}
                </td>
              </tr>
              <tr>
                <th className="border border-slate-300 py-2 bg-gray-100 px-3">
                  <td>Date of Entry:</td>
                </th>
                <td className="border pl-4 border-slate-300">
                  {dateFormater(user.dateOfEntry)}
                </td>
              </tr>
              <tr>
                <th className="border border-slate-300 py-2 bg-gray-100 px-3">
                  <td>Address in India:</td>
                </th>
                <td className="border pl-4 border-slate-300">
                  {user.addressInIndia}
                </td>
              </tr>
              <tr>
                <th className="border border-slate-300 py-2 bg-gray-100 px-3">
                  <td>District in India:</td>
                </th>
                <td className="border pl-4 border-slate-300">
                  {user.districtInIndia}
                </td>
              </tr>
              <tr>
                <th className="border border-slate-300 py-2 bg-gray-100 px-3">
                  <td>State in India:</td>
                </th>
                <td className="border pl-4 border-slate-300">
                  {user.statesInIndia}
                </td>
              </tr>
              <tr>
                <th className="border border-slate-300 py-2 bg-gray-100 px-3">
                  <td>Emergency Contact in India:</td>
                </th>
                <td className="border pl-4 border-slate-300">
                  {user.emergencyContactInIndia}
                </td>
              </tr>
              <tr>
                <th className="border border-slate-300 py-2 bg-gray-100 px-3">
                  <td>Family in Lagos:</td>
                </th>
                <td className="border pl-4 border-slate-300">
                  {user.familyInLagos || user.familyMembers.length > 0
                    ? "Yes"
                    : "No"}
                </td>
              </tr>
              <tr>
                <th className="border border-slate-300 py-2 bg-gray-100 px-3">
                  <td>Verification Status:</td>
                </th>
                <td className="border pl-4 border-slate-300">
                  {user.isVerified ? "Verified" : "Not Verified"}
                </td>
              </tr>
              <tr>
                <th className="border border-slate-300 py-2 bg-gray-100 px-3">
                  <td>Onboarding Status:</td>
                </th>
                <td className="border pl-4 border-slate-300">
                  {user.isOnboarded ? "Completed" : "Not Completed"}
                </td>
              </tr>
            </tbody>
          </table>
          {/* <div className="pt-6">
            <h2 className="font-bold">About member</h2>
            <p className="mt-3 leading-6">{user.aboutuser}</p>
          </div> */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Family Members</h2>
            <table className="table-auto w-full border border-slate-400 border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-slate-300 py-2 px-3 text-left">
                    Full Name
                  </th>
                  <th className="border border-slate-300 py-2 px-3 text-left">
                    Relationship
                  </th>
                  <th className="border border-slate-300 py-2 px-3 text-left">
                    Date of Birth
                  </th>
                  <th className="border border-slate-300 py-2 px-3 text-left">
                    Email
                  </th>
                  <th className="border border-slate-300 py-2 px-3 text-left">
                    WhatsApp
                  </th>
                  {/* <th className="border border-slate-300 py-2 px-3 text-left">
                    Blood Group
                  </th> */}
                  <th className="border border-slate-300 py-2 px-3 text-left">
                    Date of Entry
                  </th>
                </tr>
              </thead>
              <tbody>
                {user.familyMembers.map((member) => (
                  <tr key={member._id}>
                    <td className="border border-slate-300 py-2 px-3">
                      {member.title} {member.firstName} {member.lastName}
                    </td>
                    <td className="border border-slate-300 py-2 px-3">
                      {member.relationship}
                    </td>
                    <td className="border border-slate-300 py-2 px-3">
                      {dateFormater(member.dateOfBirth)}
                    </td>
                    <td className="border border-slate-300 py-2 px-3">
                      {member.emailId}
                    </td>
                    <td className="border border-slate-300 py-2 px-3">
                      {member.whatsappId}
                    </td>
                    {/* <td className="border border-slate-300 py-2 px-3">
                      {member.bloodgroup || "N/A"}
                    </td> */}
                    <td className="border border-slate-300 py-2 px-3">
                      {dateFormater(member.dateOfEntry)}
                    </td>
                  </tr>
                ))}
                {user.familyMembers.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="border border-slate-300 py-4 px-3 text-center"
                    >
                      No family members to display
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between mt-10">
            <div>
              <button
                onClick={() => setShowPaymentModal(true)}
                className=" bg-[#295474] px-2 py-1 rounded flex items-center gap-1 text-sm text-white"
              >
                <Wallet />
                <span>Process Payment</span>
              </button>
            </div>
            {/* <div className=" flex items-center space-x-10 mt-6">
              <button
                className="flex items-center gap-2 text-[#FFAE80]"
                onClick={() => console.log(user._id)}
              >
                <MonitorPause /> <span>Suspend</span>
              </button>
              <button
                className="flex items-center gap-2 text-red-600"
                onClick={() => console.log(user?.email, user._id)}
              >
                <Trash />
                <span>Delete</span>
              </button>
            </div> */}
            <button
              onClick={handleGrandHonouraryMember}
              className=" bg-[#295474] px-2 py-1 rounded flex items-center text-sm gap-1 text-white"
            >
              <Award /> <span>Grant Honourary member</span>
            </button>
          </div>
        </div>
      </main>
      {showPaymentModal && (
        <Modal
          title="Process Payment Offline"
          onClose={() => setShowPaymentModal(false)}
        >
          <OfflinePaymentProcessing
            onCloseModal={setShowPaymentModal}
            userId={user?._id}
            userEmail={user?.email}
            first_name={user.firstname}
            last_name={user.lastname}
          />
        </Modal>
      )}

      {showConfirmationModal && (
        <ConfirmationModal
          action="Grant Honourary member"
          onCancel={() => setShowConfirmationModal(false)}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
}

export default AdminMembersDetails;
