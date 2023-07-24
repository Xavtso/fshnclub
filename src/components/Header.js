import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../styles/Header.css'
import { useState } from "react";
import SignUp from "./SignForm/SignUp";
export default function Header() {
     const [isModalOpen, setModalOpen] = useState(false);

     const handleIconClick = () => {
       setModalOpen(true);
     };

     const handleCloseModal = () => {
       setModalOpen(false);
     };
    return (
      <>
        <div className="header">
          <FontAwesomeIcon icon={faUser} className="user-icon"  onClick={handleIconClick}/>
          <h1 className="head-title">FSHN</h1>
          <h2 className="head-quote"> very important members' club</h2>
        </div>
        {isModalOpen && <SignUp onCloseModal={handleCloseModal} />}
      </>
    );
}