import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import {
    data,
    welcomeScreenReducer as welcomeState,
    registerScreenReducer as registerState,
    codeVerificationScreenReducer as codeVerificationState,
    loginScreenReducer as loginState,
    homeScreenReducer as homeState,
    usernamePasswordScreenReducer as usernamePasswordState
} from '../modules';

const config = {
    key: 'LIFTED_REDUX_STORE',
    storage
};

const appReducer = persistCombineReducers(config, {
    data,
    welcomeState,
    registerState,
    codeVerificationState,
    loginState,
    homeState,
    usernamePasswordState
});

export default function rootReducer(state, action) {
    return appReducer(state, action);
}
