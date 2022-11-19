"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = require("mongoose");
var _DatabaseModel = _interopRequireDefault(require("../../models/DatabaseModel"));
var _UserModel = require("../../models/UserModel");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class MockUserModel extends _DatabaseModel.default {
  users = [{
    name: 'teste login',
    email: 'teste@login.com',
    password: '12345678',
    _id: '6363daa6ab1e71a12204e9e4'
  }];
  constructor(model = (0, _mongoose.model)('User', _UserModel.userSchema)) {
    super(model);
  }
  async create(obj) {
    obj._id = new _mongoose.Types.ObjectId().toString();
    this.users.push(obj);
    return obj;
  }
  async read() {
    return this.users;
  }
  async readOne(id) {
    const user = this.users.find(user => user._id === id);
    if (!user) return null;
    return user;
  }
  async update(id, obj) {
    const userIndex = this.users.findIndex(user => user._id === id);
    if (userIndex === -1) return null;
    this.users[userIndex].name = obj.name;
    return obj;
  }
  async delete(id) {
    const userIndex = this.users.findIndex(user => user._id === id);
    if (userIndex === -1) return false;
    this.users.splice(userIndex, 1);
    return true;
  }
  async findByEmail(email) {
    const user = this.users.find(user => user.email === email);
    if (!user) return null;
    return user;
  }
}
exports.default = MockUserModel;