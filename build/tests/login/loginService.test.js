"use strict";

var _MockUserModel = _interopRequireDefault(require("../mocks/MockUserModel"));
var _MockHashProvider = _interopRequireDefault(require("../mocks/MockHashProvider"));
var _LoginService = _interopRequireDefault(require("../../services/LoginService"));
var _Userservice = _interopRequireDefault(require("../../services/Userservice"));
var _users = require("../mocks/users");
var _HttpException = _interopRequireDefault(require("../../exceptions/HttpException"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let mockUserModel;
let mockHashProvider;
let loginService;
let userService;
describe('Testing login service methods', () => {
  beforeEach(() => {
    mockUserModel = new _MockUserModel.default();
    mockHashProvider = new _MockHashProvider.default();
    userService = new _Userservice.default(mockUserModel, mockHashProvider);
    loginService = new _LoginService.default(mockUserModel, mockHashProvider);
  });
  describe('User login', () => {
    it('should be able to connect user and return token', async () => {
      await userService.create(_users.user);
      const login = await loginService.login(_users.user);
      expect(login).toHaveProperty('user');
      expect(login).toHaveProperty('token');
      expect(typeof login.token).toBe('string');
    });
  });
  it('should not be able to connect with wrong email and throw HttpException', async () => {
    expect(loginService.login(_users.wrongEmailUser)).rejects.toBeInstanceOf(_HttpException.default);
  });
  it('should not be able to connect with wrong password and throw HttpException', async () => {
    await userService.create(_users.user);
    expect(loginService.login(_users.wrongPasswordUser)).rejects.toBeInstanceOf(_HttpException.default);
  });
});