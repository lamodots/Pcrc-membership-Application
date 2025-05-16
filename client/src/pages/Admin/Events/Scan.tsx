import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";
// import { QrReader } from "react-qr-reader";
import { useNavigate, useParams } from "react-router-dom";

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

const QRCodeScanner = () => {
  const [applicant, setApplicant] = useState<ApplicantProps | null>(null);
  const [statusMessage, setStatusMessage] = useState(
    "Place the QRCode to face the scanner."
  );
  const [isScanning, setIsScanning] = useState(false);
  const { id } = useParams();

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  // const handleScan = async (result: { text: string }, error: Error) => {
  //   if (!!error) {
  //     setStatusMessage("Invalid QR Code");
  //     setTimeout(
  //       () => setStatusMessage("Place the QRCode to face the scanner."),
  //       2000
  //     );
  //     return;
  //   }
  //   if (!result?.text) {
  //     return; // No QR Code detected
  //   }

  //   setIsScanning(true);
  //   setStatusMessage("Scanning... Please wait!");

  //   try {
  //     // Simulate a delay before processing the scan
  //     await new Promise((resolve) => setTimeout(resolve, 1000));

  //     const response = await fetch(
  //       `${API_URL}/api/v1/secure/events/${id}/applicant`,
  //       {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ applicantQRCode: result.text }),
  //       }
  //     );

  //     const responseData = await response.json();

  //     if (response.ok) {
  //       // Delay before showing "Scan Successful!" and displaying details
  //       setStatusMessage("Scan Successful!");
  //       setApplicant(responseData.applicant);

  //       setTimeout(() => {
  //         setStatusMessage("Place the QRCode to face the scanner.");
  //       }, 3000);
  //     } else {
  //       // Handle backend error messages with delay
  //       // setStatusMessage(
  //       //   responseData.message || "An error occurred. Please try again."
  //       // );
  //       // setTimeout(() => {
  //       //   setStatusMessage("Place the QRCode to face the scanner.");
  //       // }, 3000);
  //       if (window.confirm("Scan done ")) {
  //         setStatusMessage(
  //           responseData.message || "An error occurred. Please try again."
  //         );
  //         setTimeout(() => {
  //           setStatusMessage("Place the QRCode to face the scanner.");
  //         }, 3000);
  //       } else {
  //         toast.error("cancelled");
  //       }
  //     }
  //   } catch (err) {
  //     console.error("Error during scan:", err);
  //     setStatusMessage("An error occurred. Please try again.");
  //     setTimeout(() => {
  //       setStatusMessage("Place the QRCode to face the scanner.");
  //     }, 3000);
  //   } finally {
  //     setIsScanning(false);
  //   }
  // };

  return (
    <div className="py-24">
      <button className="flex space-x-2" onClick={handleBackClick}>
        {" "}
        <ChevronLeft />
        Back
      </button>
      <div className="w-[400px] m-auto shadow-lg bg-white p-4 rounded-lg">
        {/* <QrReader
          onResult={(result: { text: string | null }, error: Error) => {
            if (result?.text) handleScan({ text: result.text }, error);
          }}
          style={{ width: "100%" }}
          className="rounded-lg"
          containerStyle={{ borderRadius: "40px", height: 300 }}
          videoContainerStyle={{
            height: 300,
            borderRadius: "40px",
          }}
          videoStyle={{ height: 300, borderRadius: "40px" }}
        /> */}
        <span className="px-6 h-10 bg-green-300 rounded-lg flex items-center justify-center mt-4">
          {isScanning ? "Scanning... Please wait!" : statusMessage}
        </span>
      </div>

      {isScanning && (
        <div className="flex justify-center">
          <Oval width={40} height={40} />
        </div>
      )}
      {/* Display Applicant Details */}
      {applicant && (
        <div className="mt-8 bg-white p-6 rounded-lg">
          <h2 className="mb-6">Registered Details</h2>
          <table className="border-collapse border border-slate-400 table-auto w-full text-sm text-left text-gray-500">
            <thead className="bg-gray-100 text-gray-700 uppercase">
              <tr>
                <th className="border border-slate-300 px-4 py-2">Full Name</th>
                <th className="border border-slate-300 px-4 py-2">Email</th>
                <th className="border border-slate-300 px-4 py-2">
                  Phone Number
                </th>
                <th className="border border-slate-300 px-4 py-2">
                  WhatsApp Number
                </th>
                <th className="border border-slate-300 px-4 py-2">
                  Number of Family Members
                </th>
                <th className="border border-slate-300 px-4 py-2">
                  Family Members
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="border border-slate-300 px-4 py-2">
                  {applicant.full_name}
                </td>
                <td className="border border-slate-300 px-4 py-2">
                  {applicant.email}
                </td>
                <td className="border border-slate-300 px-4 py-2">
                  {applicant.phone_number}
                </td>
                <td className="border border-slate-300 px-4 py-2">
                  {applicant.whatsapp_number}
                </td>
                <td className="border border-slate-300 px-4 py-2">
                  {applicant.number_of_family_members}
                </td>
                <td className="border border-slate-300 px-4 py-2">
                  <ul className="capitalize">
                    {applicant.attendees.map((attendee) => (
                      <li key={attendee?._id}>
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
  );
};

export default QRCodeScanner;
