// @flow
import React from 'react';
import { Navigation } from 'react-native-navigation';

import {
    WELCOME_SCREEN,
    TAB1_SCREEN,
    REGISTER_SCREEN,
    CODE_VERIFICATION_SCREEN,
    HOME_SCREEN
} from './Screens';

import registerScreens from './registerScreens';

// Register all screens on launch
registerScreens();

export function pushScreen(prevScreen, newScreen, options = null, passProps=null){
    const component = {id: newScreen, name: newScreen};
    options ? component.options = options : null;
    passProps ? component.passProps = passProps : null;

    Navigation.push(prevScreen, { component });
}

export function popToRoot(currentScreen){
    Navigation.popToRoot(currentScreen);
}

export function pushWelcomeScreen() {
    Navigation.setDefaultOptions({
        topBar: {
            background: {
                color: '#039893'
            },
            title: {
                color: 'white',
            },
            backButton: {
                title: '', // Remove previous screen name from back button
                color: 'white'
            },
            buttonColor: 'white',
        },
        statusBar: {
            style: 'light'
        },
        layout: {
            orientation: ['portrait']
        },
        bottomTabs: {
            titleDisplayMode: 'alwaysShow'
        },
        bottomTab: {
            textColor: 'gray',
            selectedTextColor: 'black',
            iconColor: 'gray',
            selectedIconColor: 'black',
        }
    });

    Navigation.setRoot({
        root: {
            stack: {
                children: [{
                    component: {
                        id: WELCOME_SCREEN,
                        name: WELCOME_SCREEN,
                        options: {
                            topBar: {
                                visible: false,
                            },
                            statusBar: {
                                style: 'dark'
                            }
                        }
                    }
                }]
            }
        }
    });
}

export function pushTabBasedApp() {
    Navigation.setRoot({
        root: {
            bottomTabs: {
                children: [{
                    stack: {
                        children: [{
                            component: {
                                name: HOME_SCREEN,
                                options: {
                                    topBar: {
                                        title: {
                                            text: 'Home'
                                        },
                                        leftButtons: [
                                            {
                                                id: 'nav_user_btn',
                                                icon: require('img/icons/ic_nav_user.png'),
                                                color: 'white'
                                            }
                                        ],
                                        rightButtons: [
                                            {
                                                id: 'nav_logout_btn',
                                                icon: require('img/icons/ic_nav_logout.png'),
                                                color: 'white'
                                            }
                                        ]
                                    }
                                }
                            }
                        }],
                        options: {
                            bottomTab: {
                                icon: require('img/icons/ic_tab_home.png'),
                                testID: 'FIRST_TAB_BAR_BUTTON',
                                text: 'Home',
                            }
                        }
                    }
                },
                    {
                        stack: {
                            children: [{
                                component: {
                                    name: TAB1_SCREEN,
                                    options: {
                                        topBar: {
                                            title: {
                                                text: 'TAB 1'
                                            },
                                            leftButtons: [
                                                {
                                                    id: 'nav_user_btn',
                                                    icon: require('img/icons/ic_nav_user.png'),
                                                    color: 'white'
                                                }
                                            ],
                                            rightButtons: [
                                                {
                                                    id: 'nav_logout_btn',
                                                    icon: require('img/icons/ic_nav_logout.png'),
                                                    color: 'white'
                                                }
                                            ]
                                        }
                                    }
                                }
                            }],
                            options: {
                                bottomTab: {
                                    icon: require('img/icons/ic_tab_menu.png'),
                                    testID: 'SECOND_TAB_BAR_BUTTON',
                                    text: 'Tab1',
                                }
                            }
                        }
                    }]
            }
        }
    });
}
