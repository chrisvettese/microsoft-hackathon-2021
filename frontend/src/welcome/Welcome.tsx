import {AppBar, Box, Toolbar, Typography} from "@mui/material";
import {useMsal} from "@azure/msal-react";
import MenuBar from "./MenuBar";

export default function Welcome() {
  const {accounts} = useMsal();
  const account = accounts[0];

  return (
    <>
      <MenuBar/>
      <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1rem'}}>
        <Typography>Welcome, {account.name}</Typography>
      </Box>
    </>
  );
}