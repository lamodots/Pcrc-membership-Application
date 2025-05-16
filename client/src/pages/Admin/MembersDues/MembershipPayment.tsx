import React, { useEffect, useState } from "react";
import { monthdayyearFormater } from "../../../util/monthdayyearFormater";

const API_URL = process.env.REACT_APP_CLIENT_URL;

interface MembershipProps {
  _id: string;
  userId: string;
  full_name: string;
  amount: number;
  startDate: string;
  expiryDate: string;
  status: string;
  isMemberShipDuePaid: boolean;
  membershipType: string;
  paymentMethod: string;
  paymentReference: string;
  paymentDate: string;
  channel: string;
  account_name: null | string;
  bank: string;
  year: string;
}

function MembershipPayment() {
  const [membershipPayments, setMembershipPayments] = useState<
    MembershipProps[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    paymentMethod: "",
    membershipType: "",
    year: "",
    page: 1,
    limit: 10,
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalRecords: 0,
  });

  const fetchMembershipPayments = async () => {
    setLoading(true);
    setError(null);

    try {
      const query = new URLSearchParams({
        paymentMethod: filters.paymentMethod || "",
        membershipType: filters.membershipType || "",
        year: filters.year,
        page: filters.page.toString(),
        limit: filters.limit.toString(),
      }).toString();

      const response = await fetch(
        `${API_URL}/api/v1/users/membershipdues/membership-payments?${query}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // Validate the response structure
        if (!data?.data || !Array.isArray(data.data)) {
          throw new Error("Invalid response structure from the server");
        }

        setMembershipPayments(data.data);
        setPagination({
          currentPage: data.pagination.currentPage,
          totalPages: data.pagination.totalPages,
          totalRecords: data.pagination.totalRecords,
        });
      } else {
        setError("Failed to fetch membership payments");
      }
    } catch (error: any) {
      setError(error.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembershipPayments();
  }, [filters]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      page: 1, // Reset to the first page when applying a filter
    }));
  };

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  // GET YEARS
  const yearArray: string[] = [];
  membershipPayments.map((p) => {
    console.log(p);
    if (p.year && !yearArray.includes(p.year)) {
      return yearArray.push(p.year);
    }
  });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="space-y-4 md:items-center md:flex md:justify-between mb-6">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <select
          name="paymentMethod"
          id="paymentMethod"
          onChange={handleFilterChange}
          value={filters.paymentMethod}
          className="px-3 h-12 outline-[#90BFE9] rounded-lg border border-[#515F69] bg-[#F4F6F7]"
        >
          <option value="">--Select Payment Method--</option>
          <option value="online">Paid online</option>
          <option value="offline">Paid to secretary</option>
        </select>
        <select
          name="membershipType"
          id="membershipType"
          onChange={handleFilterChange}
          value={filters.membershipType}
          className="px-3 h-12 outline-[#90BFE9]  rounded-lg border border-[#515F69] bg-[#F4F6F7]"
        >
          <option value="">--Select Membership Type--</option>
          <option value="Annual membership">Annual membership</option>
          <option value="Life membership">Life membership</option>
          <option value="Honorary">Honorary</option>
        </select>
        <select
          name="year"
          id="year"
          onChange={handleFilterChange}
          value={filters.year}
          className="px-3 h-12 outline-[#90BFE9] w-36 rounded-lg border border-[#515F69] bg-[#F4F6F7]"
        >
          <option value="">--Filter By Year--</option>

          {yearArray.map((yr, i) => (
            <option key={i} value={yr}>
              {yr}
            </option>
          ))}
        </select>
      </div>

      {/* Error or Loading State */}
      {error && <div className="text-red-500">{error}</div>}
      {loading && <div className="text-gray-500">Loading...</div>}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full  bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">ID</th>
              <th className="py-2 px-4 text-left">NAME</th>
              <th className="py-2 px-4 text-left">Amount</th>
              <th className="py-2 px-4 text-left">Start Date</th>
              <th className="py-2 px-4 text-left">Expiry Date</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Payment Method</th>
              <th className="py-2 px-4 text-left">Membership Type</th>
            </tr>
          </thead>
          <tbody>
            {membershipPayments.length > 0 ? (
              membershipPayments.map((payment) => (
                <tr
                  key={payment._id}
                  className="border-b text-sm hover:bg-gray-50"
                >
                  <td className="py-2 px-4">{payment.paymentReference}</td>
                  <td className="py-2 px-4">{payment.full_name}</td>
                  <td className="py-2 px-4">{payment.amount}</td>
                  <td className="py-2 px-4">
                    {monthdayyearFormater(payment.startDate)}
                  </td>
                  <td className="py-2 px-4">
                    {monthdayyearFormater(payment.expiryDate)}
                  </td>
                  <td
                    className={`py-2 px-4 capitalize ${
                      payment.status === "active" ? "text-green-600" : ""
                    }`}
                  >
                    {payment.status}
                  </td>
                  <td className="py-2 px-4 capitalize">
                    {payment.paymentMethod}
                  </td>
                  <td className="py-2 px-4">{payment.membershipType}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-4 text-center">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-gray-500">
          Showing {pagination.currentPage} of {pagination.totalPages} pages (
          {pagination.totalRecords} total records)
        </div>
        <div className="space-x-2">
          <button
            onClick={() => handlePageChange(filters.page - 1)}
            disabled={filters.page === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:bg-gray-100"
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(filters.page + 1)}
            disabled={filters.page === pagination.totalPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:bg-gray-100"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default MembershipPayment;
