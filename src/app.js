// configure environment variables
require('dotenv').config();
// import routes
const express = require('express');
const connectDB = require('./config/db');
const morgan = require('morgan');
const authRoutes = require('./routes/auth');

// create the express app
const app = express();
app.use(express.json());
app.use(morgan('dev'));

// set the routes
app.use('/api/auth', authRoutes);
app.get("/", (req, res) => {
    res.send("Auth service up and running!");
})

// connect to database
const MONGO_URL = process.env.MONGODB_URL;
if (process.env.NODE_ENV != 'test') {
    connectDB(MONGO_URL);
}

// start listening
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Auth service now running on port : ${PORT}`);
})

// export everything
module.exports = app;