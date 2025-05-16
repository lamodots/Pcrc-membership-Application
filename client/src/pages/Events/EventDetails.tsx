import React, { Suspense, useEffect, useState } from "react";
import { Calendar, MapPinCheckInside } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import FallbackLoadingComponent from "../../components/FallbackLoadingComponent/FallbackLoadingComponent";
import { Oval } from "react-loader-spinner";
import { dateFormater } from "../../util/DateFormater";
import FeaturedEvents from "../../components/FeaturedEvents/FeaturedEvents";
import Advertisment from "../../components/Advertisment/Advertisment";

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
}
function EventDetails() {
  const [annoucementData, setAnnouncementData] = useState<AnnouncementProps>();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteting, setIsDeleteting] = useState(false);
  const { id } = useParams();

  console.log(annoucementData?.photoImage);
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
  }, [id]);

  return (
    <div>
      <main>
        {isLoading ? (
          <div className=" flex justify-center items-center w-full py-8">
            <Oval height="48" width="48" />
          </div>
        ) : (
          <section className="p-6">
            <Suspense fallback={<FallbackLoadingComponent />}>
              <header className="mb-8">
                <div className=" md:h-[512px] flex items-center justify-center bg-gradient-to-r from-indigo-50 via-purple-50 rounded-lg  mb-6">
                  <img
                    className=" rounded-lg  w-full max-w-[940px] h-full"
                    src={`${annoucementData?.photoImage}`}
                    alt={annoucementData?.title}
                  />
                </div>
              </header>
              <div className=" grid grid-cols-1 md:grid-cols-[8fr_4fr] md:gap-12">
                <div>
                  {/* main */}
                  <small className="font-semibold">
                    {dateFormater(annoucementData?.startDate)}
                  </small>
                  <h1 className=" text-2xl md:text-3xl font-bold mb-4 text-shark-950 capitalize">
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
                    <h3 className="text-xl font-bold text-shark-950">
                      Location
                    </h3>
                    <div className="flex items-center gap-4 mt-2">
                      <MapPinCheckInside />
                      <div>
                        <span className="font-medium text-shark-600">
                          {annoucementData?.venue}
                        </span>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-shark-950 mt-6">
                    About this event
                  </h3>
                  <p className="text-shark-600">
                    {annoucementData?.description}
                  </p>
                  <div className="mt-6 flex items-center justify-center bg-gradient-to-r from-indigo-50 via-purple-50 rounded-lg to-pink-50 mb-6">
                    <img
                      className="  w-full max-w-[940px] h-full"
                      src={`${annoucementData?.photoImage}`}
                      alt={annoucementData?.title}
                    />
                  </div>
                </div>
                <div>
                  {/* // side */}

                  <div className="p-8 bg-white border border-zinc-300 rounded-lg">
                    <Link
                      to={`/events/${annoucementData?._id}/register`}
                      state={{ annoucementData }}
                      className="px-6 mt-6 cursor-pointer rounded-lg h-14 flex justify-center items-center bg-[#1A4F83] text-center text-sm font-bold text-[#F4F6F7] "
                    >
                      Reserve a spot
                    </Link>
                  </div>
                </div>
              </div>
            </Suspense>
          </section>
        )}
        <section className="px-6 pb-40">
          <h2 className=" text-2xl md:text-3xl font-bold">
            Other events you may like
          </h2>
          <div className="mt-8">
            <FeaturedEvents />
          </div>
        </section>
        <Advertisment />
      </main>
    </div>
  );
}

export default EventDetails;
