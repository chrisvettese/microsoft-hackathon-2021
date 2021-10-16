import {AuthenticationResult, IPublicClientApplication} from "@azure/msal-browser";
import {loginRequest} from "./azure-auth-config";
import {useMsal} from "@azure/msal-react";
import Button from "@mui/material/Button";
import Microsoft from '../assets/microsoft.png';
import {styled} from "@mui/material";
import React, {useState} from "react";
import {useHistory} from "react-router-dom";

const MicroIcon = styled('img')({
  width: '20px'
});

// Log In, Log Out button
export default function SignInButton() {
  const history = useHistory();
  // Azure client context
  const [loggingIn, setLoggingIn] = useState(false);
  const {instance} = useMsal();

  async function handleLogin(instance: IPublicClientApplication) {
    setLoggingIn(true);

    try {
      const result: AuthenticationResult = await instance.loginPopup(loginRequest);
      if (!result.account) {
        console.log('Error: failed to sign in');
        setLoggingIn(false);
        return;
      }
      history.push('', {accessToken: result.accessToken, signedIn: true});

    } catch (error) {
      console.log(error)
      setLoggingIn(false);
    }
  }

  return (
    <>
      <Button variant='contained' startIcon={<MicroIcon src={Microsoft} alt='Microsoft Icon'/>}
              onClick={() => handleLogin(instance)} disabled={loggingIn}>Sign in with Microsoft</Button>
    </>
  );
};