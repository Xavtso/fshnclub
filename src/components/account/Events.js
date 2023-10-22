import { useNavigate } from "react-router-dom";
import "../../styles/Voucher.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { viewEvents } from "../../utils/content-actions";

export default function Events() {
  const navigate = useNavigate();
  const { events } = useSelector((state) => state.event);
  const [hasFetchedData, setHasFetchedData] = useState(false)
 
  const handleBackClick = () => {
    navigate("/home");
  };
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (!hasFetchedData) {
      dispatch(viewEvents());
      setHasFetchedData(true)
    }
  }, [dispatch, hasFetchedData]);
  

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;

    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${formattedDay}.${formattedMonth}`;
  }


  return (
    <>
      <span className="btn-back" onClick={handleBackClick}>
        &larr;
      </span>
      <div className="landing-events">
        <div className="land-V-title">Events</div>
        <span className="down-arrow">&darr;</span>
      </div>
      {events?.map((event) => (
        <div className="event one" key={event.id}>
          <h1 className="event-title">{event.title}</h1>
          <p className="date">{`${formatDate(event.start_date)} - ${formatDate(
            event.expire_date,
          )}`}</p>
        </div>
      ))}
    </>
  );
}
