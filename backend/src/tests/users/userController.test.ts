import request from 'supertest';
import server from '../mocks/server';
import { user, userToUpdate, validUserRequestInfo } from '../mocks/users';

const app = server.getApp();
const route = '/users';
const auth = 'authorization';
const validToken = validUserRequestInfo.token;
const validId = validUserRequestInfo.id;
let response: request.Response;
let id: string;

describe('Testing /users endpoint', () => {
  describe('Creating user', () => {
    it('Should be able to create a new user', async () => {
      response = await request(app).post(route).send(user);
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('user');
    });

    it('should not be able to create two users with same email', async () => {
      await request(app).post(route).send(user);
      response = await request(app).post(route).send(user);
      expect(response.status).toBe(409);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('E-mail already registered');
    });
  });

  describe('Reading users', () => {
    it('should return all users', async () => {
      response = await request(app).get(route).set(auth, validToken);
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(1);
    });
  });

  describe('Reading user by id', () => {
    it('should be able to read user information', async () => {
      response = await request(app).get(route).set(auth, validToken);
      id = response.body[0].id;
      response = await request(app).get(`${route}/${id}`).set(auth, validToken);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('user');
      expect(response.body.user).toHaveProperty('id');
    });

    it('shoul not be able to read user informartion', async () => {
      response = await request(app)
        .get(`${route}/${validId}`)
        .set(auth, validToken);
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message');
    });
  });

  describe('Updating user', () => {
    it('should be able to update user information', async () => {
      response = await request(app).get(route).set(auth, validToken);
      id = response.body[0].id;
      response = await request(app)
        .patch(`${route}/${id}`)
        .set(auth, validToken)
        .send({ name: userToUpdate.name });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('user');
    });

    it('should not be able to update a user that not exist', async () => {
      response = await request(app)
        .patch(`${route}/${validId}`)
        .set(auth, validToken)
        .send({ name: userToUpdate.name });
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message');
    });
  });

  describe('Deleting user', () => {
    it('should be able to delete user', async () => {
      response = await request(app)
        .delete(`${route}/${id}`)
        .set(auth, validToken);
      expect(response.status).toBe(204);
      expect(response.body).toStrictEqual({});
    });

    it('should not be able to delete a user that not exist', async () => {
      response = await request(app)
        .delete(`${route}/${validId}`)
        .set(auth, validToken);
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message');
    });
  });
});
