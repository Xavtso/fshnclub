import { useNavigate } from "react-router-dom";
import "../../styles/Voucher.css";

export default function Events() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/user-home");
  };

  return (
    <>
      <span className="btn-back" onClick={handleBackClick}>
        &larr;
      </span>
      <div className="landing-events">
        <div className="land-V-title">Events</div>
        <span className="down-arrow">&darr;</span>
      </div>
      <div className="event one">
        <h1 className="event-title">Sports day</h1>
        <p className="date">04.08.23</p>
      </div>
      <div className="event two">
        <h1 className="event-title">Disco Party</h1>
        <p className="date">06.08.23</p>
      </div>
      <div className="event three one">
        <h1 className="event-title used">Singer Evening</h1>
        <p className="date">08.08.23</p>
      </div>
    </>
  );
}
