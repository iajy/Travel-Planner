import React, { useState } from "react";
import axios from "axios";
import AppBar from "./AppBar";
import Footer from "./Footer";

import { motion } from "motion/react";

const Ticket = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [flights, setFlights] = useState([]);
  const [locationNames, setLocationNames] = useState({});

  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("jwtToken");

  const fetchIataCode = async (locationName) => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/flights/iata",
        {
          params: { keyword: locationName },
        }
      );
      const locationData = response.data.data[0];
      return locationData ? locationData.iataCode : locationName;
    } catch (error) {
      console.error("IATA code fetch error:", error);
      return locationName;
    }
  };

  const fetchLocationName = async (iataCode) => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/flights/location",
        {
          params: { iataCode },
        }
      );
      const locationData = response.data.data[0];
      return locationData
        ? locationData.address.cityName + " - " + locationData.name
        : iataCode;
    } catch (error) {
      console.error("Location name error:", error);
      return iataCode;
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (token != null) {
      setLoading(true);
    } else {
      alert("Login First..");
    }

    try {
      const originCode = await fetchIataCode(origin);
      const destinationCode = await fetchIataCode(destination);

      const response = await axios.get("http://localhost:8000/api/flights", {
        params: {
          origin: originCode,
          destination: destinationCode,
          departureDate,
          returnDate: returnDate || undefined,
          adults,
          children,
        },
      });

      const flightData = response.data.data || [];

      const locationPromises = flightData.flatMap((flight) => {
        const offer = flight.itineraries[0].segments[0];
        return [
          fetchLocationName(offer.departure.iataCode).then((name) => ({
            [offer.departure.iataCode]: name,
          })),
          fetchLocationName(offer.arrival.iataCode).then((name) => ({
            [offer.arrival.iataCode]: name,
          })),
        ];
      });

      const locations = await Promise.all(locationPromises);
      const mergedLocations = Object.assign({}, ...locations);

      setLocationNames(mergedLocations);
      setFlights(flightData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async (flight) => {
    if (!token) {
      alert("Please log in first!");
      return;
    }

    try {
      const itineraryId = localStorage.getItem("uuid");
      const price = flight.price.total;

      const bookingRequest = {
        type: "Flight",
        provider: flight.validatingAirlineCodes[0],
        confirmationNumber: "CONFIRM-" + Math.floor(Math.random() * 100000),
        details: `From ${
          locationNames[flight.itineraries[0].segments[0].departure.iataCode]
        } to ${
          locationNames[flight.itineraries[0].segments[0].arrival.iataCode]
        } on ${departureDate} Price :$${price}`,
      };

      const response = await axios.post(
        `http://localhost:8000/api/itineraries/${itineraryId}/booking`,
        bookingRequest,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Booking successful!");
      } else {
        alert("Booking failed.");
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("Booking failed. Please try again.");
    }
  };

  return (
    <>
      <AppBar />
      <div className="p-4 py-20">
        <p className="text-xl text-center text-gray-500">
          Discover the best flight deals with our smart search feature.
        </p>
        <h1 className="text-4xl text-center font-bold text-green-700/80 text-shadow-lg/20 mb-4">
          Flight Search
        </h1>
        <motion.img
          initial={{ x: 250, y: -250 }}
          animate={{ x: 0, y: 0 }}
          transition={{ duration: 1.4 }}
          src="src\assets\airplane-297578_1280.webp"
          className=" -z-10 h-100 fixed m-10"
          alt=""
        />
        <div className="mb-4  flex flex-col items-center gap-2 ">
          <form onSubmit={handleSearch} className="flex flex-col items-center">
            <table className="border-separate border-spacing-6">
              <tbody>
                <tr>
                  <td>
                    <input
                      required
                      className=" bg-blue-300/50 rounded-full p-2"
                      placeholder="Origin (city or IATA)"
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                    />
                  </td>
                  <td>
                    <label htmlFor="">Departure Date :</label>
                  </td>
                  <td>
                    <input
                      required
                      type="date"
                      className="bg-blue-300/50 rounded-full p-2"
                      min={new Date().toISOString().split("T")[0]}
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                    />
                  </td>
                  <td>
                    <label htmlFor="">Adults :</label>
                  </td>
                  <td>
                    <input
                      required
                      type="number"
                      className="bg-blue-300/50 rounded-full p-2"
                      placeholder="Adults"
                      value={adults}
                      min="1"
                      onChange={(e) => setAdults(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      required
                      className="bg-blue-300/50 rounded-full p-2"
                      placeholder="Destination (city or IATA)"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                    />
                  </td>
                  <td>
                    <label htmlFor="">Return Date :</label>
                  </td>
                  <td>
                    <input
                      type="date"
                      className="bg-blue-300/50 rounded-full p-2"
                      min={
                        new Date(Date.now() + 86400000)
                          .toISOString()
                          .split("T")[0]
                      }
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                    />
                  </td>
                  <td>
                    <label htmlFor="">Children :</label>
                  </td>
                  <td>
                    <input
                      type="number"
                      className="bg-blue-300/50 rounded-full p-2"
                      placeholder="Children"
                      value={children}
                      min="0"
                      onChange={(e) => setChildren(e.target.value)}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 1.02 }}
              // onClick={handleSearch}
              type="submit"
              className="font-semibold rounded-full py-2 px-4 bg-green-600/90 cursor-pointer"
            >
              Search
            </motion.button>
          </form>
          {loading && (
            <div className="flex justify-center items-center">
              <div className="loader border-4 border-green-400 border-t-transparent rounded-full w-8 h-8 animate-spin"></div>
              <p className="ml-2">Searching...</p>
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {flights.slice(0, 20).map((flight, idx) => {
              const offer = flight.itineraries[0].segments[0];
              const departure = offer.departure;
              const arrival = offer.arrival;
              const price = flight.price.total;

              return (
                <div
                  key={idx}
                  className="w-130 text-white border rounded-2xl shadow p-4 bg-gray-700/90 transform transition-transform duration-450 hover:-translate-y-3"
                >
                  <h2 className="text-lg font-bold mb-2">
                    Airline: {flight.validatingAirlineCodes[0]}
                  </h2>
                  <p>
                    <strong>From:</strong> {locationNames[departure.iataCode]} (
                    {departure.iataCode})
                  </p>
                  <p>
                    <strong>To:</strong> {locationNames[arrival.iataCode]} (
                    {arrival.iataCode})
                  </p>
                  <p>
                    <strong>Departure:</strong> {departure.at}
                  </p>
                  <p>
                    <strong>Arrival:</strong> {arrival.at}
                  </p>
                  <p>
                    <strong>Price:</strong> ${price}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 1.02 }}
                    onClick={() => handleBooking(flight)}
                    className="font-semibold  rounded-full px-4 py-2 mt-2 bg-green-600/60 cursor-pointer"
                  >
                    Book
                  </motion.button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Ticket;
