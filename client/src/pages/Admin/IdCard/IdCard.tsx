function IdCard() {
  return (
    <div className="p-4 max-w-lg mx-auto">
      {/* FRONT */}
      <div className="w-[3.37in] h-[2.13in] border rounded-lg shadow-lg overflow-hidden m-auto">
        <div className="bg-blue-900 text-white  py-2 flex justify-between space-x-4 items-center px-4">
          <div className="w-12 h-8 bg-gray-400"></div>
          <div>
            <h1 className="text-sm font-bold leading-none">
              Lagos State Professional Photographers Association of Nigeria
            </h1>
          </div>
        </div>
        <div className="p-2">
          <div className="flex justify-center mb-2">
            <div className="w-16 h-16 rounded-md bg-gray-300">
              <img
                src="https://haircutinspiration.com/wp-content/uploads/Michael-Jordans-Short-Haircut-1-1.jpg"
                alt="QR Code"
                className="w-full rounded-md h-full object-cover"
              />
            </div>
          </div>
          <div className="text-left mb-2">
            <p className="text-[18px] text-gray-700 leading-none text-center">
              Issac Anthony
            </p>
            <p className="text-sm text-gray-700 text-center leading-none">
              Member
            </p>
          </div>
        </div>
        <div className="bg-blue-900 text-white text-center py-1">
          <h2 className="text-xs leading-none">
            Please present this ID card upon request.
          </h2>
        </div>
      </div>
      {/* BACK */}
      <div className="w-[3.37in] h-[2.13in] border rounded-lg shadow-lg overflow-hidden m-auto mt-4">
        <div className="bg-blue-900 text-white text-center py-2">
          <h1 className="text-sm font-bold leading-none">
            CONTACT INFORMATION
          </h1>
        </div>
        <div className="p-3">
          <p className="mb-6"> If found kindly contact:</p>
          <div className="text-left mb-2 space-y-2">
            <p className="text-xs text-gray-700 leading-none">
              <span className="font-bold">Phone:</span> (123) 456-7890
            </p>
            <p className="text-xs text-gray-700 leading-none">
              <span className="font-bold">Email:</span> geoff@example.com
            </p>
            <p className="text-xs text-gray-700 leading-none">
              <span className="font-bold">Address:</span> 123 Maintenance Ave,
              Lagos, NG
            </p>
          </div>
        </div>
        {/* <div className="bg-blue-900 text-white text-center py-1">
          <h2 className="text-xs leading-none">
            Please present this ID card upon request.
          </h2>
        </div> */}
      </div>
    </div>
  );
}

export default IdCard;
