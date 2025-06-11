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
    destinations: [],
    activities: [],
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

    if (["destinations", "activities", "collaborators"].includes(name)) {
      setItinerary((prev) => ({
        ...prev,
        [name]: value.split(",").map((item) => item.trim()),
      }));
    } else {
      setItinerary((prev) => ({
        ...prev,
        [name]: value,
      }));
      setStartDate(itinerary.startDate);
    }
  };

  const itinearyHandle = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8000/api/itineraries",
        itinerary
      );
      // console.log(res.data);
      const uuid = res.data.id;
      localStorage.setItem("uuid", uuid);

      setItinerary({
        username: username, // keep username
        userId: userId, // keep userId
        title: "",
        startDate: "",
        endDate: "",
        destinations: [],
        activities: [],
        notes: "",
        collaborators: [],
      });

      alert("Itinerary created successfully!");
      setOpenForm(false);
    } catch (err) {
      alert(err);
    }
  };

  const [startDate, setStartDate] = useState();

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const formRef = useRef();

  // Close openEdit when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If openEdit is true and click is outside the form
      if (
        openForm &&
        formRef.current &&
        !formRef.current.contains(event.target)
      ) {
        setOpenForm(false); // Close the edit form
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
                    onSubmit={itinearyHandle}
                    className="flex flex-col items-center"
                  >
                    <table className="border-separate border-spacing-8">
                      <tbody>
                        <tr>
                          <td>
                            <input
                              required
                              type="text"
                              name="destinations"
                              placeholder="Where to go"
                              value={itinerary.destinations.join(", ")}
                              onChange={onChangeInput}
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
                              onChange={onChangeInput}
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
                              name="activities"
                              placeholder="Activies"
                              value={itinerary.activities.join(", ")}
                              onChange={onChangeInput}
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
                              onChange={onChangeInput}
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
                        <tr>
                          <td>
                            {/* <input
                            type="text"
                            name="collaborators"
                            placeholder="Collaborators"
                            value={itinerary.collaborators.join(", ")}
                            onChange={onChangeInput}
                            className="rounded-full p-2 bg-blue-300/50"
                          /> */}
                          </td>
                          <td></td>
                          <td></td>
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
      <About />
      <Destination />
      <Footer />
    </>
  );
};

export default Hero;
