import {StyleSheet} from "react-native";
import coreStyles from '../coreStyles/coreStyles';
import mixins from '../coreStyles/mixins';

const styles = StyleSheet.create({
    title: {
        marginTop:100,
        fontSize:mixins.fontSizeXLarge,
        fontWeight: 'bold'
    },
    subtitle: {
        fontSize:mixins.h3,
        fontWeight:'bold'
    },
    title: {
        marginTop:100,
        fontSize:mixins.fontSizeXLarge,
        fontWeight: 'bold'
    },
    strong: {
        fontWeight:'bold'
    },
    thick: {
    },
    inline: {
        marginTop:30,
        flexDirection:'row',
        justifyContent:'center'
    }
});

export default {...styles, ...coreStyles}
