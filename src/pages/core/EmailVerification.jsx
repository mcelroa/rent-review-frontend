import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; // Import Link
import { API_BASE_URL } from "../../config";

const EmailVerification = () => {
  const { userId } = useParams();
  const [message, setMessage] = useState("");
  const [isVerified, setIsVerified] = useState(false); // Track if verification was successful

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    const verifyEmail = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/verify-email/${userId}`, {
          signal,
        });
        const data = await response.json();
        setMessage(data.message);

        if (response.ok) {
          setIsVerified(true); // Mark verification as successful
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          setMessage("Verification failed. Please try again.");
        }
      }
    };

    if (userId) {
      verifyEmail();
    }

    return () => {
      abortController.abort();
    };
  }, [userId]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
        <div className="flex flex-col items-center">
          <svg
            className="mb-4 h-16 w-16 text-green-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
          <h1 className="text-2xl font-semibold text-gray-800">{message}</h1>
          {isVerified && (
            <p className="mt-4 text-gray-600">
              Your email has been successfully verified!
            </p>
          )}
          {isVerified && (
            <Link
              to="/signin"
              className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition duration-300 hover:bg-blue-700"
            >
              Log in to your account
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
