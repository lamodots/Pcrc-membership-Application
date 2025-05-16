import React, { useState } from "react";
import Button from "../Button/Button";
import toast from "react-hot-toast";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import { resolve } from "path";

const API_URL = process.env.REACT_APP_CLIENT_URL;

function OfflinePaymentProcessing({
  userId,
  userEmail,
  first_name,
  last_name,
  onCloseModal,
}: any) {
  // State to manage form inputs

  const [paymentType, setPaymentType] = useState("");
  const [membershipType, setMembershipType] = useState("");
  const [amount, setAmount] = useState("");
  const [bank, setBank] = useState("");
  const [accountName, setAccountName] = useState("");
  const [channel, setChannel] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form submission
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setShowConfirmationModal(true);
    // Validate inputs
    if (!paymentType) {
      toast.error("Please select a payment type.");
      return;
    }

    if (paymentType === "membership" && !membershipType) {
      toast.error("Please select a membership type.");
      return;
    }

    // if (!amount || parseInt(amount) < 5000) {
    //   toast.error("Please enter a valid amount (minimum 5000).");
    //   return;
    // }
  };

  const handleConfirm = async () => {
    console.log(userId);
    setShowConfirmationModal(false);
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1600));

      // Prepare the data to be sent to the backend
      const paymentData = {
        userId,
        userEmail,
        first_name,
        last_name,
        paymentType,
        membershipType: paymentType === "membership" ? membershipType : null,
        amount: parseInt(amount, 10),
        bank,
        accountName,
        channel,
      };

      const res = await fetch(`${API_URL}/api/v1/secure/offline-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
        credentials: "include",
      });

      const { msg, message } = await res.json();
      if (!res.ok) {
        return toast.error(message);
      }

      toast.success(message);

      // Log the data (replace this with your API call)
      console.log("Payment Data:", paymentData);

      // Reset the form
      setPaymentType("");
      setMembershipType("");
      setAmount("");
      //   toast.success("Payment sucessfully added");

      // close OfflinePaymentProcessing modal
    } catch (error) {
    } finally {
      setIsSubmitting(false);
      onCloseModal(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* Payment Type Dropdown */}
      <div>
        <select
          value={paymentType}
          onChange={(e) => setPaymentType(e.target.value)}
          className="bg-white border border-gray-500 px-3 py-3 w-full rounded-md"
          required
        >
          <option value="">--Select payment Type--</option>
          <option value="membership">MEMBERSHIP DUES</option>
          <option value="welfare">WELFARE DUES</option>
        </select>

        {/* Membership Type Radio Buttons (Conditional Rendering) */}
        {paymentType === "membership" && (
          <div className="flex justify-evenly items-center mt-3">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                value="Annual membership"
                name="membershipType"
                checked={membershipType === "Annual membership"}
                onChange={(e) => setMembershipType(e.target.value)}
                className="w-6 h-6"
                required
              />
              <label>Annual membership</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                value="Life membership"
                name="membershipType"
                checked={membershipType === "Life membership"}
                onChange={(e) => setMembershipType(e.target.value)}
                className="w-6 h-6"
                required
              />
              <label>Life membership</label>
            </div>
          </div>
        )}
      </div>

      {/* Amount Input */}
      <div>
        <input
          type="number"
          // min={5000}
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="bg-white border border-gray-500 px-3 py-3 w-full rounded-md"
          required
        />
      </div>
      <div>
        <input
          type="text"
          name="bank"
          placeholder="Enter Bank member paid from"
          value={bank}
          onChange={(e) => setBank(e.target.value)}
          className="bg-white border border-gray-500 px-3 py-3 w-full rounded-md"
          required
        />
      </div>
      <div>
        <input
          type="text"
          name="accountName"
          placeholder="Enter payee name"
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
          className="bg-white border border-gray-500 px-3 py-3 w-full rounded-md"
          required
        />
      </div>
      <div>
        <select
          name="channel"
          value={channel}
          onChange={(e) => setChannel(e.target.value)}
          className="bg-white border border-gray-500 px-3 py-3 w-full rounded-md"
          required
        >
          <option>--Select payment channel</option>
          <option>Transfer</option>
          <option>Cash</option>
        </select>
      </div>

      {/* Submit Button */}
      <Button type="submit" text="Complete payment" className="w-full">
        {isSubmitting && "Submitting.."}
      </Button>
      {showConfirmationModal && (
        <ConfirmationModal
          onCancel={() => setShowConfirmationModal(false)}
          onConfirm={handleConfirm}
        />
      )}
    </form>
  );
}

export default OfflinePaymentProcessing;
