import {StyleSheet} from "react-native";
import mixins from './mixins';

const styles = StyleSheet.create({
    pageContainer: {
        flex:1,
        flexDirection:'column',
        fontSize:mixins.fontSizeNormal,
        padding:40,
        height:'100%',
        width:'100%'
    },
    containerFlexEnd:{
        flex:1,
        flexDirection:'row',
        alignItems:'flex-end'
    },
    formContainer: {
        marginTop:10,
        marginBottom:10,
        justifyContent:'center'
    },
    label: {
        color:mixins.mullieColor,
        fontWeight:'bold',
        marginBottom:5
    },
    lightGrayLabel: {
        color: mixins.lightGray,
        fontWeight:'bold',
        marginBottom:5
    },
    optional: {
      color:'darkgray'
    },
    input: {
        borderWidth:1,
        borderColor:mixins.mediumGray,
        color:mixins.formTextColor,
        padding:10
    },
    inputUnderline: {
        borderBottomWidth:1,
        borderColor:mixins.mediumGray,
        color:mixins.formTextColor,
        paddingTop:10,
        paddingBottom:10
    },
    center: {
      textAlign:'center'
    },
    sublabel: {
        color:mixins.lightGray,
        fontSize:mixins.fontSubSize
    },
    button:{
        backgroundColor:mixins.mullieColor,
        width:'100%',
        height:50,
        justifyContent:'center'
    },
    required: {
        fontSize:mixins.fontSubSize,
        color:mixins.requiredColor
    },
    softText: {
        color:mixins.lightGray,
        fontSize: mixins.fontSubSize
    },
    right: {
        textAlign:'right'
    },
    end: {
        alignSelf: 'flex-end'
    },
    buttonDisabled: {
        opacity:.5
    },
    buttonEnabled: {
        opacity:1
    },
    cursive:{

    },
    fontSizeLarge: {
        fontSize:mixins.fontSizeLarge
    },
    group: {
        marginTop:10,
        marginBottom:10
    }
});

export default styles;
