import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  CalendarAdd,
  LogoutCurve,
  Ticket,
  UserCirlceAdd,
  UserTick,
} from "iconsax-react";
import { createPortal } from "react-dom";
import AgreeModal from "./AgreeModal";
import { useDispatch } from "react-redux";
import { userSliceActions } from "../../utils/slices/user-slice";

export default function SideNav() {
  const [smallScreen, setSmallScreen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

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

    const handleLogOut = function () {
      navigate('/')
    dispatch(userSliceActions.logOut());
    setShowModal(!showModal);
  };
  const handleModal = function () {
    setShowModal(!showModal);
  };

  return (
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
          <CalendarAdd onClick={navigator} id="events" />
          {smallScreen ? null : "Events"}
        </li>
        <li onClick={handleModal}  className="list-item">
          <LogoutCurve onClick={handleModal} />
          {smallScreen ? null : "Log out"}
        </li>
      </ul>
      {showModal &&
        createPortal(
          <AgreeModal onAgree={handleLogOut} onDisagree={handleModal} />,
          document.body,
        )}
    </div>
  );
}
