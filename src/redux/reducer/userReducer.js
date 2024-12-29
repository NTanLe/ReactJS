import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../action/userAction';
const INITIAL_STATE = {
  account: {
    access_token: '',
    refresh_token: '',
    username: '',
    image: '',
    role: '',
    email: ''
  },
  isAuthenticated: false,
};
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      console.log(action)
      return {
        ...state, account: {
          access_token: action?.payload?.DT?.access_token,
          refresh_token: action?.payload?.DT?.refresh_token,
          username: action?.payload?.DT?.username,
          image: action?.payload?.DT?.image,
          role: action?.payload?.DT?.role,
          email: action?.payload?.DT?.email
        }, isAuthenticated: true,
      };

    case LOGIN_FAIL:
      return {
        ...state, count: state,
      };
    case LOGOUT:
      return {
        ...state,
        account: {
          access_token: '',
          refresh_token: '',
          username: '',
          image: '',
          role: '',
          email: ''
        },
        isAuthenticated: false,
      }

    default: return state;
  }
};

export default userReducer;