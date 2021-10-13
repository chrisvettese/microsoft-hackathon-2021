import { IPublicClientApplication } from "@azure/msal-browser";
import { loginRequest } from "./azure-auth-config";
import { useMsal } from "@azure/msal-react";
import Button from "@mui/material/Button";


function handleLogin(instance: IPublicClientApplication) {
    instance.loginPopup(loginRequest).catch(e => {
        console.error(e);
    });
}



// Log In, Log Out button
const AzureAuthenticationButton = ({ onAuthenticated }: any): JSX.Element => {
    // Azure client context
    const { instance } = useMsal()

    return (
        <div id="authentication">
            <Button className="ml-auto" onClick={() => handleLogin(instance)}>Sign in using Popup</Button>
        </div>
    );
};

export default AzureAuthenticationButton;