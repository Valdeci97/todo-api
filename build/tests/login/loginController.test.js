"use strict";

var _supertest = _interopRequireDefault(require("supertest"));
var _server = _interopRequireDefault(require("../mocks/server"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const app = _server.default.getApp();
const route = '/login';
let response;
describe('Testing /login endpoint', () => {
  describe('Loging user', () => {
    it('should return an auth token', async () => {
      response = await (0, _supertest.default)(app).post(route).send({
        email: 'teste@login.com',
        password: '12345678'
      });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('login');
      expect(response.body.login).toHaveProperty('user');
      expect(response.body.login).toHaveProperty('token');
      expect(typeof response.body.login.token).toBe('string');
    });
    it('should return an http exception', async () => {
      response = await (0, _supertest.default)(app).post(route).send({
        email: 'teste@login.com',
        password: '123456789'
      });
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
    });
  });
});