import {StyleSheet} from "react-native";
import coreStyles from '../coreStyles/coreStyles';

const styles = StyleSheet.create({
    pagePadding: {
        padding:10
    },
    terms: {
        marginTop:50,
        marginBottom:30
    }
});

export default {...styles, ...coreStyles}

