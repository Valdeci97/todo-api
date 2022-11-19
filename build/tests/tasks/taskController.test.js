"use strict";

var _supertest = _interopRequireDefault(require("supertest"));
var _server = _interopRequireDefault(require("../mocks/server"));
var _tasks = require("../mocks/tasks");
var _users = require("../mocks/users");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const app = _server.default.getApp();
const route = '/tasks';
const auth = 'authorization';
const validToken = _users.validUserRequestInfo.token;
const validId = _users.validUserRequestInfo.id;
let response;
let id;
describe('Testing /tasks endpoint', () => {
  describe('Creating task', () => {
    it('should be able to create a new task', async () => {
      response = await (0, _supertest.default)(app).post(route).set(auth, validToken).send(_tasks.task);
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('task');
      expect(response.body.task).toHaveProperty('id');
    });
    it('should not be able to create two tasks with same date', async () => {
      response = await (0, _supertest.default)(app).post(route).set(auth, validToken).send(_tasks.task);
      expect(response.status).toBe(409);
      expect(response.body).toHaveProperty('message');
    });
  });
  describe('Reading tasks', () => {
    it('should return all tasks', async () => {
      response = await (0, _supertest.default)(app).get(route).set(auth, validToken);
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(1);
    });
  });
  describe('Reading task by id', () => {
    it('should return task information', async () => {
      response = await (0, _supertest.default)(app).get(route).set(auth, validToken);
      id = response.body[0].id;
      response = await (0, _supertest.default)(app).get(`${route}/${id}`).set(auth, validToken);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('task');
      expect(response.body.task).toHaveProperty('id');
      expect(response.body.task.id).toStrictEqual(id);
    });
    it('should return an error message', async () => {
      response = await (0, _supertest.default)(app).get(`${route}/${validId}`).set(auth, validToken);
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message');
    });
  });
  describe('Updating task', () => {
    it('should be able to update a task', async () => {
      response = await (0, _supertest.default)(app).put(`${route}/${id}`).set(auth, validToken).send(_tasks.taskToUpdate);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('task');
      expect(response.body.task).toHaveProperty('when');
      expect(response.body.task.when).not.toBe(_tasks.task.when);
      expect(response.body.task.when).toStrictEqual(_tasks.taskToUpdate.when);
    });
    it('should return an error message', async () => {
      response = await (0, _supertest.default)(app).put(`${route}/${validId}`).set(auth, validToken).send(_tasks.taskToUpdate);
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message');
    });
  });
  describe('Deleting a task', () => {
    it('should return an empty response', async () => {
      response = await (0, _supertest.default)(app).post(route).set(auth, validToken).send(_tasks.task);
      id = response.body.task.id;
      response = await (0, _supertest.default)(app).delete(`${route}/${id}`).set(auth, validToken);
      expect(response.status).toBe(204);
      expect(response.body).toStrictEqual({});
    });
    it('should return an error message', async () => {
      response = await (0, _supertest.default)(app).delete(`${route}/${validId}`).set(auth, validToken);
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message');
    });
  });
});