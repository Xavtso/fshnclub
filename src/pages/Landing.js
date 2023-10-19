
import "../styles/LandingPage.css";
import { useState } from "react";
import SignUp from "../components/SignForm/SignUp";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { createPortal } from "react-dom";

export default function Landing() {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleModal = () => {
    setModalOpen(!isModalOpen);
  };
  return (
    <>
      <Navbar onOpen={handleModal} />

      {/* <LandingContent onOpen={handleModal} /> */}
      <Outlet/>
      {isModalOpen && createPortal(<SignUp onCloseModal={handleModal} />,document.body)}
    </>
  );
}
