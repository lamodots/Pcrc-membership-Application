import React, { useRef } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function SwipperCarosuel() {
  // Correct the type for SVG element ref
  const progressCircle = useRef<SVGSVGElement | null>(null);
  const progressContent = useRef<HTMLSpanElement | null>(null);

  const onAutoplayTimeLeft = (s: any, time: number, progress: number) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty("--progress", `${1 - progress}`);
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        {/* <SwiperSlide className="w-full">
          <img src="https://res.cloudinary.com/du6l1a0ei/image/upload/v1743609965/topbanner2_cec5hb.jpg" />
        </SwiperSlide> */}
        <SwiperSlide
          style={{
            width: "100%",
          }}
          className="swipper"
        >
          <img src="https://res.cloudinary.com/dqnqvg0kz/image/upload/v1747239852/004_ufw8dx.jpg" />
        </SwiperSlide>
        <SwiperSlide
          style={{
            width: "100%",
          }}
          className="swipper"
        >
          <img src="https://res.cloudinary.com/dqnqvg0kz/image/upload/v1747239851/001_xalqu9.jpg" />
        </SwiperSlide>
        <SwiperSlide
          style={{
            width: "100%",
          }}
          className="swipper"
        >
          <img src="https://res.cloudinary.com/dqnqvg0kz/image/upload/v1747239850/002_tjmyyc.jpg" />
        </SwiperSlide>

        {/* <SwiperSlide>
          <img src="https://cdn.evbstatic.com/s3-build/fe/build/images/389ece7b7e2dc7ff8d28524bad30d52c-dsrp_desktop.webp" />
        </SwiperSlide> */}

        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </>
  );
}
