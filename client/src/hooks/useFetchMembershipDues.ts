import { useState, useEffect } from "react";

// Define interfaces for the API response structure
interface MembershipDue {
  _id: string;
  membershipType: string;
  status: string;
}

interface WelfareDue {
  _id: string;
  membershipType?: string;
  status: string;
}

interface MembershipDuesData {
  membershipDues: MembershipDue[];
  welfareDues: WelfareDue[];
}

interface ApiResponse {
  success: boolean;
  data: MembershipDuesData;
  message?: string;
}

interface HookReturn {
  loading: boolean;
  error: string | null;
  membershipDues: MembershipDuesData | null;
}

const API_URL = process.env.REACT_APP_CLIENT_URL;
/**
 * Custom hook to fetch membership dues for a specific member
 * @param memberId - The ID of the member to fetch dues for
 * @returns An object containing the loading state, error state, and membership dues data
 */
const useFetchMembershipDues = (memberId: string | null): HookReturn => {
  console.log(memberId);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [membershipDues, setMembershipDues] =
    useState<MembershipDuesData | null>(null);

  useEffect(() => {
    // Reset states when member ID changes
    setLoading(true);
    setError(null);
    setMembershipDues(null);

    // Don't fetch if no member ID is provided
    if (!memberId) {
      setLoading(false);
      return;
    }

    const fetchMembershipDues = async (): Promise<void> => {
      try {
        const response = await fetch(
          `${API_URL}/api/v1/users/membershipdues/${memberId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: ApiResponse = await response.json();

        if (data.success) {
          console.log("DUES DATA", data.data);
          setMembershipDues(data.data);
        } else {
          throw new Error(data.message || "Failed to fetch membership dues");
        }
      } catch (err) {
        console.error("Error fetching membership dues:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch membership dues"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMembershipDues();
  }, [memberId]);

  return { loading, error, membershipDues };
};

export default useFetchMembershipDues;
