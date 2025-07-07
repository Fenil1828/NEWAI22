import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const AuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check for a token in the URL (e.g., /auth/success?token=XYZ)
    const token = new URLSearchParams(window.location.search).get("token");
    if (token) {
      localStorage.setItem("TOKEN", token);
      // Optionally, do something with the token
      // Then navigate to login page
      navigate("/krupixi");
    } else {
      // If no token, stay or show error
      // Or redirect to login anyway
      navigate("/krupixi");
    }
  }, [navigate]);

  return <div>Authenticating...</div>;

};

export default AuthSuccess;
