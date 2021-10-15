import {Box, Typography} from "@mui/material";
import {useIsAuthenticated, useMsal} from "@azure/msal-react";
import {useHistory} from "react-router-dom";
import {useEffect} from "react";

export default function Home() {
  const history = useHistory();
  const isAuth: boolean = useIsAuthenticated();
  const {accounts, inProgress} = useMsal();
  const account = accounts[0];

  const signedIn = isAuth && account;

  useEffect(() => {
    if (!signedIn && (inProgress === 'none')) {
      history.push('/about');
    }
  }, [history, signedIn, isAuth, inProgress])


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