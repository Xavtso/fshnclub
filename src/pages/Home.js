import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/LandingPage.css";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useState } from "react";
import SignUp from "../components/SignForm/SignUp";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const navigateTo = function (endpoint) {
    navigate(endpoint);
  };

  const handleIconClick = () => {
    const currentUrl = window.location.href;
    const parts = currentUrl.split("/");
    const userId = parts[parts.length - 1];
    console.log(userId);

    if (userId < 1) {
      setModalOpen(true);
      return;
    }
    axios
      .get(`http://localhost:5000/auth/${userId}`)
      .then((response) => successfullLogin(response.data.token))
      .catch((error) => error && setModalOpen(true));
  };

  const successfullLogin = function (token) {
    localStorage.setItem("token", token);
    const { id, name, role } = jwtDecode(token);
    localStorage.setItem("id", id);
    localStorage.setItem("role", role);
    localStorage.setItem("name", name);
    role === "admin" ? navigateTo("/admin") : navigateTo("/user-home");
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  return (
    <div className="landing-body">
      <nav className="navbar">
        <span className="logo">Woody Member System</span>
        <input type="checkbox" id="menu-toggle" />
        <label className="menu-button-container" htmlFor="menu-toggle">
          <div className="menu-button"></div>
        </label>
        <ul className="menu">
          <li>
            <span className="nav-item" onClick={() => navigateTo("/about")}>
              About
            </span>
          </li>
          <li>
            <span className="nav-item" onClick={() => navigateTo("/contacts")}>
              Contact
            </span>
          </li>
          <li>
            <FontAwesomeIcon
              icon={faUser}
              className="nav-item nav-icon"
              onClick={handleIconClick}
            />
          </li>
        </ul>
      </nav>

      <div className="title-box">
        <h1 className="land-title">
          Bliv en Del <br />
          af holdet!
        </h1>
        <h3 className="slogan">
          Sam Woody member mod tager do ekslusive tilbud, rabatter og
          invitationer til lukkede events!
        </h3>
        <button className="btn-sign" onClick={handleIconClick}>
          Sign Up
        </button>
      </div>
      <div className="phone-box"></div>
      {isModalOpen ? <SignUp onCloseModal={handleCloseModal} /> : null}
    </div>
  );
}
