import React, { useEffect, useRef, useState } from "react";
import AppBar from "./AppBar";
import axios from "axios";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";

const MyItineary = () => {
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");

  const [itineraries, setItineraries] = useState([]);
  const [itinerariesCard, setItinerariesCard] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [id, setId] = useState();
  const [uuid, setUuid] = useState(null);

  const handleEdit = (id, uuid) => {
    setUuid(uuid);
    setId(id);
    setOpenEdit(!openEdit);
  };

  const formRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        openEdit &&
        formRef.current &&
        !formRef.current.contains(event.target)
      ) {
        setOpenEdit(false); 
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openEdit]);

  const handleFetch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/itineraries/${userId}`
      );

      setItinerariesCard(!itinerariesCard);

      setItineraries(response.data); 
      console.log(response);
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };

  const itinearyUpdate = async () => {
    try {
      const updatedItinerary = itineraries[id];
      await axios.put(
        `http://localhost:8000/api/itineraries/${uuid}`,
        updatedItinerary
      );
      // console.log(res.data);
      setOpenEdit(false);
      alert("Updated");
    } catch (error) {
      console.log(error);
    }
  };

  const itineraryDelete = async (deleteId) => {
    try {
      await axios.delete(`http://localhost:8000/api/itineraries/${deleteId}`);
      setItinerariesCard(!itinerariesCard);
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;

    setItineraries((prevItineraries) =>
      prevItineraries.map((itinerary, index) => {
        if (index === id) {
          if (name === "destination" || name === "interests") {
            return {
              ...itinerary,
              [name]: value.split(",").map((item) => item.trim()),
            };
          } else {
            return {
              ...itinerary,
              [name]: value,
            };
          }
        } else {
          return itinerary;
        }
      })
    );
  };

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  return (
    <div>
      <AppBar />
      <section>
        <img
          src=".\src\assets\background_visual-85f87405.svg"
          alt=""
          className="w-screen object-cover absolute -z-10 "
        />
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 100 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="h-full py-20 flex flex-col justify-center items-center"
        >
          <div className="text-center flex flex-col gap-2 items-center">
            <span className=" text-6xl font-bold  text-green-700/80 text-shadow-lg/20">
              Hi {username}
            </span>
            <p className="text-2xl font-bold text-blue-950 text-shadow-lg/20">
              Your travel plans await you here
            </p>
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 1.02 }}
              className="font-semibold rounded-full py-2 px-4 bg-green-600/90"
              onClick={handleFetch}
            >
              Show the Itinearies
            </motion.button>
          </div>
        </motion.div>
      
      {openEdit && (
        <section ref={formRef} className="flex justify-center z-30">
          <div className="absolute flex flex-col items-center justify-center h-1/2 bg-gray-100/90  rounded-3xl shadow-lg/20 hover:scale-101 ">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                itinearyUpdate();
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
                        value={itineraries[id].destination.join(", ")}
                        onChange={onChangeInput}
                        className="rounded-full p-2 bg-blue-300/50"
                      />
                    </td>
                    <td>
                      <label className="px-1 font-medium">
                        Starting Date :
                      </label>
                    </td>
                    <td>
                      <input
                        required
                        type="date"
                        name="startDate"
                        value={itineraries[id].startDate}
                        min={new Date().toISOString().split("T")[0]}
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
                        value={itineraries[id].title}
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
                        placeholder="Interests"
                        value={itineraries[id].interests.join(", ")}
                        onChange={onChangeInput}
                        className="rounded-full p-2 bg-blue-300/50"
                      />
                    </td>
                    <td>
                      <label className="px-1 font-medium">Ending Date : </label>
                    </td>
                    <td>
                      <input
                        required
                        type="date"
                        name="endDate"
                        min={
                          new Date(Date.now() + 86400000)
                            .toISOString()
                            .split("T")[0]
                        }
                        value={itineraries[id].endDate}
                        onChange={onChangeInput}
                        className="rounded-full p-2 bg-blue-300/50 font-normal"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="notes"
                        placeholder="Any Notes"
                        value={itineraries[id].notes}
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
                Update
              </motion.button>
            </form>
          </div>
        </section>
      )}
      </section>
      <div className="flex justify-center">
        {itinerariesCard && (
          <div className="md:grid-cols-2 grid grid-cols-1 gap-10 mx-10 my-4 w-3/4">
            {itineraries.map((item, index) => (
              <motion.div
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                key={item.id}
                className="flex flex-col items-start p-4 shadow rounded my-2 bg-gray-200/50 gap-2"
              >
                <h2 className="text-xl font-bold">{item.title}</h2>
                <p>Start Date: {item.startDate}</p>
                <p>End Date: {item.endDate}</p>
                <p>Destination: {item.destination.join(", ")}</p>
                <p>Bookings: {item.bookings}</p>
                <div className="flex gap-5">
                  <button
                    className="text-white bg-green-500 rounded px-4 py-2"
                    onClick={() => {
                      document
                        .getElementById("editForm")
                        ?.scrollIntoView({ behavior: "smooth" });
                      handleEdit(index, item.id);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-white bg-red-500 rounded px-4 py-2"
                    onClick={() => itineraryDelete(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyItineary;
