import {StyleSheet} from "react-native";
import coreStyles from '../coreStyles/coreStyles';

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default {...styles, ...coreStyles}
