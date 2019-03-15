import React, { Component } from 'react';
import {Text, View, Button, TouchableHighlight} from 'react-native';
import styles from "./styles.js";

import { welcomeScreenActions, coreActions, loginScreenActions } from 'AppRedux'

import { pushScreen, REGISTER_SCREEN, WELCOME_SCREEN, LOGIN_SCREEN, HOME_SCREEN, pushTabBasedApp } from 'AppNavigator';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class WelcomeScreen extends Component {

    constructor(props){
        super(props);

        this.state = {
            token: ''
        }
    }

    navigateToRegisterScreen = () => {

        if(this.props.welcomeState
            && this.props.welcomeState.user
            && this.props.welcomeState.user.userName){
            this.props.actions.currentScreen(HOME_SCREEN);
            pushTabBasedApp();
            return false;
        }
        this.props.actions.currentScreen(REGISTER_SCREEN)
        pushScreen(WELCOME_SCREEN, REGISTER_SCREEN, {
            topBar: {
                title: {
                    text: 'JOIN NOW'
                }
            }
        });
    }

    navigateToLoginScreen = () => {
        if(this.props.welcomeState
            && this.props.welcomeState.user
            && this.props.welcomeState.user.userName){
            this.props.actions.currentScreen(HOME_SCREEN);
            pushTabBasedApp();
            return false;
        }
        this.props.actions.currentScreen(LOGIN_SCREEN);
        pushScreen(WELCOME_SCREEN, LOGIN_SCREEN,
            { topBar: { visible: false } },
            { sendingScreen: WELCOME_SCREEN }
        );
    }


 render(){

     return (
         <View style={styles.pageContainer}>
             <Text style={[styles.title, styles.center]}>MULLIE</Text>
             <View style={styles.containerFlexEnd}>
                 <View style={styles.button}>
                     <Button
                         title="JOIN"
                         color="#F0F0F0"
                         accessibilityLabel="JOIN"
                         onPress={this.navigateToRegisterScreen}
                     />
                 </View>
             </View>
             <View style={styles.inline}>
                 <Text style={styles.strong}>Already a member?</Text>
                 <TouchableHighlight onPress={this.navigateToLoginScreen}>
                     <Text style={[styles.strong, styles.thick]}>Log in</Text>
                 </TouchableHighlight>
             </View>
         </View>
     )
 }
}


const mapStateToProps = (state) => {
    return{
        welcomeState: state.welcomeState
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions : bindActionCreators({...welcomeScreenActions, ...coreActions}, dispatch)
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen)

