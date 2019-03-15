// @flow

import {
    THROW_ERROR,
    CLEAR_ERROR,
    CODE_VERIFICATION_IN_PROGRESS,
    CODE_VERIFICATION_SUCCESS,
    CURRENT_SCREEN,
    SET_USER,
    CHANGE_SCREEN
} from '../actionTypes.js';

const InitialState = {
    title : "Verify Code"
}


export default function codeVerificationScreenReducer(state = InitialState, action = {}) {

    switch (action.type) {
        case CODE_VERIFICATION_IN_PROGRESS: {
            return {
                ...state,
                spinner: true
            }
        }
        case CODE_VERIFICATION_SUCCESS: {
            return {
                ...state,
                spinner: false
            }
        }
        case THROW_ERROR: {
            return {
                ...state,
                error: action.error,
                spinner: false
            };
        }
        case CURRENT_SCREEN: {
            return {
                ...state,
                screen: action.screen
            }
        }
        case CHANGE_SCREEN: {
            return {
                ...state,
                changeScreen: action.changeScreen
            }
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
