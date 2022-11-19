"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ = _interopRequireDefault(require("."));
var _HttpException = _interopRequireDefault(require("../exceptions/HttpException"));
var _UserModel = _interopRequireDefault(require("../models/UserModel"));
var _HashProvider = _interopRequireDefault(require("../utils/HashProvider"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class UserService extends _.default {
  USER_NOT_FOUND = {
    message: 'user not found',
    code: 404
  };
  constructor(model = new _UserModel.default(), hashHandler = new _HashProvider.default()) {
    super(model);
    this.hashHandler = hashHandler;
  }
  async create(obj) {
    const dbUser = await this.findeUserByEmail(obj.email);
    if (dbUser) throw new _HttpException.default(409, 'E-mail already registered');
    const hashedUser = await this.hashPassword(obj);
    const user = await this.model.create(hashedUser);
    return {
      id: user._id,
      name: user.name,
      email: user.email
    };
  }
  async read() {
    const users = await this.model.read();
    return this.removePassword(users);
  }
  async readOne(id) {
    const user = await this.model.readOne(id);
    if (!user) throw this.notFoundException();
    return {
      id: user._id,
      name: user.name,
      email: user.email
    };
  }
  async update(id, obj) {
    const hashedPassword = await this.hashPassword(obj);
    const user = await this.model.update(id, hashedPassword);
    if (!user) throw this.notFoundException();
    return {
      id: user._id,
      name: user.name,
      email: user.email
    };
  }
  async delete(id) {
    const user = await this.model.delete(id);
    if (!user) throw this.notFoundException();
  }

  // eslint-disable-next-line class-methods-use-this
  removePassword(users) {
    const usersWithoutPassword = users.map(({
      name,
      email,
      _id
    }) => ({
      name,
      email,
      id: _id
    }));
    return usersWithoutPassword;
  }
  async hashPassword(user) {
    const hashedPassword = await this.hashHandler.hashPayload(user.password);
    return {
      name: user.name,
      email: user.email,
      password: hashedPassword
    };
  }
  async findeUserByEmail(email) {
    return this.model.findByEmail(email);
  }
  notFoundException() {
    throw new _HttpException.default(this.USER_NOT_FOUND.code, this.USER_NOT_FOUND.message);
  }
}
exports.default = UserService;