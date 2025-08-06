import React from "react";
import { Link } from "react-router-dom";

const EventCard = ({ event, onDelete, onEdit }) => (
  <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100">
    {event.banner && (
      <img
        src={event.banner}
        alt="Banner"
        className="w-full h-48 object-cover"
      />
    )}

    <div className="p-5">
      <h3 className="text-xl font-semibold text-gray-800 mb-1 truncate">
        {event.title || event.name}
      </h3>

      <div className="text-sm text-gray-500 mb-2 flex items-center gap-2">
        <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs">
          {event.type || "General"}
        </span>
        <span className="bg-green-100 text-green-600 px-2 py-0.5 rounded-full text-xs">
          {event.status || "Scheduled"}
        </span>
      </div>

      <p className="text-sm text-gray-500 mb-2">
        {new Date(event.date).toLocaleDateString(undefined, {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </p>

      {event.description && (
        <div
          className="text-sm text-gray-700 mb-4 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: event.description }}
        />
      )}

      <div className="flex justify-between items-center mt-auto">
        <Link
          to={`/edit/${event.id}`}
          className="text-sm text-indigo-600 hover:text-indigo-800 font-medium transition"
        >
          ✏️ Edit
        </Link>

        <button
          onClick={() => onDelete(event.id)}
          className="text-sm text-red-500 hover:text-red-700 font-medium transition"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  </div>
);

export default EventCard;
