import { eventsSliceActions } from "./slices/events-slice";
import axios from "axios";
import { userSliceActions } from "./slices/user-slice";
import { adminSliceActions } from "./slices/admin-slice";

// const prod = "https://woodymember-server.azurewebsites.net/";
const dev = "http://localhost:5000";

// Events
export function viewEvents() {
  return (dispatch) => {
    const getEvents = function () {
      const token = localStorage.getItem("token");
      axios
        .get(`${dev}/events`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          dispatch(eventsSliceActions.storeEvents(response.data?.reverse()));
        })
        .catch((error) => console.log(error));
    };
    try {
      getEvents();
    } catch (err) {
      console.log(err);
    }
  };
}

export function deleteEvent(data) {
  return (dispatch) => {
    const handleDeleteEvent = function () {
      axios
        .post(
          `${dev}/events/delete`,
          {
            id: data,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        )
        .then((response) => response && null)
        .catch((error) =>
          dispatch(userSliceActions.viewMessage(error.data.message)),
        );
    };

    try {
      handleDeleteEvent();
    } catch (err) {
      console.log(err);
    }
  };
}

/////////////////////////////////////////////////////

// Users
export function getUsers() {
  return (dispatch) => {
    const showUsers = function () {
      axios
        .get(`${dev}/users`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          dispatch(adminSliceActions.storeUsers(response.data?.reverse()));
        })
        .catch((error) => console.log(error));
    };
    try {
      showUsers();
    } catch (err) {
      console.log(err);
    }
  };
}

export function editUserInfo(data) {
  return (dispatch) => {
    const handleSaveUser = function () {
      axios.post(`${dev}/users/edit`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    };
    try {
      handleSaveUser();
    } catch (err) {
      dispatch(userSliceActions.viewMessage(err.data.message));
    }
  };
}

export function deleteUser(data) {
  return (dispatch) => {
    const handleDeleteUser = function () {
      axios.post(
        `${dev}/users/delete`,
        {
          id: data,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
    };
    try {
      handleDeleteUser();
      dispatch(adminSliceActions.removeUser(data));
    } catch (err) {
      dispatch(userSliceActions.viewMessage(err.data.message));
    }
  };
}

//////////////////////////////////////////////////////////////////////////////

// Candidates
export function getCandidates() {
  return (dispatch) => {
    const showCandidates = function () {
      axios
        .get(`${dev}/users/candidates`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) =>
          dispatch(adminSliceActions.fetchCandidates(response.data?.reverse())),
        )
        .catch((err) =>
          dispatch(userSliceActions.viewMessage(err.response.data.message)),
        );
    };
    try {
      showCandidates();
    } catch (err) {
      dispatch(userSliceActions.viewMessage(err.response.data.message));
    }
  };
}

export function approveCandidate(data) {
  return (dispatch) => {
    const handleApproveCandidate = function () {
      axios.post(
        `${dev}/users/approve`,
        {
          id: data,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
    };
    try {
      handleApproveCandidate();
      dispatch(adminSliceActions.filterCandidates(data));
    } catch (err) {
      dispatch(userSliceActions.viewMessage(err.response.data.message));
    }
  };
}

export function declineCandidate(data) {
  return (dispatch) => {
    const handleDeclineCandidate = function () {
      axios.post(
        `${dev}/users/decline`,
        {
          id: data,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
    };
    try {
      handleDeclineCandidate();
      dispatch(adminSliceActions.filterCandidates(data));
    } catch (err) {
      dispatch(userSliceActions.viewMessage(err.response.data.message));
    }
  };
}
