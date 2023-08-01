import { Route, Routes, useNavigate } from 'react-router-dom'
import '../styles/AdminStyles/AdminPage.css'
import { CalendarAdd, Ticket, UserCirlceAdd, UserTick } from 'iconsax-react'
import Candidates from '../components/adminAccount/Candidates';
import EventsAdmin from '../components/adminAccount/EventsAdmin';
import VouchersAdmin from '../components/adminAccount/VouchersAdmin';
import Users from '../components/adminAccount/Users';


export default function AdminPage() {

    const navigate = useNavigate();
    const navigator = function (e) {
        const target = e.target.id;
        navigate(target)
    }


    return (
      <div className="adminBody">
        <div className="sidebar">
          <div className="admin-logo"></div>
          <p className='sayHello'>Hello, Mick !</p>
          <ul className="sideNav">
            <li onClick={navigator} id='' className="list-item"><UserCirlceAdd /> Candidates</li>
            <li onClick={navigator} id='users' className="list-item"><UserTick/> Users</li>
            <li onClick={navigator} id='vouchers' className="list-item"><Ticket/> Vouchers</li>
            <li onClick={navigator} id='events' className="list-item"><CalendarAdd/> Events</li>
          </ul>
        </div>
        <Routes>
          <Route exact path="/" element={<Candidates/>} />
          <Route exact path="/users" element={<Users/>} />
          <Route exact path="/vouchers" element={<VouchersAdmin/>} />
          <Route exact path="/events" element={<EventsAdmin/>} />
        </Routes>
      </div>
    );
}