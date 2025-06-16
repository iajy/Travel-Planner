import React from "react";

const Footer = () => {
  return (
    <>
    <div className="py-20">
    </div>
    <hr  className="border-green-600/50"/>
      <div className="w-full flex flex-col gap-5 bg-green-100">
        <div className="flex justify-around p-4">
          <div>
            <span className="text-green-700 text-3xl font-bold">Travel</span>
            <span className="text-3xl font-bold ">-Planner</span>
            <p>Life’s too short to stay in one place-go explore, <br /> dream big, and wander freely.</p>
          </div>
          <div className="flex flex-col">
            <span className=" font-bold">Legal</span>
            <a href="">Terms and Conditions</a>
            <a href="">Privacy Policy</a>
          </div>
          <div className="flex flex-col">
            <span className="font-bold">Support</span>
            <a href="">Contact us</a>
          </div>
          <div className="flex flex-col">
            <span className="font-bold">Itineraries</span>
            <a href="">Find Destinations</a>
          </div>
        </div>
        <hr className="text-gray-300 mx-30" />
        <span className="px-30 text-gray-500 ">
          &copy; 2025 Travel-Planner. All rights reserved
        </span>
      </div>
    </>
  );
};

export default Footer;
