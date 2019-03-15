// @flow

import {
    THROW_ERROR,
    CLEAR_ERROR,
    SET_TITLE,
    CURRENT_SCREEN
} from '../actionTypes.js';
import {SET_USER} from "../actionTypes";

const InitialState = {
    title : "welcome screen"
}

export default function welcomeReducer(state = InitialState, action = {}) {

    switch (action.type) {
        case SET_TITLE: {
            return {
                ...state,
                title: action.title
            }
        }
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
        default:
            return state;
    }
}
