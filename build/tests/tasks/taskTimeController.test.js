"use strict";

var _supertest = _interopRequireDefault(require("supertest"));
var _server = _interopRequireDefault(require("../mocks/server"));
var _tasks = require("../mocks/tasks");
var _users = require("../mocks/users");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const app = _server.default.getApp();
const taskRoute = '/tasks';
const auth = 'authorization';
const validToken = _users.validUserRequestInfo.token;
const dayRoute = `${taskRoute}/day`;
const weekRoute = `${taskRoute}/week`;
const monthRoute = `${taskRoute}/month`;
const yearRoute = `${taskRoute}/year`;
const lateRoute = `${taskRoute}/late`;
let response;
describe('Testing /tasks/{filter}/{userId} endpoint', () => {
  describe('Reading day tasks by user id', () => {
    it('should return all tasks by day', async () => {
      response = await (0, _supertest.default)(app).get(`${dayRoute}/${_tasks.task.userId}`).set(auth, validToken);
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(0);
    });
  });
  describe('Reading week tasks by user id', () => {
    it('should return all tasks by week', async () => {
      response = await (0, _supertest.default)(app).get(`${weekRoute}/${_tasks.task.userId}`).set(auth, validToken);
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(0);
    });
  });
  describe('Reading month tasks by user id', () => {
    it('should return all tasks by month', async () => {
      response = await (0, _supertest.default)(app).get(`${monthRoute}/${_tasks.task.userId}`).set(auth, validToken);
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(0);
    });
  });
  describe('Reading year tasks by user id', () => {
    it('should return all tasks by year', async () => {
      response = await (0, _supertest.default)(app).get(`${yearRoute}/${_tasks.task.userId}`).set(auth, validToken);
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(0);
    });
  });
  describe('Reading late tasks by user id', () => {
    it('should return all late tasks', async () => {
      response = await (0, _supertest.default)(app).get(`${lateRoute}/${_tasks.task.userId}`).set(auth, validToken);
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(0);
    });
  });
});