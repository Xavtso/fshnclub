import React, { useState, useEffect } from "react";

import "../../styles/VoucherCard.css";
import axios from "axios";

export default function VouchCard(props) {
  const [usedDate, setUsedDate] = useState(null);
  const [voucher, setVoucher] = useState(null);

  const handleBackClick = () => {
    props.onClose();
  };

  const handleYesClick = () => {
    axios
      .post("`https://woodymember-server.azurewebsites.net/vouchers/use", {
        id: voucher.id,
      })
      .then((response) => response && setUsedDate(new Date()))
      .catch((error) => console.log(error));

    setUsedDate(new Date().toLocaleDateString());
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

      <div className="card-title">{voucher.title}</div>
      {voucher.used ? (
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
