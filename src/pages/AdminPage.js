import { Route, Routes, useNavigate } from "react-router-dom";
import "../styles/AdminStyles/AdminPage.css";
import { CalendarAdd, Logout, LogoutCurve, Ticket, UserCirlceAdd, UserTick } from "iconsax-react";
import Candidates from "../components/adminAccount/Candidates";
import EventsAdmin from "../components/adminAccount/EventsAdmin";
import VouchersAdmin from "../components/adminAccount/VouchersAdmin";
import Users from "../components/adminAccount/Users";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [smallScreen, setSmallScreen] = useState(false);

  const navigate = useNavigate();
  const navigator = function (e) {
    const target = e.target.id;
    navigate(target);
  };

  const calculateWidth = () => {
    window.innerWidth <= 750 ? setSmallScreen(true) : setSmallScreen(false);
  };

  useEffect(() => {
    calculateWidth();
  }, []);

  return (
    <div className="adminBody">
      <div className="sidebar">
        <div className="admin-logo"></div>
        <p className="sayHello">Hello, Mick !</p>
        <ul className="sideNav">
          <li onClick={navigator} id="" className="list-item">
            <UserCirlceAdd />
            {smallScreen ? null : "Candidates"}{" "}
          </li>
          <li onClick={navigator} id="users" className="list-item">
            <UserTick onClick={navigator} id="users" />
            {smallScreen ? null : "Users"}{" "}
          </li>
          <li onClick={navigator} id="vouchers" className="list-item">
            <Ticket onClick={navigator} id="vouchers" />
            {smallScreen ? null : "Vouchers"}
          </li>
          <li onClick={navigator} id="events" className="list-item">
            <CalendarAdd onClick={navigator} id= 'events' />
            {smallScreen ? null : "Events"}
          </li>
          <li onClick={navigator} id="/" className="list-item">
            <LogoutCurve onClick={navigator} id= '/' />
            {smallScreen ? null : "Log out"}
          </li>
        </ul>
      </div>
      <Routes>
        <Route exact path="/" element={<Candidates />} />
        <Route exact path="/users" element={<Users />} />
        <Route exact path="/vouchers" element={<VouchersAdmin />} />
        <Route exact path="/events" element={<EventsAdmin />} />
      </Routes>
    </div>
  );
}
