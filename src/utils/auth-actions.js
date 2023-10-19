import axios from "axios";
import { userSliceActions } from "./slices/user-slice";

// const dispatch = useDispatch();

export function logUserIn(data) {
  return async (dispatch) => {
    const loginRequest = async function () {
      await axios
        .post("http://localhost:5000/auth/login", data)
        .then((response) => {
          dispatch(userSliceActions.logIn(response.data.token));
          return true;
        })
        .catch((err) => alert(err));
    };
    try {
      await loginRequest();
    } catch (err) {
      console.log(err);
      return err.response.message;
    }
  };
}

export function urlLogin(id) {
  return async (dispatch) => {
    const autoLoginRequest = async function () {
      await axios
        .get(`http://localhost:5000/auth/${id}`)
        .then((response) =>
          dispatch(userSliceActions.logIn(response.data.token)),
        )
        .catch((err) => console.log(err));
    };
    try {
      await autoLoginRequest();
    } catch (err) {
      console.log(err);
    }
  };
}
