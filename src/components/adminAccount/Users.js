import { User, UserEdit, UserRemove } from "iconsax-react";
import "../../styles/AdminStyles/Layouts.css";
import axios from "axios";
import { useEffect, useState } from "react";
import EditModal from "./EditModal";
import AgreeModal from "./AgreeModal";
import NotFound from "./NotFound";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetUser, setTargetUser] = useState();
  const [agreeModal, setAgreeModal] = useState(false);
  const [targetId, setTargetId] = useState();

  const showUsers = function () {
    axios
      .get("https://woodymember-server.azurewebsites.net/users")
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

  const handleDeleteUser = function () {
    axios
      .post("https://woodymember-server.azurewebsites.net/users/delete", {
        id: targetId,
      })
      .then((response) => response && showUsers())
      .catch((error) => console.log(error));
    handleAgreeModalOpen();
  };

  const handleSaveUser = function (userData) {
    axios
      .post("https://woodymember-server.azurewebsites.net/users/edit", userData)
      .then((response) => response && showUsers())
      .catch((error) => console.log(error));

    setIsModalOpen(false); // Закриємо модальне вікно після збереження даних
  };

  function calculateAge(birthDate) {
    if (!birthDate) {
      return '?';
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

    return age;
  }

  function handleAgreeModalOpen() {
    setAgreeModal(!agreeModal);
  }


  return (
    <div className="layout">
      <h1 className="layout-title">Users</h1>
      <div className="candidates-container">
        {users.length === 0 ? <NotFound/> : users.map((user) => (
          <div key={user.id} className="candidate">
            <div className="info">
              <User className="user-li-icon" />
              <p className="name">{user.name}</p>
              <span className="user-number">{user.phoneNumber}</span>
              <span className="user-date">
                {calculateAge(user.birthDate)}{" "}
                <span className="yearsOld">y.o.</span>
              </span>
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
                onClick={() => {
                  handleAgreeModalOpen();
                  setTargetId(user.id);
                  
                }}
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
      {agreeModal && <AgreeModal onAgree={handleDeleteUser} onDisagree={handleAgreeModalOpen} />}
    </div>

  );
}
