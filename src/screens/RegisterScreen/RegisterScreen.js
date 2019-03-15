import React, { Component } from 'react';
import {Text, View, TextInput, Button, TouchableHighlight, Alert} from 'react-native';
import { Alert as Notification }  from 'AppComponents';
import styles from "./styles.js";
import { registerScreenActions, coreActions } from 'AppRedux'
import { pushScreen, REGISTER_SCREEN, USERNAME_PASSWORD_SCREEN } from 'AppNavigator';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

class RegisterScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formValid: false,
            formData: {
                firstName: props.registerState.registrationPayload ? props.registerState.registrationPayload.firstName : '',
                lastName: props.registerState.registrationPayload ? props.registerState.registrationPayload.lastName : '',
                email: props.registerState.registrationPayload ? props.registerState.registrationPayload.email : '',
                handicap:props.registerState.registrationPayload ? props.registerState.registrationPayload.handicap : '',
                sendingScreen: props.registerState.screen ? props.registerState.screen : REGISTER_SCREEN
            }
        };

    }

    componentDidMount(){
        this.validateForm(this.state.formData);
    }

    submitRegistration =(e) => {
        e.preventDefault();
        this.props.actions.registerSuccess(this.state.formData);
        this.props.actions.currentScreen(USERNAME_PASSWORD_SCREEN);
        pushScreen(
            REGISTER_SCREEN,
            USERNAME_PASSWORD_SCREEN,
            {
                topBar: {
                    title: {
                        text: 'ADD DATA'
                    }
                }
            },
            {
                sendingScreen: REGISTER_SCREEN
            }
            );

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

    openTermsOfService = () => {
        Alert.alert('Pending', 'terms of service WIP');
    }

    validateEmail = (email) => {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/;
        const match = email.match(pattern);
        return Array.isArray(match) && match.length > 0;
    }

    handleEmailValidation = (email) => {
        if(!this.validateEmail(email)){
            this.setState({
                formValid: false
            })
        } else {
            this.validateForm(this.state.formData, email)
        }
    }

    validateForm = (formData, email='') => {
        if(formData.email !== ''
        && formData.firstName !== ''
        && formData.lastName !== ''
        && this.validateEmail(email)){
            this.setState({
                formValid: true
            })
        } else {
            this.setState({
                formValid: false
            })
        }
    }

    render(){
        let alert;
        if(this.props.registerState && this.props.registerState.error){
            alert = <Notification message={this.props.registerState.error.message} />
        } else {
            alert = null;
        }


        return (
            <View style={[styles.pageContainer, styles.pagePadding]}>
                {alert}
                <View style={styles.formContainer}>
                    <Text style={styles.label}>FIRST NAME</Text>
                    <TextInput
                        nativeID="firstName"
                        placeholder="Enter your first name"
                        style={styles.inputUnderline}
                        spellCheck={false}
                        autoComplete={false}
                        onChange={this.handleInputChangeFromData}
                        value={this.state.formData.firstName}
                    />

                </View>
                <View style={styles.formContainer}>
                    <Text style={styles.label}>LAST NAME</Text>
                    <TextInput
                        placeholder="Enter your lastName"
                        style={styles.inputUnderline}
                        nativeID="lastName"
                        spellCheck={false}
                        autoComplete={false}
                        onChange={this.handleInputChangeFromData}
                        value={this.state.formData.lastName}
                    />
                </View>
                <View style={styles.formContainer}>
                    <Text style={styles.label}>EMAIL ADDRESS</Text>
                    <TextInput
                        placeholder="Enter your email address"
                        style={styles.inputUnderline}
                        nativeID="email"
                        keyboardType="email-address"
                        spellCheck={false}
                        autoComplete={false}
                        ref="email"
                        onChangeText={this.handleEmailValidation}
                        onChange={this.handleInputChangeFromData}
                        value={this.state.formData.email}
                    />
                </View>
                <View style={styles.formContainer}>
                    <Text style={[styles.label, styles.optional]}>HANDICAP <Text style={styles.sublabel}>(optional)</Text></Text>
                    <TextInput
                        placeholder="Enter your golf handicap"
                        style={styles.inputUnderline}
                        nativeID="handicap"
                        keyboardType="numeric"
                        onChange={this.handleInputChangeFromData}
                        value={this.state.formData.handicap}
                    />
                </View>
                <View style={styles.containerFlexEnd}>
                    <View style={[styles.button, this.state.formValid ? styles.buttonEnabled : styles.buttonDisabled]}>
                        <Button
                            title="NEXT"
                            color="#F0F0F0"
                            accessibilityLabel="Next"
                            onPress={this.submitRegistration}
                            disabled={!this.state.formValid}
                        />
                    </View>
                </View>
                <View style={styles.terms}>
                    <Text style={[styles.softText, styles.center]}>By tapping NEXT you agree to the following</Text>
                    <TouchableHighlight onPress={this.openTermsOfService}>
                        <Text style={[styles.strong, styles.thick, styles.center]}>Terms of Service and Privacy Policy</Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        registerState: state.registerState
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions : bindActionCreators({...registerScreenActions, ...coreActions}, dispatch)
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)
