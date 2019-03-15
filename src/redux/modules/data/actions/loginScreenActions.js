
import {
    CURRENT_SCREEN
} from '../actionTypes';
import {setUser, throwError, clearError} from "./coreActions";
import AWS_userpool_login from "../actionRequests/aws_userpool_login";


/**
 * THUNKS
 */
export function login(payload) {
    console.log('--payload LOGIN ---> ', payload)
    return (async dispatch => {
        try{
            const resultFromLogin = await AWS_userpool_login(payload);
            console.log('resultFromLogin', resultFromLogin)
            if(resultFromLogin.error){
                return dispatch(throwError('There was a problem fetching your information. Please try again later.'))
            }
            if(resultFromLogin.attributes) {
                clearError({})
                return dispatch(setUser(resultFromLogin));
            } else {
                throw Error('userName was not returned')
                return dispatch(throwError('There was a problem logging you in. Please try again later'))
            }
        } catch(exception){
            console.log('--- exeption ----', exception)
            return dispatch(throwError(exception.error.message))
        }
    });
};
