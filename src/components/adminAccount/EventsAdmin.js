import React, { useEffect, useState } from "react";
import "../../styles/AdminStyles/Layouts.css";
import axios from "axios";
import { CalendarRemove } from "iconsax-react";
import CreateEvent from "./CreateEvent";
import AgreeModal from "./AgreeModal";

export default function EventsAdmin() {
  const [events, setEvents] = useState(null);
  const [modal, setModal] = useState(false);
  const [hideClass, setHideClass] = useState("");
  const [agreeModal, setAgreeModal] = useState(false);
  const [targetId, setTargetId] = useState();
  const showActiveEvents = function () {
    axios
      .get("https://woodymember-server.azurewebsites.net/events")
      .then((response) => setEvents(response.data?.reverse()))
      .catch((error) => console.log(error));
  };

  const datePrettier = function (dateString) {
    if (!dateString || dateString === undefined) {
      return ""; // Якщо строка не передана, повертаємо пустий рядок
    }

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return ""; // Якщо дата недійсна, повертаємо пустий рядок
    }

    const day = date.getDate();
    const month = date.getMonth() + 1; // Додаємо 1, оскільки місяці у JavaScript нумеруються з 0 до 11

    // Додаємо '0' перед одиночними цифрами дня та місяця, якщо вони менше 10
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
    showActiveEvents();
  }

  useEffect(() => {
    showActiveEvents();
  }, []);

  const handleDeleteEvent = function (id) {
    axios
      .post("https://woodymember-server.azurewebsites.net/events/delete", {
        id: targetId,
      })
      .then((response) => {
        console.log(response);
        showActiveEvents();
      })
      .catch((error) => console.log(error));
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
          {events?.map((evt) => (
            <div key={evt.id} id={evt.id} className="event-block">
              <CalendarRemove
                size={30}
                onClick={() => {
                  handleAgreeModalOpen();
                  setTargetId(evt.id);
                }}
                className="removeEvent"
              />
              <p className="event-li-title">{evt.title}</p>
              <div className="date-block">
                <div className="date-container">
                  <p className="date-label">Starts in</p>
                  <span className="date-value">
                    {datePrettier(evt.start_date)}
                  </span>
                </div>
                <div className="date-container exp">
                  <p className="date-label">End in</p>
                  <span className="date-value">
                    {datePrettier(evt.expire_date)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="createEvent-btn" onClick={openModal}>
          Create New
        </button>
      </div>
      {agreeModal && (
        <AgreeModal
          onAgree={handleDeleteEvent}
          onDisagree={handleAgreeModalOpen}
        />
      )}
      {modal && <CreateEvent onClose={closeModal} />}
    </div>
  );
}
