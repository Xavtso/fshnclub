import React, { useEffect, useState } from "react";
import "../../styles/AdminStyles/Layouts.css";
import { CalendarRemove } from "iconsax-react";
import CreateEvent from "./CreateEvent";
import AgreeModal from "./AgreeModal";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteEvent, viewEvents } from "../../utils/content-actions";
import NotFound from "./NotFound";

export default function EventsAdmin() {
  const [modal, setModal] = useState(false);
  const [hideClass, setHideClass] = useState("");
  const [agreeModal, setAgreeModal] = useState(false);
  const [targetId, setTargetId] = useState();
  const [hasFetchedData, setHasFetchedData] = useState(false);

  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.event);

  useEffect(() => {
    if (!hasFetchedData) {
      dispatch(viewEvents());
      setHasFetchedData(true);
    }
  }, [dispatch, hasFetchedData]);

  const datePrettier = function (dateString) {
    if (!dateString || dateString === undefined) {
      return "";
    }

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "";
    }

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${formattedDay}.${formattedMonth}`;
  };

  function openModal() {
    setModal(true);
    setHideClass("hidden");
  }

  function closeModal() {
    setHideClass("");
    setModal(false);
  }

  const handleDeleteEvent = function () {
    dispatch(deleteEvent(targetId));
    handleAgreeModalOpen();
  };

  const handleAgreeModalOpen = function () {
    setAgreeModal(!agreeModal);
  };

  return (
    <div className="layout">
      <h1 className="layout-title">Events</h1>
      <div className={`active-events-container ${hideClass}`}>
        <h3 className="container-title">Active Events</h3>
        <div className="active-events-content">
          {events?.length < 1 ? (
            <NotFound />
          ) : (
            events?.map((event) => (
              <div key={event.id} id={event.id} className="event-block">
                <CalendarRemove
                  size={30}
                  onClick={() => {
                    handleAgreeModalOpen();
                    setTargetId(event.id);
                  }}
                  className="removeEvent"
                />
                <p className="event-li-title">{event.title}</p>
                <div className="date-block">
                  <div className="date-container">
                    <p className="date-label">Starts in</p>
                    <span className="date-value">
                      {datePrettier(event.start_date)}
                    </span>
                  </div>
                  <div className="date-container exp">
                    <p className="date-label">End in</p>
                    <span className="date-value">
                      {datePrettier(event.expire_date)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <button className="createEvent-btn" onClick={openModal}>
          Create New
        </button>
      </div>
      {agreeModal &&
        createPortal(
          <AgreeModal
            onAgree={handleDeleteEvent}
            onDisagree={handleAgreeModalOpen}
          />,
          document.body,
        )}
      {modal && <CreateEvent onClose={closeModal} />}
    </div>
  );
}
