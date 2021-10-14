import {Box, Typography} from "@mui/material";
import {useIsAuthenticated, useMsal} from "@azure/msal-react";
import {useHistory} from "react-router-dom";
import MenuBar from "./MenuBar";
import {useEffect} from "react";

export default function Home() {
  const history = useHistory();
  const isAuth: boolean = useIsAuthenticated();
  const {accounts} = useMsal();
  const account = accounts[0];

  const signedIn = isAuth && account;

  useEffect(() => {
    if (!signedIn) {
      history.push('/about');
    }
  }, [history, signedIn])


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