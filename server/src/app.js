const express = require('express')
const app = express();
require(`dotenv`).config();
const route = require('./routes/index');
const errorHandler = require('./middlewares/ErrorHandler')
const mongodbConfig = require('./config/MongodbConfig')

const port = process.env.port || 8000; 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongodbConfig();
 
route(app);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`App is running in port ${port}`); 
})

