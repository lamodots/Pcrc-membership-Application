import { Phone, PhoneCall, PhoneCallIcon } from "lucide-react";
import React, { useState } from "react";
import Lable from "../../components/Lable/Lable";
import Button from "../../components/Button/Button";
import { resolve } from "path";
import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";

const areaSecretaries = [
  {
    id: 1,
    area: "Ikeja/Ikorodu/Ota",
    phoneNo: "07060960529",
  },
  {
    id: 2,
    area: "VI/Ikoyi",
    phoneNo: "08060960529",
  },
  {
    id: 3,
    area: "Ilupeju",
    phoneNo: "09060960529",
  },
  {
    id: 4,
    area: "Surulere/Apapa",
    phoneNo: "08060960521",
  },
];
function Subscription() {
  const [showManualPayment, setShowManualPayment] = useState(false);
  const [showManualPaymentOnline, setShowManualPaymentOnline] = useState(false);
  const [membershipType, setMembershipType] = useState("");
  const [isSubmittingMembershipPayment, setIsSubmittingMembershipPayment] =
    useState(false);
  const [isSubmittingWelfarePayment, setIsSubmittingWelfarePayment] =
    useState(false);
  const [error, setError] = useState({ valueError: "" });
  console.log(membershipType);
  console.log(error);

  const handleShowPaymentType = () => {
    setShowManualPayment(true);
    setShowManualPaymentOnline(false);
  };
  const handleShowPaymentOnline = () => {
    setShowManualPaymentOnline(true);
    setShowManualPayment(false);
  };

  const handleMmebershipPayment = async () => {
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
      await new Promise((resolve) => setTimeout(resolve, 1200));
      toast.success(`Payment for ${membershipType} sucessfull`);
    } catch (error) {
    } finally {
      setIsSubmittingMembershipPayment(false);
    }
  };
  // WELFARE PAYMENT
  const handleWelfareDuePayment = async () => {
    setIsSubmittingWelfarePayment(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      toast.success(`Payment for Welfare sucessfull`);
    } catch (error) {
    } finally {
      setIsSubmittingWelfarePayment(false);
    }
  };
  return (
    <div>
      Subscription
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
          <h3 className="text-lg font-bold">Pay to KSN Account</h3>
          <p className="mb-6">
            To pay your <strong>Membership Dues</strong> or {""}
            <strong>Welfare Dues</strong> kindly contact KSN secretary
          </p>

          {areaSecretaries &&
            areaSecretaries.map((areasec) => {
              return (
                <div key={areasec.id}>
                  <h3 className="mt-6 px-2 py-1 font-semibold  bg-green-50">
                    {areasec.area}
                  </h3>
                  <p className="mt-2 flex gap-2">
                    Call: <PhoneCallIcon /> {areasec.phoneNo}
                  </p>
                </div>
              );
            })}
        </div>
      )}
      {showManualPaymentOnline && (
        <div className="space-y-4">
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
                  <option className=" uppercase">Life membership</option>
                  <option className=" uppercase">Annual membership</option>
                </select>
                {/* <span className="text-sm text-red-400">
                {errors.password && touched.password && errors.password}
              </span> */}
              </div>

              {/* <Button
                handleClick={handleMmebershipPayment}
                text="Membership Dues"
                className="px-6 mt-10 md:mt-0 hover:bg-[#1a4f83ec] transition-colors text-slate-50"
              /> */}
              <Button
                handleClick={handleMmebershipPayment}
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

          <div className=" p-6 bg-white rounded-md shadow-sm transition-all max-w-[512px] mt-6">
            <h3 className="text-lg font-bold">
              <strong>Welfare Dues</strong>, Pay online
            </h3>
            <p className="mb-6">
              Pay for your membership fee online secure and fast
            </p>

            {/* <Button
              text="Welfare Dues"
              className="px-6  hover:bg-[#1a4f83ec] transition-colors text-slate-50"
            /> */}
            <Button
              handleClick={handleWelfareDuePayment}
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
        </div>
      )}
    </div>
  );
}

export default Subscription;
