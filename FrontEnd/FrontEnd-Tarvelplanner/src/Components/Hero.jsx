import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import Destination from "./Destination";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import About from "./About";
import AppBar from "./AppBar";
import Footer from "./Footer";

const Hero = () => {
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("jwtToken");

  const userId = localStorage.getItem("userId");

  const [openForm, setOpenForm] = useState(false);

  const [itinerary, setItinerary] = useState({
    username: username,
    userId: userId,
    title: "",
    startDate: "",
    endDate: "",
    destination: [],
    interests: [],
    notes: "",
    collaborators: [],
  });

  const handleForm = () => {
    if (token != null) {
      setOpenForm(!openForm);
    } else {
      alert("Login First...");
    }
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;

    if (["destination", "interests", "collaborators"].includes(name)) {
      setItinerary((prev) => ({
        ...prev,
        [name]: value.split(",").map((item) => item.trim()),
      }));
    } else {
      setItinerary((prev) => ({
        ...prev,
        [name]: value,
      }));
      // setStartDate(itinerary.startDate);
    }
  };

  const [result, setResult] = useState("");

  const [form, setForm] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    interests: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/generate-itinerary",
        form
      );
      const aiResponse = res.data;
      console.log("AI response:", res.data);

      setResult(aiResponse.choices[0].message.content);
      localStorage.setItem("result", result); 
    } catch (err) {
      console.error("API error:", err.response?.data || err.message);
      alert(
        "Something went wrong: " + (err.response?.data?.error || err.message)
      );
    }
  };

  const itinearyHandle = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8000/api/itineraries",
        itinerary
      );
      console.log(res.data);
      const uuid = res.data.id;
      localStorage.setItem("uuid", uuid);

      setItinerary({
        username: username,
        userId: userId,
        title: "",
        startDate: "",
        endDate: "",
        destination: [],
        interests: [],
        notes: "",
        collaborators: [],
      });

      alert("Itinerary created successfully!");
      setOpenForm(false);
    } catch (err) {
      alert(err);
    }
  };

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const formRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        openForm &&
        formRef.current &&
        !formRef.current.contains(event.target)
      ) {
        setOpenForm(false); 
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openForm]);

  return (
    <>
      <AppBar />
      <section id="hero">
        <img
          src=".\src\assets\background_visual-85f87405.svg"
          alt=""
          className="w-screen h-screen object-cover absolute -z-10 "
        />
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 100 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="h-screen w-full flex flex-col items-center justify-center gap-2"
        >
          <span className=" text-6xl font-bold  text-green-700/80 text-shadow-lg/20">
            Your next Adventure
          </span>
          <span className=" text-5xl font-bold  text-blue-950 text-shadow-lg/20">
            Starts Here..
          </span>
          <span className="text-2xl text-gray-900/50">
            Life’s too short to stay in one place-go explore, dream big, and
            wander freely.
          </span>
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 1.02 }}
            className="font-semibold  rounded-full p-4 m-4 bg-green-600/60 cursor-pointer"
            onClick={handleForm}
          >
            Get start Your Trip
          </motion.button>
          <div>
            {openForm && (
              <>
                <motion.div
                  ref={formRef}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                >
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      await handleSubmit(e);
                      await itinearyHandle(e);
                    }}
                    className="flex flex-col items-center"
                  >
                    <table className="border-separate border-spacing-8">
                      <tbody>
                        <tr>
                          <td>
                            <input
                              required
                              type="text"
                              name="destination"
                              placeholder="Where to go"
                              value={itinerary.destination.join(", ")}
                              onChange={(e) => {
                                onChangeInput(e);
                                handleChange(e);
                              }}
                              className="rounded-full p-2 bg-blue-300/50"
                            />
                          </td>
                          <td>
                            <label className="px-1 font-medium">
                              Starting Date :{" "}
                            </label>
                          </td>
                          <td>
                            <input
                              required
                              type="date"
                              name="startDate"
                              min={new Date().toISOString().split("T")[0]}
                              value={itinerary.startDate}
                              onChange={(e) => {
                                onChangeInput(e);
                                handleChange(e);
                              }}
                              className="rounded-full p-2 bg-blue-300/50 font-normal"
                            />
                          </td>
                          <td>
                            <input
                              required
                              type="text"
                              name="title"
                              placeholder="Title Of The Trip"
                              value={itinerary.title}
                              onChange={onChangeInput}
                              className="rounded-full p-2 bg-blue-300/50"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <input
                              type="text"
                              name="interests"
                              placeholder="Interests (optional)"
                              value={itinerary.interests.join(", ")}
                              onChange={(e) => {
                                onChangeInput(e);
                                handleChange(e);
                              }}
                              className="rounded-full p-2 bg-blue-300/50"
                            />
                          </td>
                          <td>
                            <label className="px-1 font-medium">
                              Ending Date :{" "}
                            </label>
                          </td>
                          <td>
                            <input
                              required
                              type="date"
                              name="endDate"
                              min={(() => {
                                const startDate = itinerary.startDate
                                  ? new Date(itinerary.startDate)
                                  : new Date();
                                return new Date(startDate.getTime() + 86400000)
                                  .toISOString()
                                  .split("T")[0];
                              })()}
                              value={itinerary.endDate}
                              onChange={(e) => {
                                onChangeInput(e);
                                handleChange(e);
                              }}
                              className="rounded-full p-2 bg-blue-300/50 font-normal"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name="notes"
                              placeholder="Any Notes"
                              value={itinerary.notes}
                              onChange={onChangeInput}
                              className="rounded-full p-2 bg-blue-300/50"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 1.02 }}
                      className="font-semibold  rounded-full p-2 bg-green-600/90 cursor-pointer"
                      type="submit"
                    >
                      Generate a Package
                    </motion.button>
                  </form>
                </motion.div>
              </>
            )}
          </div>
        </motion.div>
      </section>
      <div className="flex justify-center">
        {result && (
          <div className="mt-6 w-1/2 mx-10 whitespace-pre-wrap text-gray-800 bg-gray-100 p-4 rounded">
            {result}
          </div>
        )}
      </div>

      <About />
      <Destination />
      <Footer />
    </>
  );
};

export default Hero;
