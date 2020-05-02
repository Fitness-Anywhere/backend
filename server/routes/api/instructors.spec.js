require('dotenv').config();
const request = require('supertest');
const server = require('../../index');
const db = require('../../../data/db');

describe('Test instructors routes', () => {
    const test_user = {
        username: 'newuserfromtesting',
        password: '321654987',
        first_name: 'Fabricio',
        last_name: 'Bezerra',
        email: 'test@test.com',
        phone: '7020000000'
    }

    const test_user2 = {
        username: 'newuserfromtesting2',
        password: '3216549872',
        first_name: 'Fabricio2',
        last_name: 'Bezerra2',
        email: 'test@test2.com'
    }

    afterEach(async () => {
        await db("instructors").truncate(); // empty the table and reset the id back to 1
    });

    describe('GET /api/instructors/', () => {
        it('should return 401 status without token', async () => {
            const res = await request(server)
                .get('/api/instructors/');
            
            expect(res.status).toBe(401);
        });

        it('checks status code and response when Authorization header is a valid token', async () => {
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

            const token = res.body.token;
            
            // send request with authorization
            res = await request(server)
                .get('/api/instructors')
                .set({ 'authorization': token });

            // check status code
            expect(res.status).toBe(200);
            // check if response is an array
            expect(Array.isArray(res.body)).toBe(true);
        });

        
    });

    describe('GET /api/instructors/:id/classes', () => {
        it('should return 401 status when id passed in params does not match with id from token', async () => {
            // register first instructor
            const register1 = await request(server)
                .post('/api/auth/instructors/register')
                .send(test_user);

            expect(register1.status).toBe(201);
            
            // register second instructor
            const register2 = await request(server)
                .post('/api/auth/instructors/register')
                .send(test_user2);

            expect(register2.status).toBe(201);

            // login with first instructor
            const loginRes = await request(server)
            .post('/api/auth/instructors/login')
            .send({
                username: test_user.username,
                password: test_user.password
            });

            // save token from first instructor
            const token1 = loginRes.body.token;
            console.log('##############', loginRes.body);

            // login with second instructor
            const loginRes2 = await request(server)
            .post('/api/auth/instructors/login')
            .send({
                username: test_user2.username,
                password: test_user2.password
            });

            console.log('&&&&&&&&&&&&&&', loginRes2.body);

            // // save id from second instructor
            const id2 = loginRes2.body.id;
            
            // send request to second instructor route with authorization from first instructor. It should return 401
            const resRequest = await request(server)
                .get(`/api/instructors/${id2}/classes`)
                .set({ 'authorization': token1 });

            console.log(resRequest.body.errorMessage);

            // // check status code
            expect(resRequest.status).toBe(401);
            expect(resRequest.body.errorMessage).toBe('Logged in instructor ID does not match with ID passed in URL');
        });
    });

})