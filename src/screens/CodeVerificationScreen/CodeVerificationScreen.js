import React, { Component } from 'react';
import {Text, View, TextInput, Button} from 'react-native';
import { Alert }  from 'AppComponents';
import styles from "./styles";

import { codeVerificationScreenActions, coreActions } from 'AppRedux'
import { CODE_VERIFICATION_SCREEN, pushTabBasedApp, pushScreen } from 'AppNavigator';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

class CodeVerificationScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            verificationCode: '',
            userName: props.codeVerificationState.user.userName,
            cognitoUser: props.codeVerificationState.user.result.user
        };

        this.submitCodeVerification = this.submitCodeVerification.bind(this);
        //this.handleInputChange = this.handleInputChange.bind(this);
    }

    submitCodeVerification = async () => {
        try{
            const result = await this.props.actions.sendCodeVerification(this.state);
            if(result.signedUp) {
              this.props.actions.currentScreen(HOME_SCREEN);
              pushTabBasedApp();
            }
        }catch(exception){
            this.props.actions.throwError('Something went wrong. Please try again');
        }
    }

    handleInputChange = (event) => {
        event.persist();
        event.preventDefault();
        const value = event.nativeEvent.text;
        const name = event._targetInst.memoizedProps.name;

        this.setState({
            [name]: value
        });
    }

    render(){
        let alert;
        if(this.props.codeVerificationState && this.props.codeVerificationState.error){
            alert = <Alert message={this.props.codeVerificationState.error.message} />
        } else {
            alert = null;
        }
        return (
            <View style={styles.pageContainer}>
                {alert}
                <View style={styles.formContainer}>
                    <Text style={[styles.label, styles.center]}>VERIFICATION CODE</Text>
                    <TextInput
                        onChange={this.handleInputChange}
                        style={styles.codeVerificationInput}
                        name="verificationCode"
                    />
                </View>

                <View style={styles.containerFlexEnd}>
                    <View style={styles.button}>
                        <Button
                            title="NEXT"
                            color="#F0F0F0"
                            accessibilityLabel="Next"
                            onPress={this.submitCodeVerification}
                        />
                    </View>
                </View>
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    return{
        codeVerificationState: state.codeVerificationState
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions : bindActionCreators({...codeVerificationScreenActions, ...coreActions}, dispatch)
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(CodeVerificationScreen)
