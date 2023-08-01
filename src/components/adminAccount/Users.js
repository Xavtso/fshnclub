import { User, UserEdit, UserRemove } from "iconsax-react";
import "../../styles/AdminStyles/Layouts.css";
import axios from "axios";
import { useEffect, useState } from "react";
import EditModal from "./EditModal";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetUser, setTargetUser] = useState();

  const showUsers = function () {
    axios
      .get("http://localhost:5000/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    showUsers();
  }, []);

  const handleEditUserInfo = function (targetUser) {
    setTargetUser(targetUser);
    setIsModalOpen(true);
  };

  const handleDeleteUser = function (id) {
    axios
      .post("http://localhost:5000/users/delete", {
        id: id,
      })
      .then((response) => response && showUsers())
      .catch((error) => console.log(error));
  };

  const handleSaveUser = function (userData) {
    axios
      .post("http://localhost:5000/users/edit", userData)
      .then((response) => response && showUsers())
      .catch((error) => console.log(error));

    setIsModalOpen(false); // Закриємо модальне вікно після збереження даних
    };
    
    function calculateAge(birthDate) {
        if (!birthDate) {
            return
        }

  const birthDateObj = new Date(birthDate);
  const today = new Date();
  const age = today.getFullYear() - birthDateObj.getFullYear();
  const monthDifference = today.getMonth() - birthDateObj.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDateObj.getDate())
  ) {
    return age - 1;
  }

  return age ;
}


  return (
    <div className="layout">
      <h1 className="layout-title">Users</h1>
      <div className="candidates-container">
        {users.map((user) => (
          <div key={user.id} className="candidate">
            <div className="info">
              <User className="user-li-icon"/>
              <p className="name">{user.name}</p>
              <span className="user-number">{user.phoneNumber}</span>
                    <span className="user-date">{calculateAge(user.birthDate)}{' ' }<span className="yearsOld">y.o.</span></span>
            </div>
            <div className="actions">
              <UserEdit
                color="#fff"
                size={30}
                className="action-btn"
                onClick={() => handleEditUserInfo(user)}
              />
              <UserRemove
                color="red"
                size={30}
                className="action-btn"
                onClick={() => handleDeleteUser(user.id)}
              />
            </div>
          </div>
        ))}
      </div>

      <EditModal
        id={targetUser?.id}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveUser}
        formData={targetUser}
      />
    </div>
  );
}
