import "../styles/Slides.css";
import "../styles/Button.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { userSliceActions } from "../utils/slices/user-slice";
import SignUp from "../components/SignForm/SignUp";
import { createPortal } from "react-dom";
import { Outlet } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(userSliceActions.checkIfLogin());
    }
  }, [dispatch, isLoggedIn]);
  return (
    <>
      <Outlet />

      {!isLoggedIn && createPortal(<SignUp />, document.body)}
    </>
  );
}
