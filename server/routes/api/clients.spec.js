require('dotenv').config();
const request = require('supertest');
const server = require('../../index');
const db = require('../../../data/db');

describe('Clients routes', () => {
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
        await db("clients").truncate(); // empty the table and reset the id back to 1
    });

    describe('GET /api/clients/', () => {
        it('should return 401 status without token', async () => {
            const res = await request(server)
                .get('/api/clients/');
            
            expect(res.status).toBe(401);
        });

        it('checks status code and response when Authorization header is a valid token', async () => {
            // register
            let res = await request(server)
            .post('/api/auth/clients/register')
            .send(test_user);

            // login
            res = await request(server)
            .post('/api/auth/clients/login')
            .send({
                username: test_user.username,
                password: test_user.password
            });

            const token = res.body.token;
            
            // send request with authorization
            res = await request(server)
                .get('/api/clients')
                .set({ 'authorization': token });

            // check status code
            expect(res.status).toBe(200);
            // check if response is an array
            expect(Array.isArray(res.body)).toBe(true);
        });
    });

    describe('GET /api/clients/:id/', () => {
        it('should return 401 status when id passed in params does not match with id from token', async () => {
            // register first client
            const register1 = await request(server)
                .post('/api/auth/clients/register')
                .send(test_user);
            
            expect(register1.status).toBe(201);
            
            // register second client
            const register2 = await request(server)
                .post('/api/auth/clients/register')
                .send(test_user2);

            expect(register2.status).toBe(201);

            // login with first client
            const loginRes = await request(server)
            .post('/api/auth/clients/login')
            .send({
                username: test_user.username,
                password: test_user.password
            });

            // save token from first client
            const token1 = loginRes.body.token;
            console.log('##############', loginRes.body);

            // login with second client
            const loginRes2 = await request(server)
            .post('/api/auth/clients/login')
            .send({
                username: test_user2.username,
                password: test_user2.password
            });

            console.log('&&&&&&&&&&&&&&', loginRes2.body);

            // // save id from second client
            const id2 = loginRes2.body.id;
            
            // send request to second client route with authorization from first client. It should return 401
            const resRequest = await request(server)
                .get(`/api/clients/${id2}`)
                .set({ 'authorization': token1 });

            console.log(resRequest.body.errorMessage);

            // // check status code
            expect(resRequest.status).toBe(401);
            expect(resRequest.body.errorMessage).toBe('Logged in client ID does not match with ID passed in URL');
        });
    });

    describe('POST /api/clients/:id/classes', () => {
        it('checks if it adds class to list of registered classes from user', async () => { 
            // register
            let res = await request(server)
            .post('/api/auth/clients/register')
            .send(test_user);

            // login
            res = await request(server)
            .post('/api/auth/clients/login')
            .send({
                username: test_user.username,
                password: test_user.password
            });

            const token = res.body.token;
            const client_id = res.body.id;
            
            // send request with authorization
            res = await request(server)
                .post(`/api/clients/${client_id}/classes`)
                .set({ 'authorization': token })
                .send({ class_id: 1 });

            // check status code
            expect(res.status).toBe(200);

            const dbClassClients = await db('class_clients').where({ client_id, class_id: 1 });
            expect(dbClassClients).toHaveLength(1);
            
        });
    });
});