import { PhoneCallIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Lable from "../../components/Lable/Lable";
import Button from "../../components/Button/Button";

import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";

import { useCurrentUser } from "../../context/AdminContext";
import PaystackPop from "@paystack/inline-js";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useFetchAppData from "../../hooks/useFetchAppData";
import {
  useMembershipActive,
  useWelfareActive,
} from "../../hooks/useFetchPayment";

const API_URL = process.env.REACT_APP_CLIENT_URL;

interface PaymentProps {
  amount: number;
  userId: string;
  email: string;
  paymentType: string;
}

function Subscription() {
  const {
    currentUser,
    loading: currentUserLoading,
    fetchCurrentUser,
  } = useCurrentUser();
  console.log(currentUser?.user.membershipType);
  const { appData, loading, error: settingError } = useFetchAppData();
  const [membershipItem] = useMembershipActive();
  const [welfareItem] = useWelfareActive();
  const [showManualPayment, setShowManualPayment] = useState(false);
  const [showManualPaymentOnline, setShowManualPaymentOnline] = useState(false);
  const [membershipType, setMembershipType] = useState("");
  const [isSubmittingMembershipPayment, setIsSubmittingMembershipPayment] =
    useState(false);
  const [isSubmittingWelfarePayment, setIsSubmittingWelfarePayment] =
    useState(false);
  const [error, setError] = useState({ valueError: "" });
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      fetchCurrentUser(); // Ensure currentUser is always fetched
    }
  }, [currentUser?.user, fetchCurrentUser]);
  const handleShowPaymentType = () => {
    setShowManualPayment(true);
    setShowManualPaymentOnline(false);
  };
  const handleShowPaymentOnline = () => {
    setShowManualPaymentOnline(true);
    setShowManualPayment(false);
  };

  // Check if membership payment should be shown
  const shouldShowMembershipPayment = () => {
    // Hide if membership is active or user has Honourary membership
    return !(
      membershipItem ||
      currentUser?.user.membershipType === "Honourary membership"
    );
  };

  // Check if welfare payment should be shown
  const shouldShowWelfarePayment = () => {
    // Hide if welfare is active
    return !welfareItem;
  };

  // MEMBERHSIP DUES ONLINE PAYMENT
  const handleMembershipPayment = async () => {
    if (
      membershipType === "--Select membership type--" ||
      membershipType === ""
    ) {
      return setError((prev) => ({
        ...prev,
        valueError: "Please select a membership type to proceed",
      }));
    }

    setIsSubmittingMembershipPayment(true);
    try {
      let amount = 0;

      if (membershipType === "Corporate membership") {
        amount = Number(appData?.lifetime_fee);
      } else if (membershipType === "Annual membership") {
        amount = Number(appData?.annual_fee);
      }

      // Update payment status in the backend
      const res = await fetch(`${API_URL}/api/v1/secure/payments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: currentUser?.user._id,
          email: currentUser?.user.email,
          membershipType,
          amount,
          first_name: currentUser?.user.firstname,
          last_name: currentUser?.user.lastname,
        }),
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        const popup = new PaystackPop();
        popup.resumeTransaction(data.access_code);

        // navigate("/subscription/dues");
        toast.success(`Payment for ${membershipType} successful`);
      } else {
        const errorData = await res.json();
        toast.error(errorData.msg || "Failed to update payment status");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmittingMembershipPayment(false);
    }
  };

  /**ONLINE WELFARE PAYMENT */
  const handleWelfarePayment = async () => {
    setIsSubmittingWelfarePayment(true);
    try {
      const amount = Number(appData?.welfare_fee); // Welfare dues

      const res = await fetch(`${API_URL}/api/v1/secure/payments/welfare`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: currentUser?.user.email,
          amount,
          userId: currentUser?.user._id,
          first_name: currentUser?.user.firstname,
          last_name: currentUser?.user.lastname,
        }),
      });

      if (res.ok) {
        const data = await res.json();

        const popup = new PaystackPop();
        popup.resumeTransaction(data.access_code);

        // navigate("/subscription/dues");
      } else {
        const errorData = await res.json();
        toast.error(errorData.msg || "Failed to update payment status");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmittingWelfarePayment(false);
    }
  };

  if (currentUserLoading || currentUser?.user == undefined) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <nav>
        <NavLink
          className="font-medium bg-[#A6B4BA] px-6 py-2 rounded-md"
          to="/subscription/dues"
        >
          Paid Dues
        </NavLink>
      </nav>
      <h1 className="text-2xl mt-8">Make your payments</h1>
      <div className="md:space-x-6 mt-6">
        <button
          onClick={handleShowPaymentType}
          className="bg-white px-6 py-6 text-sm font-bold  border-2  rounded-md w-1/2 md:w-[25.5%]"
        >
          Pay to secretary
        </button>

        <button
          onClick={handleShowPaymentOnline}
          className="bg-white font-bold  px-6 py-6 text-sm  border-2 rounded-md w-1/2 md:w-[25.5%]"
        >
          Pay online
        </button>
      </div>
      {showManualPayment && (
        <div className=" p-6 bg-white rounded-md shadow-sm transition-all max-w-[512px] mt-6">
          <h3 className="text-lg font-bold">
            Pay to {appData?.appname_acronym} Account
          </h3>
          <p className="mb-6">
            To pay your <strong>Membership Dues</strong> or {""}
            <strong>ID Card Dues</strong> kindly contact your{" "}
            {appData?.appname_acronym} Zonal Chairman
          </p>

          {appData &&
            appData.secretaries.map((areasec) => {
              return (
                <div key={areasec.phone}>
                  <h3 className="mt-6 px-2 py-1 font-semibold  bg-green-50">
                    {areasec.area}
                  </h3>
                  <p className="mt-2 flex gap-2">
                    Call: {areasec.name} <PhoneCallIcon /> {areasec.phone}
                  </p>
                </div>
              );
            })}
        </div>
      )}

      {showManualPaymentOnline && (
        <div className="space-y-4">
          {shouldShowMembershipPayment() && (
            <div className=" p-6 bg-white rounded-md shadow-sm transition-all max-w-[512px] mt-6">
              <h3 className="text-lg font-bold">
                <strong>Membership Dues</strong>, Pay online
              </h3>
              <p className="mb-6">
                Pay for your membership fee online secure and fast
              </p>
              <div className="  md:flex md:gap-6 md:items-end">
                <div className="password flex flex-col gap-2  flex-1">
                  <Lable label="Choose membership type" />
                  <select
                    value={membershipType}
                    onChange={(e) => {
                      setMembershipType(e.target.value);
                      //reset error when membership type chnages
                      setError((prev) => ({ ...prev, valueError: "" }));
                    }}
                    className="px-3 uppercase h-12 outline-[#90BFE9] rounded-lg border border-[#515F69] bg-[#F4F6F7] font-[#A6B4BA]"
                  >
                    <option className=" uppercase">
                      --Select membership type--
                    </option>
                    <option className=" uppercase">Corporate membership</option>
                    <option className=" uppercase">Annual membership</option>
                  </select>
                </div>

                <Button
                  handleClick={handleMembershipPayment}
                  text="Membership Dues"
                  className="px-6 mt-10 md:mt-0 hover:bg-[#1a4f83ec] flex-1 transition-colors text-slate-50"
                  isSubmitting={isSubmittingMembershipPayment}
                  disableBtn={isSubmittingMembershipPayment}
                >
                  {isSubmittingMembershipPayment && (
                    <>
                      <Oval
                        visible={true}
                        height="24"
                        width="24"
                        color="#4fa94d"
                        ariaLabel="oval-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                      />{" "}
                      <span className="ml-2 text-xs">Loading...</span>
                    </>
                  )}
                </Button>
              </div>
              {error.valueError && (
                <p className="text-red-400 text-sm mt-2">{error.valueError}</p>
              )}
            </div>
          )}

          {shouldShowWelfarePayment() && (
            <div className=" p-6 bg-white rounded-md shadow-sm transition-all max-w-[512px] mt-6">
              <h3 className="text-lg font-bold">
                <strong>ID Card Dues</strong>, Pay online
              </h3>
              <p className="mb-6">
                Pay for your membership fee online secure and fast
              </p>

              <Button
                handleClick={handleWelfarePayment}
                text="Welfare Dues"
                className="px-6 mt-10 md:mt-0 hover:bg-[#1a4f83ec] flex-1 transition-colors text-slate-50"
                isSubmitting={isSubmittingWelfarePayment}
                disableBtn={isSubmittingWelfarePayment}
              >
                {isSubmittingWelfarePayment && (
                  <>
                    <Oval
                      visible={true}
                      height="24"
                      width="24"
                      color="#4fa94d"
                      ariaLabel="oval-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />{" "}
                    <span className="ml-2 text-xs">Loading...</span>
                  </>
                )}
              </Button>
            </div>
          )}

          {!shouldShowMembershipPayment() && !shouldShowWelfarePayment() && (
            <div className="p-6 bg-white rounded-md shadow-sm transition-all max-w-[512px] mt-6">
              <h3 className="text-lg font-bold">All payments are up to date</h3>
              <p className="mb-6">
                You have no pending dues to pay at this time. Thank you for
                staying current with your payments.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Subscription;
