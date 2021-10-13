import config from '../config'

export const msalConfig = {
    auth: {
      clientId: config.config.REACT_APP_AZURE_ACTIVE_DIRECTORY_APP_CLIENT_ID,
      authority: "https://login.microsoftonline.com/consumers",
      redirectUri: "https://3001-black-alpaca-x6f5wu70.ws-us18.gitpod.io/",
    },
    cache: {
      cacheLocation: "sessionStorage", // This configures where your cache will be stored
      storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    }
  };
  
  // Add scopes here for ID token to be used at Microsoft identity platform endpoints.
  export const loginRequest = {
   scopes: ["User.Read"]
  };
  
  // Add the endpoints here for Microsoft Graph API services you'd like to use.
  export const graphConfig = {
      graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
  };
  