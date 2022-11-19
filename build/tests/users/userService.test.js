"use strict";

var _MockUserModel = _interopRequireDefault(require("../mocks/MockUserModel"));
var _Userservice = _interopRequireDefault(require("../../services/Userservice"));
var _users = require("../mocks/users");
var _HttpException = _interopRequireDefault(require("../../exceptions/HttpException"));
var _MockHashProvider = _interopRequireDefault(require("../mocks/MockHashProvider"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let mockUserModel;
let userService;
let mockHashProvider;
describe('Testing user services methods', () => {
  beforeEach(() => {
    mockUserModel = new _MockUserModel.default();
    mockHashProvider = new _MockHashProvider.default();
    userService = new _Userservice.default(mockUserModel, mockHashProvider);
  });
  describe('Creating user', () => {
    it('should be able to create a new user', async () => {
      const createdUser = await userService.create(_users.user);
      expect(createdUser).toHaveProperty('id');
      expect(createdUser).toHaveProperty('name');
      expect(createdUser).toHaveProperty('email');
      expect(createdUser.password).toBeUndefined();
    });
    it('should not be able to create two users with same email', async () => {
      await userService.create(_users.user);
      expect(userService.create(_users.user)).rejects.toBeInstanceOf(_HttpException.default);
    });
  });
  describe('Reading users', () => {
    it('should return an array with all users', async () => {
      await userService.create(_users.user);
      const users = await userService.read();
      expect(Array.isArray(users)).toBe(true);
      expect(users).toHaveLength(2);
      expect(users[0].password).toBeUndefined();
    });
  });
  describe('Reading user by id', () => {
    it('should return the correct user', async () => {
      const createdUser = await userService.create(_users.user);
      const id = createdUser.id ? createdUser.id : _users.user.id;
      const dbUser = await userService.readOne(id);
      expect(dbUser).toHaveProperty('id');
      expect(dbUser).toHaveProperty('name');
      expect(dbUser).toHaveProperty('email');
      expect(dbUser.password).toBeUndefined();
    });
    it('should return an HttpException when user does not exist', async () => {
      expect(userService.readOne('4')).rejects.toBeInstanceOf(_HttpException.default);
    });
  });
  describe('Updating user', () => {
    it('should return the correct user with new data', async () => {
      const createdUser = await userService.create(_users.user);
      const id = createdUser.id ? createdUser.id : _users.user.id;
      const updatedUser = await userService.update(id, _users.userToUpdate);
      expect(createdUser.name).toBe('primeiro usuário');
      expect(updatedUser.name).toBe('primeiro usuário atualizado');
    });
    it('should return an HttpException when user does not exist', async () => {
      expect(userService.update('4', _users.user)).rejects.toBeInstanceOf(_HttpException.default);
    });
  });
  describe('Deleting user', () => {
    it('should remove user from database', async () => {
      const createdUser = await userService.create(_users.user);
      const id = createdUser.id ? createdUser.id : _users.user.id;
      const deletedUser = await userService.delete(id);
      expect(deletedUser).toBeUndefined();
      const users = await userService.read();
      expect(users).toHaveLength(1);
    });
    it('should return an HttpException when user does not exist', async () => {
      expect(userService.delete('4')).rejects.toBeInstanceOf(_HttpException.default);
    });
  });
});