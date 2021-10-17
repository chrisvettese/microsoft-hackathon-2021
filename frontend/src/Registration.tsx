import {MenuItem, Select, SelectChangeEvent, TextField, Typography} from "@mui/material";
import React, {ChangeEvent, useEffect, useState} from "react";
import TransitForm, {getNewTransit, Transit} from "./TransitForm";
import getTransitMethods, {ServerTransitMethod} from "./requests/GetTransitMethods";
import {LocationState} from "./Util";
import {useLocation} from "react-router-dom";
import getProvinces, {ServerProvince} from "./requests/GetProvinces";

export default function Registration() {
  const location = useLocation<LocationState>();
  const [username, setUsername] = useState('');

  const [provinces, setProvinces] = useState<ServerProvince[]>([]);
  const [province, setProvince] = useState('');

  const [transitForms, setTransitForms] = useState<Transit[]>([getNewTransit(0)]);
  const [transitMethods, setTransitMethods] = useState<ServerTransitMethod[]>();


  useEffect(() => {
    if (!transitMethods) {
      Promise.all([
        getTransitMethods(location.state.accessToken), getProvinces(location.state.accessToken)])
        .then(([transitMethods, provinceData]) => {
          setTransitMethods(transitMethods);
          setProvinces(provinceData);
        });
    }
  }, [location.state.accessToken, transitMethods, provinces]);

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  }

  const handleProvinceChange = (event: SelectChangeEvent<string>) => {
    setProvince(event.target.value);
  }

  return (
    <>
      <Typography variant='h6' sx={{my: '1rem'}}>Please complete the registration process:</Typography>
      {
        transitMethods && (
          <>
            <TextField variant='outlined' value={username} onChange={handleUsernameChange} label='Username'/>
            <Select
              value={province}
              label="Province/State"
              onChange={handleProvinceChange}
            >
              {
                provinces.map(province => {
                  return (
                    <MenuItem value={province.id}>{province.name}</MenuItem>
                  )
                })
              }
            </Select>
            <TransitForm transitForms={transitForms} setTransitForms={setTransitForms}
                         transitMethods={transitMethods}/>
          </>
        )
      }
    </>
  );
}