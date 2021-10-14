import express from 'express';
import {db} from "./models/model.js";

db.sequelize.sync();

//Create an app
const app = express();
app.get('/', (req, res) => {
  res.send('Hello world\n');
});

//Listen port
const PORT = 8080;
app.listen(PORT);
console.log(`Running on port ${PORT}`);
