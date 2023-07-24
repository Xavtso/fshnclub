// import package from './DSCN4532_r-scaled.jpg';
import "../../styles/Slides.css";
import QuadRangleRight from "../QuadRangleRight";
import packageImg from "../../images/DSCN4532_r-scaled.jpg";
import Button from "../Button";
import "../../styles/Button.css";

export default function SlideTwo(props) {
  return (
    <div className="slide">
          <QuadRangleRight class={props.class} />
      <h1 className=" title title-right">
        KLIPPE <br /> KORT
      </h1>
      <img
        className={`images ${props.side}`}
        src={packageImg}
        alt="package"
      ></img>
      <Button side={props.btnSide} text={"5 klip udloser gavekort"} />
    </div>
  );
}
