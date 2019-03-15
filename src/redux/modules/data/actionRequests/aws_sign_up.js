import config from '../../../../config';
import {Config, CognitoIdentityCredentials} from "aws-sdk";
import {
    CognitoUserPool,
    CognitoUserAttribute
} from "amazon-cognito-identity-js";

export default (payload) => {
    Config.region = config.region;
    Config.credentials = new CognitoIdentityCredentials({
        IdentityPoolId: config.IDENTITY_POOL.pool_id
    });

    const userPool = new CognitoUserPool({
        UserPoolId: config.USER_POOL.pool_Id,
        ClientId: config.appClientId,
    });

    return new Promise((resolve, reject) => {
        const userName = payload.userName.trim();
        const password = payload.password.trim();
        const handicap = typeof payload.handicap === "number" ? payload.handicap : Number(payload.handicap);
        const attributeList = [
            new CognitoUserAttribute({
                Name: 'email',
                Value: payload.email.trim(),
            }),
            new CognitoUserAttribute({
                Name: 'family_name',
                Value: payload.lastName.trim(),
            }),
            new CognitoUserAttribute({
                Name: 'given_name',
                Value: payload.firstName.trim(),
            }),
            new CognitoUserAttribute({
                Name: 'name',
                Value: `${payload.firstName.trim()} ${payload.lastName.trim()}`,
            }),
            new CognitoUserAttribute({
                Name: 'custom:handicap',
                Value: payload.handicap !== NaN ? payload.handicap : 0
            }),
        ];

        userPool.signUp(userName, password, attributeList, null, (error, result) => {
            if (error) {
                console.log(error);
                reject(error)
                return;
            }
            resolve({
                userName: result.user.getUsername(),
                result
            });
        });

    })
}
