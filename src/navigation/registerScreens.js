// @flow

import React from 'react';
import { Navigation } from 'react-native-navigation';

import {
    WelcomeScreen,
    Tab1Screen,
    RegisterScreen,
    CodeVerificationScreen,
    LoginScreen,
    HomeScreen,
    UsernamePasswordScreen
} from 'AppScreens';

import { Provider } from 'AppRedux';

import {
    WELCOME_SCREEN,
    TAB1_SCREEN,
    REGISTER_SCREEN,
    CODE_VERIFICATION_SCREEN,
    LOGIN_SCREEN,
    HOME_SCREEN,
    USERNAME_PASSWORD_SCREEN
} from './Screens';

function WrappedComponent(Component) {
    return function inject(props) {
        const EnhancedComponent = () => (
            <Provider>
                <Component
                    {...props}
                />
            </Provider>
        );

        return <EnhancedComponent />;
    };
}

export default function(){
    Navigation.registerComponent(WELCOME_SCREEN, () => WrappedComponent(WelcomeScreen));
    Navigation.registerComponent(TAB1_SCREEN, () => WrappedComponent(Tab1Screen));
    Navigation.registerComponent(REGISTER_SCREEN, () => WrappedComponent(RegisterScreen));
    Navigation.registerComponent(CODE_VERIFICATION_SCREEN, () => WrappedComponent(CodeVerificationScreen));
    Navigation.registerComponent(LOGIN_SCREEN, () => WrappedComponent(LoginScreen));
    Navigation.registerComponent(HOME_SCREEN, () => WrappedComponent(HomeScreen));
    Navigation.registerComponent(USERNAME_PASSWORD_SCREEN, () => WrappedComponent(UsernamePasswordScreen));




    console.info('All screens have been registered...');
}
