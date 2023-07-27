
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css'
import '../styles/Account.css'

export default function Header() {
     const navigate = useNavigate();

     const handleBackClick = () => {
       navigate("/");
     };
    return (
      <>
        <div className="header">
          <span className="btn-back" onClick={handleBackClick}>
            &larr;
          </span>
          <h1 className="head-title">FSHN</h1>
          <h2 className="head-quote"> very important members' club</h2>
        </div>
      </>
    );
}