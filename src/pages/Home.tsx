import SignInButton from "../azure/SignInButton";
import React from "react";
import {Box, Typography} from "@mui/material";
import {useIsAuthenticated, useMsal} from "@azure/msal-react";
import SignOutButton from "../azure/SignOutButton";

export default function Home() {
  const isAuth: boolean = useIsAuthenticated();
  const {accounts} = useMsal();
  const account = accounts[0];

  return (
    <Box sx={{display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '4rem'}}>
      {
        (!isAuth || !account) && (
          <>
            <Typography variant='h4' sx={{marginBottom: '1rem'}}>Unnamed Environmental Application</Typography>
            <SignInButton/>
          </>
        )
      }
      {
        isAuth && account && (
          <>
            <Typography>Welcome, {account.name}</Typography>
            <SignOutButton/>
          </>
        )
      }
    </Box>
  );
}