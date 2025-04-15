// packages imports
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan'); // debug api url and time 

// securty packages
const helmet = require('helmet'); 
// const xss = require('xss-clean'); 
// const mongoSanitize = require('express-mongo-sanitize'); 

//file imports
const connectDB = require('./config/db.js');

//middelware import
const errorMiddelware = require('./middelwares/errorMiddelware.js');

//routes import
const authRoutes = require('./routes/authRoutes.js');

//env file 
dotenv.config();

//mongodb connection
connectDB();

const app = express();

app.use(helmet());
// app.use(xss())
// app.use(mongoSanitize())
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


app.use("/api/v1/admin",authRoutes);

app.use(errorMiddelware);

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  // console.log("Node server Running In "+process.env.DEV_MODE+" Mode on port no "+PORT);
})