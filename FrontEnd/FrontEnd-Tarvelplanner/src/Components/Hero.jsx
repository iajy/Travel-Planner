import React, { useState } from "react";
import Cards from "./Cards";
import { motion } from "motion/react";
import Destination from "./Destination";

const Hero = () => {
  const [openForm, setOpenForm] = useState(false);

  const handleForm = () => {
    setOpenForm(!openForm);
  };

  return (
    <>
      {/* <div> */}
        <img
          src=".\src\assets\background_visual-85f87405.svg"
          alt=""
          className="w-screen h-screen object-cover absolute -z-10 "
        />
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="h-screen w-full flex flex-col items-center justify-center gap-2"
        >
          <span className=" text-6xl font-bold  text-green-700/80 text-shadow-lg/20">
            Your next Adventure{" "}
          </span>
          <span className=" text-5xl font-bold  text-blue-950 text-shadow-lg/20">
            starts Here
          </span>
          <span className="text-2xl text-gray-900/50">
            Life’s too short to stay in one place-go explore, dream big, and
            wander freely.
          </span>
          <button
            className="font-semibold  rounded-full p-4 m-4 bg-green-600/60"
            onClick={handleForm}
          >
            Get start Your Trip
          </button>
          <div>
            {openForm && (
              <>
                <div>
                  <form action="" className="flex gap-5">
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder="Where to go"
                      className="rounded-full p-2 bg-blue-300/50"
                    />
                    <input
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      placeholder="Where to go"
                      className="rounded-full p-2 bg-blue-300/50"
                    />
                    <input
                      type="date"
                      min={
                        new Date(Date.now() + 86400000)
                          .toISOString()
                          .split("T")[0]
                      }
                      placeholder="Where to go"
                      className="rounded-full p-2 bg-blue-300/50"
                    />
                    <input
                      type="text"
                      placeholder="Collaborators"
                      className="rounded-full p-2 bg-blue-300/50"
                    />
                  </form>
                </div>
              </>
            )}
          </div>
        </motion.div>
      {/* </div> */}
      <Destination/>
    </>
  );
};

export default Hero;
