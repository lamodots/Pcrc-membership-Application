import { useEffect, useState } from "react";
import SubscriptionCard from "../../../components/Admin-Components/SubScriptionCard/SubscriptionCard";
import { Link } from "react-router-dom";

import { Oval } from "react-loader-spinner";
const API_URL = process.env.REACT_APP_CLIENT_URL;

interface ValuesProps {
  _id: string;
  name: string;
  interval: string;
  amount: string;
  description: string;
}
function Subscription() {
  const [subscriptionData, setSubscription] = useState<null | []>([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);

  console.log(subscriptionData);
  useEffect(() => {
    const getAllSubscriptions = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const res = await fetch(`${API_URL}/api/v1/secure/subscriptions`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const { subscriptions } = await res.json();

        setSubscription(subscriptions);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getAllSubscriptions();
  }, []);

  // if (isLoading) {
  //   return <Oval />;
  // }
  return (
    <main>
      <h1 className="text-2xl text-[#212529] font-bold">Active Subscription</h1>
      <div className="active grid gap-6 grid-cols-2 md:grid-cols-4 mt-8">
        {isLoading && (
          <div className="flex  justify-center">
            <Oval height={40} width={40} />
          </div>
        )}

        {subscriptionData?.map((subscription: ValuesProps) => {
          console.log(subscription);
          return (
            <Link to={`/secure/subscription/details/${subscription._id}`}>
              <SubscriptionCard {...subscription} />
            </Link>
          );
        })}
        {subscriptionData?.length === 0 && !isLoading && (
          <p className="text-center">
            You dont have a subscription created yet
          </p>
        )}
      </div>
    </main>
  );
}

export default Subscription;
