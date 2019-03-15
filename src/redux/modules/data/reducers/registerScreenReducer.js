// @flow

import {
    THROW_ERROR,
    CLEAR_ERROR,
    REGISTER_IN_PROGRESS,
    REGISTER_SUCCESS,
    SET_USER,
    CURRENT_SCREEN
} from '../actionTypes';

const InitialState = {
    title : "register screen"
}


export default function registerScreenReducer(state = InitialState, action = {}) {

    switch (action.type) {
        case REGISTER_IN_PROGRESS: {
            return {
                ...state,
                spinner: true
            }
        }
        case REGISTER_SUCCESS: {
            return {
                ...state,
                registrationPayload: action.registrationPayload,
                spinner: false
            }
        }
        case CURRENT_SCREEN: {
            return {
                ...state,
                screen: action.screen
            }
        }
        case THROW_ERROR: {
            return {
                ...state,
                error: action.error,
                spinner: false
            };
        }
        case SET_USER: {
            return {
                ...state,
                user: action.user
            }
        }
        default:
            return state;
    }
}
