// @flow

import {
    THROW_ERROR,
    CLEAR_ERROR,
    SET_USER
} from './actionTypes.js';

import initialState from './initialState.json'

export default function data(state = initialState, action = {}) {

    switch (action.type) {
        case SET_USER: {
            return {
                ...state,
                user: action.user
            }
        }
        case THROW_ERROR: {
            return {
                ...state,
                error: action.error,
                spinner: false
            };
        }
        case CLEAR_ERROR: {
            return {
                ...state,
                error:{},
                spinner: false
            };
        }
        default:
            return state;
    }
}
