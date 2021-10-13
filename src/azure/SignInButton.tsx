import {AccountInfo, AuthenticationResult, IPublicClientApplication} from "@azure/msal-browser";
import {loginRequest} from "./azure-auth-config";
import {useMsal} from "@azure/msal-react";
import Button from "@mui/material/Button";
import Microsoft from '../assets/microsoft.png';
import {styled} from "@mui/material";
import React, {useState} from "react";

const MicroIcon = styled('img')({
  width: '20px'
})

interface Props {
  setAccount: React.Dispatch<React.SetStateAction<AccountInfo | null>>;
}

// Log In, Log Out button
function SignInButton({setAccount}: Props) {
  // Azure client context
  const [loggingIn, setLoggingIn] = useState(false);
  const {instance} = useMsal();

  async function handleLogin(instance: IPublicClientApplication) {
    setLoggingIn(true);

    try {
      const result: AuthenticationResult = await instance.loginPopup(loginRequest);
      if (!result.account) {
        console.log('Error: failed to sign in')
        setLoggingIn(false);
      }
      setAccount(result.account);
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

export default SignInButton;