const request = require('supertest');
const app = require('../src/app');
const connectDB = require('../src/config/db');
const mongoose = require('mongoose');
const Errors = require('../src/constants/Errors');
const Success = require('../src/constants/Success');

describe('User registration', () => {
    let connection;
    
    beforeAll(async () => {
        await connectDB(globalThis.__MONGO_URI__);
    })

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    })

    afterEach(async () => {
        await mongoose.connection.db.collection('users').deleteMany({});
    })
    
    it('Should register a user with given data', async () => {
        const res = await request(app).post('/api/auth/register').send(
            {
                "username": "john",
                "first_name": "John", 
                "last_name": "Doe", 
                "email": "john@example.com", 
                "password": "123456"
            }
        );

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe(Success.SUCCESSFUL_USER_REGISTRATION);
        expect(res.body).toHaveProperty("userId");
    });


})