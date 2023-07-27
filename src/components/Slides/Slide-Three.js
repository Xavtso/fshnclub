import { useNavigate } from "react-router-dom";
import "../../styles/Slides.css";

export default function SlideThree(props) {
   const navigateTo = useNavigate();
   const navigate = function () {
     navigateTo("/open-hours");
   };
  return (
    <div className="slide slide-hours">
      <h1 className=" title title-right">OPENING HOURS</h1>

      <button className="custom-button btn-left" onClick={navigate}>
        {" "}
        See More
      </button>
    </div>
  );
}
