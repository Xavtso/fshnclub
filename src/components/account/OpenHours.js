import React from "react";
import { useNavigate } from "react-router-dom";

import "../../styles/Card.css";
import "../../styles/Features.css";

export default function OpenHours(props) {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/user-home");
  };

  return (
    <div className="open-landing">
      <span className="btn-back" onClick={handleBackClick}>
        &larr;
      </span>

      <h1 className="section-title">This Week</h1>
      <div className="days-container">
        <div className="day">
          <p className="name">Friday</p>
          <p className="hours">13:00 - 22:00</p>
            </div>
        <div className="day">
          <p className="name">Saturday</p>
          <p className="hours">14:00 - 23:00</p>
            </div>
        <div className="day">
          <p className="name">Sunday</p>
          <p className="hours">13:00 - 22:00</p>
            </div>
      </div>
    </div>
  );
}
