import {TextField, Typography} from "@mui/material";
import React, {ChangeEvent, useState} from "react";
import {getNewTransit, Transit} from "./TransitForm";

export default function Registration() {
  const [username, setUsername] = useState('');
  const [transitForms, setTransitForms] = useState<Transit[]>([getNewTransit(0)]);

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  }

  return (
    <>
      <Typography variant='h6' sx={{my: '1rem'}}>Please complete the registration process:</Typography>
      <TextField variant='outlined' value={username} onChange={handleUsernameChange} label='Username'/>
    </>
  );
}