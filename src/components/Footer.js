import { Facebook, Instagram, Youtube } from "iconsax-react";
import '../styles/Footer.css';

export default function Footer() {
    return (
      <div className="footer">
        <div className="icon-container">
          <Facebook id="facebook" className="social-icon" size='40' />
          <Instagram id="instagram" className="social-icon"size='40'/>
          <Youtube id="youtube" className="social-icon"size='40'  />
        </div>
        <p className="link-label">folg os pa sociale medier</p>
      </div>
    );
}