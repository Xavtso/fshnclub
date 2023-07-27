import "../../styles/SignUp.css";
import { useNavigate } from "react-router-dom";

export default function SignUp({ onCloseModal }) {
  const navigateTo = useNavigate("");
  const navTo = function () {
    navigateTo("/user-home");
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onCloseModal}>
          &times;
        </span>
        <h2>Registration</h2>
        <form>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Vitaliy"
            required
          />

          <label htmlFor="phone">Phone Number:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="+380 93 462 77 74"
            required
          />

          <button type="submit" onClick={navTo}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
