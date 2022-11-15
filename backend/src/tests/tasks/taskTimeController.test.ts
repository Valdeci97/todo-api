import request from 'supertest';
import server from '../mocks/server';
import { task } from '../mocks/tasks';
import { validUserRequestInfo } from '../mocks/users';

const app = server.getApp();
const taskRoute = '/tasks';
const auth = 'authorization';
const validToken = validUserRequestInfo.token;
const dayRoute = `${taskRoute}/day`;
const weekRoute = `${taskRoute}/week`;
const monthRoute = `${taskRoute}/month`;
const yearRoute = `${taskRoute}/year`;
const lateRoute = `${taskRoute}/late`;

let response: request.Response;

describe('Testing /tasks/{filter}/{userId} endpoint', () => {
  describe('Reading day tasks by user id', () => {
    it('should return all tasks by day', async () => {
      response = await request(app)
        .get(`${dayRoute}/${task.userId}`)
        .set(auth, validToken);
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(0);
    });
  });

  describe('Reading week tasks by user id', () => {
    it('should return all tasks by week', async () => {
      response = await request(app)
        .get(`${weekRoute}/${task.userId}`)
        .set(auth, validToken);
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(0);
    });
  });

  describe('Reading month tasks by user id', () => {
    it('should return all tasks by month', async () => {
      response = await request(app)
        .get(`${monthRoute}/${task.userId}`)
        .set(auth, validToken);
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(0);
    });
  });

  describe('Reading year tasks by user id', () => {
    it('should return all tasks by year', async () => {
      response = await request(app)
        .get(`${yearRoute}/${task.userId}`)
        .set(auth, validToken);
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(0);
    });
  });

  describe('Reading late tasks by user id', () => {
    it('should return all late tasks', async () => {
      response = await request(app)
        .get(`${lateRoute}/${task.userId}`)
        .set(auth, validToken);
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(0);
    });
  });
});
