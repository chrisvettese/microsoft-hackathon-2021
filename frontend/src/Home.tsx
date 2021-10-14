import SignInButton from "./azure/SignInButton";
import {Box, Typography} from "@mui/material";
import {useIsAuthenticated, useMsal} from "@azure/msal-react";
import Welcome from "./welcome/Welcome";

export default function Home() {
  const isAuth: boolean = useIsAuthenticated();
  const {accounts} = useMsal();
  const account = accounts[0];

  return (
    <>
      {
        (!isAuth || !account) && (
          <Box sx={{display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '4rem'}}>
            <>
              <Typography variant='h4' sx={{marginBottom: '1rem'}}>Unnamed Environmental Application</Typography>
              <SignInButton/>
            </>
          </Box>
        )
      }
      {
        isAuth && account && <Welcome/>
      }
    </>
  );
}