import { useState } from "react";
import { createPortal } from "react-dom";
import SignUp from "./SignForm/SignUp";

export default function LandingContent() {
    const [isModalOpen, setModalOpen] = useState(false);
    
    function handleModal() {
        setModalOpen(!isModalOpen);
}

    return (
      <div className="landing-body">
        <div className="title-box">
          <h1 className="land-title">
            Bliv en Del <br />
            af holdet!
          </h1>
          <h3 className="slogan">
            Sam Woody member mod tager do ekslusive tilbud, rabatter og
            invitationer til lukkede events!
          </h3>
          <button
            className="btn-sign"
            onClick={handleModal}
          >
            Sign Up
          </button>
        </div>
            <div className="phone-box"></div>
            {isModalOpen && createPortal(<SignUp onCloseModal={handleModal } />,document.body)}
      </div>
    );
}