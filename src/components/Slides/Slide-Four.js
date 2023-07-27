// import package from './DSCN4532_r-scaled.jpg';
import "../../styles/Slides.css";
import QuadRangleRight from "../QuadRangleRight";
import packageImg from "../../images/DSCN4532_r-scaled.jpg";
import Button from "../Button";
import "../../styles/Button.css";

export default function SlideFour(props) {
  return (
    <div className="slide">
      <QuadRangleRight class={props.class} />
      <h1 className=" title first-title">
        CLICK/ <br /> COLLECT
      </h1>
      <Button side={props.btnSide} text={"Hent samme dag"} />
      <img
        className={`images ${props.side}`}
        src={packageImg}
        alt="package"
      ></img>
    </div>
  );
}
