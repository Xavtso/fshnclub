import React, { useState } from "react";
import "../../styles/AdminStyles/Layouts.css";
import axios from "axios";

export default function EventsAdmin() {
  const [eventName, setEventName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [message, setMessage] = useState(null);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:5000/events/create", {
        title: eventName,
        startDate: startDate,
        endDate: endDate,
      })
      .then((response) => setMessage(response.data))
      .catch((error) => console.log(error));

    setEventName("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <div className="layout">
      <h1 className="layout-title">Events</h1>
      <div className="event-widget">
        <form className="event-form" onSubmit={handleFormSubmit}>
          <label className="event-label" htmlFor="eventName">
            Event Name:
          </label>
          <input
            className="event-input"
            type="text"
            id="eventName"
            name="eventName"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />

          <label className="event-label" htmlFor="startDate">
            Start Date:
          </label>
          <input
            className="event-input"
            type="date"
            id="startDate"
            name="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />

          <label className="event-label" htmlFor="endDate">
            End Date:
          </label>
          <input
            className="event-input"
            type="date"
            id="endDate"
            name="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
                  />
                  {message && <span className="message">{message}</span>}
          <div className="event-controls">
            <button className="eventCreate-btn" type="submit">
              Create Event
            </button>
            <button className="eventCancel-btn" type="submit">
              Cancel
            </button>
          </div>
        </form>
          </div>
          <div className="active-events">
              
          </div>
    </div>
  );
}
