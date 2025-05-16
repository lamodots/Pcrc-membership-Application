import { Suspense, useEffect, useState } from "react";
import {
  ChevronLeft,
  Trash,
  Pencil,
  Calendar,
  MapPinCheckInside,
  Stamp,
  Camera,
  Menu,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import FallbackLoadingComponent from "../../../components/FallbackLoadingComponent/FallbackLoadingComponent";
import { Oval } from "react-loader-spinner";
import toast from "react-hot-toast";
import { dateFormater } from "../../../util/DateFormater";
import { useCurrentUser } from "../../../context/AdminContext";

const API_URL = process.env.REACT_APP_CLIENT_URL;

interface AnnouncementProps {
  _id: string;
  title: string;
  photoImage: string;
  description: string;
  startDate: string;
  endDate: string;
  time: string;
  venue: string;
  applicant: string[];
}

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
  attended: Boolean;
}
function EventDetails() {
  const [annoucementData, setAnnouncementData] = useState<AnnouncementProps>();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteting, setIsDeleteting] = useState(false);
  const [showAction, setShowAction] = useState(false);
  const [eventStats, setEventStats] = useState<ApplicantProps[]>([]);
  const { id } = useParams();
  const { currentUser, loading, fetchCurrentUser } = useCurrentUser();

  useEffect(() => {
    if (!currentUser?.user) {
      fetchCurrentUser(); // Ensure currentUser is always fetched
    }
  }, [currentUser?.user, fetchCurrentUser]);
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  async function getAnnoucement() {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_URL}/api/v1/secure/events/${id}`);
      if (!res.ok) {
        throw new Error(`Error fetching announcement`);
      }
      const { event } = await res.json();
      setAnnouncementData(event);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }

  useEffect(() => {
    getAnnoucement();
  }, []);

  async function handleDelete(id: string | undefined) {
    setIsDeleteting(true);

    try {
      if (window.confirm("Are you sure you want to delete this event?")) {
        const res = await fetch(`${API_URL}/api/v1/secure/events/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error(`Error Deleting event`);
        }

        navigate("/secure/events");
        toast.success("Event Deleted");
      } else {
        // User clicked "Cancel"
        console.log("Deletion cancelled by user.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setIsDeleteting(false);
      }, 500);
    }
  }

  const handleOpenAction = () => {
    setShowAction(!showAction);
  };

  const getEventStats = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${API_URL}/api/v1/secure/events/${id}/applicants`
      );
      if (!res.ok) {
        throw new Error("Error fetching data");
      }

      const { applicants } = await res.json();
      setEventStats(applicants);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getEventStats();
  }, []);

  // stats
  const approvedStat = eventStats.filter((attendees) => attendees.isapproved);
  const attendedStat = eventStats.filter((attendees) => attendees.attended);
  const attendeesStat = eventStats.filter((attendees) => attendees.attendees);

  if (loading) {
    return <p>Loading....</p>;
  }
  return (
    <div>
      <header>
        <button className="flex space-x-2" onClick={handleBackClick}>
          {" "}
          <ChevronLeft />
          Back
        </button>
        <div className=" space-y-3 md:flex md:justify-between md:gap-4 md:items-center  mt-8">
          <div className=" md:flex  md:gap-4 md:items-center  space-y-2">
            <div className="space-y-6 px-6 py-8 bg-white border border-zinc-400 rounded-lg">
              <h3>No of people registered</h3>
              <strong className=" block text-2xl">{eventStats.length}</strong>

              {/* <span>Attendees: {attendeesStat.length}</span> */}
            </div>
            <div className="space-y-6 px-6 py-8 bg-white border border-zinc-400 rounded-lg">
              <h3>No of people Attended</h3>
              <strong className=" block text-2xl">{attendedStat.length}</strong>
            </div>
            <div className="space-y-6 px-6 py-8 bg-white border border-zinc-400 rounded-lg">
              <h3>No of people Approved</h3>
              <strong className=" block text-2xl">{approvedStat.length}</strong>
            </div>
          </div>
          <div className="relative">
            <div
              className="bg-white p-4 rounded-lg cursor-pointer flex items-center"
              onClick={handleOpenAction}
            >
              <Menu /> <span>Action</span>
            </div>
            {/* action */}
            {showAction && (
              <div className="  bg-white shadow-lg rounded-lg p-6 w-[220px] max-w-[240px] flex flex-col space-y-3 absolute mt-2 md:right-[1px] z-50">
                <ul className="space-y-6">
                  <li>
                    <Link
                      to={`/secure/events/${annoucementData?._id}/scan`}
                      className="flex items-center text-sm space-x-2 font-bold"
                    >
                      <Camera size={24} />{" "}
                      <span className="text-sm">Scan QRCODE</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={`/secure/events/${annoucementData?._id}/approve`}>
                      <span className="flex items-center text-sm cursor-pointer font-bold">
                        <Stamp size={24} /> Approve Application
                      </span>
                    </Link>
                  </li>
                  {currentUser?.user.role === "admin" ? (
                    <>
                      <li>
                        <Link
                          to={`/secure/events/details/${annoucementData?._id}/edit`}
                        >
                          <span className="flex items-center text-sm cursor-pointer font-bold">
                            <Pencil size={24} /> Edit
                          </span>
                        </Link>
                      </li>
                      <li>
                        <button
                          className="flex items-center cursor-pointer text-sm text-red-300  py-1 rounded-lg font-medium"
                          onClick={() => handleDelete(annoucementData?._id)}
                        >
                          <Trash className="text-red-300" size={24} />
                          <span>Delete</span>
                        </button>
                      </li>
                    </>
                  ) : (
                    ""
                  )}
                </ul>
              </div>
            )}
            {/* action pop close */}
          </div>
        </div>
      </header>
      <main>
        {isLoading ? (
          <div className=" flex justify-center items-center w-full py-8">
            <Oval height="48" width="48" />
          </div>
        ) : (
          <section>
            <div className="top md:flex md:justify-between md:items-center mt-8 mb-8">
              <div className="left">
                <h1 className="text-2xl text-[#212529] font-bold">
                  {/* {annoucementData?.title} */}
                </h1>
              </div>
            </div>

            <Suspense fallback={<FallbackLoadingComponent />}>
              <header className="mb-8">
                <div className=" md:h-[512px] flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 rounded-lg to-pink-500 mb-6 overflow-hidden">
                  <img
                    className=" rounded-lg  w-full max-w-[940px] h-full "
                    src={`${annoucementData?.photoImage}`}
                    alt={annoucementData?.title}
                  />
                </div>
                <small className="font-semibold">
                  {dateFormater(annoucementData?.startDate)}
                </small>
                <h1 className=" text-2xl md:text-4xl font-bold mb-4 text-shark-950 capitalize">
                  {annoucementData?.title}
                </h1>
                <div className="mb-2">
                  <h3 className="text-xl font-bold text-shark-950">
                    Date and Time
                  </h3>
                  <div className="flex items-center gap-4 mt-2">
                    <Calendar />
                    <div>
                      <strong className="font-medium text-shark-600">
                        {dateFormater(annoucementData?.startDate)}
                      </strong>
                      -
                      <span className="font-medium text-shark-600">
                        {annoucementData?.time}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-2 mt-6">
                  <h3 className="text-xl font-bold text-shark-950">Location</h3>
                  <div className="flex items-center gap-4 mt-2">
                    <MapPinCheckInside />
                    <div>
                      <span className="font-medium text-shark-600">
                        {annoucementData?.venue}
                      </span>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-shark-950">
                  About this event
                </h3>
                <p className="text-shark-600">{annoucementData?.description}</p>
              </header>
            </Suspense>
            <Link
              to={`/secure/events/${annoucementData?._id}/register`}
              state={{ annoucementData }}
              className="px-6 mt-6 cursor-pointer rounded-lg h-14 flex justify-center items-center bg-[#1A4F83] text-center text-sm font-bold text-[#F4F6F7] "
            >
              Get tickets
            </Link>
          </section>
        )}
      </main>
    </div>
  );
}

export default EventDetails;
