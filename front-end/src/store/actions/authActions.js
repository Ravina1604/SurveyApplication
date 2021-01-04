import * as CONSTANTS from "./constants";
import { fetchFormUrl } from './apiCall.js';

export const login = (user) => {
  return (dispatch) => {
    fetchFormUrl({ action: "login", ...user },(res)=> {
      if (res.publisher_id !== -1) {
        dispatch({
          type: CONSTANTS.LOGIN,
          payload: {
            isAuthenticated: true,
            publisher: res,
          },
        });
      } else {
        dispatch({
          type: CONSTANTS.AUTHERROR,
          payload: {
            error: "Credential are invalid. Please check",
          },
        });
      }
    })
  };
};

export const signup = (user) => {
  return (dispatch) => {
    fetchFormUrl({ action: "signup", ...user },(res)=> {
      if (res.publisher_id !== -1) {
        dispatch({
          type: CONSTANTS.SIGNUP,
          payload: {
            isAuthenticated: true,
            publisher: res,
          },
        });
      } else {
        dispatch({
          type: CONSTANTS.AUTHERROR,
          payload: {
            error: "Publisher already exist",
          },
        });
      }
    })
  };
};

export const logout = () => {
  return {
    type: CONSTANTS.LOGOUT,
  };
};
