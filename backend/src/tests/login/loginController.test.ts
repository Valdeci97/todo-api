import request from 'supertest';
import server from '../mocks/server';

const app = server.getApp();
const route = '/login';
let response: request.Response;

describe('Testing /login endpoint', () => {
  describe('Loging user', () => {
    it('should return an auth token', async () => {
      response = await request(app)
        .post(route)
        .send({ email: 'teste@login.com', password: '12345678' });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('login');
      expect(response.body.login).toHaveProperty('user');
      expect(response.body.login).toHaveProperty('token');
      expect(typeof response.body.login.token).toBe('string');
    });

    it('should return an http exception', async () => {
      response = await request(app)
        .post(route)
        .send({ email: 'teste@login.com', password: '123456789' });
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
    });
  });
});
