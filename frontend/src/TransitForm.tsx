import React, {ChangeEvent} from "react";
import {Box, Paper, TextField} from "@mui/material";

export interface Transit {
  transitMethod: number | '';
  name: string;
  frequency: number | '';
  frequencyUnit: 'day' | 'week' | 'month' | 'year';
  distance: string | '';
  type: any;
  key: number;
}

interface TransitFormProps {
  transitForms: Transit[];
  setTransitForms: React.Dispatch<React.SetStateAction<Transit[]>>;
  transitMethodNames: string[];
}

export default function TransitForm(props: TransitFormProps) {
  function changeName(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: number) {
    const newTransitForms = [...props.transitForms];
    const form = getFormByKey(newTransitForms, key)!;
    form.name = event.target.value;
    props.setTransitForms(newTransitForms);
  }

  return (
    <Box>
      {
        props.transitForms.map((form) => {
          return (
            <Paper key={form.key}>
              <TextField variant='outlined' onChange={event => changeName(event, form.key)}/>
            </Paper>
          )
        })
      }
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
    type: '',
    key: key
  }
}

function getFormByKey(forms: Transit[], key: number): Transit | undefined {
  return forms.find(form => form.key === key);
}