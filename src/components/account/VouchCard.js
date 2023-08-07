import React, { useState, useEffect } from "react";

import "../../styles/VoucherCard.css";
import axios from "axios";

export default function VouchCard(props) {
  const [voucher, setVoucher] = useState([]);

  const handleBackClick = () => {
    props.onClose();
  };

  const handleYesClick = () => {
    axios
      .post("https://woodymember-server.azurewebsites.net/vouchers/use", {
        id: voucher.voucherId,
        user_id: voucher.userId,
      })
      .then((response) => response && handleBackClick())
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    setVoucher(props.data);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="voucher-card">
      <span className="btn-back" onClick={handleBackClick}>
        &larr;
      </span>

      <div className="card-title">{voucher?.title}</div>
      {voucher?.ifUsed ? (
        <div className="used-info">Used at {voucher.updatedAt}</div>
      ) : (
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
      )}
    </div>
  );
}
