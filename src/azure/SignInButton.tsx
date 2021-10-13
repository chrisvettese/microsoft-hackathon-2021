import {IPublicClientApplication} from "@azure/msal-browser";
import {loginRequest} from "./azure-auth-config";
import {UnauthenticatedTemplate, useIsAuthenticated, useMsal} from "@azure/msal-react";
import Button from "@mui/material/Button";


function handleLogin(instance: IPublicClientApplication) {
  instance.loginPopup(loginRequest).catch(e => {
    console.error(e);
  });
}


// Log In, Log Out button
const SignInButton = (): JSX.Element => {
  // Azure client context
  const {instance} = useMsal()
  const isAuth = useIsAuthenticated();


  return (
    <div id="authentication">
      <Button className="ml-auto" onClick={() => handleLogin(instance)} disabled={isAuth}>Sign in using Popup</Button>
    </div>
  );
};

export default SignInButton;