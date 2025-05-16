// import { useState, useEffect } from "react";
// import { Search, ChevronLeft, ChevronRight, Filter, Users } from "lucide-react";
// // import avatar from "../../assets/avatar_default.png";
// import avatar from "../../../assets/avatar_default.png";

// // Define the FamilyMember interface
// interface FamilyMember {
//   firstName: string;
//   lastName: string;
//   title: string;
//   relationship: string;
//   dateOfBirth: Date;
//   whatsappId: string;
// }

// // Define the Member interface
// interface Member {
//   isHonouraryMember: boolean;
//   welfare: string;
//   membershipdeus: string;
//   firstname: string;
//   lastname: string;
//   memberId: string;
//   profession: string;
//   title: string;
//   whatsappId: string;
//   image: string;
//   year: number;
//   familyMembers?: FamilyMember[];
//   location?: string;
//   dateOfEntry?: Date;
// }

// const API_URL = process.env.REACT_APP_CLIENT_URL;
// // Years for filtering
// const availableYears = [2017, 2022, 2023, 2024, 2025];

// const MembersRegister = () => {
//   // Initialize with empty array instead of undefined
//   const [members, setMembers] = useState<Member[]>([]);
//   const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedYear, setSelectedYear] = useState<number | null>(null);
//   const [showFamilyDetails, setShowFamilyDetails] = useState<string | null>(
//     null
//   );
//   const [loading, setLoading] = useState<boolean>(false);

//   const getAllUsers = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(
//         `${API_URL}/api/v1/secure/records/member-register`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           credentials: "include",
//         }
//       );

//       if (!res.ok) {
//         throw new Error("Error fetching data");
//       }

//       const { users } = await res.json();
//       setMembers(users);
//       // Set filtered members here as well
//       setFilteredMembers(users);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const initData = async () => {
//       await getAllUsers();
//     };

//     initData();
//   }, []);

//   // Calculate how many years the member is in Nigeria
//   const yearsInNigeria = (dateOfEntry: Date | undefined) => {
//     if (!dateOfEntry) return 0;
//     const thisYear = new Date().getFullYear();
//     const yearOfEntry = new Date(`${dateOfEntry}`).getFullYear();
//     const yearsInNigeria = thisYear - yearOfEntry;
//     return yearsInNigeria;
//   };

//   const itemsPerPage = 5;

//   // Filter members based on search term and selected year
//   useEffect(() => {
//     // Start with a copy of members, not a reference
//     let result = [...members];

//     // Filter by search term
//     if (searchTerm) {
//       const term = searchTerm.toLowerCase();
//       result = result.filter(
//         (member) =>
//           member.location?.toLowerCase().includes(term) ||
//           member.firstname.toLowerCase().includes(term) ||
//           member.lastname.toLowerCase().includes(term) ||
//           member.memberId.toLowerCase().includes(term)
//       );
//     }

//     // Filter by year
//     if (selectedYear) {
//       result = result.filter((member) => member.year === selectedYear);
//     }

//     setFilteredMembers(result);
//     setCurrentPage(1); // Reset to first page when filters change
//   }, [searchTerm, selectedYear, members]);

//   // Calculate pagination
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredMembers.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);

//   // Handle page change
//   const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

//   // Go to next page
//   const nextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   // Go to previous page
//   const prevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   // Toggle family details
//   const toggleFamilyDetails = (memberId: string) => {
//     if (showFamilyDetails === memberId) {
//       setShowFamilyDetails(null);
//     } else {
//       setShowFamilyDetails(memberId);
//     }
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen p-6">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex items-center justify-between mb-6">
//           <h1 className="text-2xl font-bold text-gray-800">
//             Members Information
//           </h1>
//           <button className="bg-green-700 font-bold text-white text-base px-3 text-center rounded-md h-8">
//             Export CSV
//           </button>
//         </div>

//         {/* Search and Filter Section */}
//         <div className="bg-white rounded-lg shadow p-4 mb-6">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//             {/* Search Input */}
//             <div className="relative flex-1">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Search className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Search by email, name or member ID"
//                 className="pl-10 pr-3 py-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>

//             {/* Year Filter */}
//             {/* <div className="flex items-center">
//               <Filter className="h-5 w-5 text-gray-500 mr-2" />
//               <select
//                 className="border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
//                 value={selectedYear || ""}
//                 onChange={(e) =>
//                   setSelectedYear(
//                     e.target.value ? parseInt(e.target.value) : null
//                   )
//                 }
//               >
//                 <option value="">All Years</option>
//                 {availableYears.map((year) => (
//                   <option key={year} value={year}>
//                     {year}
//                   </option>
//                 ))}
//               </select>
//             </div> */}
//           </div>
//         </div>

