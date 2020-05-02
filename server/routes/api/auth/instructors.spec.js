require('dotenv').config();
const request = require('supertest');
const server = require('../../../index');
const db = require('../../../../data/db');

describe('Test instructors auth routes', () => {
    const test_user = {
        username: 'newuserfromtesting',
        password: '321654987',
        first_name: 'Fabricio',
        last_name: 'Bezerra',
        email: 'test@test.com',
        phone: '7020000000'
    }

    afterEach(async () => {
        await db("instructors").truncate(); // empty the table and reset the id back to 1
    });

    describe('POST /api/auth/instructors/register', () => {
        it('should return 201 status', async () => {
            const res = await request(server)
                .post('/api/auth/instructors/register')
                .send(test_user);
            expect(res.status).toBe(201);
        });

        it('should not return 201 status when missing required field', async () => {
            const res = await request(server)
                .post('/api/auth/instructors/register')
                .send({
                    username: 'newuserfromtesting',
                    password: '321654987',
                    first_name: 'Fabricio',
                    last_name: 'Bezerra',
                    // email: 'test@test.com',
                    phone: '7020000000'
                });
            expect(res.status).not.toBe(201);
            expect(Object.keys(res.body).includes('errorMessage')).toBe(true);
        });
    });

    describe('POST /api/auth/instructors/login', () => {
        it('should return 200 status after login', async () => {
            // register
            let res = await request(server)
                .post('/api/auth/instructors/register')
                .send(test_user);

            // login
            res = await request(server)
                .post('/api/auth/instructors/login')
                .send({
                    username: test_user.username,
                    password: test_user.password
                });                
            
            expect(res.status).toBe(200);
        });

        it('checks if it returns an object with id and token', async () => {
            let res = await request(server)
                .post('/api/auth/instructors/register')
                .send(test_user);

            res = await request(server)
                .post('/api/auth/instructors/login')
                .send({
                    username: test_user.username,
                    password: test_user.password
                });                
            
            expect(Object.keys(res.body)).toEqual(['token', 'id']);
        });
    });

})