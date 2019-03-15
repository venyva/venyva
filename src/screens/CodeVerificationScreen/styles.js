import {StyleSheet} from "react-native";
import coreStyles from '../coreStyles/coreStyles';

const styles = StyleSheet.create({
    codeVerificationInput: {
        padding:10,
        color:'#000',
        fontWeight:'bold',
        borderWidth:1,
        borderColor: "#696969"
    }
});

export default {...styles, ...coreStyles}
