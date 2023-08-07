import React, { useState, useEffect } from "react";
import { SearchNormal1, User, UserEdit, UserRemove } from "iconsax-react";
import "../../styles/AdminStyles/Layouts.css";
import axios from "axios";
import EditModal from "./EditModal";
import AgreeModal from "./AgreeModal";
import NotFound from "./NotFound";

import { createPortal } from "react-dom";

export default function Users() {
  const [allUsers, setAllUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetUser, setTargetUser] = useState();
  const [agreeModal, setAgreeModal] = useState(false);
  const [targetId, setTargetId] = useState();
  const [filterRole, setFilterRole] = useState("");
  // eslint-disable-next-line
  const [sortAgeAsc, setSortAgeAsc] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const showUsers = function () {
    axios
      .get("https://woodymember-server.azurewebsites.net/users")
      .then((response) => {
        setAllUsers(response.data);
        setUsers(response.data);
      })
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

    setIsModalOpen(false);
  };

  function calculateAge(birthDate) {
    if (!birthDate) {
      return "?";
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

  const handleSortByAge = function (ascending) {
    if (ascending === "none") {
      return setUsers(users);
    }
    setSortAgeAsc(ascending);
    const sortedUsers = [...users].sort((a, b) => {
      if (!a.birthDate || !b.birthDate) return 0;
      const aAge = calculateAge(a.birthDate);
      const bAge = calculateAge(b.birthDate);
      return ascending ? aAge - bAge : bAge - aAge;
    });
    setUsers(sortedUsers);
  };

  const handleSortByRole = function (role) {
    setFilterRole(role);
    const filteredUsers = allUsers.filter((user) =>
      role === "all" ? user : user.role === role,
    );
    setUsers(filteredUsers);
  };

  const handleSearchChange = function (event) {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filteredUsers = allUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm) ||
        user.phoneNumber.toLowerCase().includes(searchTerm),
    );
    setUsers(filteredUsers);
  };

  return (
    <div className="layout">
      <h1 className="layout-title">Users</h1>
      <div className="filter-container">
        <div className="search-container">
          <span className="search-label">
            <SearchNormal1 color="#fff" size={18} className="search-icon" />
          </span>
          <input
            type="text"
            className="search-input"
            placeholder="name/phone number"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="filterOrSort-containers">
          <span className="filter-title">Filter by</span>
          <select
            className="filter-select"
            value={filterRole}
            onChange={(e) => handleSortByRole(e.target.value)}
          >
            <option value="all">All</option>
            <option value="customer">Customer</option>
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="filterOrSort-containers">
          <span className="filter-title">Sort by</span>
          <select
            className="filter-select"
            onChange={(e) => handleSortByAge(e.target.value === "asc")}
          >
            <option value="none">None</option>
            <option value="asc">Age ↑</option>
            <option value="desc">Age ↓</option>
          </select>
        </div>
      </div>
      <div className="candidates-container">
        {users.length === 0 ? (
          <NotFound />
        ) : (
          users.map((user) => (
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
          ))
        )}
      </div>
      <EditModal
        id={targetUser?.id}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveUser}
        formData={targetUser}
      />
      {agreeModal && createPortal(
        <AgreeModal
          onAgree={handleDeleteUser}
          onDisagree={handleAgreeModalOpen}
        />,document.body
      )}
    </div>
  );
}
