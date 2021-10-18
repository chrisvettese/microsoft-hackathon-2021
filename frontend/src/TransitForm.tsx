import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import {
  Box, Button,
  FormControl,
  FormHelperText, IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField, Typography
} from "@mui/material";
import {ServerTransitMethod} from "./requests/GetTransitMethods";
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import registerUser from "./requests/RegisterUser";
import {ServerProvince} from "./requests/GetProvinces";
import {useMsal} from "@azure/msal-react";

export interface Type {
  batterySize: number | '';
  range: number | '';
  fuelConsumption: number | '';
}

type TransitType = 'batterySize' | 'range' | 'fuelConsumption';

export interface Transit {
  transitMethod: ServerTransitMethod | '';
  name: string;
  frequency: number | '';
  frequencyUnit: FUnit;
  distance: number | '';
  type: Type;
  key: number;
}

type FUnit = 'day' | 'week' | 'month' | 'year'

interface TransitFormProps {
  transitForms: Transit[];
  setTransitForms: React.Dispatch<React.SetStateAction<Transit[]>>;
  transitMethods: ServerTransitMethod[];
  setUserError: React.Dispatch<React.SetStateAction<boolean>>;
  setProvinceError: React.Dispatch<React.SetStateAction<boolean>>;
  username: string;
  province: string;
  provinces: ServerProvince[];
  accessToken: string;
}

