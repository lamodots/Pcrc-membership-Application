import { useEffect, useState } from "react";
import verifyGif from "../../assets/verification-done.gif";
import { Link, useLocation } from "react-router-dom";

const API_URL = process.env.REACT_APP_CLIENT_URL;

function EmailVerifcation() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false); // Start with false to avoid premature success message

  // Keep these hooks inside the component
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const email = queryParams.get("email");

  useEffect(() => {
    // Ensure both token and email exist before making the API call
    if (!token || !email) {
      // Changed to "||" to check if either is missing
      setError("Seems you already verified, try logging in");
      return;
    }

    async function verify() {
      try {
        const res = await fetch(`${API_URL}/api/v1/users/auth/verify`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            email,
          }),
          credentials: "include",
        });

        const data = await res.json();

        if (!res.ok) {
          // Set error if verification fails
          setError(data.message || "Seems you Already verified.");
          setSuccess(false);
        } else {
          // Set success if verification is successful
          setError(null);
          setSuccess(true);
        }
      } catch (err) {
        // Handle any network or unexpected errors
        console.error("Error verifying email:", err);
        setError("An unexpected error occurred. Please try again.");
        setSuccess(false);
      }
    }

    // Call the verify function
    verify();
  }, [token, email]);

  return (
    <div className="flex justify-center items-center w-full h-screen bg-white">
      {error && <p className="text-center text-2xl text-red-500">{error}</p>}

      {!success && !error && (
        <div className="text-center">
          <p className="text-xl">Verifying your email...</p>
        </div>
      )}

      {success && (
        <div className="w-full md:w-[40%]">
          <h2 className="text-center text-2xl">Email Verified!</h2>
          <img
            src={verifyGif}
            alt="Verification complete"
            className="block w-full"
          />
          <div className="space-y-4">
            <div className="text-center">
              <Link
                to="https://www.ksn.membersng.com/login"
                className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
              >
                You Can Login Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmailVerifcation;
