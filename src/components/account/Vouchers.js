import { useNavigate } from "react-router-dom";
import "../../styles/Voucher.css";
import axios from "axios";
import { useEffect, useState } from "react";
import VouchCard from "./VouchCard";
import { createPortal } from "react-dom";

export default function Vouchers() {
  const [vouchers, setVouchers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null);

  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate("/user-home");
  };

  const showVouchers = function () {
    const id = localStorage.getItem("id");
    axios
      .get(`https://woodymember-server.azurewebsites.net/vouchers/${id}`)
      .then((response) => setVouchers(response.data?.reverse()))
      .catch((error) => console.log(error));
    console.log(vouchers);
  };
  useEffect(() => {
    showVouchers();
    // eslint-disable-next-line
  }, []);

  const handleUseClick = function () {
    // navigate("/voucher");
    setShowModal(!showModal);
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
        <div key={voucher.id} id={voucher.id} className="voucher one">
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
          <VouchCard
            data={selectedVoucher}
            onClose={() => setShowModal(!showModal)}
          />,
          document.body,
        )}
    </>
  );
}
