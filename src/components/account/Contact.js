import React from "react";
import { Facebook, Instagram, Youtube } from "iconsax-react";
import "../../styles/Features.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";


export default function Contact(props) {
  

  return (
    <div className="landing-contacts">
   

      <h1 className="section-title">Contacts</h1>
      <p className="text-content">You can contact us in this ways</p>
      {/* <a className="telNumber" href="tel: +450000000000">
        +45 000 000 000
      </a> */}
      <div className="icon-container">
        <Facebook id="facebook" className="social-icon" size="40" />
        <Instagram id="instagram" className="social-icon" size="40" />
        <Youtube id="youtube" className="social-icon" size="40" />
        <FontAwesomeIcon icon={faPhone} id="phone"/>
      </div>
    </div>
  );
}
