import { useEffect, useState } from "react";
import Button from "../../../components/Button/Button";
import { ChevronDown, ChevronLeft } from "lucide-react";
import TextInput from "../../../components/Input/TextInput";
import { useNavigate, useParams } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import toast from "react-hot-toast";

const API_URL = process.env.REACT_APP_CLIENT_URL;

interface AttendeesInfo {
  attendee_full_name: string;
  _id: string;
}
interface ApplicantProps {
  _id: string;
  full_name: string;
  email: string;
  phone_number: string;
  whatsapp_number: string;
  number_of_family_members: number;
  attendees: AttendeesInfo[];
  isapproved: Boolean;
  appliedAt: string;
  event: string;
  barCode: string;
}
function ApproveEvent() {
  const [isShow, setIsShow] = useState<{ [key: string]: boolean }>({});
  const [searchQuery, setSearchQuery] = useState(""); // For search
  const [currentPage, setCurrentPage] = useState(1); // For pagination
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [eventApplicants, setEventApplicants] = useState<ApplicantProps[]>([]);
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };
  const itemsPerPage = 5; // Number of applicants per page

  const handleShow = (email: string) => {
    setIsShow((prevState) => ({
      ...prevState,
      [email]: !prevState[email],
    }));
  };

  const filteredApplicants = eventApplicants.filter((applicant: any) =>
    applicant.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const totalItems = filteredApplicants.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedApplicants = filteredApplicants.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // fecth all user related to event using the get user by event resorces
  async function getApplicantsByEvent() {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const res = await fetch(
        `${API_URL}/api/v1/secure/events/${id}/applicants`
      );
      if (!res.ok) {
        throw new Error(" Error fetching data");
      }
      const { applicants } = await res.json();

      setEventApplicants(applicants);
    } catch (err) {
      return toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getApplicantsByEvent();
  }, []);

  // approave their application usin the approave resources.
  async function handleSubmit(applicationId: string) {
    if (window.confirm("Do you want to approve this event  ? ")) {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 100));
        const res = await fetch(
          `${API_URL}/api/v1/secure/events/applicants/${applicationId}/m/approve`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        // if (!res.ok) {
        //   return toast.error("Failed to approve this application!");
        // }

        if (!res.ok) {
          const errorResponse = await res.json();
          throw new Error(errorResponse.message || "Approval failed");
        }

        const { message, applicant } = await res.json();
        toast.success(message);
        // Update the state here. Reason been that the applicant list do not update afer approval.
        setEventApplicants((prevApplicants) =>
          prevApplicants.map((app) =>
            app._id === applicant?._id
              ? { ...app, isapproved: applicant.isapproved }
              : app
          )
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Event Approval cancelled!");
    }
  }
  return (
    <main className="space-y-6">
      {/* Search Input */}
      <div className="flex gap-8 md:gap-0 justify-between items-center">
        <button className="flex space-x-2" onClick={handleBackClick}>
          {" "}
          <ChevronLeft />
          Back
        </button>
        <TextInput
          type="text"
          placeholderText="Search Applicant by email"
          handleInputChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/3"
        />
      </div>

      {/* Applicants List */}
      <div className="space-y-4">
        {eventApplicants.length == 0 && <p>No Applicant</p>}
        {loading ? (
          <div className=" flex justify-center items-center w-full py-8">
            <Oval height="48" width="48" />
          </div>
        ) : (
          <>
            {paginatedApplicants.map((applicant) => (
              <div key={applicant?._id}>
                <div className="flex justify-between items-center bg-white border border-slate-200 rounded px-2 h-14">
                  <strong>{applicant?.full_name}</strong>

                  <div className="flex items-center space-x-4">
                    {/* <span>
                      {applicant.isapproved && (
                        <small className=" bg-green-300 px-2 py-1 rounded-full text-xs">
                          Approved
                        </small>
                      )}
                    </span> */}
                    {!applicant?.isapproved ? (
                      <Button
                        text="Approve"
                        className="px-2 h-8"
                        handleClick={() => handleSubmit(applicant?._id)}
                      />
                    ) : (
                      <small className=" bg-green-300 px-2 py-1 rounded-full text-xs">
                        Approved
                      </small>
                    )}
                    {/* <button className="flex items-center border border-slate-950 rounded-lg px-2 h-8">
                      Delete
                      <Trash />
                    </button> */}
                    <button
                      className="cursor-pointer"
                      onClick={() => handleShow(applicant?._id)}
                    >
                      <ChevronDown />
                    </button>
                  </div>
                </div>

                {/* Show Application Info */}
                {isShow[applicant?._id] && (
                  <div className="overflow-x-scroll md:overflow-x-auto bg-white shadow rounded px-2 py-4 space-y-6">
                    <h2>Registered Details</h2>
                    <table className="  border-collapse border border-slate-400 table-auto w-full text-sm text-left text-gray-500">
                      <thead className="bg-gray-100 text-gray-700 uppercase">
                        <tr>
                          <th className="border border-slate-300 px-4 py-2">
                            Applicant Full Name
                          </th>
                          <th className="border border-slate-300 px-4 py-2">
                            Email
                          </th>
                          <th className="border border-slate-300 px-4 py-2">
                            Phone Number
                          </th>
                          {/* <th className="border border-slate-300 px-4 py-2">
                            WhatsApp Number
                          </th> */}
                          <th className="border border-slate-300 px-4 py-2">
                            Number of family members attending
                          </th>
                          <th className="border border-slate-300 px-4 py-2">
                            Family members
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr className="hover:bg-gray-50">
                          <td className="border border-slate-300 px-4 py-2">
                            {applicant?.full_name}
                          </td>
                          <td className="border border-slate-300 px-4 py-2">
                            {applicant?.email}
                          </td>
                          <td className="border border-slate-300 px-4 py-2">
                            {applicant?.phone_number}
                          </td>
                          {/* <td className="border border-slate-300 px-4 py-2">
                            {applicant.whatsapp_number}
                          </td> */}
                          <td className="border border-slate-300 px-4 py-2">
                            {applicant?.number_of_family_members}
                          </td>
                          <td className="border border-slate-300 px-4 py-2">
                            <ul className="capitalize">
                              {applicant?.attendees.map((attendee) => (
                                <li key={attendee._id}>
                                  {attendee?.attendee_full_name}
                                </li>
                              ))}
                            </ul>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </>
        )}
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
    </main>
  );
}

export default ApproveEvent;
