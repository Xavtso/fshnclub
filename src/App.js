import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";

import Events from "./components/account/Events";
import OpenHours from "./components/account/OpenHours";
import Contact from "./components/account/Contact";
import Voucher from "./components/account/Vouchers";
import VouchCard from "./components/account/VouchCard";
import About from "./components/account/About";
import Home from "./pages/Home";
import AdminPage from "./pages/AdminPage";
import Candidates from './components/adminAccount/Candidates'
import Users from './components/adminAccount/Users';
import VouchersAdmin from './components/adminAccount/VouchersAdmin';
import EventsAdmin from './components/adminAccount/EventsAdmin';
import LandingContent from "./components/LandingContent";
import HomeLayout from "./components/account/HomeLayout";
import { useSelector } from "react-redux";
import Notification from "./components/Notification";


function App() {
  const { message } = useSelector(state => state.user);
  

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Landing />} >
          <Route path="/" index element={<LandingContent />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contact />} />
        </Route>
      
        <Route exact path="/home" element={<Home />}>
          <Route path="" index element={<HomeLayout />} />
          <Route path="events" element={<Events />} />
          <Route path="open-hours" element={<OpenHours />} />
          <Route path="vouchers" element={<Voucher />} />
          <Route path="voucher" element={<VouchCard />} />
        </Route>

        <Route exact path="/admin" element={<AdminPage />}>
          <Route index element={<Candidates />} />
          <Route  path="users" element={<Users />} />
          <Route path="vouchers" element={<VouchersAdmin />} />
          <Route path="events" element={<EventsAdmin />} />
        </Route>
      </Routes>

      {message && <Notification/>}
    </>
  );
}

export default App;
