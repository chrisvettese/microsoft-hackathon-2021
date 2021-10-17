import {TextField, Typography} from "@mui/material";
import React, {ChangeEvent, useEffect, useState} from "react";
import TransitForm, {getNewTransit, Transit} from "./TransitForm";
import getTransitMethods from "./requests/GetTransitMethods";
import {LocationState} from "./Util";
import {useLocation} from "react-router-dom";

export default function Registration() {
  const location = useLocation<LocationState>();
  const [username, setUsername] = useState('');
  const [transitForms, setTransitForms] = useState<Transit[]>([getNewTransit(0)]);

  useEffect(() => {
    const transitMethods = getTransitMethods(location.state.accessToken);
    console.log(transitMethods);
  }, []);

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  }

  return (
    <>
      <Typography variant='h6' sx={{my: '1rem'}}>Please complete the registration process:</Typography>
      <TextField variant='outlined' value={username} onChange={handleUsernameChange} label='Username'/>
      <TransitForm transitForms={transitForms} setTransitForms={setTransitForms} transitMethodNames={}/>
    </>
  );
}