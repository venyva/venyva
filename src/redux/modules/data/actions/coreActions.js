
import {
    THROW_ERROR,
    CLEAR_ERROR,
    SET_USER,
    CURRENT_SCREEN,
    CHANGE_SCREEN,
    REGISTER_SUCCESS
} from '../actionTypes.js';

export function setUser(user) {
    return {
        type: SET_USER,
        user
    }
};

export function currentScreen(screen){
    return {
        type: CURRENT_SCREEN,
        screen
    }
}

export function changeScreen(changeScreen){
    return {
        type: CHANGE_SCREEN,
        changeScreen
    }
}

export function throwError(error) {
    return {
        type: THROW_ERROR,
        error
    }
};
export function clearError(data) {
    return {
        type: CLEAR_ERROR,
        data
    }
};

export function registerSuccess(payload) {
    return {
        type: REGISTER_SUCCESS,
        registrationPayload: payload
    }
}


/**
 * THUNKS
 */
export function logout(userData) {
    console.log('------ logout userdata ', userData)
    return (dispatch => {
        dispatch(registerSuccess({}));
        return dispatch(setUser({}));
    })
};
