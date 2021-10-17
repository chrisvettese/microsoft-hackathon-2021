import {
  Divider,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography
} from "@mui/material";
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
  const [province, setProvince] = useState<string>('');

  const [userError, setUserError] = useState<boolean>(false);
  const [provinceError, setProvinceError] = useState<boolean>(false);

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
            <TextField variant='outlined' value={username} helperText='This is how other users will see you.'
                       onChange={handleUsernameChange} error={userError && username.length === 0} label='Username' sx={{minWidth: 225}}/>
            <FormControl sx={{my: '2rem', minWidth: 225}}>
              <InputLabel error={provinceError && province.length === 0}>Province/State</InputLabel>
              <Select value={province} error={provinceError && province.length === 0} label="Province/State"
                      onChange={handleProvinceChange}>
                {
                  provinces.map(province => {
                    return (
                      <MenuItem key={province.id} value={province.id}>{province.name}</MenuItem>
                    )
                  })
                }
              </Select>
              <FormHelperText error={provinceError && province.length === 0}>This will help estimate your CO2
                emissions.</FormHelperText>
            </FormControl>
            <Divider sx={{width: '100%'}}/>
            <Typography variant='h4' sx={{fontWeight: 'bold'}}>Transportation</Typography>
            <Divider sx={{width: '100%', marginBottom: '1rem'}}/>
            <Typography sx={{width: '80%', textAlign: 'center'}}>{transportationText}</Typography>
            <TransitForm transitForms={transitForms} setTransitForms={setTransitForms} province={province}
                         transitMethods={transitMethods} username={username} setProvinceError={setProvinceError}
                         setUserError={setUserError}/>
          </>
        )
      }
    </>
  );
}

const transportationText = 'Our first category is transportation. The goal is to know every major form of transportation you use, so we can calculate your current greenhouse gas emissions. Whenever you switch modes of transportation (for example, switch from a gas car to public transit), you can update your transit methods, and your Eco Score will be calculated.'