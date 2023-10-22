// import React from "react";
import "../../styles/AdminStyles/EditModal.css";
import { useState, useEffect } from "react";

const EditModal = ({ id, isOpen, onClose, onSave, formData }) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const handleSave = () => {
    onSave({ id, name, phoneNumber, role, birthDate });
    onClose();
  };

  useEffect(() => {
    if (formData) {
      setName(formData.name || "");
      setPhoneNumber(formData.phoneNumber || "");
      setRole(formData.role || "");

      // "yyyy-MM-dd"
      setBirthDate(
        formData.birthDate
          ? new Date(formData.birthDate).toISOString().split("T")[0]
          : "",
      );
    }
  }, [formData]);

  return isOpen ? (
    <div className="modal-container">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2 className="modal-title">Enter User Info</h2>
        <form className="edit-form">
          <div className="input-group">
            <label htmlFor="name" className="name-label">
              Name:
            </label>
            <input
              className="name-input"
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="phone" className="phone-label">
              Phone Number:
            </label>
            <input
              className="phone-input"
              type="tel"
              id="phone"
              name="phone"
              pattern="[0-9+]*"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="role" className="role-label">
              Role:
            </label>
            <select
              className="role-input"
              id="role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
              <option value="customer">Customer</option>
            </select>
          </div>

          <div className="input-group">

          <label htmlFor="birthDate" className="birth-label">
            Birth Date:
          </label>
          <input
            className="birth-input"
            type="date"
            id="birthDate"
            name="birthDate"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            required
            />
            </div>

          <div className="modal-controls">
            <button
              className="editSubmit-btn"
              type="button"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="declineEdit-btn"
              type="button"
              onClick={() => onClose()}
            >
              Decline
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default EditModal;
