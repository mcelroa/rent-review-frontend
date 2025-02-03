import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams hook

const EmailVerification = () => {
  const { userId } = useParams(); // Get userId from URL parameters
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(
          `https://rent-review-backend.onrender.com/api/verify-email/${userId}`,
        );
        const data = await response.json();
        setMessage(data.message);
      } catch (error) {
        setMessage("Verification failed. Please try again.");
      }
    };

    if (userId) {
      verifyEmail();
    }
  }, [userId]);

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
};

export default EmailVerification;
