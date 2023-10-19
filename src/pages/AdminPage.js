import { Outlet, useNavigate } from "react-router-dom";
import "../styles/AdminStyles/AdminPage.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect} from "react";
import SideNav from "../components/adminAccount/SideNav";
import { userSliceActions } from "../utils/slices/user-slice";
import SignUp from "../components/SignForm/SignUp";
import { createPortal } from "react-dom";

export default function AdminPage() {
  const dispatch = useDispatch();
  const { isLoggedIn,role } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  

 useEffect(() => {
   if (!isLoggedIn) {
     dispatch(userSliceActions.checkIfLogin());
   }

   const timeoutId = setTimeout(() => {
     if (role !== "admin") {
       navigateTo('/')
     };
   }, 1000); 

   // Повертаємо функцію очищення для очистки таймеру при розмонтовці компонента або при зміні залежностей
   return () => clearTimeout(timeoutId);
 }, [dispatch, isLoggedIn, role,navigateTo]);

  return (
    
    <div className="adminBody">
      <SideNav />
      <Outlet />
    
    
      {!isLoggedIn && createPortal(<SignUp />, document.body)}
    </div>

  );
}
