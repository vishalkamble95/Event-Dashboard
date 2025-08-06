// src/pages/EditEvent.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EventForm from "../components/EventForm";
import { getEvents, saveEvent } from "../utils/storage";

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const allEvents = getEvents();
    const existing = allEvents.find((e) => String(e.id) === id);
    
    if (existing) {
      setEvent(existing);
    } else {
      navigate("/dashboard");
    }
  }, [id, navigate]);

  const handleUpdate = (updatedEvent) => {
    updatedEvent.id = parseInt(id); // preserve original ID
    saveEvent(updatedEvent);
    navigate("/dashboard");
  };

  return (
    <div className="max-w-2xl mx-auto mt-6">
      <h2 className="text-2xl font-semibold ml-6">Edit Event</h2>
      {event ? (
        <EventForm defaultValues={event} onSubmit={handleUpdate} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditEvent;
