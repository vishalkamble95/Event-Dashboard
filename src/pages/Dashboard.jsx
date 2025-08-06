// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { getLoggedInUser, getEvents } from "../utils/storage";
import { Link } from "react-router-dom";
import EventList from "./EventList";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = getLoggedInUser();
    if (loggedInUser) {
      setUser(loggedInUser);
      const allEvents = getEvents();
      const userEvents = allEvents.filter(
        (event) => event.createdBy === loggedInUser.id
      );
      setEvents(userEvents);
    }
  }, []);

  const today = new Date().toLocaleDateString("en-CA");
  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString("en-CA");

  const ongoing = events.filter((e) => formatDate(e.date) === today);
  const upcoming = events.filter((e) => formatDate(e.date) > today);
  const past = events.filter((e) => formatDate(e.date) < today);

  return (
    <div className="p-6 md:p-10 bg-[#F9FAFB] min-h-screen w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-extrabold text-[#06202B]">Dashboard</h1>
        <Link
          to="/add"
          className="inline-block bg-[#077A7D] hover:bg-[#065F61] text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition duration-300 shadow-md"
        >
          + Add Event
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard
          label="Total Events"
          count={events.length}
          color="bg-[#7AE2CF]"
          text="#06202B"
        />
        <StatCard
          label="Upcoming"
          count={upcoming.length}
          color="bg-[#b8a9c9]"
          text="#06202B"
        />
        <StatCard
          label="Ongoing Today"
          count={ongoing.length}
          color="bg-[#5b9aa0]"
          text="white"
        />
        <StatCard
          label="Past Events"
          count={past.length}
          color="bg-[#622569]"
          text="white"
        />
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <EventList />
      </div>
    </div>
  );
};

const StatCard = ({ label, count, color, text }) => (
  <div className={`rounded-xl p-6 shadow-md ${color}`} style={{ color: text }}>
    <h2 className="text-lg font-semibold mb-1">{label}</h2>
    <p className="text-3xl font-bold">{count}</p>
  </div>
);

export default Dashboard;
