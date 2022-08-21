import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from "../constType"

const initialState = {
    user: {},
    error: '',
    isLoggedIn: false
};

export const authReducer = (state = initialState, action) => {
    console.log('reducer', action.type);
    switch (action.type) {
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS: {
            return {
                ...state,
                user: action.payload,
                error: null,
                isLoggedIn: true,
            }
        }
        default: {
            return {
                ...state,
            };
        }
    }
};


