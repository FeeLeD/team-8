import { LOGIN_SUCCESS, LOGIN_FAIL, REMOVE_WRONG_DATA, USER_LOADED, AUTH_ERROR, LOGOUT } from '../actions/constants';
import { clearChatState } from '../actions/chat';

const initialState = {
    token: localStorage.getItem('token'),
    loaded: false,
    isWrongData: false,
    isAuthenticated: false,
    userData: {},
    needVerification: false
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                isWrongData: false,
                isAuthenticated: true,
                loaded: true,
                userData: payload
            };
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                isWrongData: false,
                isAuthenticated: true
            };
        case LOGIN_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                loaded: false,
                isWrongData: true,
                isAuthenticated: false,
                userData: {},
                needVerification: payload.needVerification
            }
        case REMOVE_WRONG_DATA: 
            return {
                ...state,
                isWrongData: false
            }
        case LOGOUT:
        case AUTH_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                loaded: false,
                isAuthenticated: false,
                userData: {}
            };
        default:
            return state;
    }
};