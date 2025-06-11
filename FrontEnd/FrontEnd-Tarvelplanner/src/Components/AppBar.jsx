import React, { useState } from "react";
import axios from "axios";
import { motion } from "motion/react";

import { Link } from "react-router-dom";

const AppBar = () => {
  const [signOpen, setSignOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [optOpen, setOtpOpen] = useState(false);
  const [flag, setFlag] = useState(false);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [sideBar, setSideBar] = useState(false);

  const [admin, setAdmin] = useState(false);

  // const navigate = useNavigate();

  const loginOverlay = () => {
    setLoginOpen(true);
    setSignOpen(false);
  };

  const signOverlay = () => {
    setLoginOpen(false);
    setSignOpen(true);
  };

  const closeLogin = () => {
    setLoginOpen(false);
    setSignOpen(false);
    setOtpOpen(false);
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8080/auth/send-otp",
        {
          email,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      setOtpOpen(true);
      alert("OTP sent to email");
    } catch (err) {
      alert(err);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8080/auth/verify-otp",
        {
          email,
          otp,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      setFlag(true);
    } catch (err) {
      alert("Wrong OTP", err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/auth/login", {
        email,
        password,
      });
      const token = res.data.token;
      const username = res.data.username;
      const userId = res.data.userId;

      localStorage.setItem("userId", userId);

      localStorage.setItem("username", username);

      localStorage.setItem("jwtToken", token);

      // console.log("User ID after login:", localStorage.getItem("userId"));

      alert("Login successful");
      closeLogin();
    } catch (err) {
      alert("Invalid credentials", err);
    }
  };

  const register = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/auth/register", {
        email,
        password,
        username,
      });
      signOverlay(false);
      loginOverlay(true);
    } catch (err) {
      alert("Something wrong", err);
    }
  };

  const handleAdmin = async (userId) => {
    try {
      const response = await axios.get("http://localhost:8080/auth/user-role", {
        params: { userId },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });
      
      // console.log(response.data);

      if (response.data.includes("ADMIN")) {
        // navigate("/admin");
        setAdmin(true);
      } else {
        // alert("You are not an admin!");
        setAdmin(false);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong while checking the role.");
    }
  };

  const googleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  return (
    <div>
      <div className="fixed w-full z-30 flex justify-between items-center p-4 bg-gradient-to-r from-green-200 via-green-300 to-green-400">
        <div className="text-3xl text-white font-bold">
          <span className="text-green-700">Travel</span>
          <span>-Planner</span>
        </div>
        <div>
          <ul className="flex gap-5 text-white font-medium">
            <Link to={"/"}>
              <button className="px-4 py-2 rounded-full hover:bg-green-600/60">
                Home
              </button>
            </Link>
            <button
              className="px-3 py-2 rounded-full hover:bg-green-600/60"
              onClick={() =>
                document
                  .getElementById("destination")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Destinations
            </button>
            <Link to={"/ticket"}>
              <button className="px-4 py-2 rounded-full hover:bg-green-600/60">
                Tickets
              </button>
            </Link>

            <button className="px-4 py-2 rounded-full hover:bg-green-600/60">
              Bookings
            </button>

            {localStorage.getItem("jwtToken") ? (
              <div className="relative ">
                <button
                  onClick={() => {
                    setSideBar(!sideBar);
                    handleAdmin(localStorage.getItem("userId"));
                  }}
                  className="w-10 h-10 rounded-full bg-green-700 text-white font-bold"
                >
                  {localStorage.getItem("username")?.charAt(0).toUpperCase() ||
                    "U"}
                </button>
                {sideBar && (
                  <motion.div
                    initial={{ opacity: 0, x: 5, y: -5 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute w-50 right-2 top-12 bg-white shadow-lg rounded z-50"
                  >
                    <Link to={"/myitineary"}>
                      <button className="block px-4 py-2 text-sm text-green-600 hover:bg-gray-100 w-full text-left rounded">
                        My Itineary
                      </button>
                    </Link>
                    {admin && (
                      <Link to={"/admin"}>
                        <button
                          className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-100 w-full text-left rounded"
                          // onClick={() =>
                          //   handleAdmin(localStorage.getItem("userId"))
                          // }
                        >
                          Admin
                        </button>
                      </Link>
                    )}

                    <button
                      onClick={() => {
                        localStorage.removeItem("jwtToken");
                        localStorage.removeItem("username");
                        window.location.href = "/";
                      }}
                      className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <button className="px-3 py-2" onClick={loginOverlay}>
                Login
              </button>
            )}
          </ul>
        </div>
      </div>

      {loginOpen && (
        <>
          <div className="h-screen w-screen flex justify-center items-center absolute ">
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="bg-green-300 rounded-xl flex justify-center "
            >
              <form className="flex flex-col gap-5 p-8 " onSubmit={handleLogin}>
                <input
                  type="email"
                  placeholder="Email"
                  className="bg-white rounded-full p-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  type="password"
                  placeholder="Password"
                  className="bg-white rounded-full p-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  onClick={handleLogin}
                  className="rounded-full p-3 bg-green-600/50"
                >
                  Login
                </button>

                <button
                  type="button"
                  className="rounded-full p-3 bg-blue-600/80 text-white"
                  onClick={googleLogin}
                >
                  Login with Google
                </button>
                <p>
                  Create a new Account?{" "}
                  <span
                    className="text-blue-700 cursor-pointer"
                    onClick={signOverlay}
                  >
                    Signup
                  </span>
                </p>
              </form>
              <p className="text-2xl cursor-pointer " onClick={closeLogin}>
                X
              </p>
            </motion.div>
          </div>
        </>
      )}

      {signOpen && (
        <>
          <div className="h-screen w-screen flex justify-center items-center absolute">
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className=" bg-green-300 rounded-xl flex justify-between"
            >
              <div className="flex flex-col gap-5 p-8 ">
                <input
                  type="email"
                  placeholder="Email"
                  className="bg-white rounded-full p-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                {!optOpen && (
                  <button
                    type="submit"
                    className="rounded-full p-3 bg-green-600/50"
                    onClick={handleSendOtp}
                  >
                    Send OTP
                  </button>
                )}

                {optOpen && (
                  <>
                    <input
                      type="text"
                      placeholder="Enter OTP"
                      className="bg-white rounded-full p-2"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />

                    <button
                      type="submit"
                      className="rounded-full p-3 bg-green-600/50"
                      onClick={handleVerifyOtp}
                    >
                      Verify OTP
                    </button>
                  </>
                )}
                {flag && (
                  <>
                    <form onSubmit={register} className="flex flex-col gap-5">
                      <input
                        required
                        type="text"
                        placeholder="Username"
                        className="bg-white rounded-full p-2"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      <input
                        required
                        type="password"
                        placeholder="Password"
                        className="bg-white rounded-full p-2"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button className="rounded-full p-3 bg-green-600/50">
                        SignUp
                      </button>
                    </form>
                  </>
                )}
                <p>
                  Already have an account?{" "}
                  <span
                    className="text-blue-700 cursor-pointer"
                    onClick={loginOverlay}
                  >
                    Login
                  </span>
                </p>
              </div>
              <p className="text-2xl cursor-pointer" onClick={closeLogin}>
                X
              </p>
            </motion.div>
          </div>
        </>
      )}
    </div>
  );
};

export default AppBar;
