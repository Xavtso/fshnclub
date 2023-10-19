import { useNavigate } from "react-router-dom";

export default function Slides() {
  const navigateTo = useNavigate();
  const navigate = function (e) {
    const destination = e.target.id;
    navigateTo(destination);
  };

  return (
    <>
      <div className="slide slide-vouchers">
        <h1 className=" title first-title">VOUCHERS</h1>
        <button
          className="custom-button btn-left"
          id="vouchers"
          onClick={navigate}
        >
          {" "}
          See More
        </button>
      </div>

      <div className="slide slide-events">
        <h1 className=" title title-right">EVENTS</h1>

        <button
          className="custom-button btn-left"
          id="events"
          onClick={navigate}
        >
          {" "}
          See More
        </button>
      </div>

      <div className="slide slide-hours">
        <h1 className=" title title-right">OPENING HOURS</h1>

        <button
          className="custom-button btn-left"
          id="open-hours"
          onClick={navigate}
        >
          {" "}
          See More
        </button>
      </div>
    </>
  );
}
