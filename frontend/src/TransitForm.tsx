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
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newTransitForms = [...props.transitForms];
  }

  return (
    <Box>
      {
        props.transitForms.map((form) => {
          return (
            <Paper key={form.key}>
              <TextField onChange={handleNameChange}/>
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