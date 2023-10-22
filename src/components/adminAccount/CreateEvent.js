import React, { useState } from "react";
import "../../styles/AdminStyles/Layouts.css";
import { useDispatch } from "react-redux";
import { createNewEvent } from "../../utils/content-actions";

export default function CreateEvent(props) {
  const [eventName, setEventName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const dispatch = useDispatch();
  function handleDecline() {
    props.onClose();
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const data = {
      title: eventName,
      start_date: startDate,
      expire_date: endDate,
      file: selectedFile,
    };

    dispatch(createNewEvent(data));

    setEventName("");
    setStartDate("");
    setEndDate("");
  };

  function handleUpload(event) {
    const file = event.target.files[0];
    setSelectedFile(file);
  }

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
        <label className="event-label" htmlFor="image">
          Image:
        </label>
        <input
          type="file"
          id="image"
          className="file-input"
          accept="image/*"
          onChange={handleUpload}
          required={true}
        />
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
