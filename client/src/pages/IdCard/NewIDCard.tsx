import React from "react";

const IdCard = () => {
  // Sample member data (this would normally be passed as props)
  const memberData = {
    idNumber: "KSN2025001",
    name: "John Thomas",
    membershipCategory: "Life Member",
    validityPeriod: "2025-2030",
  };

  return (
    <div>
      {/* // FRONT OF ID CARD */}
      <div className="flex justify-center items-center w-full h-screen bg-gray-100 p-4">
        <div className="w-64 h-96 rounded-lg overflow-hidden shadow-lg relative">
          {/* Background image */}
          <div className="absolute inset-0">
            <div className="h-full w-full">
              <img
                src="/id-bg.png"
                alt="ID Card Background"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content overlay */}
          <div className="relative z-10 flex flex-col items-center p-3">
            {/* Header with logo */}
            <div className="flex justify-between items-center w-full">
              {/* <div className="flex-1"></div> */}
              <div className="flex-1 text-center font-bold text-black text-[10px] pt-8 ">
                <p className="text-center">KERALA SAMAJAM NIGERIA</p>
              </div>
              <div className=" flex justify-end">
                <img src="./id-logo.png" className="w-12 absolute top-4" />
              </div>
            </div>

            {/* Photo placeholder */}
            <div className="mt-2 w-32 h-28 bg-gray-200 border border-gray-300">
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                Photo
              </div>
            </div>
            {/* Malayalam text */}
            <div className="mt-2 text-blue-900 font-bold text-sm">
              കേരള സമാജം നൈജീരിയ
            </div>
            {/* ID information */}
            <div className="mt-1 w-full text-left text-xs">
              <div className="flex mb-1">
                <span className="font-semibold w-36">ID Number:</span>
                <span>{memberData.idNumber}</span>
              </div>
              <div className="flex mb-1">
                <span className="font-semibold w-36">Name:</span>
                <span>{memberData.name}</span>
              </div>
              <div className="flex mb-1">
                <span className="font-semibold w-36">Membership Category:</span>
                <span>{memberData.membershipCategory}</span>
              </div>
              <div className="flex mb-1">
                <span className="font-semibold w-36">Validity Period:</span>
                <span>{memberData.validityPeriod}</span>
              </div>
            </div>

            {/* 25 Years badge */}
            <div className="relative -left-[84px] -bottom-1 ">
              <div className="w-16 h-16">
                <img
                  src="/25-yrs.png"
                  alt="25 Years Badge"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BACK OF IF CARD */}
      <div className="flex justify-center items-center w-full h-screen bg-gray-100">
        <div className="w-64 h-96 rounded-lg overflow-hidden shadow-lg relative">
          {/* Background image */}
          <div className="absolute inset-0">
            <div className="h-full w-full">
              <img
                src="/id-bg.png"
                alt="ID Card Background"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content overlay */}
          <div className="relative z-10 flex flex-col items-center p-3">
            {/* Header with logo */}
            <div className="flex justify-between items-center w-full">
              <div className="mb-3 mt-8">
                <h3 className="font-semibold mb-1">Contact Information:</h3>
                <div className="pl-2 text-xs">
                  <p className="mb-1">Phone:+2347060606060</p>
                  <p>Email:keralasamajamnigeria@gmail.com </p>
                </div>
              </div>
            </div>
            <div className="mt-2 w-full">
              <h3 className="font-semibold text-xs mb-1">
                Terms & Conditions:
              </h3>
              <ol className="text-xs pl-5 list-decimal">
                <li className="mb-1">
                  This card remains the property of Kerala Samajam Nigeria.
                </li>
                <li className="mb-1">
                  If found, please return to Kerala Samajam Nigeria.
                </li>
                <li>Card is not transferable.</li>
              </ol>
            </div>
            {/* Footer */}
            <div className="absolute -bottom-10 text-center w-full">
              <div className=" flex justify-center">
                <img src="./id-logo.png" className="w-12 absolute top-10" />
              </div>
              <p className="text-xs font-semibold">Kerala Samajam Nigeria</p>
              <p className="text-xs">www.keralasamajamnigeria.org</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdCard;
