import { User } from "iconsax-react";
import "../../styles/AdminStyles/Layouts.css";
import { useEffect, useState } from "react";
import NotFound from "./NotFound";
import "../../styles/AdminStyles/CheckBox.css";
import AgreeModal from "./AgreeModal";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { userSliceActions } from "../../utils/slices/user-slice";
import { createNewVoucher, getUsers } from "../../utils/content-actions";

export default function CreateVoucher(props) {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.admin);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [agreeModal, setAgreeModal] = useState(false);
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [hasFetchedData, setHasFetchedData] = useState(false);

  useEffect(() => {
    if (!hasFetchedData) {
      dispatch(getUsers());
      setHasFetchedData(!hasFetchedData);
    }
  }, [hasFetchedData, dispatch]);

  function calculateAge(birthDate) {
    if (!birthDate) {
      return "?";
    }

    const birthDateObj = new Date(birthDate);
    const today = new Date();
    const age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDifference = today.getMonth() - birthDateObj.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      return age - 1;
    }

    return age;
  }

  function handleAgreeModalOpen() {
    setAgreeModal(!agreeModal);
  }

  const handleCandidateClick = function (userId) {
    // Вибираємо елемент зі відповідним userId
    const candidateElement = document.querySelector(
      `.candidate[data-userid="${userId}"]`,
    );

    // Перевіряємо, чи вже є клас active
    const hasActiveClass = candidateElement.classList.contains("active");

    // Додаємо або забираємо клас active в залежності від попереднього стану
    if (hasActiveClass) {
      candidateElement.classList.remove("active");
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      candidateElement.classList.add("active");
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleSelectAll = function () {
    if (selectedUsers.length === users.length) {
      // Якщо всі вибрані, то знімаємо вибір для всіх
      setSelectedUsers([]);
    } else {
      // Інакше вибираємо всіх
      setSelectedUsers(users.map((user) => user.id));
    }
  };

  function handleDecline() {
    props.onClose();
  }

  const handleFormSubmit = function () {
    if (selectedUsers && selectedUsers.length > 0) {
      const data = {
        title: title,
        start_date: startDate,
        expire_date: endDate,
        userIds: selectedUsers,
        file: selectedFile,
      };
      dispatch(createNewVoucher(data));
    } else
      dispatchEvent(userSliceActions.viewMessage("Choose the user(s) please!"));

    handleDecline();
  };

  function handleUpload(event) {
    const file = event.target.files[0];
    setSelectedFile(file);
  }

  return (
    <div className="createVouchers-layout">
      <form className="vouchers-form">
        <label className="event-label" htmlFor="eventName">
          Title:
        </label>
        <input
          className="event-input"
          type="text"
          id="eventName"
          name="eventName"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label className="event-label" htmlFor="startDate">
          Start Date:
        </label>
        <input
          className="event-input"
          type="date"
          id="startDate"
          name="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />

        <label className="event-label" htmlFor="endDate">
          End Date:
        </label>
        <input
          className="event-input"
          type="date"
          id="endDate"
          name="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
        <label className="event-label" htmlFor="image">
          Image:
        </label>
        <input
          type="file"
          id="image"
          className="file-input"
          accept="image/*"
          onChange={handleUpload}
          required={true}
        />
        <div className="event-controls">
          <button
            className="eventCreate-btn"
            type="button"
            onClick={handleAgreeModalOpen}
          >
            Create
          </button>
          <button className="eventCancel-btn" onClick={handleDecline}>
            Cancel
          </button>
        </div>
      </form>

      <div className="users-container">
        <div className="vouchEdition">
          {users.length === 0 ? (
            <NotFound />
          ) : (
            users.map((user) => (
              <div
                key={user.id}
                className={`candidate ${
                  selectedUsers.includes(user.id) ? "active" : ""
                }`}
                data-userid={user.id}
                onClick={() => handleCandidateClick(user.id)}
              >
                <div className="info">
                  <User className="user-li-icon" />
                  <p className="name">{user.name}</p>
                  <span className="user-number">{user.phoneNumber}</span>
                  <span className="user-date">
                    {calculateAge(user.birthDate)}{" "}
                    <span className="yearsOld">y.o.</span>
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        <button className="chooseAll" onClick={handleSelectAll}>
          ChoseAll
        </button>
      </div>
      {agreeModal &&
        createPortal(
          <AgreeModal
            onAgree={handleFormSubmit}
            onDisagree={handleAgreeModalOpen}
          />,
          document.body,
        )}
    </div>
  );
}
