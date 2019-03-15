// @flow

import {
    SET_TITLE,
    CURRENT_SCREEN
} from '../actionTypes.js';
import {REGISTER_SUCCESS, SET_USER} from "../actionTypes";

const InitialState = {
    title : "login screen"
}

export default function loginScreenReducer(state = InitialState, action = {}) {

    switch (action.type) {
        case SET_TITLE: {
            return {
                ...state,
                title: action.title
            }
        }
        case REGISTER_SUCCESS: {
            return {
                ...state,
                registrationPayload: action.registrationPayload,
                spinner: false
            }
        }
        case SET_USER: {
            return {
                ...state,
                user: action.user
            }
        }
        case CURRENT_SCREEN: {
            return {
                ...state,
                screen: action.screen
            }
        }
        default:
            return state;
    }
}
