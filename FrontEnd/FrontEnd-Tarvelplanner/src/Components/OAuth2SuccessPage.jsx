import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuth2SuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const userId = urlParams.get("userId");
    const username = urlParams.get("username");

    if (token) {
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("username", username);
      alert("Login successful");
      navigate("/");
      window.location.reload(); // Refresh for new state
    } else {
    //   alert("Google login failed. Please try again!");
      navigate("/login");
    }
  }, [navigate]);

  return <div className="flex justify-center items-center h-screen text-lg"></div>;
};

export default OAuth2SuccessPage;
