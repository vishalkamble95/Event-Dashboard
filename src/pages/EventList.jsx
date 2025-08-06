// src/pages/EventList.jsx
import React, { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import { getEvents, getLoggedInUser } from "../utils/storage";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("Upcoming"); // Upcoming or Latest

  const types = ["All", "Meetup", "Workshop", "Webinar"];
  const statuses = ["All", "Active", "Cancelled"];
  const sortOptions = ["Upcoming", "Latest"];

  useEffect(() => {
    const user = getLoggedInUser();
    const allEvents = getEvents();
    const userEvents = allEvents.filter((e) => e.createdBy === user.id);
    setEvents(userEvents);
    setFilteredEvents(userEvents);
  }, []);

  useEffect(() => {
    let updated = [...events];

    if (typeFilter !== "All") {
      updated = updated.filter((e) => e.type === typeFilter);
    }

    if (statusFilter !== "All") {
      updated = updated.filter((e) => e.status === statusFilter);
    }

    // Sort by date
    updated.sort((a, b) => {
      const aDate = new Date(a.date).getTime();
      const bDate = new Date(b.date).getTime();
      return sortOrder === "Upcoming" ? aDate - bDate : bDate - aDate;
    });

    setFilteredEvents(updated);
  }, [typeFilter, statusFilter, sortOrder, events]);

  const handleDelete = (id) => {
    const updated = events.filter((e) => e.id !== id);
    setEvents(updated);
    setFilteredEvents(updated);
    localStorage.setItem("events", JSON.stringify(updated));
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full">
      {/* Filter Controls */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {/* Filter by Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Filter by Type
          </label>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            {types.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Filter by Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Filter by Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            {statuses.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
        </div>

        {/* Sort by Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sort by Date
          </label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            {sortOptions.map((option) => (
              <option key={option} value={option}>
                {option === "Upcoming" ? "Upcoming First" : "Latest First"}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Event Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filteredEvents.length === 0 ? (
          <p className="text-gray-500">No events found.</p>
        ) : (
          filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} onDelete={handleDelete} />
          ))
        )}
      </div>
    </div>
  );
};

export default EventList;
