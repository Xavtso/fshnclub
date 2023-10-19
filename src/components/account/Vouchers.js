import { useNavigate } from "react-router-dom";
import "../../styles/Voucher.css";
import axios from "axios";
import { useEffect, useState } from "react";
import VouchCard from "./VouchCard";
import { createPortal } from "react-dom";


export default function Vouchers() {
  const [vouchers, setVouchers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState([]);

  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate("/home");
  };

  const showVouchers = async function () {
    const id = localStorage.getItem("id");
    const response = await axios.get(`http://localhost:5000/vouchers/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setVouchers(response.data?.reverse());
  };
  useEffect(() => {
    showVouchers();
    // eslint-disable-next-line
  }, []);

  const handleClose = function () {
    setShowModal(!showModal);
    showVouchers();
  };

  

  return (
    <>
      <span className="btn-back" onClick={handleBackClick}>
        &larr;
      </span>
      <div className="landing-vouchers">
        <div className="land-V-title">Vouchers</div>
        <span className="down-arrow">&darr;</span>
      </div>
      {vouchers.map((voucher) => (
        <div
          style={{backgroundImage:`url(${voucher.image})` }}
          key={voucher.id}
          id={voucher.id}
          className="voucher one"
        >
          <div className={voucher.ifUsed ? "usedVoucher" : "hidden"}>
            <p className="usedVoucher-title">Used</p>
          </div>
          <h1 className="vouch-title">{voucher.title}</h1>
          <button
            className="btn-vouch"
            onClick={() => {
              setShowModal(!showModal);
              setSelectedVoucher(voucher);
            }}
          >
            USE
          </button>
        </div>
      ))}

      {showModal &&
        createPortal(
          <VouchCard data={selectedVoucher} onClose={handleClose} />,
          document.body,
        )}
    </>
  );
}
