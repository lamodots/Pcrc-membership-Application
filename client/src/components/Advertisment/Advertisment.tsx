import React, { useState } from "react";
import useAds from "../../hooks/useFetchAds";
import { Oval } from "react-loader-spinner";
interface AdvertismentProps {
  topImage?: string;
  bottomLeftImage?: string;
  bottomRightImage?: string;
  link?: string;
}
function Advertisment() {
  const { loading, ads } = useAds();
  const advertisment = ads[0];

  return (
    <div className="ads my-10 w-full max-w-[1100px] mx-auto overflow-hidden">
      <div className="ads1 w-full mb-1">
        {loading ? (
          <Oval height={16} width={16} />
        ) : (
          <a
            href={`${advertisment ? advertisment?.topImageLink : "#"}`}
            className="block"
          >
            <img
              src={`${advertisment?.topImage}`}
              className="w-full h-auto object-contain md:object-cover max-h-[150px]"
              alt="Advertisement"
            />
          </a>
        )}
      </div>
      <div className="ads_bottom grid grid-cols-2 md:grid-cols-2 gap-1">
        <div className="left">
          {loading ? (
            <Oval height={16} width={16} />
          ) : (
            <a
              href={`${advertisment ? advertisment?.bottomLeftImageLink : "#"}`}
              className="block"
            >
              <img
                src={`${advertisment?.bottomLeftImage}`}
                className="w-full h-auto object-contain md:object-cover md:h-[150px]"
                alt="Advertisement"
              />
            </a>
          )}
        </div>
        <div className="right">
          {loading ? (
            <Oval height={16} width={16} />
          ) : (
            <a
              href={`${
                advertisment ? advertisment?.bottomRightImageLink : "#"
              }`}
              className="block"
            >
              <img
                src={`${advertisment?.bottomRightImage}`}
                className="w-full h-auto object-contain md:object-cover md:h-[150px]"
                alt="Advertisement"
              />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default Advertisment;
