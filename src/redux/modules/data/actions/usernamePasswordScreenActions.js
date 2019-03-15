import AWS_sign_up from "../actionRequests/aws_sign_up";
import {setUser, throwError, clearError} from "./coreActions";



/**
 * THUNKS
 */
export function signup(payload) {
    console.log('--payload ---> ', payload)
    return (async dispatch => {
        try{
            const resultFromLogin = await AWS_sign_up(payload);
            if(resultFromLogin.userName) {
                clearError({})
                return dispatch(setUser(resultFromLogin));
            } else {
                throw Error('userName was not returned')
            }
        } catch(exception){
            console.log('--- eception ----', exception)
            return dispatch(throwError(exception ? exception : {message: 'Error thrown'}))
        }
    });
};

