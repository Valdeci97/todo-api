import request from 'supertest';
import server from '../mocks/server';
import { task, taskToUpdate } from '../mocks/tasks';
import { validUserRequestInfo } from '../mocks/users';

const app = server.getApp();
const route = '/tasks';
const auth = 'authorization';
const validToken = validUserRequestInfo.token;
const validId = validUserRequestInfo.id;

let response: request.Response;
let id: string;

describe('Testing /tasks endpoint', () => {
  describe('Creating task', () => {
    it('should be able to create a new task', async () => {
      response = await request(app)
        .post(route)
        .set(auth, validToken)
        .send(task);
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('task');
      expect(response.body.task).toHaveProperty('id');
    });

    it('should not be able to create two tasks with same date', async () => {
      response = await request(app)
        .post(route)
        .set(auth, validToken)
        .send(task);
      expect(response.status).toBe(409);
      expect(response.body).toHaveProperty('message');
    });
  });

  describe('Reading tasks', () => {
    it('should return all tasks', async () => {
      response = await request(app).get(route).set(auth, validToken);
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(1);
    });
  });

  describe('Reading task by id', () => {
    it('should return task information', async () => {
      response = await request(app).get(route).set(auth, validToken);
      id = response.body[0].id;
      response = await request(app).get(`${route}/${id}`).set(auth, validToken);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('task');
      expect(response.body.task).toHaveProperty('id');
      expect(response.body.task.id).toStrictEqual(id);
    });

    it('should return an error message', async () => {
      response = await request(app)
        .get(`${route}/${validId}`)
        .set(auth, validToken);
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message');
    });
  });

  describe('Updating task', () => {
    it('should be able to update a task', async () => {
      response = await request(app)
        .put(`${route}/${id}`)
        .set(auth, validToken)
        .send(taskToUpdate);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('task');
      expect(response.body.task).toHaveProperty('when');
      expect(response.body.task.when).not.toBe(task.when);
      expect(response.body.task.when).toStrictEqual(taskToUpdate.when);
    });

    it('should return an error message', async () => {
      response = await request(app)
        .put(`${route}/${validId}`)
        .set(auth, validToken)
        .send(taskToUpdate);
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message');
    });
  });

  describe('Deleting a task', () => {
    it('should return an empty response', async () => {
      response = await request(app)
        .post(route)
        .set(auth, validToken)
        .send(task);
      id = response.body.task.id;
      response = await request(app)
        .delete(`${route}/${id}`)
        .set(auth, validToken);
      expect(response.status).toBe(204);
      expect(response.body).toStrictEqual({});
    });

    it('should return an error message', async () => {
      response = await request(app)
        .delete(`${route}/${validId}`)
        .set(auth, validToken);
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message');
    });
  });
});
