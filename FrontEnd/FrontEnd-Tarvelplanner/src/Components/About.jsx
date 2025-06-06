import React from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "motion/react";

const About = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
  });

  return (
    <div className=" m-20 flex flex-col gap-15">
      <section className="flex flex-col items-center text-center gap-3">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: -100 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-gray-400 text-xl">Travel Planner</p>
          <span className="text-4xl font-bold text-green-700/80 text-shadow-lg/20">
            The only tool you'll ever need!
          </span>
          <p className="text-gray-500 text-xl py-3">
            Say goodbye to the stress of planning and hello to personalized{" "}
            <br /> recommendations, efficient itineraries, and seamless dining
            experiences.
          </p>
        </motion.div>
      </section>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: -100 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="flex justify-between"
      >
        <div>
          <div className="flex gap-4">
            <img src="src\assets\map.webp" className="h-20" alt="" />
            <span className="text-2xl font-bold text-green-700">
              Finding <br /> Destinations
            </span>
          </div>
          <p className="text-gray-500">
            Finding the perfect destination is <br />
            an adventure filled with exploration,
            <br />
            culture, nature, and experiences that <br />
            will create lifelong memories for you.
          </p>
        </div>
        <div>
          <div className="flex">
            <img src="src\assets\story.webp" className="h-20" alt="" />
            <span className="text-2xl font-bold text-green-700">
              Personalize <br />
              Your activities
            </span>
          </div>
          <p className="text-gray-500">
            Personalize your activities to match your <br /> 
            interests, ensuring an unforgettable <br />
            experience uniquely tailored just for your <br />
            journey.
          </p>
          <div>
            <p className="text-gray-500 "></p>
          </div>
        </div>
        <div>
          <div className="flex">
            <img src="src\assets\food.webp" className="h-20" alt="" />
            <span className="text-2xl font-bold text-green-700">
              Local Cuisine <br /> Recommendations
            </span>
          </div>
          <p className="text-gray-500">
            Explore our handpicked local cuisine <br />
            recommendations to savor authentic flavors, <br />
            unique dishes, and unforgettable dining <br />
            experiences that reflect each destination’s soul.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
