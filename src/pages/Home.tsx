import SignInButton from "../azure/SignInButton";
import React, {useState} from "react";
import {Box, Typography} from "@mui/material";
import {useIsAuthenticated} from "@azure/msal-react";
import {AccountInfo} from "@azure/msal-browser";

export default function Home() {
  const isAuth: boolean = useIsAuthenticated();
  const [account, setAccount] = useState<AccountInfo | null>(null);

  return (
    <Box sx={{display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '4rem'}}>
      {
        (!isAuth || !account) && (
          <>
            <Typography variant='h4' sx={{marginBottom: '1rem'}}>Unnamed Environmental Application</Typography>
            <SignInButton setAccount={setAccount}/>
          </>
        )
      }
      {
        isAuth && account && (
          <>
            <Typography>Welcome, {account.name}</Typography>
          </>
        )
      }
    </Box>
  );
}