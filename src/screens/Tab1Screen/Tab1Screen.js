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
import { bindActionCreators } from 'redux'
import {connect} from "react-redux";
import { coreActions } from 'AppRedux';

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

class Tab1Screen extends PureComponent {

    constructor(props) {
        super(props);

        Navigation.events().bindComponent(this);
    }

    navigationButtonPressed({ buttonId }) {
        const { data } = this.props;

        switch (buttonId) {
            case 'nav_logout_btn': {
                pushWelcomeScreen();
                break;
            }
            case 'nav_user_btn': {
                Alert.alert(get(data, 'user.name', 'Unknown User'));
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
                    Tab 1 Screen
                </Text>
            </View>
        );
    }
}

// Tab1Screen.propTypes = {
//     data: PropTypes.shape({}).isRequired
// };


const mapStateToProps = (state) => {
    return{
        registerState: state.codeVerificationState
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions : bindActionCreators(coreActions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Tab1Screen)
