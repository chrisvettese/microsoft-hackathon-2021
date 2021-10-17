import {Box, Typography} from "@mui/material";
import {useIsAuthenticated, useMsal} from "@azure/msal-react";
import {useHistory, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {initializeUser} from "./requests/InitializeUser";
import {LocationState} from "./Util";
import Registration from "./Registration";

export default function Home() {
  const history = useHistory();
  const location = useLocation<LocationState>();

  const [registering, setRegistering] = useState(false);

  const isAuth: boolean = useIsAuthenticated();
  const {accounts, inProgress} = useMsal();
  const account = accounts[0];

  const signedIn = isAuth && account;



  useEffect(() => {
    if (!signedIn && (inProgress === 'none')) {
      history.push('/about');
    } else if (signedIn) {
      if (location.state.signedIn) {
        // @ts-ignore
        initializeUser(location.state.accessToken, account.idTokenClaims.oid, account.username).then(result => {
          if (result === true) {
            setRegistering(true);
          }
        });
      }
    }
  }, [history, signedIn, isAuth, inProgress, account, location.state]);

  return (
    <>
      {
        signedIn && (
          <>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1rem'}}>
              <Typography>Welcome, {account.name}</Typography>
              {
                registering && <Registration/>
              }
            </Box>
          </>
        )
      }
    </>
  );
}