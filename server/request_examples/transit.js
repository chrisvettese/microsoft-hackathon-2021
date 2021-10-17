import axios from 'axios'


console.log('sending request');
axios.post('http://localhost:8080/api/transit', {
    oid: 2,
    transits: [
        {
            distance: 2,
            transit_method: 3,
            name: "Cool transit",
            frequency: {
                value: 2,
                per: "day"
            }
        }
    ]
}).then((res) => {
    console.log(res.status);
})