//         {/* Members Table */}
//         <div className="bg-white rounded-lg shadow overflow-hidden">
//           {loading ? (
//             <div className="p-8 text-center text-gray-500">
//               Loading members...
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                     >
//                       Member
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                     >
//                       Location
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                     >
//                       Status
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                     >
//                       Family
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                     >
//                       Contact Details
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                     >
//                       Profession
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {currentItems.length > 0 ? (
//                     currentItems.map((member, index) => {
//                       return (
//                         <>
//                           <tr
//                             key={member.memberId}
//                             className={
//                               index % 2 === 0 ? "bg-white" : "bg-gray-50"
//                             }
//                           >
//                             <td className="px-6 py-4 whitespace-nowrap">
//                               <div className="flex items-center">
//                                 <div className="flex-shrink-0 h-10 w-10">
//                                   <img
//                                     className="h-10 w-10 rounded-full object-cover"
//                                     src={member.image ? member.image : avatar}
//                                     alt={`${member.firstname} ${member.lastname}`}
//                                   />
//                                 </div>
//                                 <div className="ml-4">
//                                   <div className="text-sm font-medium text-gray-900">
//                                     {member.title} {member.firstname}{" "}
//                                     {member.lastname}
//                                   </div>
//                                   <div className="text-sm text-gray-500">
//                                     {member.memberId} {"  "} - {"  "}
//                                     {yearsInNigeria(member.dateOfEntry)} Yrs in
//                                     NG
//                                   </div>
//                                 </div>
//                               </div>
//                             </td>
//                             <td className="px-6 py-4">
//                               {member.location && (
//                                 <div className="text-sm text-gray-500">
//                                   {member.location}
//                                 </div>
//                               )}
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                               <span
//                                 className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                                   member.welfare === "active"
//                                     ? "bg-green-100 text-green-800"
//                                     : "bg-red-100 text-red-800"
//                                 }`}
//                               >
//                                 Welfare: {member.welfare}
//                               </span>
//                               <div className="mt-1">
//                                 <span
//                                   className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                                     member.membershipdeus === "active"
//                                       ? "bg-green-100 text-green-800"
//                                       : "bg-red-100 text-red-800"
//                                   }`}
//                                 >
//                                   Dues: {member.membershipdeus}
//                                 </span>
//                               </div>
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                               <div className="flex items-center">
//                                 <Users className="h-4 w-4 text-gray-500 mr-1" />
//                                 <span className="text-sm font-medium text-gray-900">
//                                   {member.familyMembers?.length || 0} members
//                                 </span>
//                               </div>
//                               {member.familyMembers &&
//                                 member.familyMembers.length > 0 && (
//                                   <button
//                                     onClick={() =>
//                                       toggleFamilyDetails(member.memberId)
//                                     }
//                                     className="mt-1 text-xs text-blue-600 hover:text-blue-800"
//                                   >
//                                     {showFamilyDetails === member.memberId
//                                       ? "Hide details"
//                                       : "Show details"}
//                                   </button>
//                                 )}
//                             </td>
//                             <td className="px-6 py-4 text-sm text-gray-500">
//                               <div className="mb-1">{member.whatsappId}</div>
//                             </td>
//                             <td className="px-6 py-4 text-sm text-gray-500">
//                               <div className="text-sm text-gray-900">
//                                 {member.profession}
//                               </div>
//                             </td>
//                           </tr>
//                           {showFamilyDetails === member.memberId &&
//                             member.familyMembers &&
//                             member.familyMembers.length > 0 && (
//                               <tr>
//                                 <td
//                                   colSpan={6}
//                                   className="px-6 py-4 bg-gray-100"
//                                 >
//                                   <div className="text-sm font-medium text-gray-900 mb-2">
//                                     Family Members:
//                                   </div>
//                                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                     {member.familyMembers.map(
//                                       (familyMember, idx) => (
//                                         <div
//                                           key={idx}
//                                           className="bg-white p-3 rounded-lg shadow-sm border border-gray-200"
//                                         >
//                                           <div className="font-medium text-gray-900">
//                                             {familyMember.title}{" "}
//                                             {familyMember.firstName}{" "}
//                                             {familyMember.lastName}
//                                           </div>
//                                           <div className="text-sm text-gray-600">
//                                             Relationship:{" "}
//                                             {familyMember.relationship}
//                                           </div>

//                                           <div className="text-sm text-gray-500 mt-1">
//                                             Contact: {familyMember.whatsappId}
//                                           </div>
//                                         </div>
//                                       )
//                                     )}
//                                   </div>
//                                 </td>
//                               </tr>
//                             )}
//                         </>
//                       );
//                     })
//                   ) : (
//                     <tr>
//                       <td
//                         colSpan={6}
//                         className="px-6 py-4 text-center text-sm text-gray-500"
//                       >
//                         No members found matching your search criteria
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           {/* Pagination */}
//           {!loading && (
//             <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
//               <div className="flex-1 flex justify-between sm:hidden">
//                 <button
//                   onClick={prevPage}
//                   disabled={currentPage === 1}
//                   className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
//                     currentPage === 1
//                       ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                       : "bg-white text-gray-700 hover:bg-gray-50"
//                   }`}
//                 >
//                   Previous
//                 </button>
//                 <button
//                   onClick={nextPage}
//                   disabled={currentPage === totalPages || totalPages === 0}
//                   className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
//                     currentPage === totalPages || totalPages === 0
//                       ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                       : "bg-white text-gray-700 hover:bg-gray-50"
//                   }`}
//                 >
//                   Next
//                 </button>
//               </div>
//               <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
//                 <div>
//                   <p className="text-sm text-gray-700">
//                     Showing{" "}
//                     <span className="font-medium">
//                       {filteredMembers.length > 0 ? indexOfFirstItem + 1 : 0}
//                     </span>{" "}
//                     to{" "}
//                     <span className="font-medium">
//                       {Math.min(indexOfLastItem, filteredMembers.length)}
//                     </span>{" "}
//                     of{" "}
//                     <span className="font-medium">
//                       {filteredMembers.length}
//                     </span>{" "}
//                     results
//                   </p>
//                 </div>
//                 <div>
//                   <nav
//                     className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
//                     aria-label="Pagination"
//                   >
//                     <button
//                       onClick={prevPage}
//                       disabled={currentPage === 1}
//                       className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
//                         currentPage === 1
//                           ? "text-gray-300 cursor-not-allowed"
//                           : "text-gray-500 hover:bg-gray-50"
//                       }`}
//                     >
//                       <span className="sr-only">Previous</span>
//                       <ChevronLeft className="h-5 w-5" />
//                     </button>

//                     {/* Page Numbers */}
//                     {[...Array(totalPages)].map((_, index) => (
//                       <button
//                         key={index}
//                         onClick={() => paginate(index + 1)}
//                         className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
//                           currentPage === index + 1
//                             ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
//                             : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
//                         }`}
//                       >
//                         {index + 1}
//                       </button>
//                     ))}

//                     <button
//                       onClick={nextPage}
//                       disabled={currentPage === totalPages || totalPages === 0}
//                       className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
//                         currentPage === totalPages || totalPages === 0
//                           ? "text-gray-300 cursor-not-allowed"
//                           : "text-gray-500 hover:bg-gray-50"
//                       }`}
//                     >
//                       <span className="sr-only">Next</span>
//                       <ChevronRight className="h-5 w-5" />
//                     </button>
//                   </nav>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MembersRegister;

import React, { useState, useEffect } from "react";
import { Search, ChevronLeft, ChevronRight, Filter, Users } from "lucide-react";
// import avatar from "../../assets/avatar_default.png";
import avatar from "../../../assets/avatar_default.png";
import { Oval } from "react-loader-spinner";

// Define WelfareDues and MembershipDues interfaces
interface WelfareDue {
  _id: string;
  amount?: number;
  startDate?: Date;
  expiryDate?: Date;
  year?: number;
  status?: string;
  isWelfareDuePaid?: boolean;
  paymentMethod?: string;
  paymentReference?: string;
  paymentDate?: Date;
  channel?: string;
  account_name?: string;
  bank?: string;
}

interface MembershipDue {
  _id: string;
  membershipType?: string;
  amount?: number;
  startDate?: Date;
  expiryDate?: Date;
  year?: number;
  status?: string;
  isMemberShipDuePaid?: boolean;
  paymentMethod?: string;
  paymentReference?: string;
  paymentDate?: Date;
  channel?: string;
  account_name?: string;
  bank?: string;
}

// Define FamilyMember interface
interface FamilyMember {
  firstName: string;
  lastName: string;
  title: string;
  relationship: string;
  dateOfBirth: Date;
  whatsappId: string;
}

// Define Member interface matching backend response
interface Member {
  _id: string;
  fullName: string;
  email: string;
  whatsappId: string;
  image: string;
  title: string;
  gender: string;
  bloodgroup: string;
  dateOfBirth: Date;
  location: string;
  address: string;
  aboutUser: string;
  social: Record<string, string>;
  interests: string[];
  profession: string;
  membershipType: string;
  isHonouraryMember: boolean;
  memberId: string;
  dateOfEntry: Date;

  emergencyContactInIndia: string;
  districtInIndia: string;
  statesInIndia: string;
  addressInIndia: string;

  familyInLagos: boolean;
  familyMembers: FamilyMember[];

  role: string;
  isVerified: boolean;
  isOnboarded: boolean;
  createdAt: Date;
  updatedAt: Date;

  currentWelfare: WelfareDue | null;
  currentMembership: MembershipDue | null;

  welfareHistory: WelfareDue[];
  membershipHistory: MembershipDue[];
}

const API_URL = process.env.REACT_APP_CLIENT_URL;
// Years for filtering
const availableYears = [2017, 2022, 2023, 2024, 2025];

const MembersRegister = () => {
  // Initialize with empty array instead of undefined
  const [members, setMembers] = useState<Member[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [showFamilyDetails, setShowFamilyDetails] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  console.log(members);
  const getAllUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${API_URL}/api/v1/secure/records/member-register`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!res.ok) {
        throw new Error("Error fetching data");
      }

      const { users } = await res.json();
      setMembers(users); // users now match the new Member interface
      setFilteredMembers(users);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initData = async () => {
      await getAllUsers();
    };

    initData();
  }, []);

  // Calculate how many years the member is in Nigeria
  const yearsInNigeria = (dateOfEntry: Date | undefined) => {
    if (!dateOfEntry) return 0;
    const thisYear = new Date().getFullYear();
    const yearOfEntry = new Date(`${dateOfEntry}`).getFullYear();
    const yearsInNigeria = thisYear - yearOfEntry;
    return yearsInNigeria;
  };

  const itemsPerPage = 20;

  // Filter members based on search term and selected year
  useEffect(() => {
    // Start with a copy of members, not a reference
    let result = [...members];

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result =
        result.filter(
          (member) =>
            member.location?.toLowerCase().includes(term) ||
            member.fullName?.toLowerCase().includes(term) ||
            member.memberId?.toLowerCase().includes(term) ||
            member.membershipType?.toLowerCase().includes(term) ||
            member.title?.toLowerCase().includes(term)
        ) || [];
    }

    // Filter by year
    // if (selectedYear) {
    //   result = result.filter((member) => member.year === selectedYear);
    // }

    setFilteredMembers(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, selectedYear, members]);

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMembers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);

  // Handle page change
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Go to next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Go to previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Toggle family details
  const toggleFamilyDetails = (memberId: string) => {
    if (showFamilyDetails === memberId) {
      setShowFamilyDetails(null);
    } else {
      setShowFamilyDetails(memberId);
    }
  };

  // EXPORTING LOGIC

  const handleDownload = async () => {
    try {
      //  Fetch the Cloudinary URL from the backend
      const response = await fetch(`${API_URL}/api/v1/secure/records/download`);
      const data = await response.json();

      if (data.fileUrl) {
        //  Trigger download using the Cloudinary URL
        const link = document.createElement("a");
        link.href = data.fileUrl;
        link.download = "data.csv"; // Specify the filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        alert("Failed to retrieve file URL.");
      }
    } catch (error) {
      console.error("Error downloading file:", error);
      alert("An error occurred while downloading the file.");
    }
  };
  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Members Information
          </h1>
          <button
            onClick={handleDownload}
            className="bg-green-700 font-bold text-white text-base px-3 text-center rounded-md h-8"
          >
            Export CSV
          </button>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by email, name or member ID"
                className="pl-10 pr-3 py-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Year Filter */}
            {/* <div className="flex items-center">
              <Filter className="h-5 w-5 text-gray-500 mr-2" />
              <select
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                value={selectedYear || ""}
                onChange={(e) =>
                  setSelectedYear(
                    e.target.value ? parseInt(e.target.value) : null
                  )
                }
              >
                <option value="">All Years</option>
                {availableYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div> */}
          </div>
        </div>

        {/* Members Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-500">
              Loading members...
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Member
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Location
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Family
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Contact Details
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Profession
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems.map((member, index) => (
                    <React.Fragment key={member._id}>
                      <tr
                        className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={member.image || avatar}
                                alt={member.fullName}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {member.title} {member.fullName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {member.memberId} -{" "}
                                {member.dateOfEntry
                                  ? `${
                                      new Date().getFullYear() -
                                      new Date(member.dateOfEntry).getFullYear()
                                    } yrs in NG`
                                  : "N/A"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-500">
                            {member.location}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {/* Welfare Status */}
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              member.currentWelfare?.status === "active"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            Welfare:{"  "}
                            {member.currentWelfare?.status ||
                              "Requires payment"}
                          </span>

                          {/* Membership Status */}
                          <div className="mt-1">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                member.currentMembership?.status === "active" ||
                                member.isHonouraryMember
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              Dues:{"  "}
                              {/* {member.currentMembership?.membershipType ||
                                "Requires payment"} */}
                              {loading ? (
                                <Oval width={12} height={12} />
                              ) : member.isHonouraryMember ? (
                                "Honorary Member"
                              ) : member.currentMembership?.status ===
                                "active" ? (
                                member.currentMembership?.membershipType
                              ) : (
                                " Requires Payment"
                              )}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 text-gray-500 mr-1" />
                            <span className="text-sm font-medium text-gray-900">
                              {member.familyMembers?.length || 0} members
                            </span>
                          </div>
                          {member.familyMembers &&
                            member.familyMembers.length > 0 && (
                              <button
                                onClick={() => toggleFamilyDetails(member._id)}
                                className="mt-1 text-xs text-blue-600 hover:text-blue-800"
                              >
                                {showFamilyDetails === member._id
                                  ? "Hide details"
                                  : "Show details"}
                              </button>
                            )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {member.whatsappId || "N/A"}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {member.profession || "N/A"}
                        </td>
                      </tr>

                      {/* Conditional Family Details Row */}
                      {showFamilyDetails === member._id &&
                        member.familyMembers &&
                        member.familyMembers.length > 0 && (
                          <tr>
                            <td colSpan={6} className="px-6 py-4 bg-gray-100">
                              <div className="text-sm font-medium text-gray-900 mb-2">
                                Family Members:
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {member.familyMembers.map(
                                  (familyMember, idx) => (
                                    <div
                                      key={idx}
                                      className="bg-white p-3 rounded-lg shadow-sm border border-gray-200"
                                    >
                                      <div className="font-medium text-gray-900">
                                        {familyMember.title}{" "}
                                        {familyMember.firstName}{" "}
                                        {familyMember.lastName}
                                      </div>
                                      <div className="text-sm text-gray-600">
                                        Relationship:{" "}
                                        {familyMember.relationship}
                                      </div>
                                      <div className="text-sm text-gray-500 mt-1">
                                        Contact: {familyMember.whatsappId}
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            </td>
                          </tr>
                        )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {/* Pagination */}
          {!loading && (
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <div className="text-sm text-gray-700">
                  Showing{" "}
                  {filteredMembers.length > 0 ? indexOfFirstItem + 1 : 0} to{" "}
                  {Math.min(indexOfLastItem, filteredMembers.length)} of{" "}
                  {filteredMembers.length} results
                </div>
                <div>
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                      currentPage === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Previous
                  </button>
                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                      currentPage === totalPages || totalPages === 0
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing{" "}
                    <span className="font-medium">
                      {filteredMembers.length > 0 ? indexOfFirstItem + 1 : 0}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium">
                      {Math.min(indexOfLastItem, filteredMembers.length)}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium">
                      {filteredMembers.length}
                    </span>{" "}
                    results
                  </p>
                </div>
                <div>
                  <nav
                    className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                    aria-label="Pagination"
                  >
                    <button
                      onClick={prevPage}
                      disabled={currentPage === 1}
                      className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                        currentPage === 1
                          ? "text-gray-300 cursor-not-allowed"
                          : "text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      <span className="sr-only">Previous</span>
                      <ChevronLeft className="h-5 w-5" />
                    </button>

                    <button
                      onClick={nextPage}
                      disabled={currentPage === totalPages || totalPages === 0}
                      className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                        currentPage === totalPages || totalPages === 0
                          ? "text-gray-300 cursor-not-allowed"
                          : "text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      <span className="sr-only">Next</span>
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MembersRegister;