export default function TransitForm(props: TransitFormProps) {
  const transitKey = useRef<number>(1);
  const formRef = useRef<HTMLDivElement>(null);
  //If submit button has been clicked
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const {accounts} = useMsal();
  const account = accounts[0];

  useEffect(() => {
    if (submitted) {
      checkErrors().then(() => {
      });
    }
  }, [submitted])

  async function checkErrors() {
    const errorForms = formRef!.current!.querySelectorAll('.Mui-error');
    if (errorForms.length > 0 || props.province.length === 0 || props.username.length === 0) {
      props.setProvinceError(props.province.length === 0);
      props.setUserError(props.username.length === 0);
      setError('Missing fields have been highlighted above. Please fill them out before submitting.')
    } else {
      setError('');
      const tokenClaims = account.idTokenClaims as {
        oid: string;
      }
      await registerUser(tokenClaims.oid, props.username, props.province, props.transitForms, props.provinces, props.accessToken);
    }
  }

  function changeName(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: number) {
    const newTransitForms = [...props.transitForms];
    const form = getFormByKey(newTransitForms, key)!;
    form.name = event.target.value;
    props.setTransitForms(newTransitForms);
  }

  function changeTransit(event: SelectChangeEvent<number | string>, key: number) {
    const newTransitForms = [...props.transitForms];
    const form = getFormByKey(newTransitForms, key);
    form.transitMethod = getTransitMethod(event.target.value, props.transitMethods);
    form.type = {batterySize: '', range: '', fuelConsumption: ''};
    props.setTransitForms(newTransitForms);
  }

  function changeDistance(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: number) {
    const newTransitForms = [...props.transitForms];
    const form = getFormByKey(newTransitForms, key)!;
    form.distance = parseFloat(event.target.value);
    if (isNaN(parseFloat(event.target.value))) {
      form.distance = '';
    }
    props.setTransitForms(newTransitForms);
  }

  function changeFrequency(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: number) {
    const newTransitForms = [...props.transitForms];
    const form = getFormByKey(newTransitForms, key)!;
    form.frequency = parseFloat(event.target.value);
    if (isNaN(parseFloat(event.target.value))) {
      form.frequency = '';
    }
    props.setTransitForms(newTransitForms);
  }

  function changeUnit(event: SelectChangeEvent<FUnit>, key: number) {
    const newTransitForms = [...props.transitForms];
    const form = getFormByKey(newTransitForms, key)!;
    form.frequencyUnit = event.target.value as FUnit;
    props.setTransitForms(newTransitForms);
  }

  function changeType(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: number, type: TransitType) {
    const newTransitForms = [...props.transitForms];
    const form = getFormByKey(newTransitForms, key)!;
    form.type[type] = parseFloat(event.target.value);
    if (isNaN(parseFloat(event.target.value))) {
      form.type[type] = '';
    }
    props.setTransitForms(newTransitForms);
  }


  const handleAdd = () => {
    const newTransitForms = [...props.transitForms];
    newTransitForms.push(getNewTransit(transitKey.current));
    transitKey.current++;
    props.setTransitForms(newTransitForms);
  }

  function deleteTransit(form: Transit) {
    const newTransitForms = [...props.transitForms];
    //Close button should clear the last form instead of deleting it
    if (props.transitForms.length === 1) {
      const newForm = getFormByKey(newTransitForms, form.key);
      newForm.transitMethod = '';
      newForm.name = '';
      newForm.distance = '';
      newForm.frequency = '';
      newForm.frequencyUnit = 'week';
      newForm.type = {batterySize: '', range: '', fuelConsumption: ''};
    } else {
      const newForm = getFormByKey(newTransitForms, form.key);
      newTransitForms.splice(newTransitForms.indexOf(newForm), 1);
    }
    props.setTransitForms(newTransitForms);
  }

  function submit() {
    if (submitted) {
      checkErrors();
    } else {
      setSubmitted(true);
    }
  }

  return (
    <Box sx={{display: 'flex', flexDirection: 'column'}} ref={formRef}>
      {
        props.transitForms.map((form) => {
          return (
            <Paper key={form.key} sx={{pb: '1rem', mt: '1.5rem', display: 'flex', flexDirection: 'column'}}>
              <IconButton sx={{marginLeft: 'auto'}} onClick={() => deleteTransit(form)}>
                <CloseIcon/>
              </IconButton>
              <Box sx={{px: '1rem'}}>
                <TextField label='Name' value={form.name} helperText='For example, "Daily Commute"' variant='outlined'
                           onChange={event => changeName(event, form.key)} error={submitted && form.name === ''}/>
                <FormControl sx={{marginLeft: '1rem', minWidth: 225}}>
                  <InputLabel error={submitted && form.transitMethod === ''}>Mode of Transportation</InputLabel>
                  <Select value={form.transitMethod === '' ? '' : form.transitMethod.id} label="Mode of Transportation"
                          onChange={event => changeTransit(event, form.key)}
                          error={submitted && form.transitMethod === ''}>
                    {
                      props.transitMethods.map(method => {
                        return (
                          <MenuItem key={method.id} value={method.id}>{method.name}</MenuItem>
                        )
                      })
                    }
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{px: '1rem'}}>
                <TextField sx={{mt: '1rem'}} label='Distance (km)' value={form.distance}
                           helperText='Average distance per trip' variant='outlined' type='number'
                           onChange={event => changeDistance(event, form.key)}
                           error={submitted && (form.distance === '' || isNaN(form.distance))}/>

              </Box>
              {
                (form.transitMethod !== '' && form.transitMethod.id === 1) && (
                  <Box sx={{px: '1rem'}}>
                    <TextField sx={{mt: '1rem', minWidth: '275px'}} label='Fuel Consumption (L/100km)'
                               value={form.type.fuelConsumption}
                               variant='outlined' type='number' helperText='For example, 9.4'
                               onChange={event => changeType(event, form.key, 'fuelConsumption')}
                               error={submitted && (form.type.fuelConsumption === '' || isNaN(form.type.fuelConsumption))}/>
                  </Box>
                )
              }
              {
                (form.transitMethod !== '' && form.transitMethod.id === 2) && (
                  <Box sx={{px: '1rem'}}>
                    <TextField sx={{mt: '1rem'}} label='Battery Size (kWh)' value={form.type.batterySize}
                               variant='outlined' type='number' helperText='For example, 80'
                               onChange={event => changeType(event, form.key, 'batterySize')}
                               error={submitted && (form.type.batterySize === '' || isNaN(form.type.batterySize))}/>
                    <TextField sx={{mt: '1rem', ml: '1rem'}} label='Range (km)' value={form.type.range}
                               variant='outlined' type='number' helperText='For example, 350'
                               onChange={event => changeType(event, form.key, 'range')}
                               error={submitted && (form.type.range === '' || isNaN(form.type.range))}/>
                  </Box>
                )
              }
              <Box sx={{px: '1rem'}}>
                <TextField sx={{mt: '1rem'}} label='Frequency' value={form.frequency} variant='outlined' type='number'
                           onChange={event => changeFrequency(event, form.key)}
                           error={submitted && (form.frequency === '' || isNaN(form.frequency))}/>
                <FormControl sx={{ml: '1rem', mt: '1rem'}}>
                  <InputLabel>Frequency Unit</InputLabel>
                  <Select value={form.frequencyUnit} label="Frequency Unit"
                          onChange={event => changeUnit(event, form.key)}>
                    <MenuItem value='day'>Days</MenuItem>
                    <MenuItem value='week'>Weeks</MenuItem>
                    <MenuItem value='month'>Months</MenuItem>
                    <MenuItem value='year'>Years</MenuItem>
                  </Select>
                  <FormHelperText>For example, 10 times per week</FormHelperText>
                </FormControl>
              </Box>
            </Paper>
          )
        })
      }
      <Button variant='contained' sx={{ml: 'auto', my: '1rem'}} onClick={handleAdd}>
        <AddIcon/>
        Add Transit
      </Button>
      <Typography color='error'>{error}</Typography>
      <Button sx={{my: '1rem', alignSelf: 'center', width: 'max-content'}} color='success' variant='contained'
              onClick={() => submit()}>
        Complete Registration
      </Button>
    </Box>
  )
}

export function getNewTransit(key: number): Transit {
  return {
    transitMethod: '',
    name: '',
    frequency: '',
    frequencyUnit: 'week',
    distance: '',
    type: {batterySize: '', range: '', fuelConsumption: ''},
    key: key
  }
}

function getFormByKey(forms: Transit[], key: number): Transit {
  return forms.find(form => form.key === key)!;
}

function getTransitMethod(id: string | number, transitMethods: ServerTransitMethod[]): ServerTransitMethod {
  const methodId = parseInt(id.toString());
  return transitMethods.find(method => methodId === method.id)!;
}