// import package from './DSCN4532_r-scaled.jpg';
import "../../styles/Slides.css";

import "../../styles/Button.css";
import { useNavigate } from "react-router-dom";

export default function SlideTwo(props) {
 const navigateTo = useNavigate();
 const navigate = function () {
   navigateTo("/events");
 };


  return (
    <div className="slide slide-events">
      <h1 className=" title title-right">EVENTS</h1>

      <button className="custom-button btn-left" onClick={navigate}>
        {" "}
        See More
      </button>
    </div>
  );
}
