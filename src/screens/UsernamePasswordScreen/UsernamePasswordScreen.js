import React, { Component } from 'react';
import {Text, View, TextInput, Button} from 'react-native';
import styles from "./styles.js";

import { usernamePasswordScreenActions, coreActions } from 'AppRedux'

import { pushScreen, CODE_VERIFICATION_SCREEN, USERNAME_PASSWORD_SCREEN } from 'AppNavigator';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class UsernamePasswordScreen extends Component {

    constructor(props){
        super(props);

        this.state = {
            formData: {
                userName: this.props.usernamePasswordState.registrationPayload.username ? this.props.usernamePasswordState.registrationPayload.username : '',
                password: ''
            },
            passwordConfirm: '',
            formValid: false
        }
    }

    signUpUser = async () => {
        try{
            const { registrationPayload } = this.props.usernamePasswordState;
            const payload = {...registrationPayload, ...this.state.formData};
            this.props.actions.registerSuccess(payload);
            const result = await this.props.actions.signup(payload);
            if(result.user.userName){
                this.props.actions.currentScreen(CODE_VERIFICATION_SCREEN);
                pushScreen(USERNAME_PASSWORD_SCREEN, CODE_VERIFICATION_SCREEN,
                    {
                        topBar: {
                            title: {
                                text: 'Verify'
                            }
                        }
                    },
                    {
                        sendingScreen: USERNAME_PASSWORD_SCREEN
                    }
                )
            } else {
                this.props.actions.throwError('Something went wrong. Please try again.')
            }
        } catch(exception){
            //todo: // add logger for future debuging
            this.props.actions.throwError('Something went wrong. Please try again.')
        }

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
        });
    }

    handleInputChange = (event) => {
        event.persist();
        event.preventDefault();

        const value = event.nativeEvent.text;
        const name = event._targetInst.memoizedProps.nativeID;

        this.setState({
            [name]: value
        });
    }

    validatePassword = (text) => {

        let match = false;

        const password = this.state.formData.password !== '' ? this.state.formData.password : null;

        if(password){
            password === text ? match = true : match = false;
        }

        if(match){
            this.setState({
                ['formValid']: true
            });
        } else {
            this.setState({
                ['formValid']: false
            });
        }

    }

    render(){

        return (
            <View style={styles.pageContainer}>
                <View style={styles.form}>
                    <View style={styles.formContainer}>
                        <Text style={[styles.label, styles.center]}>USERNAME</Text>
                        <TextInput
                            placeholder="@"
                            nativeID="userName"
                            style={styles.input}
                            onChange={this.handleInputChangeFromData}
                        />
                    </View>
                    <View style={styles.passwordConfirm}>
                        <View style={styles.formContainer}>
                            <Text style={[styles.label, styles.center]}>PASSWORD</Text>
                            <TextInput
                                placeholder="password"
                                style={styles.input}
                                nativeID="password"
                                onChange={this.handleInputChangeFromData}
                                secureTextEntry={true}
                            />
                        </View>
                        <View style={styles.formContainer}>
                            <Text style={[styles.center, this.state.formValid ? styles.label : styles.lightGrayLabel ]}>CONFIRM PASSWORD</Text>
                            <TextInput
                                placeholder="password"
                                style={styles.input}
                                nativeID="passwordConfirm"
                                onChange={this.handleInputChange}
                                onChangeText={this.validatePassword}
                                secureTextEntry={true}
                            />
                        </View>
                    </View>
                    <View style={styles.containerFlexEnd}>
                        <View style={[styles.button, this.state.formValid ? styles.buttonEnabled : styles.buttonDisabled]}>
                            <Button
                                title="JOIN"
                                color="#F0F0F0"
                                accessibilityLabel="NEXT"
                                onPress={this.signUpUser}
                                disabled={!this.state.formValid}

                            />
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    return{
        usernamePasswordState: state.usernamePasswordState
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions : bindActionCreators({...usernamePasswordScreenActions, ...coreActions}, dispatch)
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(UsernamePasswordScreen)

