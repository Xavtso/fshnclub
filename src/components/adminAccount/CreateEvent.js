import React, { useState } from "react";
import "../../styles/AdminStyles/Layouts.css";
import axios from "axios";

export default function CreateEvent(props) {
  const [eventName, setEventName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [message, setMessage] = useState(null);

    
    function handleDecline() {
        props.onClose();
   } 
    
  const handleFormSubmit = (event) => {
    event.preventDefault();

    axios
      .post("https://woodymember-server.azurewebsites.net/events/create", {
        title: eventName,
        start_date: startDate,
        expire_date: endDate,
      })
        .then((response) => {
            setMessage(response.data);
            handleDecline();
        })
      .catch((error) => console.log(error));

    setEventName("");
    setStartDate("");
    setEndDate("");
  };

  return (
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
            Create
          </button>
          <button className="eventCancel-btn" onClick={handleDecline}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
