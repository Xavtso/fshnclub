import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/VoucherCard.css'

export default function VouchCard(props) {
  const navigate = useNavigate();
  const [used, setUsed] = useState(false);
  const [usedDate, setUsedDate] = useState(null);

  const handleBackClick = () => {
    navigate("/vouchers");
  };

  const handleYesClick = () => {
    setUsed(true);
    setUsedDate(new Date().toLocaleDateString());
  };

  return (
    <div className="voucher-card">
      <span className="btn-back" onClick={handleBackClick}>
        &larr;
      </span>
      
      <div className="card-title">1 FREE</div>
      {!used ? (
        <div className="alert-container">
          <span className="alert">Are you sure ?</span>
          <p className="explaining">
            Show this to the bartender. <br /> The selection cannot be changed{" "}
          </p>
          <div className="controls">
            <button className="btn-choose" onClick={handleYesClick}>
              Yes
            </button>
            <button className="btn-choose" onClick={handleBackClick}>
              No
            </button>
          </div>
        </div>
      ) : (
        <div className="used-info">Used at {usedDate}</div>
      )}
    </div>
  );
}
