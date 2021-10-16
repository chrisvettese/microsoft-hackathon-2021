import {Box, Typography} from "@mui/material";
import {useIsAuthenticated, useMsal} from "@azure/msal-react";
import {useHistory, useLocation} from "react-router-dom";
import {useEffect} from "react";
import {initializeUser} from "./azure/InitializeUser";
import {LocationState} from "./Util";

export default function Home() {
  const history = useHistory();
  const location = useLocation<LocationState>();

  const isAuth: boolean = useIsAuthenticated();
  const {accounts, inProgress} = useMsal();
  const account = accounts[0];

  const signedIn = isAuth && account;

  useEffect(() => {
    if (!signedIn && (inProgress === 'none')) {
      history.push('/about');
    } else if (signedIn){
      // @ts-ignore
      initializeUser(location.state.accessToken, account.idTokenClaims.oid).then(result => {
        console.log(result);
      });
    }
  }, [history, signedIn, isAuth, inProgress, account, location.state]);

  return (
    <>
      {
        signedIn && (
          <>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1rem'}}>
              <Typography>Welcome, {account.name}</Typography>
            </Box>
          </>
        )
      }
    </>
  );
}