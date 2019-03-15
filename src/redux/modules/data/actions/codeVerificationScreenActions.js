
import {
    CODE_VERIFICATION_SUCCESS,
    CODE_VERIFICATION_IN_PROGRESS
} from '../actionTypes';
import {throwError, clearError} from "./coreActions";
import AWS_verify_code from "../actionRequests/aws_verify_code";


export function codeVerificationSuccess() {
    return {
        type: CODE_VERIFICATION_SUCCESS,
        signedUp: true
    }
}

export function codeVerificationInProgress(){
    return {
        type: CODE_VERIFICATION_IN_PROGRESS
    }
}


/**
 * THUNKS
 */
export function sendCodeVerification(payload) {
    console.log('--payload code verifictation ---> ', payload)
    return (async dispatch => {
        try{
            const resultFromCodeVerification = await AWS_verify_code(payload);
            console.log('--- result from code verification', resultFromCodeVerification)
            if(resultFromCodeVerification.signup) {
                clearError({})
                return dispatch(codeVerificationSuccess());
            } else {
                throw Error('Signup returned false')
            }
        } catch(exception){
            console.log('--- exception ----', exception)
            return dispatch(throwError(exception ? exception : {message: 'Error thrown'}))
        }
    });
};
