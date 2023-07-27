import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import "../../styles/Card.css";

export default function About(props) {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div>
      <span className="btn-back" onClick={handleBackClick}>
        &larr;
      </span>
      <Card class={"horisontal"} />
      <h1 className="section-title">About</h1>
      <p className="text-content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        vitae risus et libero varius pharetra. Etiam at massa nec dui
        pellentesque congue sed eget elit. Fusce ipsum enim, sodales ut
        pellentesque vel, imperdiet sodales lectus. Duis maximus porta quam, ut
        vehicula erat euismod at.
      </p>
    </div>
  );
}
