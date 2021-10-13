export const config = {
  REACT_APP_AZURE_ACTIVE_DIRECTORY_APP_CLIENT_ID: "7158c3bc-c32d-463f-87b2-bf5a0cbf0cfe",
  redirectUri: "http://localhost:3000"
}

export const msalConfig = {
  auth: {
    clientId: config.REACT_APP_AZURE_ACTIVE_DIRECTORY_APP_CLIENT_ID,
    authority: "https://login.microsoftonline.com/consumers",
    redirectUri: config.redirectUri,
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
  