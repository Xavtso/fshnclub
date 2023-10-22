import axios from "axios";
import { userSliceActions } from "./slices/user-slice";

// const prod = "https://woodymember-server.azurewebsites.net/";
const dev = "http://localhost:5000";

export function logUserIn(data) {
  return async (dispatch) => {
    const loginRequest = async function () {
      await axios
        .post(`${dev}/auth/login`, data)
        .then((response) => {
          dispatch(userSliceActions.logIn(response.data.token));
        })
        .catch((err) => dispatch(userSliceActions.viewMessage(err.response.data.message)));
    };
    try {
      await loginRequest();
    } catch (err) {
      console.log(err);
      dispatch(userSliceActions.viewMessage(err.data.message))
    }
  };
}

export function urlLogin(id) {
  return async (dispatch) => {
    const autoLoginRequest = async function () {
      await axios
        .get(`${dev}/auth/${id}`)
        .then((response) =>
          dispatch(userSliceActions.logIn(response.data.token)),
        )
        .catch((err) => dispatch(userSliceActions.viewMessage(err.response.message)));
    };
    try {
      await autoLoginRequest();
    } catch (err) {
      console.log(err);
    }
  };
}
