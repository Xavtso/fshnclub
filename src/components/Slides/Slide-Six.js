// import package from './DSCN4532_r-scaled.jpg';
import "../../styles/Slides.css";
import QuadRangleRight from "../QuadRangleRight";
import packageImg from "../../images/DSCN4532_r-scaled.jpg";
import Button from "../Button";
import "../../styles/Button.css";

export default function SlideSix(props) {
  return (
    <div className="slide">
      <QuadRangleRight class={props.class} />
      <h1 className=" title ">
        ALTID <br /> LIGE VED <br/> HANDEN
      </h1>
      <img
        className={`images ${props.side}`}
        src={packageImg}
        alt="package"
      ></img>
      <Button side={props.btnSide} text={"GA aldrig glip af et tilbud"} />
    </div>
  );
}
