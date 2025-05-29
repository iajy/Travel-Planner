import React from "react";

const Destination = () => {
  return (
    <div>
      <section
        id="destination"
        className="flex flex-col justify-center items-center "
      >
        {/* <div className=""> */}
        <h2 className="text-3xl  font-bold text-green-700/80 text-shadow-lg/20">
          Top Destinations
        </h2>

        <div className="grid grid-cols-3 gap-5 p-8 ">
          <div className="w-70 h-70 mx-8 bg-gray-300/20 rounded-2xl hover:shadow-2xl hover:shadow-grey-800">
            <img
              src="src\assets\london-eye-351203_1280.jpg"
              alt=""
              className="object-cover rounded-t-2xl "
            />
            <span className="p-2 ">London</span>
          </div>
          <div className="w-70 h-70 mx-8 bg-gray-300/20 rounded-2xl hover:shadow-2xl hover:shadow-grey-800">
            <img
              src="src\assets\peru-4563281_1280.jpg"
              alt=""
              className="object-cover rounded-t-2xl "
            />
            <span className="p-2 ">Peru</span>
          </div>
          <div className="w-70 h-70 mx-8 bg-gray-300/20 rounded-2xl hover:shadow-2xl hover:shadow-grey-800">
            <img
              src="src\assets\taj-mahal-383083_1280.jpg"
              alt=""
              className="object-fill rounded-t-2xl "
            />
            <span className="p-2 ">India</span>
          </div>
          <div className="w-70 h-70 mx-8 bg-gray-300/20 rounded-2xl hover:shadow-2xl hover:shadow-grey-800">
            <img
              src="src\assets\niagara-1590345_1280.jpg"
              alt=""
              className="object-fill rounded-t-2xl "
            />
            <span className="p-2 ">Niagara</span>
          </div>
          <div className="w-70 h-70 mx-8 bg-gray-300/20 rounded-2xl hover:shadow-2xl hover:shadow-grey-800">
            <img
              src="src\assets\brazil-4809011_1280.jpg"
              alt=""
              className="object-fill rounded-t-2xl "
            />
            <span className="p-2 ">Niagara</span>
          </div>
          <div className="w-70 h-70 bg-green-400 rounded-3xl mx-8"></div>
        </div>
        {/* </div> */}
      </section>
    </div>
  );
};

export default Destination;
