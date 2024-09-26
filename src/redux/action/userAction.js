export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const LOGIN_FAIL = 'LOGIN_FAIL';

export const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    payload: data,
  };
};

export const loginFail = (data) => {
  return {
    type: LOGIN_FAIL,
    payload: data,
  };
};