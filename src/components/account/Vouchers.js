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
    navigate("/user-home");
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
    console.log(vouchers);
    // eslint-disable-next-line
  }, []);

  const handleClose = function () {
    setShowModal(!showModal);
    showVouchers();
  };

  function handleLoad(voucher) {
    const imageData = voucher.image;
    console.log(imageData);
    // Створити Blob з буфера даних та фіксованим типом
    const blob = new Blob([imageData.data], { type: "image/jpeg" });
    console.log(blob);
    // Створити URL з Blob
    const imageUrl = URL.createObjectURL(blob);
    
    console.log(imageUrl);
    // Створіть елемент <img> для відображення зображення
    const imageElement = new Image();
    imageElement.src = imageUrl.slice(5);
    
    imageElement.alt = voucher.title;
    console.log(imageElement);
    document.getElementById(voucher.id).appendChild(imageElement)
    
  }

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
         
          key={voucher.id}
          id={voucher.id}
          className="voucher one"
          onClick={() => handleLoad(voucher)}
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
