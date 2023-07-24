import { useNavigate } from "react-router-dom";
import Card from "./Card";

export default function Vouchers() {

     const navigate = useNavigate();

     const handleBackClick = () => {
       navigate("/account");
     };
    return (
      <div className="vaucher-container">
        <span className="btn-back" onClick={handleBackClick}>
          &larr;
        </span>
        <Card class={"horisontal"} id="banner" />
        <h1 className="section-title">Vouchers</h1>
        <div className="cards-container">
          <Card id="vouch-card" title={"01"} event={"1 free"} />
          <Card id="vouch-card" title={"02"} event={"20%"} />
          <Card id="vouch-card" title={"03"} event={"Half price"} />
          <Card id="vouch-card" title={"used"} event={"2 for 1"} />
        </div>
      </div>
    );
}
