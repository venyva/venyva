import {StyleSheet} from "react-native";
import coreStyles from '../coreStyles/coreStyles';

const styles = StyleSheet.create({
    title: {
        marginTop:100,
        fontSize:65,
        fontWeight: 'bold'
    },
    form: {
        marginTop:30,
        flex:1
    }
});

export default {...styles, ...coreStyles}
