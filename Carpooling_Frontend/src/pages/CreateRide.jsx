import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MapPin, Clock, Calendar, Users, ArrowRight } from "lucide-react";

function CreateRide() {
  const initialState = {
    start: "",
    destination: "",
    time: "",
    date: "",
    seats: "",
  };

  const [ride, setRide] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRide((prevRide) => ({
      ...prevRide,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      // fetch user id from token
      const userId = JSON.parse(atob(token.split(".")[1])).userId;
      ride.user_id = userId;
      console.log("Ride Object:", ride);
      const response = await axios.post(
        "http://localhost:3000/api/v1/create-ride",
        ride, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token here
        },
      });
      console.log("Ride Created Successfully:", response.data);
      toast.success("Ride created successfully!");
      setRide(initialState);
    } catch (error) {
      console.error("Error Creating Ride:", error);
      toast.error("Failed to create the ride. Please try again.");
    }
  };

  return (
    <div className=" bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg border border-blue-100">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">
            Create a Ride
          </h1>
          <p className="text-blue-600 mb-8">
            Fill in the details to offer a new ride
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-6">
              <div className="relative">
                <label
                  className="flex items-center text-sm font-medium text-blue-900 mb-2"
                  htmlFor="start"
                >
                  <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                  Start Location
                </label>
                <input
                  type="text"
                  id="start"
                  name="start"
                  value={ride.start}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                  placeholder="Enter pickup location"
                  required
                />
              </div>

              <div className="relative">
                <label
                  className="flex items-center text-sm font-medium text-blue-900 mb-2"
                  htmlFor="destination"
                >
                  <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                  Destination
                </label>
                <input
                  type="text"
                  id="destination"
                  name="destination"
                  value={ride.destination}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                  placeholder="Enter drop-off location"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <label
                    className="flex items-center text-sm font-medium text-blue-900 mb-2"
                    htmlFor="time"
                  >
                    <Clock className="w-4 h-4 mr-2 text-blue-500" />
                    Time
                  </label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={ride.time}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                    required
                  />
                </div>

                <div className="relative">
                  <label
                    className="flex items-center text-sm font-medium text-blue-900 mb-2"
                    htmlFor="date"
                  >
                    <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={ride.date}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <label
                  className="flex items-center text-sm font-medium text-blue-900 mb-2"
                  htmlFor="seats"
                >
                  <Users className="w-4 h-4 mr-2 text-blue-500" />
                  Available Seats
                </label>
                <input
                  type="number"
                  id="seats"
                  name="seats"
                  value={ride.seats}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                  placeholder="Number of available seats"
                  required
                  min="1"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <span>Create Ride</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        className="mt-16"
        toastClassName="bg-white shadow-lg rounded-xl border border-blue-100"
      />
    </div>
  );
}

export default CreateRide;
