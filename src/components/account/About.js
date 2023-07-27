import React from "react";
import { useNavigate } from "react-router-dom";

import '../../styles/Features.css'

export default function About(props) {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div className="landing-about">
      <span className="btn-back" onClick={handleBackClick}>
        &larr;
      </span>
      <h1 className="section-title about-title">About Us</h1>
      <p className="about-content">
        About us? There is nothing to tell here. You have never seen better
        company in your life. Drag your ass here and spend as much money as
        possible if you want to be in a good mood and all your teeth
      </p>
    </div>
  );
}
