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

    it('Should throw validation error when username is missing', async () => {
        const res = await request(app).post('/api/auth/register').send(
            {
                "first_name": "John", 
                "last_name": "Doe", 
                "email": "john@example.com", 
                "password": "123456"
            }
        );

        expect(res.statusCode).toBe(Errors.UNSUCCESSFUL_ERROR_STATUS);
        expect(res.body).toHaveProperty('error');
        expect(res.body.error).toBe(Errors.EMPTY_USERNAME);
    });

    it('Should throw validation error when email is missing', async () => {
        const res = await request(app).post('/api/auth/register').send(
            {
                "username": "john",
                "first_name": "John", 
                "last_name": "Doe", 
                "password": "123456"
            }
        );

        expect(res.statusCode).toBe(Errors.UNSUCCESSFUL_ERROR_STATUS);
        expect(res.body).toHaveProperty('error');
        expect(res.body.error).toBe(Errors.EMPTY_EMAIL);
    });

    it('Should throw validation error when password is missing', async () => {
        const res = await request(app).post('/api/auth/register').send(
            {
                "username": "john",
                "first_name": "John", 
                "last_name": "Doe", 
                "email": "john@example.com", 
            }
        );

        expect(res.statusCode).toBe(Errors.UNSUCCESSFUL_ERROR_STATUS);
        expect(res.body).toHaveProperty('error');
        expect(res.body.error).toBe(Errors.EMPTY_PASSWORD);
    });


})

describe('User login', () => {
    const testUser = {
        "username": "john",
        "first_name": "John", 
        "last_name": "Doe", 
        "email": "john@example.com", 
        "password": "123456"
    }

    beforeAll(async () => {
        await connectDB(globalThis.__MONGO_URI__);
    })

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    })
    
    it('Should register a user with given data', async () => {
        const res = await request(app).post('/api/auth/register').send(testUser);
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe(Success.SUCCESSFUL_USER_REGISTRATION);
        expect(res.body).toHaveProperty("userId");
    });

    it('Should login the user when correct credentials are given', async () => {
        const res = await request(app).post('/api/auth/login').send(
            {
                username : testUser.username,
                password : testUser.password
            }
        );

        expect(res.statusCode).toBe(Success.SUCCESSFUL_STATUS);
        expect(res.body).toHaveProperty('token');
    });

    it('Should throw error when password is incorrect', async () => {
        const res = await request(app).post('/api/auth/login').send(
            {
                username : testUser.username,
                password : `${testUser.password}zxcvknaserfg`
            }
        );

        expect(res.statusCode).toBe(Errors.UNAUTHORIZED_ERROR_STATUS);
        expect(res.body).toHaveProperty('error');
        expect(res.body.error).toBe(Errors.INCORRECT_PASSWORD);
    });

    it('Should throw error when username is incorrect', async () => {
        const res = await request(app).post('/api/auth/login').send(
            {
                username : `${testUser.username}zxcvknaserfg`,
                password : `${testUser.password}`
            }
        );

        expect(res.statusCode).toBe(Errors.NOT_FOUND_ERROR_STATUS);
        expect(res.body).toHaveProperty('error');
        expect(res.body.error).toBe(Errors.USER_NOT_FOUND);
    });


})

