const mongoose = require('mongoose');
const { Admin } = mongoose;
/**
 * Connects to the mongoDB database
 * @param {String} url The URL string for connecting to mongoDB
 */
const connectDB = async (url) => {
    try {
        await mongoose.connect(url);
        console.log('Auth service connected to MongoDB successfully!');
    } catch (err) {
        console.log('MongoDB connection error in auth service:', err.message);
        process.exit(1);
    }
}

module.exports = connectDB;