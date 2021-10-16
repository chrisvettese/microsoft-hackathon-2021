import express from 'express';
import db from "./models/model.js";
import helloWorld from './rest/HelloWorld.js';
import morgan from 'morgan'
import cors from 'cors';
import userRouter from './rest/UserRest.js';

await db.sequelize.sync({force: true});

try {
  await db.sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

//Create an app
const app = express();
app.use(cors({origin: 'http://localhost:3000'}))
app.use(morgan('common'));
app.use(express.json());
app.use('/', helloWorld)
app.use('/user', userRouter)

//Listen port
const PORT = 8080;
app.listen(PORT);
console.log(`Running on port ${PORT}`);
