import "../../styles/AdminStyles/Layouts.css";
import { useState, useEffect } from "react";
import axios from "axios";
import AgreeModal from "./AgreeModal";
import { TicketExpired } from "iconsax-react";
import CreateVoucher from "./CreateVouchers";
import { createPortal } from "react-dom";

export default function VouchersAdmin() {
  const [vouchers, setVouchers] = useState(null);
  const [modal, setModal] = useState(false);
  const [hideClass, setHideClass] = useState("");
  const [agreeModal, setAgreeModal] = useState(false);
  const [targetId, setTargetId] = useState();

  const showActiveVouchers = function () {
    axios
      .get("https://woodymember-server.azurewebsites.net/vouchers/all")
      .then((response) => setVouchers(response.data?.reverse()))
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

  function handleAgreeModalOpen() {
    setAgreeModal(!agreeModal);
  }

  useEffect(() => {
    showActiveVouchers();
  }, []);

  function openModal() {
    setHideClass("hidden");
    setModal(!modal);
  }
  function closeModal() {
    setHideClass("");
    setModal(!modal);
    showActiveVouchers();
  }

  const handleDeleteVoucher = function () {
    console.log(targetId);
    axios
      .post("https://woodymember-server.azurewebsites.net/vouchers/delete", {
        id: targetId,
      })
      .then((response) => {
        console.log(response);
        showActiveVouchers();
      })
      .catch((error) => console.log(error));
    handleAgreeModalOpen();
  };

  return (
    <div className="layout">
      <h1 className="layout-title">Vouchers</h1>
      <div className={`active-events-container ${hideClass}`}>
        <h3 className="container-title">Active Vouchers</h3>
        <div className="active-events-content">
          {vouchers?.map((voucher) => (
            <div key={voucher.id} id={voucher.id} className="event-block">
              <TicketExpired
                size={30}
                onClick={() => {
                  handleAgreeModalOpen();
                  setTargetId(voucher.id);
                }}
                className="removeEvent"
              />
              <p className="event-li-title">{voucher.title}</p>
              <div className="date-block">
                <div className="date-container">
                  <p className="date-label">Starts in</p>
                  <span className="date-value">
                    {datePrettier(voucher.start_date)}
                  </span>
                </div>
                <div className="date-container exp">
                  <p className="date-label">End in</p>
                  <span className="date-value">
                    {datePrettier(voucher.expire_date)}
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
      {agreeModal && createPortal(
        <AgreeModal
          onAgree={handleDeleteVoucher}
          onDisagree={handleAgreeModalOpen}
        />,document.body
      )}
      {modal && <CreateVoucher onClose={closeModal} />}
    </div>
  );
}
