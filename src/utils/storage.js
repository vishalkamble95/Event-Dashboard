// src/utils/storage.js

// Save users to localStorage
export const saveUsers = (users) => {
  localStorage.setItem("users", JSON.stringify(users));
};

// Get users from localStorage
export const getUsers = () => {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [];
};

// Set currently logged in user
export const setLoggedInUser = (user) => {
  localStorage.setItem("loggedInUser", JSON.stringify(user));
};

// Get currently logged in user
export const getLoggedInUser = () => {
  const user = localStorage.getItem("loggedInUser");
  return user ? JSON.parse(user) : null;
};

// Save event to localStorage
export const saveEvent = (event) => {
  const events = getEvents();

  // Assign unique id if it's a new event (no id yet)
  if (!event.id) {
    event.id = Date.now(); // or use uuid if preferred
  }

  const existingIndex = events.findIndex((e) => e.id === event.id);

  if (existingIndex !== -1) {
    // Update existing event
    events[existingIndex] = event;
  } else {
    // Add new event
    events.push(event);
  }

  localStorage.setItem("events", JSON.stringify(events));
};

// Get events from localStorage
export const getEvents = () => {
  const events = localStorage.getItem("events");
  return events ? JSON.parse(events) : [];
};

// ❗️ ADD THIS FUNCTION
export const deleteEvent = (id) => {
  const events = getEvents();
  const filtered = events.filter((event) => event.id !== id);
  localStorage.setItem("events", JSON.stringify(filtered));
};
