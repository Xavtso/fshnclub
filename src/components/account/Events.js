import { useNavigate } from "react-router-dom";
import "../../styles/Voucher.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Events() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const handleBackClick = () => {
    navigate("/user-home");
  };

  const getEvents = function () {
    axios
      .get("https://woodymember-server.azurewebsites.net/events")
      .then((response) => setEvents(response.data?.reverse()))
      .catch((error) => console.log(error));
  };


  function formatDate(dateString) {
    const date = new Date(dateString)
    const day = date.getDate();
    const month = date.getMonth() + 1;

    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${formattedDay}.${formattedMonth}`;
  }

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <>
      <span className="btn-back" onClick={handleBackClick}>
        &larr;
      </span>
      <div className="landing-events">
        <div className="land-V-title">Events</div>
        <span className="down-arrow">&darr;</span>
      </div>
      {events.map((event) => (
        <div className="event one" key={event.id}>
          <h1 className="event-title">{event.title}</h1>
          <p className="date">{`${formatDate(event.start_date)} - ${formatDate(event.expire_date)}`}</p>
        </div>
      ))}
    
    </>
  );
}
