import config from '../../../../config';
import AWS from 'aws-sdk';
import { CognitoUser, CognitoUserPool, AuthenticationDetails } from "amazon-cognito-identity-js";
import { init } from '../userPoolUtils';

/**
 *
 * @param payload [
 * userName, password
 * ]
 * @return {Promise<any> | Promise}
 */
export default (payload) => {
    console.log('AWS login ----> ', payload);
    return new Promise((resolve, reject) => {
        setUpAwsCreds(payload)
        AWS.config.credentials.get(async function(error) {
            if (error) {
                console.log(error, error.stack);
                reject({
                    message: 'Failed logging in',
                    error: error,
                    method: 'AWS.config.credentials.get'
                })
            } else {
                init();
                try {
                    const authenticationData = {
                        Username : payload.userName,
                        Password : payload.password,
                    };
                    const authenticationDetails = new AuthenticationDetails(authenticationData);
                    const poolData = { UserPoolId : config.USER_POOL.pool_Id,
                        ClientId : config.appClientId
                    };
                    const userPool = new CognitoUserPool(poolData);
                    const userData = {
                        Username : payload.userName,
                        Pool : userPool
                    };
                    const cognitoUser = new CognitoUser(userData);
                    cognitoUser.authenticateUser(authenticationDetails, {
                        onSuccess: function (result) {
                            const userpoolAccessToken = result.getAccessToken().getJwtToken();
                            /* Use the idToken for Logins Map when Federating User Pools with identity pools or when passing through an Authorization Header to an API Gateway Authorizer*/
                            const idToken = result.idToken.jwtToken;


                            cognitoUser.getUserAttributes(function(getUserAttributesError, result) {

                                const fetchedUserAttributes = {};

                                if (getUserAttributesError) {
                                    reject({
                                        userpoolAccessToken,
                                        idToken,
                                        error:getUserAttributesError
                                    })
                                    return;
                                }

                                for (let i = 0; i < result.length; i++) {
                                    const name = result[i].getName();
                                    const value = result[i].getValue();
                                    fetchedUserAttributes[name] = value;
                                }

                                resolve({
                                    userpoolAccessToken,
                                    idToken,
                                    attributes: {...fetchedUserAttributes}
                                })
                            });
                        },

                        onFailure: function(error) {
                            reject({
                                error
                            })
                        },

                    });
                } catch(exception){
                    reject({
                        error: exception
                    })
                }

            }
        });


    })
}

function setUpAwsCreds() {
    let _creds = {
        IdentityPoolId: config.IDENTITY_POOL.pool_id
    };
    AWS.config.update({
        credentials: new AWS.CognitoIdentityCredentials(_creds),
        region: 'us-east-1'
    });
}
