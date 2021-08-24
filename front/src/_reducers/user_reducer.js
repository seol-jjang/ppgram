import {
  createPromiseThunk,
  handleAsyncAction,
  handleLogoutAction,
  reducerUtils
} from "../utils/asyncUtils";
import * as usersAPI from "../_actions/user_action";

export const GET_REGISTER_USER = "GET_REGISTER_USER";
export const GET_REGISTER_USER_SUCCESS = "GET_REGISTER_USER_SUCCESS";
export const GET_REGISTER_USER_ERROR = "GET_REGISTER_USER_ERROR";

export const GET_LOGIN_USER = "GET_LOGIN_USER";
export const GET_LOGIN_USER_SUCCESS = "GET_LOGIN_USER_SUCCESS";
export const GET_LOGIN_USER_ERROR = "GET_LOGIN_USER_ERROR";

export const GET_LOGOUT_USER = "GET_LOGOUT_USER";
export const GET_LOGOUT_USER_SUCCESS = "GET_LOGOUT_USER_SUCCESS";
export const GET_LOGOUT_USER_ERROR = "GET_LOGOUT_USER_ERROR";

export const AUTH_USER = "AUTH_USER";
export const AUTH_USER_SUCCESS = "AUTH_USER_SUCCESS";
export const AUTH_USER_ERROR = "AUTH_USER_ERROR";

export const getRegisterUser = createPromiseThunk(
  GET_REGISTER_USER,
  usersAPI.registerUser
);
export const getLoginUser = createPromiseThunk(
  GET_LOGIN_USER,
  usersAPI.loginUser
);
export const getLogoutUser = createPromiseThunk(
  GET_LOGOUT_USER,
  usersAPI.logoutUser
);

const initialState = {
  currentUser: reducerUtils.initial()
};

const getLoginUserReducer = handleAsyncAction(GET_LOGIN_USER, "currentUser");
const getRegisterUserReducer = handleAsyncAction(GET_REGISTER_USER, "register");
const getLogoutUserReducer = handleLogoutAction(GET_LOGOUT_USER, "logout");

export default function users(state = initialState, action) {
  switch (action.type) {
    case GET_REGISTER_USER:
    case GET_REGISTER_USER_SUCCESS:
    case GET_REGISTER_USER_ERROR:
      return getRegisterUserReducer(state, action);
    case GET_LOGIN_USER:
    case GET_LOGIN_USER_SUCCESS:
    case GET_LOGIN_USER_ERROR:
      return getLoginUserReducer(state, action);
    case GET_LOGOUT_USER:
    case GET_LOGOUT_USER_SUCCESS:
    case GET_LOGOUT_USER_ERROR:
      return getLogoutUserReducer(state, action);
    default:
      return state;
  }
}
