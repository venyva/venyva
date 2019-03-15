// @flow

import {
    THROW_ERROR,
    CLEAR_ERROR,
    SET_TITLE,
    CURRENT_SCREEN,
    SET_USER
} from '../actionTypes.js';
import {REGISTER_SUCCESS} from "../actionTypes";

const InitialState = {
}

export default function usernamePasswordScreenReducer(state = InitialState, action = {}) {

    switch (action.type) {
        case CURRENT_SCREEN: {
            return {
                ...state,
                screen: action.screen
            }
        }
        case SET_USER: {
            return {
                ...state,
                user: action.user
            }
        }
        case REGISTER_SUCCESS: {
            return {
                ...state,
                registrationPayload: action.registrationPayload,
                spinner: false
            }
        }
        default:
            return state;
    }
}
