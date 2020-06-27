import {
    GET_CHAT_ROOMS,
    GET_MESSAGES,
    GET_ALL_USERS,
    SEARCH,
    CLEAR_SEARCH,
    CREATE_CHAT,
    ADD_MESSAGE,
    ACTIVE_DIALOG,
    GET_ONLINE_MESSAGES,
    CLEAR_ONLINE_MESSAGES,
    CLEAR_CHAT_STATE,
    ADD_TYPING,
    STOPED_TYPING
} from '../actions/constants';

const initialState = {
    rooms: [],
    currentRoomId: 0,
    messages: [],
    onlineMessages: [],
    typings: [],
    users: [],
    toSearchFor: '',
    activeDialogId: ''
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_CHAT_ROOMS:
            return {
                ...state,
                rooms: payload
            };
        case GET_MESSAGES:
        case CREATE_CHAT:
            if (state.currentRoomId !== payload.roomId) {
                return {
                    ...state,
                    currentRoomId: payload.roomId,
                    messages: payload.messages
                }
            } else {
                return {
                    ...state,
                    messages: payload.messages
                };
            }
        case GET_ALL_USERS:
            return {
                ...state,
                users: payload.users
            }
        case SEARCH:
            return {
                ...state,
                users: payload.users,
                toSearchFor: payload.toSearchFor
            }
        case CLEAR_SEARCH:
            return {
                ...state,
                toSearchFor: ''
            }
        case ADD_MESSAGE:
            return {
                ...state
            }
        case ACTIVE_DIALOG:
            return {
                ...state,
                activeDialogId: payload.dialogId
            }
        case GET_ONLINE_MESSAGES:
            return {
                ...state,
                onlineMessages: [...state.onlineMessages, payload.message]
            }
        case CLEAR_ONLINE_MESSAGES:
            return {
                ...state,
                onlineMessages: []
            }
        case CLEAR_CHAT_STATE:
            return {
                rooms: [],
                currentRoomId: 0,
                messages: [],
                onlineMessages: [],
                typings: [],
                users: [],
                toSearchFor: '',
                activeDialogId: ''
            };
        case ADD_TYPING:
            if (!state.typings.some(user => user.login === payload.user.login)) {
                return {
                    ...state,
                    typings: [...state.typings, payload.user]
                };
            } else {
                return {
                    ...state
                }
            }
        case STOPED_TYPING:
            return {
                ...state,
                typings: []
            }
        default:
            return state;
    }
};