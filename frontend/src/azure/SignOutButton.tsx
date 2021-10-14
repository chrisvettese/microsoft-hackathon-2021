import {IPublicClientApplication} from "@azure/msal-browser";
import {useMsal} from "@azure/msal-react";
import Button from "@mui/material/Button";
import React, {useState} from "react";
import {useHistory} from "react-router-dom";

// Log In, Log Out button
export default function SignOutButton() {
  // Azure client context
  const history = useHistory();
  const [loggingOut, setLoggingOut] = useState(false);
  const {instance} = useMsal();

  async function signOut(instance: IPublicClientApplication) {
    setLoggingOut(true);

    try {
      await instance.logoutPopup();
      history.push('/about');
      window.location.reload();
    } catch (error) {
      console.log(error)
      setLoggingOut(false);
    }
  }

  return (
    <>
      <Button variant='contained' onClick={() => signOut(instance)} disabled={loggingOut} sx={{mx: '1rem'}}>
        Sign Out
      </Button>
    </>
  );
};