// import package from './DSCN4532_r-scaled.jpg';
import "../../styles/Slides.css";
import QuadRangleRight from "../QuadRangleRight";
import packageImg from "../../images/DSCN4532_r-scaled.jpg";
import Button from "../Button";
import "../../styles/Button.css";
import { ReactComponent as QuadLeft } from "../../images/QuadLeft.svg";
export default function SlideOne(props) {
  return (
    <div className="slide">
      {/* <QuadLeft className="quadLeft"/> */}
      <QuadRangleRight class={props.class} />
      <h1 className=" title first-title">
        VOUCHERS
      </h1>
      <Button side={props.btnSide} text={"See my vouchers"} />
      <img
        className={`images ${props.side}`}
        src={packageImg}
        alt="package"
      ></img>
    </div>
  );
}
