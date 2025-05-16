import { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import "./styles.css";
// import required modules
import { FreeMode, Pagination } from "swiper/modules";

import { Link } from "react-router-dom";
import { dateFormater } from "../../util/DateFormater";

const API_URL = process.env.REACT_APP_CLIENT_URL;

interface EventsProps {
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

function FeaturedEvents() {
  const [featuredEvents, setFeaturedEvents] = useState<EventsProps[]>([]);
  const [loading, setLoading] = useState(false);

  async function getAllEvents() {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/v1/secure/events`, {
        method: "GET",
        headers: {
          "Content-type": "appliacation/json",
        },
      });

      const { event } = await res.json();
      setFeaturedEvents(event);
    } catch (error) {
      throw new Error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllEvents();
  }, [loading]);

  return (
    <>
      <Swiper
        spaceBetween={24}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1, // 1 slide per view for small screens
          },
          640: {
            slidesPerView: 2, // 2 slides per view for screens larger than 640px
          },
          1024: {
            slidesPerView: 3, // 3 slides per view for screens larger than 1024px
          },
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        {featuredEvents.map((featuredEvent) => (
          <SwiperSlide key={featuredEvent?._id} className="swiper-slide ">
            <Link
              to={`/events/details/${featuredEvent?._id}`}
              className="w-full"
            >
              <div className="card bg-white rounded-lg flex flex-col p-3 h-full">
                {" "}
                {/* Ensure full height */}
                <img
                  src={`${featuredEvent.photoImage}`}
                  alt={featuredEvent?.title}
                  className="h-48 w-full object-cover rounded-lg mb-2"
                />
                <h3 className="font-semibold text-base w-full capitalize mb-1">
                  {featuredEvent?.title}
                </h3>
                <small className="text-gray-500">
                  {dateFormater(featuredEvent?.startDate)}
                </small>
                <p className="text-gray-600 text-sm mb-2">
                  {featuredEvent?.venue}
                </p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default FeaturedEvents;
