import authServices from "../../services/authServices";
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from "../constType"

export const registerAction = () => {
    return {
        type: REGISTER_SUCCESS,
    }
}

export const registerUser = (body) => {
    return dispatch => {
        authServices
            .registerApi(body)
            .then(res => {
                console.log(res)
                dispatch(registerAction(res.data))
            })
            .catch(err => {
                console.log(err)
            })
    }
}


export const LoginAuthData = data => {
    return {
        type: LOGIN_SUCCESS,
        payload: data,
    };
};

export const LoginUser = (data) => {
    return dispatch => {
        authServices
            .loginUser(data)
            .then(res => {
                dispatch(LoginAuthData(res.data.result))
                console.log(res.data)
                dispatch(LoginAuthData(res.data))
                
            })
            .catch(err => {
                console.log(err)
            })
    }
}



