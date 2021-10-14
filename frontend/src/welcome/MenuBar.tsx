import {AppBar, Box, Button, IconButton, Menu, MenuItem, styled, Toolbar, Typography} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";
import {MouseEvent, useState} from "react";
import SignOutButton from "../azure/SignOutButton";
import {useMsal} from "@azure/msal-react";

const MenuButton = styled(Button)({
  color: 'white',
  background: 'rgba(0, 0, 0, 0)',
  textTransform: 'none'
});

export default function MenuBar() {
  const {accounts} = useMsal();
  const account = accounts[0];

  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const handleMenu = (event: MouseEvent) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <MenuButton>Home</MenuButton>
        <MenuButton>About</MenuButton>
        <MenuButton>Eco Setup</MenuButton>
        <MenuButton>Leaderboard</MenuButton>
        <IconButton
          size="large"
          onClick={handleMenu}
          color="inherit"
          sx={{marginLeft: 'auto'}}
        >
          <AccountCircle/>
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <Typography variant='h6' sx={{px: '1rem'}}>Profile</Typography>
          <Typography sx={{px: '1rem', py: '0.5rem'}}>{account.name}</Typography>
          <Typography sx={{px: '1rem', paddingBottom: '0.5rem'}}>{account.username}</Typography>
          <Box onClick={handleClose}>
            <SignOutButton/>
          </Box>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}