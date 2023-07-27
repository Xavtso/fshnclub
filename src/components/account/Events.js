import Card from './Card';
import "../../styles/Account.css";
import "../../styles/Features.css";
import { useNavigate } from 'react-router-dom';

export default function Events() {
     const navigate = useNavigate();

     const handleBackClick = () => {
       navigate("/user-home");
     };
  return (
      <div className="account-body">
          <span className='btn-back' onClick={handleBackClick}>&larr;</span>
  
          <Card class={"horisontal"} title={'Banner' } />
      <h2 className="section-label">Events</h2>
      <div className="cards-container">
        <Card id='hours'  title={"01.08" }event={'Event Name'}  />
        <Card id='hours' title={"08.08"} event={'Event Name'} />
        <Card id='hours'  title={"27.08"} event={'Event Name'}  />
        <Card id='hours'  title={"10.09"} event={'Event Name'} />
      </div>
    </div>
  );
}
