import React from "react";

const Destination = () => {
  return (
    <div>
      <section id="destination" className="flex flex-col justify-center items-center ">
        {/* <div className=""> */}
          <h2 className="text-3xl  font-bold text-green-700/80 text-shadow-lg/20">
            Top Destinations
          </h2>
          
          <div className="grid grid-cols-3 gap-5 p-8 ">
            <div className="w-90 h-90 bg-green-400 rounded-3xl mx-10"></div>
            <div className="w-90 h-90 bg-green-400 rounded-3xl mx-10"></div>
            <div className="w-90 h-90 bg-green-400 rounded-3xl mx-10"></div>
            <div className="w-90 h-90 bg-green-400 rounded-3xl mx-10"></div>
            <div className="w-90 h-90 bg-green-400 rounded-3xl mx-10"></div>
            <div className="w-90 h-90 bg-green-400 rounded-3xl mx-10"></div>
          </div>
        {/* </div> */}
      </section>
    </div>
  );
};

export default Destination;
