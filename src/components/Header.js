
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css'


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
          <div className="head-title">FSHN</div>
          <div className="head-quote"> very important members' club</div>
          <p className='scroll-quote'>Scroll to see <br />all your benefits</p>
          <span className='land-arrow'>&darr;</span>
        </div>
      </>
    );
}