import {StyleSheet} from 'react-native';

const base = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
        flex: 1,
        flexDirection:'column',
        padding:30
    },
    content: {
        height:200
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333'
    },
    imageContainer: {
    }
})

export default base;