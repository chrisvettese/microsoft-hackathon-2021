import express from 'express';
import db from "./models/model.js";
import helloWorld from './rest/basic/HelloWorld.js';
import morgan from 'morgan'
import userRouter from './rest/Users/Users.js';

db.sequelize.sync();
try {
  await db.sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

//Create an app
const app = express();
app.use(morgan('common'));
app.use(express.json());
app.use('/', helloWorld)
app.use('/users', userRouter)

//Listen port
const PORT = 8080;
app.listen(PORT);
console.log(`Running on port ${PORT}`);
