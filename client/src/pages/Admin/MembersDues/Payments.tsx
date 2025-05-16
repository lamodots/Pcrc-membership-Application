import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { monthdayyearFormater } from "../../../util/monthdayyearFormater";

const API_URL = process.env.REACT_APP_CLIENT_URL;

// Define interfaces for the transaction data
interface Metadata {
  userId: string;
  paymentType: string;
  paymentMethod: string;
}

interface Customer {
  id: number;
  first_name: string | null;
  last_name: string | null;
  email: string;
  phone: string | null;
  metadata: any | null;
  customer_code: string;
  risk_action: string;
}

interface PaymentData {
  id: number;
  status: string;
  reference: string;
  amount: number;
  metadata: Metadata;
  customer: Customer;
  paid_at: string;
}

function Payments() {
  // Ensure transactions is always an array of PaymentData
  const [transactions, setTransactions] = useState<PaymentData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of transactions per page

  // Fetch transactions from the API
  async function fetchPaystackPayments() {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `${API_URL}/api/v1/users/membershipdues/paystack-transactions`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }
      const data = await response.json();
      // Ensure the data is an array (default to [] if not)
      setTransactions(Array.isArray(data.transact) ? data.transact : []);
    } catch (error: any) {
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  // Calculate paginated transactions
  const indexOfLastTransaction = currentPage * itemsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - itemsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  // Handle page change
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Fetch transactions on component mount
  useEffect(() => {
    fetchPaystackPayments();
  }, []);

  console.log("PAYSTACK TRANSACTIONS", transactions);
  return (
    <div>
      <h1 className="text-2xl text-zinc-800 font-medium mb-6">
        All Paystack Transactions
      </h1>
      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center">
          <Oval color="#00BFFF" height={50} width={50} />
        </div>
      )}

      {/* Error Message */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Table */}
      {!loading && !error && (
        <>
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">ID</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Reference</th>
                <th className="border p-2">Amount</th>
                <th className="border p-2">Full Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Payment Type</th>
                <th className="border p-2">Paid At</th>
              </tr>
            </thead>
            <tbody>
              {currentTransactions.length > 0 ? (
                currentTransactions.map((transaction: PaymentData) => {
                  // Construct full name
                  const fullName =
                    `${transaction.customer.first_name || ""} ${
                      transaction.customer.last_name || ""
                    }`.trim() || "N/A";

                  return (
                    <tr key={transaction.id} className="hover:bg-gray-100">
                      <td className="border p-2">{transaction.id}</td>
                      <td className="border p-2">{transaction.status}</td>
                      <td className="border p-2">{transaction.reference}</td>
                      <td className="border p-2">{transaction.amount}</td>
                      <td className="border p-2">{fullName}</td>
                      <td className="border p-2">
                        {transaction.customer.email}
                      </td>
                      <td className="border p-2">
                        {transaction?.metadata?.paymentType}
                      </td>
                      <td className="border p-2">
                        {monthdayyearFormater(transaction.paid_at)}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="text-center p-4">
                    No transactions available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4">
            {Array.from({
              length: Math.ceil(transactions.length / itemsPerPage),
            }).map((_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`px-4 py-2 mx-1 rounded ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Payments;
