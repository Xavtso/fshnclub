import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Card.css";

export default function Card(props) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    switch (props.id) {
      case "vouchers":
        navigate("/vouchers");
        break;
      case "event":
        navigate("/events");
        break;
      case "hour":
        navigate("/open-hours");
        break;
      case "about":
        navigate("/about");
        break;
      case "contact":
            navigate("/contacts");
        break;
      case "vouch-card":
            navigate("/voucher");
        break;
      // Add more cases for other cards if needed
      default:
        break;
    }
  };

  return (
    <div className={`card ${props.class}`} onClick={handleCardClick}>
      <h1 id={props.id} className="card-title others">
        {props.title}
          </h1>
          <span className="eventName">{props.event}</span>
    </div>
  );
}
