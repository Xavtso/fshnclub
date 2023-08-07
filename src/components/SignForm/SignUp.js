import React, { useState } from "react";
import "../../styles/SignUp.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";

export default function SignUp({ onCloseModal }) {
  const navigateTo = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+45");
  const [message, setMessage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "phone") {
      // Використовуємо патерн, щоб дозволити вводити лише цифри
      setPhone(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Перенаправляємо користувача на сторінку "/user-home" якщо дані зібрано
    axios
      .post("https://woodymember-server.azurewebsites.net/auth/login", {
        name: name,
        phoneNumber: phone,
      })
      .then((response) => response && successfullLogin(response.data.token))
      .catch((error) => {
        // console.log(localStorage);
        console.log(error);
        setMessage(error.response?.data.message);
      });
    // navigateTo("/");
  };

  const successfullLogin = function (token) {
    const { id, name, role } = jwtDecode(token);
    localStorage.setItem("id", id);
    localStorage.setItem("role", role);
    localStorage.setItem("name", name);
    role === "admin" ? navigateTo("/admin") : navigateTo("/user-home");
  };

  return (
    <div className="modal">
      <div className="modal-widget">
        <span className="close" onClick={onCloseModal}>
          &times;
        </span>
        <h2>Registration</h2>
        <form className="sign-form" onSubmit={handleSubmit}>
          <label className="sign-label" htmlFor="name">Name:</label>
          <input
            className="sign-input"
            type="text"
            id="name"
            name="name"
            placeholder="Mick"
            required
            autoCapitalize="true"
            autoSave="true"
            autoComplete="true"
            value={name}
            onChange={handleInputChange}
          />

          <label className="sign-label" htmlFor="phone">Phone Number:</label>
          <input
            className="sign-input"
            type="tel"
            id="phone"
            name="phone"
            placeholder="+380 93 462 77 74"
            autoComplete="true"
            required
            pattern="[0-9+]*" // Патерн для дозволу лише цифр
            value={phone}
            minLength={13}
            onChange={handleInputChange}
          />
          {message && <p className="message">{message}</p>}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
