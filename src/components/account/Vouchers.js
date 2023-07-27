import { useNavigate } from "react-router-dom";
import "../../styles/Voucher.css";

export default function Vouchers() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/user-home");
  };

  const handleUseClick = function () {
    navigate('/voucher')
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
      <div className="voucher one">
        <h1 className="vouch-title">1 free drink</h1>
        <button className="btn-vouch" onClick={handleUseClick}>USE</button>
      </div>
      <div className="voucher two">
        <h1 className="vouch-title">50% <br/>on 1 drink</h1>
        <button className="btn-vouch" onClick={handleUseClick}>USE</button>
      </div>
      <div className="voucher three one">
        <h1 className="vouch-title used">1 free drink</h1>
        <button className="btn-vouch" onClick={handleUseClick}>USE</button>
      </div>
    </>
  );
}
