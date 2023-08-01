import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

import Events from "./components/account/Events";
import OpenHours from "./components/account/OpenHours";
import Contact from "./components/account/Contact";
import Voucher from "./components/account/Vouchers";
import VouchCard from "./components/account/VouchCard";
import About from "./components/account/About";
import UserHome from "./pages/UserHome";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/events" element={<Events />} />
        <Route path="/open-hours" element={<OpenHours />} />
        <Route path="/contacts" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/vouchers" element={<Voucher />} />
        <Route path="/voucher" element={<VouchCard />} />
        <Route path="/user-home" element={<UserHome />} />

      </Routes>
      
    
  );
}

export default App;
