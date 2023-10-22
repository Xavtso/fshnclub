import { useNavigate } from "react-router-dom";
import "../../styles/Voucher.css";
import { useEffect, useState } from "react";
import VouchCard from "./VouchCard";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserVouchers } from "../../utils/content-actions";


export default function Vouchers() {
  const [hasFetchedData, setHasFetchedData] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState([]);
  const dispatch = useDispatch();
  const {vouchers} = useSelector(state => state.vouchers)

  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate("/home");
  };

  
  useEffect(() => {
    if (!hasFetchedData) {
      dispatch(getUserVouchers())
      setHasFetchedData(!hasFetchedData)
    }
  }, [hasFetchedData,dispatch]);

  const handleClose = function () {
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
      {vouchers?.map((voucher) => (
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
