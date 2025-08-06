// src/pages/AddEvent.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import EventForm from "../components/EventForm";
import { saveEvent, getEvents } from "../utils/storage";

const AddEvent = () => {
  const navigate = useNavigate();

  const handleAdd = (newEvent) => {
    const allEvents = getEvents();
    const id = allEvents.length ? Math.max(...allEvents.map(e => e.id)) + 1 : 1;
    const newWithId = { ...newEvent, id };
    saveEvent(newWithId);
    navigate("/dashboard");
  };

  return (
    <div className="max-w-2xl mx-auto mt-6">
      <h2 className="text-2xl font-semibold ml-6">Add New Event</h2>
      <EventForm onSubmit={handleAdd} />
    </div>
  );
};

export default AddEvent;
