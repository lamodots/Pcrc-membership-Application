import { useEffect, useMemo, useState } from "react";

interface WelfareProps {
  _id: string;
  userId: string;
  amount: number;
  startDate: string;
  expiryDate: string;
  status: string;
  isWelfareDuePaid?: boolean;
  paymentMethod: string;
  paymentReference: string;
  paymentDate: string;
  channel: string;
  account_name: null | string;
  bank: string;
}

interface MembershipProps extends WelfareProps {
  isMemberShipDuePaid?: boolean;
  membershipType?: string;
}
// Define the return type of the hook
interface WelfareHookReturn {
  welfare: WelfareProps[];
  loading: boolean;
  error: string | null;
}

// The return hook by membershippayment
interface MembershipHookReturn {
  membershipDues: MembershipProps[];
  loading: boolean;
  error: string | null;
}
const API_URL = process.env.REACT_APP_CLIENT_URL;

//API LAYER
const fetchAllWelfareDuesByMember = async (): Promise<WelfareProps[]> => {
  const response = await fetch(
    `${API_URL}/api/v1/users/membershipdues/welfare`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch welfare payments");
  }
  const { userWelfareDues } = await response.json();
  return userWelfareDues;
};
export function useWelfarePayemnt(): WelfareHookReturn {
  const [welfare, setWelfare] = useState<WelfareProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null); // Reset error state before fetching
        const welfareData = await fetchAllWelfareDuesByMember();
        setWelfare(welfareData);
      } catch (error: any) {
        setError(error.message || "An unexpected error occurred");
      } finally {
        setLoading(false); // Ensure loading state is reset
      }
    };
    fetchData();
  }, []);
  return { welfare, loading, error };
}

// fetch membership data
const fetchAllMemebershipDuesByMember = async (): Promise<
  MembershipProps[]
> => {
  const response = await fetch(
    `${API_URL}/api/v1/users/membershipdues/membership-dues`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch welfare payments");
  }

  const { userMembershipDues } = await response.json();
  return userMembershipDues;
};

export function useMembershipPayemnt(): MembershipHookReturn {
  const [membershipDues, setMembershipDues] = useState<MembershipProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  console.log(membershipDues);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const membershipdues = await fetchAllMemebershipDuesByMember();
        setMembershipDues(membershipdues);
      } catch (error: any) {
        setError(error.message || "An unexpected error occured");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { membershipDues, loading, error };
}

export const useMembershipActive = () => {
  const { membershipDues } = useMembershipPayemnt();
  //Used useMemo to memoize the result of the .find() method. This ensures that the computation only
  // happens when the welfare array changes, reducing unnecessary recalculations.
  const membershipItem = useMemo(() => {
    return membershipDues.find((item) => item.status === "active");
  }, [membershipDues]);

  return [membershipItem];
};
export const useWelfareActive = () => {
  const { welfare } = useWelfarePayemnt();
  //Used useMemo to memoize the result of the .find() method. This ensures that the computation only
  // happens when the welfare array changes, reducing unnecessary recalculations.
  const welfareItem = useMemo(() => {
    return welfare.find((item) => item.status === "active");
  }, [welfare]);

  console.log(welfareItem);
  return [welfareItem];
};
