// import package from './DSCN4532_r-scaled.jpg';
import "../../styles/Slides.css";
import "../../styles/Button.css";
import { useNavigate } from "react-router-dom";
export default function SlideOne(props) {
  const navigateTo = useNavigate();
  const navigate = function () {
    navigateTo("/vouchers");
  };

  return (
    <div className="slide slide-vouchers">
      <h1 className=" title first-title">VOUCHERS</h1>
      <button className="custom-button btn-left" onClick={navigate} > See More</button>
    </div>
  );
}
