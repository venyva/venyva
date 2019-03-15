import config from '../../../../config';
import { CognitoIdentityServiceProvider } from "aws-sdk";

export default (payload) => {

    return new Promise((resolve, reject) => {
        console.log('--x -> payload for code verification', payload)

        const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider({ apiVersion: '2016-04-19', region: 'us-east-1' });
        const  params = {
            ClientId: config.appClientId, /* required */
            ConfirmationCode: payload.verificationCode, /* required */
            Username: payload.userName, /* required */
            AnalyticsMetadata: {
                AnalyticsEndpointId: 'VERIFIED_USER_CONFIRMATION_CODE'
            },
            ForceAliasCreation: true
        };
        cognitoIdentityServiceProvider.confirmSignUp(params, function(error, data) {
            if (error){
                console.log(error, error.stack); // an error occurred
                reject({
                    signup:false,
                    error
                });
            } else {
                console.log(data);           // successful response
                resolve({
                    signup:true,
                    data
                });
            }
        });


    })
}
