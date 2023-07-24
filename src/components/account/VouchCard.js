import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import "../../styles/Card.css";
import "../../styles/Features.css";
import "../../styles/Voucher.css";

export default function VouchCard(props) {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/vouchers");
  };

  return (
    <div>
      <span className="btn-back" onClick={handleBackClick}>
        &larr;
      </span>
      <Card class={"horisontal"} />
      <h1 className="voucher-title">1 FREE</h1>
      <div className="alert-container">
        <span className="alert">Are you sure ?</span>
        <p className="explaining">
          Show this to the bartender. <br /> The selection cannot be changed{" "}
        </p>
      </div>
      <div className="controls">
        <button className="btn-choose">Yes</button>
        <button className="btn-choose" onClick={handleBackClick}>No</button>
      </div>
    </div>
  );
}
