import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

export default function Navbar(props) {
    const navigateTo = useNavigate();
    
    function openModal() {
    props.onOpen()
} 

    
    return (
      <nav className="navbar">
        <span className="logo" onClick={() => navigateTo('/')}>Woody Member System</span>
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
              onClick={openModal}
            />
          </li>
        </ul>
      </nav>
    );
}