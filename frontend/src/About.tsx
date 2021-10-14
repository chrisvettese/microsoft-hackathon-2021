import {Box, Typography} from "@mui/material";
import SignInButton from "./azure/SignInButton";
import {useIsAuthenticated, useMsal} from "@azure/msal-react";
import MenuBar from "./MenuBar";

export default function About() {
  const isAuth: boolean = useIsAuthenticated();
  const {accounts} = useMsal();
  const account = accounts[0];
  const signedIn = isAuth && account;

  return (
    <>
      <Box sx={{display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '4rem'}}>
        <>
          <Typography variant='h4' sx={{marginBottom: '1rem'}}>Unnamed Environmental Application</Typography>
          {
            !signedIn && <SignInButton/>
          }
        </>
      </Box>
    </>
  );
}