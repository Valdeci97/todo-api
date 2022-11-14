import MockUserModel from '../mocks/MockUserModel';
import UserService from '../../services/Userservice';

import { user, userToUpdate } from '../mocks/users';
import HttpException from '../../exceptions/HttpException';
import MockHashProvider from '../mocks/MockHashProvider';

let mockUserModel: MockUserModel;
let userService: UserService;
let mockHashProvider: MockHashProvider;

describe('Testing user services methods', () => {
  beforeEach(() => {
    mockUserModel = new MockUserModel();
    mockHashProvider = new MockHashProvider();
    userService = new UserService(mockUserModel, mockHashProvider);
  });

  describe('Creating user', () => {
    it('should be able to create a new user', async () => {
      const createdUser = await userService.create(user);

      expect(createdUser).toHaveProperty('id');
      expect(createdUser).toHaveProperty('name');
      expect(createdUser).toHaveProperty('email');
      expect(createdUser.password).toBeUndefined();
    });

    it('should not be able to create two users with same email', async () => {
      await userService.create(user);
      expect(userService.create(user)).rejects.toBeInstanceOf(HttpException);
    });
  });

  describe('Reading users', () => {
    it('should return an array with all users', async () => {
      await userService.create(user);
      const users = await userService.read();

      expect(Array.isArray(users)).toBe(true);
      expect(users).toHaveLength(1);
      expect(users[0].password).toBeUndefined();
    });
  });

  describe('Reading user by id', () => {
    it('should return the correct user', async () => {
      const createdUser = await userService.create(user);
      const id = createdUser.id ? createdUser.id : user.id;
      const dbUser = await userService.readOne(id);

      expect(dbUser).toHaveProperty('id');
      expect(dbUser).toHaveProperty('name');
      expect(dbUser).toHaveProperty('email');
      expect(dbUser.password).toBeUndefined();
    });

    it('should return an HttpException when user does not exist', async () => {
      expect(userService.readOne('4')).rejects.toBeInstanceOf(HttpException);
    });
  });

  describe('Updating user', () => {
    it('should return the correct user with new data', async () => {
      const createdUser = await userService.create(user);
      const id = createdUser.id ? createdUser.id : user.id;
      const updatedUser = await userService.update(id, userToUpdate);

      expect(createdUser.name).toBe('primeiro usuário');
      expect(updatedUser.name).toBe('primeiro usuário atualizado');
    });

    it('should return an HttpException when user does not exist', async () => {
      expect(userService.update('4', user)).rejects.toBeInstanceOf(
        HttpException
      );
    });
  });

  describe('Deleting user', () => {
    it('should remove user from database', async () => {
      const createdUser = await userService.create(user);
      const id = createdUser.id ? createdUser.id : user.id;
      const deletedUser = await userService.delete(id);

      expect(deletedUser).toBeUndefined();

      const users = await userService.read();

      expect(users).toHaveLength(0);
    });

    it('should return an HttpException when user does not exist', async () => {
      expect(userService.delete('4')).rejects.toBeInstanceOf(HttpException);
    });
  });
});
