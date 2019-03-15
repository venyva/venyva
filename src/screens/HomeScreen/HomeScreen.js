// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    View,
    Text,
    Alert
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { get } from 'lodash';
import { pushWelcomeScreen } from 'AppNavigator';

import {connect} from "react-redux";
import { bindActionCreators } from 'redux'
import { coreActions } from 'AppRedux';
import styles from './styles'

class HomeScreen extends PureComponent {

    constructor(props) {
        super(props);

        Navigation.events().bindComponent(this);
    }

    navigationButtonPressed({ buttonId }) {
        const { data } = this.props;

        switch (buttonId) {
            case 'nav_logout_btn': {
                this.props.actions.logout(this.props.homeState.user);
                pushWelcomeScreen();
                break;
            }
            case 'nav_user_btn': {
                const user = {};
                const records = this.props.homeState.user.records;
                for(let i = 0; i < records.length; i++){
                    user[records[i].Key] = records[i].Value;
                }
                console.log('------ user shown -> ', user)
                Alert.alert('Userinfo ',
                    `User Name: ${user["userName"]} \n First Name: ${user["firstName"]} \n Last Name: ${user["lastName"]} \n Email Address: ${user["email"]} \n Handicap: ${user["handicap"]} Is a Business : ${user["isBusiness"]} \n Has a profile pic : Yes
                `);
                break;
            }
            default:
                break;
        }
    }

    render() {
        return (
            <View style={styles.flex}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                    Home Screen
                </Text>
            </View>
        );
    }
}

// HomeScreen.propTypes = {
//     data: PropTypes.shape({}).isRequired
// };


const mapStateToProps = (state) => {
    return{
        homeState: state.homeState
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions : bindActionCreators(coreActions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
