import React from 'react';
import {Text, View} from 'react-native';
import styles from "./styles.js";

const Alert = (props) => {
    return(
        <View styles={styles.container}>
            <Text>{props.message}</Text>
        </View>
    )
}

export default Alert;
