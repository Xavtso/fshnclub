import { eventsSliceActions } from "./slices/events-slice";
import axios from "axios";
import { userSliceActions } from "./slices/user-slice";
import { adminSliceActions } from "./slices/admin-slice";
import { vouchersSliceActions } from "./slices/vouchers-slice";

const prod = "https://woodymember-server.azurewebsites.net/";
// const dev = "http://localhost:5000";
const dev = prod;
const token = localStorage.getItem("token");
// Events
export function viewEvents() {
  return (dispatch) => {
    const getEvents = function () {
      axios
        .get(`${prod}/events`, {
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
          `${prod}/events/delete`,
          {
            id: data,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
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

export function createNewEvent(data) {
  return (dispatch) => {
    const handleCreateNewEvent = function () {
      axios
        .post(
          `${prod}/events/create`,
          { data },
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((response) =>
          dispatch(userSliceActions.viewMessage(response.data)),
        )
        .catch((error) =>
          dispatch(userSliceActions.viewMessage(error.response.data.message)),
        );
    };
    try {
      handleCreateNewEvent();
    } catch (err) {
      dispatch(userSliceActions.viewMessage(err.response.data.message));
    }
  };
}



/////////////////////////////////////////////////////

// Users
export function getUsers() {
  return (dispatch) => {
    const showUsers = function () {
      axios
        .get(`${prod}/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
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
      axios.post(`${prod}/users/edit`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
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
        `${prod}/users/delete`,
        {
          id: data,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
        .get(`${prod}/users/candidates`, {
          headers: {
            Authorization: `Bearer ${token}`,
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
        `${prod}/users/approve`,
        {
          id: data,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
        `${prod}/users/decline`,
        {
          id: data,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
////////////////////////////////////////////////////////////////////////////

// Vouchers

export function getVouchers() {
  return (dispatch) => {
    const showActiveVouchers = function () {
      axios
        .get(`${prod}/vouchers/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) =>
          dispatch(
            vouchersSliceActions.fetchVouchers(response.data?.reverse()),
          ),
        )
        .catch((error) =>
          dispatch(userSliceActions.viewMessage(error.response.data.message)),
        );
    };
    try {
      showActiveVouchers();
    } catch (err) {
      dispatch(userSliceActions.viewMessage(err.response.data.message));
    }
  };
}
export function getUserVouchers() {
  return (dispatch) => {
    const showUserVouchers = function () {
      const id = localStorage.getItem('id');
      axios
        .get(`${prod}/vouchers/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) =>
          dispatch(
            vouchersSliceActions.fetchVouchers(response.data?.reverse()),
          ),
        )
        .catch((error) =>
          dispatch(userSliceActions.viewMessage(error.response.data.message)),
        );
    };
    try {
      showUserVouchers();
    } catch (err) {
      dispatch(userSliceActions.viewMessage(err.response.data.message));
    }
  };
}

export function deleteVoucher(id) {
  return (dispatch) => {
    const handleDeleteVoucher = function () {
      axios
        .post(
          `${prod}/vouchers/delete`,
          {
            id: id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((response) => {
          console.log(response);
        })
        .catch((err) =>
          dispatch(userSliceActions.viewMessage(err.response.data.message)),
        );
    };
    try {
      handleDeleteVoucher();
    } catch (err) {
      dispatch(userSliceActions.viewMessage(err.response.data.message));
    }
  };
}

export function createNewVoucher(data) {
  return (dispatch) => {
    const handleCreateNewVoucher = function () {
      axios
        .post(
          `${prod}/vouchers/create`,
          { data },
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((response) =>
          dispatch(userSliceActions.viewMessage(response.data)),
        )
        .catch((error) =>
          dispatch(userSliceActions.viewMessage(error.response.data.message)),
        );
    };
    try {
      handleCreateNewVoucher();
    } catch (err) {
      dispatch(userSliceActions.viewMessage(err.response.data.message));
    }
  };
}
