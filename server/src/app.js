const express = require('express')
const app = express();
require(`dotenv`).config();
const route = require('./routes/index');
const errorHandler = require('./middlewares/ErrorHandler')
const mongodbConfig = require('./config/MongodbConfig')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const notFound = require('./middlewares/NotFound');

const allowedOrigins = [
    process.env.ALLOW_ORIGIN,
];

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {  
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, 
};

const port = process.env.port || 8000; 

app.use(cookieParser());    
app.use(cors(corsOptions));
app.use(express.urlencoded({limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb' }));

mongodbConfig();
 
route(app);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`App is running in port ${port}`); 
    console.log(`Timezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}`);
    console.log(`Current time: ${new Date().toLocaleString()}`);
})

