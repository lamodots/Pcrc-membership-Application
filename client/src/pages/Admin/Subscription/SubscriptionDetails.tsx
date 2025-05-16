import { ChevronLeft, Trash, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Paystack from "@paystack/inline-js";
import { Oval } from "react-loader-spinner";
import toast from "react-hot-toast";
import { useCurrentUser } from "../../../context/AdminContext";
import { CountdownTimer } from "../../../util/timer";
const API_URL = process.env.REACT_APP_CLIENT_URL;
const publicKey = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY || "";
console.log(process.env);
interface ValuesProps {
  _id: string;
  name: string;
  interval: string;
  amount: string;
  description: string;
}

function SubscriptionDetails() {
  const { currentUser } = useCurrentUser();
  const navigate = useNavigate();
  const { subId } = useParams();

  const [subscriptionData, setSubscription] = useState<ValuesProps>();
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [isDeleteting, setIsDeleteting] = useState(false);

  useEffect(() => {
    const getSubscriptions = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const res = await fetch(
          `${API_URL}/api/v1/secure/subscriptions/${subId}`
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const subscriptions = await res.json();

        setSubscription(subscriptions.subscription);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getSubscriptions();
  }, [subId]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSubscribeWithPaystack = async (
    subId: string | undefined,
    amount: string | undefined
  ) => {
    const popup = new Paystack();

    const handler = popup.newTransaction({
      key: publicKey,
      email: "system@gmail.com",
      amount: Number(subscriptionData?.amount) * 100,
      currency: "NGN",
      onSuccess: function (response: any) {
        fetch(`${API_URL}/api/v1/secure/subscriptions/verify-payment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            reference: response.reference,
            planId: subId,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            toast.success(data.message);
          })
          .catch((err) => {
            console.error(err);

            toast.error("An error occurred during payment verification.");
          });
        console.log({
          reference: response.reference,
          planId: subId,
        });
      },
      onCancel: function () {
        toast.error("Transaction was not completed.");
      },
    });
  };

  async function handleDelete(id: string | undefined) {
    setIsDeleteting(true);
    try {
      if (
        window.confirm("Are you sure you want to delete this subscription?")
      ) {
        const res = await fetch(
          `${API_URL}/api/v1/secure/subscriptions/${subId}`,
          {
            method: "DELETE",

            credentials: "include",
          }
        );

        if (!res.ok) {
          throw new Error(`Error Deleting subscription`);
        }

        // navigate(-1);

        navigate("/secure/subscription");
        toast.success("Subscription Deleted");
      } else {
        // User clicked "Cancel"
        console.log("Deletion cancelled by user.");
      }
    } catch (error) {
    } finally {
      setTimeout(() => {
        setIsDeleteting(false);
      }, 500);
    }
  }
  return (
    <div className="w-full">
      <header className="w-full">
        <button className="flex space-x-2 " onClick={handleBackClick}>
          {" "}
          <ChevronLeft />
          Back
        </button>
      </header>
      <main className="pt-10 w-full">
        {isLoading ? (
          <div className="flex  justify-center">
            <Oval height={40} width={40} />
          </div>
        ) : (
          <section className="bg-white shadow-sm p-6 rounded-lg w-full">
            <div className="top md:flex md:justify-between mt-8 ">
              <div className="left">
                <h1 className="text-2xl text-[#212529] font-bold capitalize">
                  {subscriptionData?.name}
                </h1>
                <div className="flex items-center gap-2 mt-2">
                  <p className="text-[#2067A9]">Subscription fee: </p>
                  <span className="bg-[#5BD3CF] rounded-lg px-2 py-1">
                    NGN {subscriptionData?.amount}
                  </span>
                </div>
              </div>
              <div className="right  items-center flex gap-10 mt-6 md:mt-0 ">
                <Link
                  to={`/secure/subscription/details/${subscriptionData?._id}/edit`}
                >
                  <span className="flex items-center cursor-pointer font-bold">
                    <Pencil /> Edit
                  </span>
                </Link>
                <button
                  className="flex items-center cursor-pointer text-red-300 px-2 py-1 rounded-lg font-medium"
                  onClick={() => handleDelete(subscriptionData?._id)}
                >
                  <Trash className="text-red-300" />
                  Delete
                </button>
              </div>
            </div>
            <div className="py-10">{subscriptionData?.description}</div>
            <div className="mt-6">
              {currentUser?.subscription ? (
                <div className="flex items-center gap-3">
                  <span className=" bg-green-400 text-xs px-3 py-2 rounded-lg">
                    Active
                  </span>
                  <CountdownTimer
                    startDate={currentUser.subscription.startDate}
                    expiryDate={currentUser.subscription.expiryDate}
                  />
                </div>
              ) : (
                <button
                  onClick={() =>
                    handleSubscribeWithPaystack(
                      `${subscriptionData?._id}`,
                      `${subscriptionData?.amount}`
                    )
                  }
                  className={` cursor-pointer px-9 rounded-lg h-14 flex justify-center items-center bg-[#1A4F83] text-center text-sm font-bold text-[#F4F6F7] `}
                >
                  Subscribe
                </button>
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default SubscriptionDetails;
