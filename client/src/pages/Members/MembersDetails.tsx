import Badge from "../../components/Badge/Badge";
import Avatar from "../../components/Avatar/Avatar";
import { useLocation } from "react-router-dom";

import { DOBFormater } from "../../util/DOBFormater";
import { useMembershipActive } from "../../hooks/useFetchPayment";
import { useCurrentUser } from "../../context/AdminContext";
import useFetchMembershipDues from "../../hooks/useFetchMembershipDues";
import { Oval } from "react-loader-spinner";

// const API_URL = process.env.REACT_APP_CLIENT_URL;

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
  membershipType: string;
  isHonouraryMember: boolean;
  title: string;
  whatsappId: string;
  profession: string;
  statesInIndia: string;
}

function MembersDetails() {
  const { currentUser } = useCurrentUser();
  const [membershipItem] = useMembershipActive();

  const location = useLocation();
  const user: UserProps = location?.state;
  console.log("======", user);
  const {
    loading: loadingDues,
    error: dueError,
    membershipDues,
  } = useFetchMembershipDues(user._id);

  console.log("DUES", membershipDues);
  console.log("DUES USER ID", user._id);
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
            <span className="font-bold">{}</span>
          </div> */}
        </div>
      </header>
      <main className="pt-8">
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <table className="table-auto w-full border border-slate-400  border-collapse ">
            <tr>
              <th className="border pl-4 border-slate-300 py-2 bg-[#eaf1f4] px-3">
                <td>Industry/Profession:</td>
              </th>
              <td className="border pl-4 border-slate-300">
                {user.profession}
              </td>
            </tr>
            <tr>
              <th className="border pl-4 border-slate-300 py-2   px-3 bg-[#eaf1f4]">
                <td>Area:</td>
              </th>
              <td className="border pl-4 border-slate-300">{user.location}</td>
            </tr>
            <tr>
              <th className="border pl-4 border-slate-300 py-2  px-3 bg-[#eaf1f4]">
                <td>Phone:</td>
              </th>
              <td className="border pl-4 border-slate-300">
                {user.whatsappId}
              </td>
            </tr>
            <tr>
              <th className="border pl-4 border-slate-300 py-2  px-3 bg-[#eaf1f4]">
                <td>Subscription Type:</td>
              </th>
              <td className="border pl-4 border-slate-300">
                {/* {membershipItem?.status === "active" ? (
                  membershipItem?.membershipType
                ) : currentUser?.user.membershipType ==
                  "Honourary membership" ? (
                  currentUser.user.membershipType
                ) : (
                  <span className="text-red-600">Requires payment</span>
                )} */}
                {/* {user.isHonouraryMember ? (
                  <span className="font-bold">Honourary membership</span>
                ) : membershipItem?.status === "active" ? (
                  <span>{membershipItem?.membershipType}</span>
                ) : (
                  <span className="text-red-600">Requires payment</span>
                )} */}

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
            {/* <tr>
              <th className="border border-slate-300 py-2  px-3 bg-[#eaf1f4]">
                <td>Interests</td>
              </th>
              <td className="border border-slate-300">
                {user.interest.map((userInterests) => userInterests).join(", ")}
              </td>
            </tr> */}
          </table>
          {/* <div className="pt-6">
            <h2 className="font-bold">About member</h2>
            <p className="mt-3 leading-6">{user.aboutuser}</p>
          </div> */}
          {/* <div className="flex items-center justify-end space-x-10 mt-6">
            <button
              className="flex items-center gap-2 text-[#FFAE80]"
              onClick={() => console.log(user._id)}
            >
              <MonitorPause /> <span>Suspend</span>
            </button>
            <button
              className="flex items-center gap-2 text-red-600"
              onClick={() => console.log(user._id)}
            >
              <Trash />
              <span>Delete</span>
            </button>
          </div> */}
        </div>
      </main>
    </div>
  );
}

export default MembersDetails;
