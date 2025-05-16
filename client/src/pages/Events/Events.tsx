import { useEffect, useState } from "react";

import TextInput from "../../components/Input/TextInput";

import { Link } from "react-router-dom";

import AnnouncementList from "../../components/AnnouncementsList/AnnouncementList";
import { Oval } from "react-loader-spinner";

import SwipperCarosuel from "../../components/Swipper/Swipper";
import Advertisment from "../../components/Advertisment/Advertisment";

const API_URL = process.env.REACT_APP_CLIENT_URL;
interface AnnouncementProps {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  photoImage?: string;
  time?: string;
  venue?: string;
  createdBy: {
    firstname: string;
    lastname: string;
  };
}

function Events() {
  const [announcement, setAnnouncementData] = useState<AnnouncementProps[]>([]);
  const [loading, setIsLoading] = useState(false);
  const [iputText, setInputText] = useState("");
  const [showPopup, setShowPopUp] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  async function getAllAnnoucements() {
    try {
      setIsLoading(true);
      const query = new URLSearchParams();
      if (filterStartDate) query.append("startDate", filterStartDate);
      if (filterEndDate) query.append("endDate", filterEndDate);

      const res = await fetch(
        `${API_URL}/api/v1/secure/events?${query.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-type": "appliacation/json",
          },
        }
      );

      const { event } = await res.json();

      setAnnouncementData(event);
    } catch (error) {
      throw new Error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getAllAnnoucements();
  }, [filterStartDate, filterEndDate]);
  // Funcrionality for flter and search
  const handleApplyFilter = () => {
    setFilterStartDate(startDate);
    setFilterEndDate(endDate);
    setShowPopUp(false);
  };
  const filteredAnnouncements: AnnouncementProps[] =
    announcement?.filter((announcement: AnnouncementProps) => {
      const matchText =
        announcement.title.toLowerCase().includes(iputText.toLowerCase()) ||
        announcement.description.toLowerCase().includes(iputText.toLowerCase());

      return matchText;
    }) || [];

  // Pagination logic
  const totalPages = Math.ceil(filteredAnnouncements.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = filteredAnnouncements.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber: number) => {
    setIsLoading(true);
    setCurrentPage(pageNumber);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  return (
    <main>
      <header>
        <div className="flex  justify-between items-center px-6 md:px-16 md:gap-4 w-full mt-2 bg-white h-16 rounded-tl-lg rounded-tr-lg">
          <div className="left w-full ">
            <TextInput
              className=" w-full  max-w-[300px]"
              type="text"
              placeholderText="Search event"
              name="search-annoucement"
              value={iputText}
              handleInputChange={(e) => setInputText(e.target.value)}
            />
          </div>
          {/* the popup */}
          <div></div>
          {/* the popup end */}
        </div>
        <SwipperCarosuel />
        {/* <div className=" w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-[160px] md:h-[380px] rounded-2xl mt-3 "></div> */}
      </header>
      <section className="py-8 px-6 md:px-16">
        {currentPageData.length == 0 && <p>No Events</p>}
        {loading ? (
          <div className=" flex justify-center items-center w-full py-8">
            <Oval height="48" width="48" />
          </div>
        ) : (
          <>
            <div className="grid gap-2 md:gap-6 grid-cols-1 md:grid-cols-3">
              {currentPageData.map((announcement) => {
                return (
                  <Link
                    to={`/events/details/${announcement?._id}`}
                    key={announcement?._id}
                  >
                    <AnnouncementList
                      // description={announcement?.description}
                      title={announcement?.title}
                      photoImage={announcement?.photoImage}
                      createdBy={announcement?.createdBy}
                      time={announcement?.startDate}
                      venue={announcement?.venue}
                    />
                  </Link>
                );
              })}
            </div>
          </>
        )}
        {/* Pagination */}

        <div className="flex items-center space-x-4 pt-10">
          <span>{`${currentPage} of ${totalPages}`}</span>{" "}
          <ul className="space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index} className="inline">
                {" "}
                <button
                  onClick={() => handlePageChange(index + 1)}
                  className={`py-2 px-3 rounded-lg text-white font-semibold ${
                    currentPage === index + 1 ? "bg-[#2067A9]" : "bg-gray-500"
                  }`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Advertisment />
    </main>
  );
}

export default Events;
