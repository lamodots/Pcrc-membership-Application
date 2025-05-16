import React, { useEffect, useRef, useState } from "react";
import { Download, FileType, InfoIcon } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useCurrentUser } from "../../context/AdminContext";
import useFetchAppData from "../../hooks/useFetchAppData";
import {
  useMembershipActive,
  useWelfareActive,
} from "../../hooks/useFetchPayment";
import { Link } from "react-router-dom";
import Advertisment from "../../components/Advertisment/Advertisment";
import NewIDCard from "./NewIDCard";
import { monthdayyearFormater } from "../../util/monthdayyearFormater";
import { yearsInNigeria } from "../../util/getYearsInNigeria";

// ID Card Component
const IdCard = React.forwardRef<
  HTMLDivElement,
  {
    member: any;
    logo: string | File | null | undefined;
    membership: any;
    memberId?: any;
    familyInLagos?: boolean;
    welfare?: any;
    location?: any;
  }
>((props, ref) => {
  console.log("MY PROPS", props);
  return (
    <div
      ref={ref}
      style={{
        padding: "10mm",
        backgroundColor: "#f5f7fa",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      {/* // FRONT OF ID CARD */}

      <div className="w-[420px] h-[640px] rounded-lg overflow-hidden shadow-lg relative">
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
            <div className="flex-1 text-center font-bold text-black  pt-16 ">
              <span className="text-[24px]">{props.member.memberId}</span>
              <p className="text-center text-[18px] text-orange-600">
                LAGOS STATE PROFESSIONAL PHOTOGRAPHER
              </p>
            </div>
            <div className=" flex justify-end">
              <img src="./id-logo.png" className="w-16 absolute top-12" />
            </div>
          </div>

          {/* Photo placeholder */}
          <div className="mt-2 w-[160px] h-[206px] bg-white border border-gray-300 overflow-hidden">
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              <img
                src={props.member.image}
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          {/* Malayalam text */}
          <div className="mt-2 text-blue-900 font-bold text-[18px] text-center">
            PROMOTING PHOTOGRAPHY AS A PROFESSION
          </div>
          {/* ID information */}
          <div className="mt-4 w-full text-left text-[14px]">
            {/* <div className="flex gap-10 mb-1">
              <span className="font-semibold w-36">ID Number:</span>
              <span className="text-[9px]">
                {props.member.memberId}
                {props.familyInLagos && props.memberId}
              </span>
            </div> */}
            <div className="text-center mb-1">
              {/* <span className="font-semibold w-36">Name:</span> */}
              <span className="text-[24px] font-bold">
                {props.member.title}{" "}
                {props.member.firstName || props.member.firstname}{" "}
                {props.member.lastName || props.member.lastname}
              </span>
            </div>
            <div className="flex justify-center mb-1">
              {/* <span className="font-semibold w-36">Membership Category:</span> */}
              <span className="text-[14px] font-bold">
                {props.membership.membershipType.split("s")[0]}
              </span>
            </div>
            <div className="flex justify-center gap-1 mb-1">
              <span>Area:</span>

              <span className="text-center">{props?.member.location}</span>
              <span>{props.location}</span>
            </div>
            {/* <div className="flex justify-center gap-1 mb-1 text-gray-600">
              <span>
                Living in NG for {yearsInNigeria(props?.member.dateOfEntry)}{" "}
                {"  "} yrs
              </span>
            </div> */}
            <div className="relative left-[150px] -bottom-8">
              <span className="text-[9px] w-36">Valid till:</span>{" "}
              <span className="text-[9px]">
                {/* {monthdayyearFormater(props.membership.expiryDate)} */}
                {monthdayyearFormater(props.welfare.expiryDate)}
              </span>
            </div>
          </div>

          {/* 25 Years badge */}
          <div className="relative left-[160px] -bottom-2 ">
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
      {/* NEW ID BACK */}
      <div className="w-[420px] h-[640px] rounded-lg overflow-hidden shadow-lg relative">
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
            <div className="mb-3 mt-24">
              <h3 className="font-semibold mb-1 text-2xl">
                Contact Information:
              </h3>
              <div className="pl-2 text-base">
                <p className="mb-1">Phone:+2348067283510</p>
                <p>Email: info@lasppan.org</p>
              </div>
            </div>
          </div>
          <div className="mt-2 w-full">
            <h3 className="font-semibold text-[18px] mb-1">
              Terms & Conditions:
            </h3>
            <ol className="text-base pl-5 list-decimal">
              <li className="mb-1">
                This card remains the property of Kerala Samajam Nigeria.
              </li>
              <li className="mb-1">If found, please return to {}.</li>
              <li>Card is not transferable.</li>
            </ol>
          </div>
          {/* Footer */}
          <div className="absolute -bottom-20 text-center w-full">
            <div className=" flex justify-center">
              <img src="./id-logo.png" className="w-24 absolute top-20" />
            </div>
            <p className="text-[18px] font-semibold">LASPPAN</p>
            <p className="text-base">www.lasppan.org</p>
          </div>
        </div>
      </div>
    </div>
  );
});

// Printable ID Cards Component
function PrintableIdCards() {
  const { currentUser } = useCurrentUser();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const API_URL = process.env.REACT_APP_CLIENT_URL;

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/v1/users/profile/${currentUser?.user._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch profile data.");
        }
        const { data } = await response.json();
        setUser(data);
      } catch (error: any) {
        setApiError(error.message || "An error occurred while fetching data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Render loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Render error state
  if (apiError) {
    return <div className="text-red-500">{apiError}</div>;
  }

  // Render ID cards
  return (
    <div>
      <div className="p-4 w-full ">
        {user && (
          <>
            <div className="mb-4 flex  items-center flex-col">
              <h1 className="text-center text-2xl">
                Download Membership ID Card
              </h1>
              <IdCardComponent member={user} />
            </div>
            {/* {user.familyMembers.map((member: any, index: number) => (
              <div key={index} className="mb-4 flex  items-center flex-col">
                <IdCardComponent
                  member={member}
                  memberId={user.memberId}
                  familyInLagos={user.familyInLagos}
                  location={user.location}
                />
              </div>
            ))} */}
          </>
        )}
      </div>

      <Advertisment />
    </div>
  );
}

// ID Card Component Wrapper
const IdCardComponent: React.FC<{
  member: any;
  memberId?: any;
  familyInLagos?: boolean;
  location?: any;
}> = ({ member, memberId, familyInLagos, location }) => {
  const { currentUser } = useCurrentUser();
  const componentRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const { appData } = useFetchAppData();
  const [membershipItem] = useMembershipActive();
  const [welfareItem] = useWelfareActive();

  const showAlert = !(
    (membershipItem?.status === "active" ||
      currentUser?.user.isHonouraryMember) &&
    welfareItem?.status === "active"
  );
  // Download as PDF functionality
  const handleDownloadPDF = async () => {
    if (componentRef.current === null) return;

    setIsDownloading(true);
    try {
      const name = member.firstName || member.firstname;

      // Create a canvas from the component
      const canvas = await html2canvas(componentRef.current, {
        scale: 2, // Higher scale for better quality
        useCORS: true, // Allow cross-origin images
        allowTaint: true,
        backgroundColor: "white",
        logging: false,
        imageTimeout: 0,
      });

      const imgData = canvas.toDataURL("image/jpeg", 1.0);

      // Create PDF (A4 size)
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a1",
      });

      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Add the image to the PDF
      pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);

      // Save the PDF
      pdf.save(`${name}-ID-Card.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Could not generate PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  // Download as PNG functionality
  const handleDownloadPNG = async () => {
    if (componentRef.current === null) return;

    setIsDownloading(true);
    try {
      const name = member.firstName || member.firstname;

      // Create a canvas from the component
      const canvas = await html2canvas(componentRef.current, {
        scale: 2, // Higher scale for better quality
        useCORS: true, // Allow cross-origin images
        allowTaint: true,
        backgroundColor: "white",
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");

      // Create download link
      const link = document.createElement("a");
      link.download = `${name}-ID-Card.png`;
      link.href = imgData;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error generating image:", error);
      alert("Could not generate image. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <main>
      {showAlert ? (
        <div className="mt-10">
          <Alert />
        </div>
      ) : (
        <div>
          <IdCard
            ref={componentRef}
            member={member}
            logo={appData?.applogo}
            membership={membershipItem}
            welfare={welfareItem}
            memberId={memberId}
            location={location}
            familyInLagos={familyInLagos}
          />
          <div className="flex  justify-center mt-4 space-x-4">
            <button
              onClick={handleDownloadPDF}
              className="flex items-center bg-green-500 text-white px-4 py-2 rounded"
              disabled={isDownloading}
            >
              <FileType className="mr-2" size={18} />
              Download PDF
            </button>
            <button
              onClick={handleDownloadPNG}
              className="hidden items-center bg-purple-500 text-white px-4 py-2 rounded"
              disabled={isDownloading}
            >
              <Download className="mr-2" size={18} />
              Download PNG
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default PrintableIdCards;

function Alert() {
  return (
    <div className="flex items-center gap-2 bg-cyan-200 px-3 py-4 rounded border-l-4 border-l-cyan-700">
      <div>
        <InfoIcon height={22} width={22} />
      </div>
      <p className="text-sm">
        You are yet to pay for <strong>Membership </strong>and{" "}
        <strong>ID Card</strong> dues. Subscribe to get ID card. {""}
        <Link to="/subscription" className="text-cyan-900 underline font-bold">
          Get started
        </Link>
      </p>
    </div>
  );
}
