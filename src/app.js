// configure environment variables
require('dotenv').config();
// import routes
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');

// create the express app
const app = express();
app.use(express.json());

// set the routes
app.use('/api/auth', authRoutes);
app.get("/", (req, res) => {
    res.send("hello world!!!!");
})

// connect to database
const MONGO_URL = process.env.MONGODB_URL;
if (process.env.NODE_ENV != 'test') {
    connectDB(MONGO_URL);
}

// start listening
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`This Server now running on port : ${PORT}`);
})

// export everything
module.exports = app;