import React, { useState, useEffect } from "react";
import { SearchNormal1, User, UserEdit, UserRemove } from "iconsax-react";
import "../../styles/AdminStyles/Layouts.css";
import EditModal from "./EditModal";
import AgreeModal from "./AgreeModal";
import NotFound from "./NotFound";

import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminSliceActions } from "../../utils/slices/admin-slice";
import {
  deleteUser,
  editUserInfo,
  getUsers,
} from "../../utils/content-actions";

export default function Users() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetUser, setTargetUser] = useState();
  const [agreeModal, setAgreeModal] = useState(false);
  const [targetId, setTargetId] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  const { users } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!users || users.length < 1) {
      dispatch(getUsers());
    }
  }, [dispatch, users]);

  const handleEditUserInfo = function (targetUser) {
    setTargetUser(targetUser);
    setIsModalOpen(true);
  };

  const handleDeleteUser = function () {
    dispatch(deleteUser(targetId));
    handleAgreeModalOpen();
  };

  const handleSaveUser = function (userData) {
    dispatch(editUserInfo(userData));
    setIsModalOpen(!isModalOpen);
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

  function handleSortUser(type, value) {
    dispatch(
      adminSliceActions.sortUsers({
        type: type,
        value: value,
      }),
    );
  }

  const handleSearchChange = function (event) {
    setSearchTerm(event.target.value);
    dispatch(adminSliceActions.searchUser(searchTerm));
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
            // value={filterRole}
            onChange={(e) => handleSortUser("role", e.target.value)}
          >
            <option value="all">All</option>
            <option value="customer">Customers</option>
            <option value="employee">Employees</option>
            <option value="admin">Admins</option>
          </select>
        </div>
        <div className="filterOrSort-containers">
          <span className="filter-title">Sort by</span>
          <select
            className="filter-select"
            onChange={(e) => handleSortUser("ascending", e.target.value)}
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
          users?.map((user) => (
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
      {agreeModal &&
        createPortal(
          <AgreeModal
            onAgree={handleDeleteUser}
            onDisagree={handleAgreeModalOpen}
          />,
          document.body,
        )}
    </div>
  );
}
