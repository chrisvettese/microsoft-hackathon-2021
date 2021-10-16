# API SPEC


## /api/user
### get /api/user/:id

- fetches data from user at id
- only fetches ids for certain data

### get /api/user

- gets all users

### post /api/user

- creates a new user
- requires email_address and oid

```
{
    email_address
    oid
}


### patch /api/user
- submits a new username
- does not patch other variables
```
{
    oid: number
    userName: string
}
```


## /api/transit

### get /api/transit
- returns a table of transits. of the from
per Enum is ` day, week, month, year `
```
{
    oid,
    transit_id,
    gas_emissions,
    frequency {
        integer,
        per: Enum
    },
    distance

}
```

### post /api/transit

- calculates gas emissions of each transit
- updates the Emissions version



Accepts json of the from
```
{
    oid
    transits: [
        {
            distance: 
            transit_method:
            name
            frequency: {
                value
                per : enum
            }
            type: {

            }
        }
    ]

}
```

### get /api/transit/methods

returns transit methods of the form
```
{
    methods: [
        {
            id
            name
            gas_emissions
            electricity_usage 
        }
    ]
}
```