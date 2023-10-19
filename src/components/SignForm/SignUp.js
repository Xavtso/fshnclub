import React, { useState,useEffect } from "react";
import "../../styles/SignUp.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logUserIn } from "../../utils/auth-actions";
import { useSelector } from "react-redux";
import { userSliceActions } from "../../utils/slices/user-slice";

export default function SignUp({ onCloseModal }) {
  const navigateTo = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+45");
  // const [message, setMessage] = useState(null);
  const dispatch = useDispatch();
  const { isLoggedIn, role } = useSelector((state) => state.user);

  if (isLoggedIn) {
    role === "admin" ? navigateTo("/admin") : navigateTo("/home");
  }


  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(userSliceActions.checkIfLogin())
    }
  }, [dispatch,isLoggedIn]);

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
    const data = {
      name: name,
      phoneNumber: phone,
    };
    dispatch(logUserIn(data));

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
            pattern="[0-9+]*"
            value={phone}
            minLength={13}
            onChange={handleInputChange}
          />
          {/* {message && <p className="message">{message}</p>} */}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
