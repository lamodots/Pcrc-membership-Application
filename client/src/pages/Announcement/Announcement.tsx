import React, { useEffect, useState } from "react";
import { Filter } from "lucide-react";
import TextInput from "../../components/Input/TextInput";
import { Link } from "react-router-dom";
import FilterPopUp from "../../components/FilterPopUp/FilterPopUp";
import AnnouncementList from "../../components/AnnouncementsList/AnnouncementList";
import { Oval } from "react-loader-spinner";

const API_URL = process.env.REACT_APP_CLIENT_URL;
interface AnnouncementProps {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  createdBy: {
    firstname: string;
    lastname: string;
  };
}

function Announcement() {
  const [announcement, setAnnouncementData] = useState<AnnouncementProps[]>([]);
  const [loading, setIsLoading] = useState(false);
  const [iputText, setInputText] = useState("");
  const [showPopup, setShowPopUp] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  async function getAllAnnoucements() {
    try {
      setIsLoading(true);
      const query = new URLSearchParams();
      if (filterStartDate) query.append("startDate", filterStartDate);
      if (filterEndDate) query.append("endDate", filterEndDate);

      const res = await fetch(
        `${API_URL}/api/v1/secure/announcement?${query.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-type": "appliacation/json",
          },
        }
      );

      const { announcements } = await res.json();

      setAnnouncementData(announcements);
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
        announcement?.title.toLowerCase().includes(iputText.toLowerCase()) ||
        announcement?.description
          .toLowerCase()
          .includes(iputText.toLowerCase());

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
        <h1 className="text-2xl text-[#212529] font-bold">Announcements</h1>
        <div className="flex  justify-between items-center gap-4 w-full max-w-[600px] mt-8">
          <div className="left w-full">
            <TextInput
              className=" w-full"
              type="text"
              placeholderText="Search Announcements"
              name="search-annoucement"
              value={iputText}
              handleInputChange={(e) => setInputText(e.target.value)}
            />
          </div>
          {/* the popup */}
          {/* <div>
            <div
              className="right py-3 px-2 bg-white rounded-lg shadow-lg flex items-center justify-center cursor-pointer"
              onClick={() => setShowPopUp(!showPopup)}
            >
              <Filter />
              <small>Filter</small>
            </div>

            {showPopup && (
              <FilterPopUp
                valueStart={startDate}
                handleStartChange={(e: React.FormEvent<HTMLInputElement>) => {
                  console.log(e.currentTarget.value);
                  setStartDate(e.currentTarget.value);
                }}
                valueEnd={endDate}
                handleEndChange={(e: React.FormEvent<HTMLInputElement>) => {
                  console.log(e.currentTarget.value);
                  setEndDate(e.currentTarget.value);
                }}
                handleApply={() => handleApplyFilter()}
              />
            )}
          </div> */}
          {/* the popup end */}
        </div>
      </header>
      <section className="py-8">
        {currentPageData.length == 0 && <p>No Announcement</p>}
        {loading ? (
          <div className=" flex justify-center items-center w-full py-8">
            <Oval height="48" width="48" />
          </div>
        ) : (
          <>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
              {currentPageData.map((announcement) => {
                return (
                  <Link
                    to={`/announcement/details/${announcement?._id}`}
                    key={announcement?._id}
                  >
                    <AnnouncementList
                      description={announcement?.description}
                      title={announcement?.title}
                      createdBy={announcement.createdBy}
                      createdAt={announcement?.createdAt}
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
    </main>
  );
}

export default Announcement;
