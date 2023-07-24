import SlideFive from "./Slide-Five";
import SlideFour from "./Slide-Four";
import SlideOne from "./Slide-One";
import SlideSeven from "./Slide-Seven";
import SlideSix from "./Slide-Six";
import SlideThree from "./Slide-Three";
import SlideTwo from "./Slide-Two";

export default function Slides() {
  return (
    <>
      <SlideOne btnSide={"btn-left"} />
      <SlideTwo class={"right"} side={"left"} btnSide={'center' } />
      <SlideThree side={"left"} />
      <SlideFour btnSide={"btn-left"} />
      <SlideFive class={"right"} side={"left"} />
      <SlideSix btnSide={"center"} />
      <SlideSeven class={"right"} side={"left"} />
    </>
  );
}
