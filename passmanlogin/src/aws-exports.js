export default {
  Auth: {
    // REQUIRED - Amazon Cognito Identity Pool ID
    identityPoolId: "us-west-2:7cdf5461-24e4-4ce9-a395-db94a7b0b6de",
    // REQUIRED - Amazon Cognito Region
    region: "us-west-2",
    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: "us-west-2_IpgHoc1x4",
    // OPTIONAL - Amazon Cognito Web Client ID
    userPoolWebClientId: "79q2prquo1n5diibu84urr0sef",
    // OPTIONAL - Auth flow type, this will not send user credentials to the backend
    authenticationFlowType: "USER_SRP_AUTH",

    cookieStorage: {
      // REQUIRED - Cookie domain (only required if cookieStorage is provided)
      domain: "ramosruiz.com",
      // OPTIONAL - Cookie path
      path: "/",
      // OPTIONAL - Cookie expiration in days
      expires: 7,
      // OPTIONAL - Cookie secure flag
      // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
      secure: true
    }
  }
};
