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
        OPENING HOURS
      </h1>
      <Button side={props.btnSide} text={"Learn more"} />
      <img
        className={`images ${props.side}`}
        src={packageImg}
        alt="package"
      ></img>
    </div>
  );
}
