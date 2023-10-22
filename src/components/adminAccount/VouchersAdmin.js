import "../../styles/AdminStyles/Layouts.css";
import { useState, useEffect } from "react";
import AgreeModal from "./AgreeModal";
import { TicketExpired } from "iconsax-react";
import CreateVoucher from "./CreateVouchers";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteVoucher, getVouchers } from "../../utils/content-actions";
import NotFound from "./NotFound";

export default function VouchersAdmin() {
  const [modal, setModal] = useState(false);
  const [hideClass, setHideClass] = useState("");
  const [agreeModal, setAgreeModal] = useState(false);
  const [targetId, setTargetId] = useState();

  const dispatch = useDispatch();
  const { vouchers } = useSelector((state) => state.vouchers);
  const [hasFetchedData, setHasFetchedData] = useState(false);

  useEffect(() => {
    if (!hasFetchedData) {
      dispatch(getVouchers());
      setHasFetchedData(!hasFetchedData);
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

  function handleAgreeModalOpen() {
    setAgreeModal(!agreeModal);
  }

  function openModal() {
    setHideClass("hidden");
    setModal(!modal);
  }
  function closeModal() {
    setHideClass("");
    setModal(!modal);
  }

  const handleDeleteVoucher = function () {
    dispatch(deleteVoucher(targetId));
    handleAgreeModalOpen();
  };

  return (
    <div className="layout">
      <h1 className="layout-title">Vouchers</h1>
      <div className={`active-events-container ${hideClass}`}>
        <h3 className="container-title">Active Vouchers</h3>
        <div className="active-events-content">
          {vouchers.length < 1 ? (
            <NotFound />
          ) : (
            vouchers?.map((voucher) => (
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
            onAgree={handleDeleteVoucher}
            onDisagree={handleAgreeModalOpen}
          />,
          document.body,
        )}
      {modal && <CreateVoucher onClose={closeModal} />}
    </div>
  );
}
