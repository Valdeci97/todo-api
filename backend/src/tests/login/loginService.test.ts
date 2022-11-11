import MockUserModel from '../mocks/MockUserModel';
import MockHashProvider from '../mocks/MockHashProvider';
import LoginService from '../../services/LoginService';
import UserService from '../../services/Userservice';
import { user, wrongEmailUser, wrongPasswordUser } from '../mocks/users';
import HttpException from '../../exceptions/HttpException';

let mockUserModel: MockUserModel;
let mockHashProvider: MockHashProvider;
let loginService: LoginService;
let userService: UserService;

describe('Testing login service methods', () => {
  beforeEach(() => {
    mockUserModel = new MockUserModel();
    mockHashProvider = new MockHashProvider();
    userService = new UserService(mockUserModel, mockHashProvider);
    loginService = new LoginService(mockUserModel, mockHashProvider);
  });

  describe('User login', () => {
    it('should be able to connect user and return token', async () => {
      await userService.create(user);
      const login = await loginService.login(user);

      expect(login).toHaveProperty('user');
      expect(login).toHaveProperty('token');
      expect(typeof login.token).toBe('string');
    });
  });

  it('should not be able to connect with wrong email and throw HttpException', async () => {
    expect(loginService.login(wrongEmailUser)).rejects.toBeInstanceOf(
      HttpException
    );
  });

  it('should not be able to connect with wrong password and throw HttpException', async () => {
    await userService.create(user);

    expect(loginService.login(wrongPasswordUser)).rejects.toBeInstanceOf(
      HttpException
    );
  });
});
