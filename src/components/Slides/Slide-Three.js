// import package from './DSCN4532_r-scaled.jpg';
import "../../styles/Slides.css";
import QuadRangleRight from "../QuadRangleRight";
import packageImg from "../../images/DSCN4532_r-scaled.jpg";
import Button from "../Button";
import "../../styles/Button.css";

export default function SlideThree(props) {
  return (
    <div className="slide">
      <QuadRangleRight class={"individual"} />
      <h1 className=" title title-right">
        SHOP <br /> ONLINE
      </h1>
      <img
        className={`images ${props.side}`}
        src={packageImg}
        alt="package"
      ></img>
      <Button side={props.btnSide} text={"nedtaelling er i gang !"} />
    </div>
  );
}
