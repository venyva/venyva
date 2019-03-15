// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Text, View, TextInput, Alert, TouchableHighlight, Button} from 'react-native';
import { bindActionCreators } from 'redux'
import { loginScreenActions, coreActions } from 'AppRedux'
import { HOME_SCREEN, LOGIN_SCREEN, pushScreen, pushTabBasedApp } from 'AppNavigator';
import PropTypes from 'prop-types';
import styles from "./styles";
import mixins from '../coreStyles/mixins'


class LoginScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formValid: false,
            formData: {
                userName: this.props.loginState.user && this.props.loginState.user.userName ? this.props.loginState.user.userName : '',
                password: this.props.loginState.password ? this.props.loginState.password : ''
            }
        };

    }

    navigateToForgotPasswordScreen = () => {
        Alert.alert('WIP','---- navigtation to forgot password : WIP');
    }

    handleInputChangeFromData = (event) => {
        event.persist();
        event.preventDefault();

        const value = event.nativeEvent.text;
        const name = event._targetInst.memoizedProps.nativeID;
        const formData = {...this.state.formData};
        formData[name] = value;
        this.setState({
          formData
        })

        this.validateForm(formData);
    }

    validateForm = (formData) => {
        if(formData.userName !== ''
            && formData.password !== ''){
            this.setState({
                formValid: true
            })
        } else {
            this.setState({
                formValid: false
            })
        }
    }

    login = async () => {
        if(this.state.formValid){
            try {
                const result = await this.props.actions.login(this.state.formData);
                if(result.error){
                    console.log('---- error', result.error);
                    return false;
                }

                let userPayload = {};

                if(!this.props.loginState.registrationPayload.userName){
                    userPayload.userName = this.state.formData.userName;
                    userPayload.firstName = result.user.attributes.given_name;
                    userPayload.lastName = result.user.attributes.family_name;
                    userPayload.email = result.user.attributes.email;
                    userPayload.handicap = result.user.attributes['custom:handicap'] ? result.user.attributes['custom:handicap'] : null;
                } else {
                    userPayload = this.props.loginState.registrationPayload;
                }
                this.props.actions.registerSuccess(userPayload);


                this.props.actions.currentScreen(HOME_SCREEN);
                pushTabBasedApp();
            } catch(exception){
                this.props.actions.throwError('Could not log you in. Please try again')
            }

        }
    }


    render() {


        return (
            <View style={styles.pageContainer}>
                <Text style={[styles.title, styles.center]}>MULLIE</Text>
                <View style={styles.form}>
                    <View style={styles.formContainer}>
                        <Text style={[styles.label, styles.center]}>USERNAME</Text>
                        <TextInput
                            nativeID="userName"
                            style={styles.input}
                            onChange={this.handleInputChangeFromData}
                            value={this.state.formData.username}
                            spellCheck={false}
                            autoComplete={false}
                        />
                    </View>
                    <View style={styles.formContainer}>
                        <Text style={[styles.label, styles.center]}>PASSWORD</Text>
                        <TextInput
                            placeholder="password"
                            style={styles.input}
                            nativeID="password"
                            onChange={this.handleInputChangeFromData}
                            secureTextEntry={true}
                            value={this.state.formData.password}
                            spellCheck={false}
                            autoComplete={false}
                        />
                    </View>
                    <TouchableHighlight onPress={this.navigateToForgotPasswordScreen}>
                        <Text style={[styles.softText, styles.right]}>Forgot Password</Text>
                    </TouchableHighlight>
                    <View style={styles.containerFlexEnd}>
                        <View style={[styles.button, this.state.formValid ? styles.buttonEnabled : styles.buttonDisabled]}>
                            <Button
                                title="LOG IN"
                                color="#F0F0F0"
                                accessibilityLabel="LOG IN"
                                onPress={this.login}
                                disabled={!this.state.formValid ? true : false}
                            />
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

LoginScreen.propTypes = {

};



const mapStateToProps = (state) => {
    return{
        loginState: state.loginState
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions : bindActionCreators({...loginScreenActions, ...coreActions}, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
