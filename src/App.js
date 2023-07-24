import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Account from "./pages/Account";
import Events from "./components/account/Events";
import OpenHours from "./components/account/OpenHours";
import Contact from "./components/account/Contact";
import Voucher from "./components/account/Vouchers";
import VouchCard from "./components/account/VouchCard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/events" element={<Events />} />
        <Route path="/open-hours" element={<OpenHours />} />
        <Route path="/contacts" element={<Contact />} />
        <Route path="/about" element={<Contact />} />
        <Route path="/vouchers" element={<Voucher />} />
        <Route path="/voucher" element={<VouchCard />} />
      </Routes>
      
    </div>
  );
}

export default App;
